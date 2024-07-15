import { useState } from "react"
import React from "react"
export default function NavIcon({iconStatus, setIconStatus}){
    return(
        <div className = "navIconContainer" onClick={() => {
            if(iconStatus == "Open"){
                setIconStatus("Closed")
            }
            else{
                setIconStatus("Open")
            }
        }}>
            <div className = {"navIconLine top" + iconStatus}></div>
            <div className = {"navIconLine bottom" + iconStatus}></div>
        </div>
    )
}