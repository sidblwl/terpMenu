import NavButton from "./NavButton"
export default function MobileMenuNav({setMobileMenu, mobileMenu, diningKeys, setAbortController, controller, diningHall, setActiveSection}){
    return(
        <div className= {"mobile " + (mobileMenu ? "mobileMenuActive" : "mobileMenu") }>
            {Object.keys(diningKeys).map((hall) => (
              <NavButton setMobileMenu = {setMobileMenu} currentHall={hall} hallInfo={diningKeys[hall]} setAbortController= {setAbortController} controller = {controller} diningHall={diningHall} setActiveSection={setActiveSection}></NavButton>
            ))}
        </div>
    )
}