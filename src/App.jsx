import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HallSections from './components/HallSections.jsx'

const loadingY = {
  "Breakfast": [
      {
          "name": "Loading Items...",
          "tags": []
      }
  ],
  "Good Food Gluten Free": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Sprouts": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Terp Comfort": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Salad Bar": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Maryland Bakery": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Mezza": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Joe's Grill": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Terp Grain Bowl": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Terp Latin": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Woks": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ]
}

const loadingSouth = {
  
  "Broiler Works": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
"Grill Works": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Chef's Table": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Salad Bar": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Waffle, Doughnut, Bagel Bar": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Purple Zone": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Roaster": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Pasta": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Pizza": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Soup Du Jour": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Deli+": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Deli": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Roma Vegan Salads and Panini": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Vegan Desserts": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Mongolian Grill": [
  {
    "name": "Loading Items...",
    "tags": []
  }
],
"Mongolian Grill Made to Ord": [
  {
    "name": "Loading Items...",
    "tags": []
  }
]}

const loadingNorth = {
  "Smash Burger": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Harvest Greens": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Harvest Vegan-LUNCH": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Purple Zone": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Purple Zone-ALL DAY": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Smash Deli": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Ciao All-Day": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Ciao Chilled Salads": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Ciao Pizza": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Ciao Pasta": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Ciao Entree": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Chef's Table Mains": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Chef's Table Extras": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Chef's Table Vegetarian": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Halal at Chef's Table": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Harvest Entree": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Soups": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
  "Scoops Homemade Ice Cream": [
    {
      "name": "Loading Items...",
      "tags": []
    }
  ],
}

let dontLoadFirstRender = false;

let activeTab = 1;

function setActiveTab(id){
  activeTab = id;
}

let activeSection = 1;

function setActiveSection(newKey){
  activeSection = newKey;
}

function NavButton({currentHall, setMenulist, setSection, setDiningHall, controller}){
 return(
     <button style = {(currentHall.id == activeTab ? {backgroundColor: "darkred"} : {backgroundColor: "red"})} className = "navButton" onClick={() => {
      if(activeTab != currentHall.id){
        setActiveSection(1);
        setActiveTab(currentHall.id); 
        setMenulist(currentHall.loading); 
        setSection(currentHall.firstSection); 
        setDiningHall(currentHall.id); 
        controller.abort()
      }      
    }}>{currentHall.name}</button>
  )
}

function MenuCard({mItem}){
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
  return(
    <>
      <div className="menuItem">
        <div className="menuItemImage">1</div>
        <h1 className="menuItemName">{mItem.name}</h1>
        <p>{tagList}</p>
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
  const [diningHall, setDiningHall] = useState(1)
  const [section, setSection] = useState("Breakfast")
  const [menulist, setMenulist] = useState(loadingY)
  const controller = new AbortController()
  const diningHalls = [{name: "North Dining", loading: loadingNorth, firstSection: "Smash Burger", id: 0}, {name: "The Y", loading: loadingY, firstSection: "Breakfast", id: 1}, {name: "South Dining", loading: loadingSouth, firstSection: "Broiler Works", id: 2}]
  let fetching = false;
  const signal = controller.signal; 
  const fetchMessages = async () => {
      fetching = true;
      const response = await fetch("http://127.0.0.1:8000/menu" + diningHall, {signal: signal})
      const menuResponse = await response.json()
      fetching = false;
      setMenulist(menuResponse);
  }

  useEffect(() => {
    if(dontLoadFirstRender){
      fetchMessages()
    }
    else{
      dontLoadFirstRender = true;
    }
  }, [diningHall])


  return (
    <>
      <div className="topNav">
        {diningHalls.map((hall) => (
            <NavButton currentHall={hall} setMenulist = {setMenulist} setDiningHall = {setDiningHall} setSection = {setSection} controller = {controller}></NavButton>
        ))}
      </div>
      <div className="wrapper">
        <div className="favWrapper">
          <button className="favoriteBtn">Favorites</button>
        </div>
        <h1 className="sectionTitle">{section}</h1>
        <div className="redBorder">
          <div className="sidebar">
            <HallSections menulist = {menulist} hall={diningHall} change={setSection} activeSection = {activeSection} setActiveSection = {setActiveSection}></HallSections>
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