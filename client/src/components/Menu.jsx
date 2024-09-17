import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../App.css'
import NavButton from './NavButton'
import HallSections from './HallSections'
import RatingMenu from './RatingMenu'
import SectionCard from "./SectionCard";
import Filters from './Filters'
import MobileNavIcon from "./MobileNavIcon";
import MobileMenu from "./MobileMenu"
import SearchBar from "./SearchBar"

const loading = {
  "Breakfast": {
    "Loading...": [
      {
          "name": "Loading Items...",
          "tags": [],
          "image": "loading.gif"
      }
  ]
  },
  "Lunch": {
    "Loading...": [
      {
          "name": "Loading Items...",
          "tags": [],
          "image": "loading.gif"
      }
  ]
  },
  "Dinner": {
    "Loading...": [
      {
          "name": "Loading Items...",
          "tags": [],
          "image": "loading.gif"
      }
  ]
  }
}

const noSuchItems =  {
  "Breakfast": {
    "No Items": [
      {
        "name": "No items matched your search",
        "tags": [],
        "image": "none.jpg"
      }
    ]
  },
  "Lunch": {
    "No Items": [
      {
        "name": "No items matched your search",
        "tags": [],
        "image": "none.jpg"
      }
    ]
  },
  "Dinner": {
    "No Items": [
      {
        "name": "No items matched your search",
        "tags": [],
        "image": "none.jpg"
      }
    ]
  }
}

const failedToFetch = {
  "Breakfast": {
    "Server Error": [
      {
          "name": "Could Not Load Items",
          "tags": [],
          "image": "none.jpg"
      }
    ]
  },
  "Lunch": {
    "Server Error": [
      {
          "name": "Could Not Load Items",
          "tags": [],
          "image": "none.jpg"
      }
    ]
  },
  "Dinner": {
    "Server Error": [
      {
          "name": "Could Not Load Items",
          "tags": [],
          "image": "none.jpg"
      }
    ]
  }
}

function Menu() {
  const { diningHall } = useParams();
  const [meal, setMeal] = useState("Dinner")
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
  const diningKeys = {north: [0, "North Dining", "Top Rated"], yahentamitsi: [1, "Yahentamitsi", "Top Rated"], south: [2, "South Dining", "Top Rated"]}
  const fetchMessages = async () => {
    try{
      await fetch("https://seal-app-vpwsv.ondigitalocean.app/updateFromDB")
      const signal = controller.signal; 
      const response = await fetch("https://seal-app-vpwsv.ondigitalocean.app/" + diningHall, {signal: signal})
      const menuResponse = await response.json()
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
      setSection("Server Error"); 
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
      
      {/* Navbar */}
      <div className="topNav">
        <div className = "desktop">
          {Object.keys(diningKeys).map((hall) => (
              <NavButton currentHall={hall} hallInfo={diningKeys[hall]} setAbortController= {setAbortController} controller = {controller} diningHall={diningHall} setActiveSection={setActiveSection}></NavButton>
          ))}
        </div>
        <div className = "mobile mobileNavContainer">
          <p className="navHeader">TerpMenu</p>
          <MobileNavIcon setMobileMenu = {setMobileMenu} mobileMenu = {mobileMenu}></MobileNavIcon>
        </div>
      </div>

      {/* Hall Name and Toolbar */}
      <div className="header">
        <h1 className="hallName">{diningHall}</h1>
        <div className="toolbar">
          <select className="mealtimeSelect" onChange = {(e) => {setMeal(e.target.value)}}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <SearchBar menulist = {menulist} meal={meal}></SearchBar>
          {/* <input className="searchbar" type="text" placeholder="Search..."></input> */}
          <Filters filterState = {filterState} setFilterState = {setFilterState} setSubmitState = {setSubmitState} filters = {filters} setFilters = {setFilters}></Filters>
        </div>
      </div>

      {/* Menu */}
      <div className="main">
        {Object.keys(menulist[meal]).toReversed().map((station) => {
          return (
            <SectionCard mapped={mapped} filters = {filters} menulist = {menulist} meal = {meal} station = {station} submitState = {submitState} setSubmitState = {setSubmitState} diningHall={diningHall}></SectionCard>
          )
        })}
      </div>

      {/* Footer */}
      <div className="footer">
        <p className="copyright">Made by Sid Belwal, Evan Tran, and Lily Ureta</p>
      </div>
    </>
  )
}

export default Menu