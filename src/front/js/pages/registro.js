import React, { useState, useContext, useEffect } from "react";
import envFile from "../../../../docs/assets/env-file.png";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Dark = ({ children }) => (
  <span className="bg-dark text-white px-1 rounded">{children}</span>
);

export const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const { store, actions } = useContext(Context);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    // actions.signup(email, password);
	let signedin= await actions.signup(email, password)
		if (signedin){
			navigate('/')
		}
  
  }
 

  return (
    <div className="mt-2 pt-5 w-50 mx-auto">
      <h2 className="text-center mt-5">Sign up</h2>
      <div className="container">
        <div>
          <h1 className="text-center mt-5">Create an account</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary form-control mt-2 mb-3"
            >
              Sign Up
            </button>
            <button
              className="btn btn-secondary form-control"
              onClick={(e) => navigate("/")}
            >
              go Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
