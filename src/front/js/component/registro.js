import React, { useState, useContext } from "react";
import envFile from "../../../../docs/assets/env-file.png"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Dark = ({children}) => <span className="bg-dark text-white px-1 rounded">{children}</span>;

export const NewAccount = () => {
	const [full_name, setFullName] = useState({ full_name: "" });
	const [email, setEmail] = useState({ email: "" });
	const [password, setPassword] = useState({ password: "" });

	const { store, actions } = useContext(Context);

	function handleSubmit(e) {
		e.preventDefault();
		console.log(full_name, email, password);
		actions.createAccount(full_name, email,password);
	}

return(
	<div className="mt-5 pt-5 w-50 mx-auto">
		<h2>Registro</h2>
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Create an account</h1>
				<form onSubmit={e => handleSubmit(e)}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							onChange={e => setFullName(e.target.value)}
							className="form-control"
							placeholder="Full Name"
						/>
					</div>
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
					
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or go Back
					</Link>
				</form>
            </div>
        </div>
                
	</div>
);
};
