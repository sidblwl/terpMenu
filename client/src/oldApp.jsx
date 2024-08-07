import { useState } from 'react'
import { useEffect } from 'react'
import NavButton from './components/NavButton.jsx'
import './App.css'
import HallSections from './components/HallSections.jsx'
import RatingMenu from './components/RatingMenu.jsx'
import Filters from './components/Filters.jsx'
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

function MenuCard({mItem, hall, section, submitState, setSubmitState}){ 
  const [popupState, setPopupState] = useState(false);
  
  function Star({id}){
    return(
      <div style = {(id <= mItem.rating ? {color: "orange"} : {color: "black"})} className="fa fa-star"></div>
    )
  }


  let tagList = "";
  mItem.tags.forEach((tag) => {
    if(tag != "halalfriendly"){
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
        <MenuCardBody submitState = {submitState} setSubmitState = {setSubmitState}></MenuCardBody>
      </div>
    </>
  )

  function MenuCardBody({submitState, setSubmitState}){
  
    return (mItem.name != "Loading Items..." && mItem.name != "No items matched your search") ? (
      <>
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
                setSubmitState(false)
              }}>Review</button>
            </div>
        <RatingMenu setSubmitState = {setSubmitState} setPopupState = {setPopupState} popupState={popupState} mItem={mItem} hall={hallName} section={section}></RatingMenu>
        <SubmitAnimation submitState = {submitState} setSubmitState={setSubmitState}></SubmitAnimation>
      </>
    ): ""
  }
}

function SubmitAnimation({submitState, setSubmitState}){
  return (submitState) ? (          
      <div className = "submitAnimation" onAnimationEnd={() => {setSubmitState(false)}}>
          <div className = "submitAnimationInner">
            <p>Submitted</p>
            <img src = "public/checkmark.png"></img>
          </div>
      </div>
  ): ""
}

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
    await fetch("http://127.0.0.1:8000/updateFromDB")
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
        {diningHalls.map((hall) => (
            <NavButton currentHall={hall} setDiningHall = {setDiningHall} setAbortController= {setAbortController} controller = {controller} activeTab = {activeTab} setActiveSection = {setActiveSection} setActiveTab={setActiveTab}></NavButton>
        ))}
      </div>
      <div className="wrapper">
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
          <div className="menu">
          {menulist[section].map((menuItem) => {
            let validItem = true;
            if(filters.length > 0){
              filters.forEach((filter) =>{
                if(!menuItem.tags.includes(filter)){
                  validItem = false;
                }
              })
            }
            if(validItem){
              mapped = true;
              return <MenuCard submitState = {submitState} setSubmitState = {setSubmitState} mItem={menuItem} hall={diningHall} section={section}></MenuCard>
            }
            else{
              if(menuItem === menulist[section][menulist[section].length -1] && !mapped){
                let noSuchItems =  {
                  "name": "No items matched your search",
                  "tags": [],
                  "image": "none.jpg"
                }
                return <MenuCard mItem={noSuchItems} hall={diningHall} section={section}></MenuCard>
              }
            }
          })}
        </div>
        </div>
      </div>
    </>
  )
}

export default App