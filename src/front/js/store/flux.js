import axios from 'axios';

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token:""
		},
		// getMessage: async () => {
		// 		try{
		// 			// fetching data from the backend
		// 			const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
		// 			const data = await resp.json()
		// 			setStore({ message: data.message })
		// 			// don't forget to return something, that is how the async resolves
		// 			return data;
		// 		}catch(error){
		// 			console.log("Error loading message from backend", error)
		// 		}
		// 	},
		actions: {
			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello" , { mode: 'no-cors' })
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			
			login: async(email, password) => {
				try{
					let data= await axios.post('https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/login',{
					email:email,
					password:password
					})
					console.log(data);
					localStorage.setItem("token",data.data.access_token)
					setStore({token:data.data.access_token})
					return true
					
				}catch(error){
					console.log(error);
					return false
				}


		},
		signup: async(email, password) => {
			try{
				let data= await axios.post('https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/signup',{
				email:email,
				password:password
				})
				console.log(data)
				if (data.data.status === 200){
					actions.login(email,password)
				}
				return true
				
			}catch(error){
				console.log(error);
				return false
			}


	},
	private: async () => {
		try {
			const config = {
				headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
			}
			let data = await axios.get("https://symmetrical-parakeet-gjrq5x949jv3r4x-3001.preview.app.github.dev/api/private",config)
			console.log(data);
			return true
		} catch (error) {
			console.log(error);
			return false
		}
	},
	logOut: () => {
		if (localStorage.getItem("token") != null){
			localStorage.removeItem("token")
		}else{
			alert("No hay token")
		}
	},
}
}
};

export default getState;

