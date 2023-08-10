import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from 'react-router-dom';


export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<div className="text-center mt-5">
			<h1>Welcome</h1>
			<button className="btn btn-primary me-2 mb-3" onClick={e => navigate('/login')}>Log in</button>
			<span>or</span>
			<button className="btn btn-success ms-2 mb-3" onClick={e => navigate('/signup')}>Sign up</button>
			

			<p>
				<img src={rigoImageUrl} />
			</p>
			
			{/* <div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div> */}
			{/* <p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p> */}
		</div>
	);
};
