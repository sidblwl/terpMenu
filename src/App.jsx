import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HallSection from './components/HallSection.jsx'


function MenuCard({mItem}){
  return(
    // <div className="menuItem">
      // <div className="menuItemImage">1</div>
      // <div className="itemTextWrapper">
      //   <h1 className="menuItemName">{mItem.name}</h1>
      //   <p>{mItem.tags}</p>
      // </div>
    // </div>
    <>
      <div className="menuItem">
        <div className="menuItemImage">1</div>
        <h1 className="menuItemName">{mItem}</h1>
        <p>Halal, Kosher</p>
        <div>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
        </div>
      </div>
    </>
  )
}



function App() {
  let allDiningHalls;
  const loading = {"Breakfast": [
    "Loading Items...",
],
"Good Food Gluten Free": [
    "Loading Items...",
],
"Sprouts": [
    "Loading Items...",
],
"Terp Comfort": [
    "Loading Items...",
],
"Salad Bar": [
    "Loading Items...",
],
"Maryland Bakery": [
    "Loading Items..."
],
"Mezza": [
    "Loading Items...",
],
"Chef's Corner": [
    "Loading Items...",
],
"Joe's Grill": [
    "Loading Items...",
],
"Terp Grain Bowl": [
    "Loading Items...",
],
"Woks": [
    "Loading Items...",
]}
  const [diningHall, setDiningHall] = useState(1)
  const [section, setSection] = useState("Breakfast")
  const [menulist, setMenulist] = useState(loading)

  const fetchMessages = async () => {
      const response = await fetch("http://127.0.0.1:8000/menu")
      const menuResponse = await response.json()
      allDiningHalls = menuResponse;
    
      console.log(allDiningHalls["southDining"])
      setMenulist(allDiningHalls["yahentamitsi"])
      
      
  }

  useEffect(() => {
      fetchMessages()
  }, [])

  // console.log(menus[diningHall][section]);

  return (
    <>
      <div className="topNav">
        <button onClick={() => {setDiningHall(0); setMenulist(allDiningHalls["northDining"])}}>North Dining</button>
        <button onClick={() => {setDiningHall(1); setMenulist(allDiningHalls["yahentamitsi"])}}>The Y</button>
        <button onClick={() => {setDiningHall(2); setMenulist(allDiningHalls["southDining"])}}>South Dining</button>
      </div>
      <div className="wrapper">
        <div className="favWrapper">
          <button className="favoriteBtn">Favorites</button>
        </div>
        <h1 className="sectionTitle">{section}</h1>
        <div className="redBorder">
          <div className="sidebar">
            <HallSection hall={diningHall} change={setSection}></HallSection>
          </div>
        </div>
        <div className="menu">
          {/* <p>{menulist[section][1]}</p> */}
          {menulist[section].map((menuItem) => (
          <MenuCard mItem={menuItem}></MenuCard>
          ))}
        </div>
      </div>
    </>
  )
}

export default App