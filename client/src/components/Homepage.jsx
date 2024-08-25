import '../App.css'
import React, { useState, useEffect } from "react";
import { Routes, Route, useParams, Link, useNavigate} from "react-router-dom";

export default function Homepage(){
    let navigate = useNavigate()

    useEffect(()=> {
        navigate("/yahentamitsi")
    })
    return(
        <h1>Welcome to Terp Menu</h1>
    )
}