import { useState } from 'react'
import { useEffect } from 'react'
import NavButton from './components/NavButton.jsx'
import './App.css'
import HallSections from './components/HallSections.jsx'
import RatingMenu from './components/RatingMenu.jsx'
let lamborghini = {}
const loadingY = {
  "Loading...": [
      {
          "name": "Loading Items...",
          "tags": [],
          "image": "loading.gif"
      }
  ]
}

const loadingSouth = {
  "Loading...": [
    {
      "name": "Loading Items...",
      "tags": [],
      "image": "loading.gif"
    }
  ]}

const loadingNorth = {
  "Loading...": [
    {
      "name": "Loading Items...",
      "tags": [],
      "image": "loading.gif"
    }
  ]
}

let dontLoadFirstRender = false;

function MenuCard({mItem, hall, section}){ 
  const [popupState, setPopupState] = useState(false);

  function Star({id}){
    return(
      <div style = {(id <= mItem.rating ? {color: "orange"} : {color: "black"})} className="fa fa-star"></div>
    )
  }


  let tagList = "";
  mItem.tags.forEach((tag) => {
    if(tag != "HalalFriendly"){
      tagList += tag.charAt(0).toUpperCase() + tag.substring(1, tag.length);
    }
    else{
      tagList+= "Halal Friendly"
    }
    tagList += ", "
  })

  if(tagList == ""){
    tagList = "None  "
  }
  tagList = tagList.substring(0, tagList.length-2);

  let hallName = ""
  if(hall == 0){
    hallName = "North"
  } else if(hall == 1){
    hallName = "Y"
  } else{
    hallName = "South"
  }
  return(
    <>
      <div className="menuItem">
        <img className="menuItemImage" src = {mItem.image}></img>
        <div className="menuItemNameHolder">
          <h1 className="menuItemName">{mItem.name}</h1>
        </div>
        <div className="menuItemTagHolder">
          <p>{tagList}</p>
        </div>
        <div>
          <Star id = {1}></Star>
          <Star id = {2}></Star>
          <Star id = {3}></Star>
          <Star id = {4}></Star>
          <Star id = {5}></Star>
          <button className="reviewButton" onClick={() => {
            setPopupState(true)
          }}>Review</button>
        </div>
      </div>

      <RatingMenu setPopupState = {setPopupState} popupState={popupState} mItem={mItem} hall={hallName} section={section}></RatingMenu>
    </>
  )
}

function App() {
  const [diningHall, setDiningHall] = useState(1)
  const [section, setSection] = useState("Loading...")
  const [menulist, setMenulist] = useState(loadingY)
  const [activeTab, setActiveTab] = useState(1)
  const [activeSection, setActiveSection] = useState(1)
  const [controller, setAbortController] = useState(new AbortController())
  const diningHalls = [{name: "North Dining", loading: loadingNorth, firstSection: "Smash Burger", id: 0}, {name: "The Y", loading: loadingY, firstSection: "Breakfast", id: 1}, {name: "South Dining", loading: loadingSouth, firstSection: "Broiler Works", id: 2}]
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
        setMenulist(diningHalls[diningHall].loading); 
        setSection("Loading..."); 
        fetchMessages()
      }
    }
    else{
      dontLoadFirstRender = true;
    }
  }, [diningHall])


  return (
    <>
      <div className="topNav">
        {diningHalls.map((hall) => (
            <NavButton currentHall={hall} setDiningHall = {setDiningHall} setAbortController= {setAbortController} controller = {controller} activeTab = {activeTab} setActiveSection = {setActiveSection} setActiveTab={setActiveTab}></NavButton>
        ))}
      </div>
      <div className="wrapper">
        <div className="favWrapper">
          <button className="favoriteBtn">Favorites</button>
        </div>
        <h1 className="sectionTitle">{section}</h1>
        <div className="redBorder">
          <div className="sidebar">
            <HallSections menulist = {menulist} hall={diningHall} change={setSection} activeSection = {activeSection} setActiveSection = {setActiveSection} setActiveTab = {setActiveTab}></HallSections>
          </div>
        </div>
        <div className="menu">
          {/* <p>{menulist[section][0].name}</p> */}
          {menulist[section].map((menuItem) => (
          <MenuCard mItem={menuItem} hall={diningHall} section={section}></MenuCard>
          ))}
        </div>
      </div>
    </>
  )
}

export default App