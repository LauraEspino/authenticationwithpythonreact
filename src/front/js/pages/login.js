import React, { useState, useContext} from "react";
import envFile from "../../../../docs/assets/env-file.png"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Dark = ({children}) => <span className="bg-dark text-white px-1 rounded">{children}</span>;



export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault()
		console.log(email, password)
		let logged= await actions.login(email, password)
		if (logged){
			navigate('https://glowing-disco-66j9q69p5xj3x66r-3000.app.github.dev/')
		}
		setEmail("")
		setPassword("")
	}

return(
	<div className="mt-2 pt-5 w-50 mx-auto">
		<h2  className="text-center mt-5">Login</h2>
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Enter to your account</h1>
				<form onSubmit={e => handleSubmit(e)}>					
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							onChange={e => setEmail(e.target.value)}
							className="form-control"
							placeholder="Enter email"
						/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							onChange={e => setPassword(e.target.value)}
							className="form-control"
							placeholder="Enter your password"
						/>
					</div>
					
					<button type="submit" className="btn btn-primary form-control mt-2 mb-3">
						Log in
					</button>
					<button className="btn btn-secondary form-control" onClick={e => navigate('/')}>
						go Back
					</button>
				</form>
            </div>
        </div>
                
	</div>
);
};