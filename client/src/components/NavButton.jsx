import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../App.css'

   export default function NavButton({setMobileMenu, currentHall, hallInfo, setAbortController, controller, diningHall, setActiveSection}){
    
    return(
      <Link to={"/" + currentHall}>
        <button style = {(currentHall == diningHall ? {backgroundColor: "darkred"} : {backgroundColor: "#e21833"})} className={"navButton"} onClick={() => {
          if(diningHall != currentHall){
            setActiveSection(1);
            setMobileMenu(false);
            setAbortController(new AbortController)
            controller.abort()
         }      
        }}>{hallInfo[1]}</button>
      </Link>
     )
   }