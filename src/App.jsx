import { useState } from 'react'
import { useEffect } from 'react'
import NavButton from './components/NavButton.jsx'
import './App.css'
import HallSections from './components/HallSections.jsx'
import RatingMenu from './components/RatingMenu.jsx'
import Filters from './components/Filters.jsx'
import Menu from './components/Menu.jsx'
import MobileMenu from './components/MobileMenu.jsx'
import NavIcon from './components/NavIcon.jsx'
import MobileNav from './components/MobileNav.jsx'
let lamborghini = {}
const loading = {
  "Loading...": [
      {
          "name": "Loading Items...",
          "tags": [],
          "image": "loading.gif"
      }
  ]
}

let dontLoadFirstRender = false;



function App() {
  const [diningHall, setDiningHall] = useState(1)
  const [section, setSection] = useState("Loading...")
  const [menulist, setMenulist] = useState(loading)
  const [activeTab, setActiveTab] = useState(1)
  const [activeSection, setActiveSection] = useState(1)
  const [controller, setAbortController] = useState(new AbortController())
  const [filters, setFilters] = useState([])
  const [submitState, setSubmitState] = useState(false);
  const [filterState, setFilterState] = useState(false)
  
  let mapped = false;
  const diningHalls = [{name: "North Dining", firstSection: "Smash Burger", id: 0}, {name: "Yahentamitsi", firstSection: "Breakfast", id: 1}, {name: "South Dining", firstSection: "Broiler Works", id: 2}]
  const fetchMessages = async () => {
    const signal = controller.signal; 
    const response = await fetch("http://127.0.0.1:8000/menu" + diningHall, {signal: signal})
    const menuResponse = await response.json()
    lamborghini[diningHall] = menuResponse
    setSection(diningHalls[diningHall].firstSection)
    setMenulist(menuResponse);
  }

  useEffect(() => { 
    if(dontLoadFirstRender){
      if(lamborghini[diningHall] != undefined){
        setSection(diningHalls[diningHall].firstSection)
        setMenulist(lamborghini[diningHall])
      }
      else{
        setMenulist(loading); 
        setSection("Loading..."); 
        fetchMessages()
      }
    }
    else{
      dontLoadFirstRender = true;
    }
  }, [diningHall])

  //reset mapped variable and submit animation to false for the filters 
  useEffect(() => {
    setSubmitState(false)
    mapped = false;
  }, [section, diningHall])

  return (
    <>
      <div className="topNav">
        <div className = "desktop topNav">
          {diningHalls.map((hall) => (
              <NavButton currentHall={hall} setDiningHall = {setDiningHall} setAbortController= {setAbortController} controller = {controller} activeTab = {activeTab} setActiveSection = {setActiveSection} setActiveTab={setActiveTab}></NavButton>
          ))}
        </div>

        <div className = "mobile">
          <MobileNav></MobileNav>
        </div>

      </div>












      <div className="desktop wrapper">
        <div className="favWrapper">
          <button style = {activeSection == 0 ? {backgroundColor: "lightgray"}: {backgroundColor: "white"}} className="favoriteBtn" onClick = {() => {setSection("Favorites"); setActiveSection(0)}}>Favorites</button>
        </div>

        <h1 className="sectionTitle">{section}</h1>
  
        <div className="redBorder">
          <div className="sidebar">
            <HallSections menulist = {menulist} hall={diningHall} change={setSection} activeSection = {activeSection} setActiveSection = {setActiveSection} setActiveTab = {setActiveTab}></HallSections>
          </div>
        </div>
        <div className="sideWrapper">
          <div className="filterWrapper">
            <Filters filterState = {filterState} setFilterState = {setFilterState} setSubmitState = {setSubmitState} filters = {filters} setFilters = {setFilters}></Filters>
          </div>
            <Menu section = {section} menulist = {menulist} filters = {filters} mapped = {mapped} submitState = {submitState} setSubmitState = {setSubmitState} diningHall = {diningHall}></Menu>
        </div>
      </div>


















      <div className="mobileWrapper">
          <MobileMenu menulist = {menulist} filters = {filters} mapped = {mapped} submitState = {submitState} setSubmitState = {setSubmitState} diningHall = {diningHall}></MobileMenu>
      </div>





    </>
  )
}

export default App