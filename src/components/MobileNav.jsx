import NavIcon from "./NavIcon"
import { useState } from "react"
export default function MobileNav(){

    const [iconStatus, setIconStatus] = useState("Closed")
    return(
        <>  
            <div className = "mobileNavBar topNav">
                <button>Terp Eats</button>
                <NavIcon iconStatus = {iconStatus} setIconStatus = {setIconStatus}></NavIcon>
            </div>
            <MobileNavMenu iconStatus = {iconStatus}></MobileNavMenu>
        </>
    )
}

function MobileNavMenu({iconStatus}){
    if(iconStatus == "Open"){
        return(
            <div className = "movileNavMenu">
                <p>hello</p>
            </div>
        )
    }
    else{
        return ""
    }
}
