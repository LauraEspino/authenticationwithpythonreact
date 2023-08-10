import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
				"token": "",
				"message":"",
				"validate":false,
				"email":""
		},

		actions: {
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello" , { mode: 'no-cors' })
					const data = await resp.json()
					setStore({message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			login: async(email, password) => {
				try{
					const data= await axios.post('https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/login',{
					email:email,
					password:password
					})
					console.log(data);
					localStorage.setItem("token",data.data.access_token)
					setStore({token:data.data.access_token, email: email})
					return true
					
				}catch(error){
					console.log(error);
					return false
				}


		},
		
		signup: async(email, password) => {
			try{
				const data= await axios.post('https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/signup',{
				email:email,
				password:password
				})
				console.log(data);
				// if (data.data.status === 200){
				// 	login(email,password)
				localStorage.setItem("token",data.data.access_token)
					setStore({token:data.data.access_token})
					return true
				}
			catch(error){
				// console.log("error");
				return false
			}


	},
	private: async () => {
		try {
			const getToken = {
				headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
			}
			let data = await axios.get("https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/private",getToken)
			console.log(data);
			return true
		} catch (error) {
			console.log(error);
			return false
		}
	},
					
	logOut: () => {
		setStore({"token": "" });
		localStorage.removeItem("token");
		return false 
	},
	
	validToken: async () => {
		let token = localStorage.getItem("token")

		try {
			//codigo exitoso
			let data = await axios.get('https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/private',{
				headers:{
					"Authorization": `Bearer ${token}`,
				}
			})
			console.log(data);
			if (data.status === 200 )
			
			return true;
		} catch (error) {
		console.log(error);
		if (error.response.status === 401){
			setStore({message:{type:"danger",display:"block",msg:"La sesión ha expirado"}})
			localStorage.removeItem("token")
			return false
		}
		else if(error.response.status === 422){
			setStore({message:{type:"danger",display:"block",msg:"No se ha iniciado sesión aun"}})
			return false
		}
		return false
		}
	},
}
}
};

export default getState;

