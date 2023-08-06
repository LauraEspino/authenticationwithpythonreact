import React, {useContext} from "react";
import { Link , useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store,actions} = useContext(Context)
	const navigate = useNavigate()

	function GoPrivate(){
		if (actions.private()){
			navigate("/api/private")
		}else{
			alert("You must log in")
		}
	}

	function CloseSession(){
		actions.logOut()
		navigate("/")

	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
			
				<button className="btn btn-dark mx-1" onClick={GoPrivate}>My Profile</button>
					<button className="btn btn-danger mx-1" onClick={CloseSession}>Cerrar sesión</button>
					<Link to="/">
						<button className="btn btn-warning"><i className="fa-solid fa-house"></i></button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
