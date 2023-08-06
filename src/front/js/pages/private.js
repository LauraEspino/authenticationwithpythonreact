import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

 
export const Private = () => {
    const {store,actions} = useContext(Context)
    return(
        <>
            <div className="row">
                <h1  className="text-center">Usuario logeado</h1>
            </div>
        </>
    )
}