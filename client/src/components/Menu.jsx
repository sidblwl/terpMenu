import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../App.css'
import NavButton from './NavButton'
import HallSections from './HallSections'
import RatingMenu from './RatingMenu'
import Filters from './Filters'
import MobileNavIcon from "./MobileNavIcon";
import MobileMenu from "./MobileMenu"
const loading = {
  "Loading...": [
      {
          "name": "Loading Items...",
          "tags": [],
          "image": "loading.gif"
      }
  ]
}

const failedToFetch = {
  "Failed": [
      {
          "name": "Could Not Load Items",
          "tags": [],
          "image": "none.jpg"
      }
  ],
  "Favorites": [
    {
      "name": "No items matched your search",
      "tags": [],
      "image": "none.jpg"
    }
  ]
}

const noSuchItems =  {
  "No Items": [
    {
      "name": "No items matched your search",
      "tags": [],
      "image": "none.jpg"
    }
  ],
  "Favorites": [
    {
      "name": "No items matched your search",
      "tags": [],
      "image": "none.jpg"
    }
  ]
}

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
  
    return (mItem.name != "Loading Items..." && mItem.name != "No items matched your search" && mItem.name != "Could Not Load Items") ? (
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
        <RatingMenu setSubmitState = {setSubmitState} setPopupState = {setPopupState} popupState={popupState} mItem={mItem} hall={hall} section={section}></RatingMenu>
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

function Menu() {
  const { diningHall } = useParams();
  const [meal, setMeal] = useState("Breakfast")
  const [section, setSection] = useState("Loading...")
  const [menulist, setMenulist] = useState(loading)
  const [activeSection, setActiveSection] = useState(1)
  const [controller, setAbortController] = useState(new AbortController())
  const [filters, setFilters] = useState([])
  const [submitState, setSubmitState] = useState(false);
  const [filterState, setFilterState] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  //https://seal-app-vpwsv.ondigitalocean.app
  let mapped = false;
  const diningKeys = {north: [0, "North Dining", "Smash Burger"], yahentamitsi: [1, "Yahentamitsi", "Breakfast"], south: [2, "South Dining", "Broiler Works"]}
  const fetchMessages = async () => {
    try{
      await fetch("https://seal-app-vpwsv.ondigitalocean.app/updateFromDB")
      const signal = controller.signal; 
      const response = await fetch("https://seal-app-vpwsv.ondigitalocean.app/" + diningHall, {signal: signal})
      const menuResponse = await response.json()
      console.log(menuResponse)
      if(Object.keys(menuResponse).length <=1){
        setSection("No Items")
        setMenulist(noSuchItems);
      }
      else{
        setSection(diningKeys[diningHall][2])
        setMenulist(menuResponse);
      }
    }
    catch (error){
      console.log(error)
      setMenulist(failedToFetch); 
      setSection("Failed"); 
      console.log("failed to fetch")
    }
  }

  // every time the diningHall changes we fetch the menuItems from the backend
  useEffect(() => {
    fetchMessages();
  }, [diningHall])

  //every time the section or dining hall changes we set the submit animation to false and reset the mapped variable
  useEffect(() => {
    setSubmitState(false)
    mapped = false;
  }, [section, diningHall])

  return (
    <>
      <MobileMenu setMobileMenu = {setMobileMenu} diningKeys = {diningKeys} setAbortController= {setAbortController} controller = {controller} diningHall={diningHall} setActiveSection={setActiveSection} mobileMenu = {mobileMenu}></MobileMenu>
      <div className="topNav">
        <div className = "desktop">
          {Object.keys(diningKeys).map((hall) => (
              <NavButton currentHall={hall} hallInfo={diningKeys[hall]} setAbortController= {setAbortController} controller = {controller} diningHall={diningHall} setActiveSection={setActiveSection}></NavButton>
          ))}
        </div>

        {/* moblie */}
        <div className = "mobile mobileNavContainer">
          <p className="navHeader">TerpMenu</p>
          <MobileNavIcon setMobileMenu = {setMobileMenu} mobileMenu = {mobileMenu}></MobileNavIcon>
        </div>
      </div>
      <div className={"wrapper " + (mobileMenu ? "no-scroll": "")}>
        <div className="desktop favWrapper">
          <button style = {activeSection == 0 ? {backgroundColor: "lightgray"}: {backgroundColor: "white"}} className="favoriteBtn" onClick = {() => {setSection("Favorites"); setActiveSection(0)}}>Favorites</button>
        </div>

          <div className="hallHeader">
            <h1 className="sectionTitle">{section}</h1>
            <div className="filterWrapper">
              <select onChange = {(e) => {setMeal(e.target.value)}}>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
              <Filters filterState = {filterState} setFilterState = {setFilterState} setSubmitState = {setSubmitState} filters = {filters} setFilters = {setFilters}></Filters>
              <select className = "mobile mobileSectionSelect" onChange = {(e) => {setSection(e.target.value)}}>
                <HallSections mobile = {true} menulist = {menulist} change={setSection} activeSection = {activeSection} setActiveSection = {setActiveSection}></HallSections>
              </select>
            </div>
            <img className="floorMap" src={`public/${diningHall}map.png`}></img>
          </div>
        <div className="sidebarHolder">
          <div className="desktop sidebar">
            <HallSections mobile = {false} menulist = {menulist} change={setSection} activeSection = {activeSection} setActiveSection = {setActiveSection}></HallSections>
          </div>
        </div>
        <div className="sideWrapper">
          <div className= {"menu"}>
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
                return <MenuCard mItem={noSuchItems["No Items"][0]} hall={diningHall} section={section}></MenuCard>
              }
            }
          })}
        </div>
        </div>
      </div>
    </>
  )
}

export default Menu