import { useState } from "react"
export default function MobileNavIcon({mobileMenu, setMobileMenu}){
    return(
        <div className = "navIconContainer" onClick={() => {
            if(mobileMenu == true){
                setMobileMenu(false)
            }
            else{
                setMobileMenu(true)

            }
        }}>
            <div className = {"navIconLine top" + (mobileMenu ? "Open" : "Closed" )}></div>
            <div className = {"navIconLine bottom" + (mobileMenu ? "Open" : "Closed" )}></div>
        </div>
    )
}