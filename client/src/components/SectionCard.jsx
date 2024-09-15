import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RatingMenu from './RatingMenu'
import '../App.css'

const noSuchItems =  {
  "No Items": [
    {
      "name": "No items matched your search",
      "tags": [],
      "image": "none.jpg"
    }
  ],
  "Top Rated": [
    {
      "name": "No items matched your search",
      "tags": [],
      "image": "none.jpg"
    }
  ]
}

function MenuCard({mItem, hall, station, submitState, setSubmitState}){ 
    const [popupState, setPopupState] = useState(false);
    
    function Star({id}){
      return(
        <div style = {(id <= mItem.rating ? {color: "orange"} : {color: "lightgray"})} className="fa fa-star"></div>
      )
    }
  
    return(
      <>
        <div className="menuItem">
          <img className="menuItemImage" src = {mItem.image}></img>
          <div className="menuItemInfo">
            <h1 className="menuItemName">{mItem.name}</h1>
            <MenuCardBody submitState = {submitState} setSubmitState = {setSubmitState}></MenuCardBody>
          </div>
        </div>
      </>
    )
  
    function MenuCardBody({submitState, setSubmitState}){
    
      return (mItem.name != "Loading Items..." && mItem.name != "No items matched your search" && mItem.name != "Could Not Load Items") ? (
        <>
          <div className="menuItemTagHolder">
              {mItem.tags.map((tag) => (
                  <img src={tag}></img>
              ))}
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
          <RatingMenu setSubmitState = {setSubmitState} setPopupState = {setPopupState} popupState={popupState} mItem={mItem} hall={hall} station={station}></RatingMenu>
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
              <img src = "checkmark.png"></img>
            </div>
        </div>
    ): ""
  }

export default function SectionCard({menulist, mapped, meal, station, submitState, setSubmitState, filters, diningHall}){

    return (
        <>
        <div className="stationCard">
          <div className="stationName">
            <h1>{station}</h1>
          </div>
          <div className="menu">
              {menulist[meal][station].map((menuItem) => {
              let validItem = true;
              if(filters.length > 0){
                  filters.forEach((filter) =>{
                    if(filter.includes("no")){
                      let filterAdjustment = filter.substring(3) + ".gif"
                      if(menuItem.tags.includes(filterAdjustment)){
                        validItem = false;
                      }
                    } else if(filter.includes("free")){
                      let filterAdjustment = filter.split(" ")[0] + ".gif"
                      if(menuItem.tags.includes(filterAdjustment)){
                        validItem = false;
                      }
                    } else if(!menuItem.tags.includes(filter)){
                        validItem = false;
                    }
                  })
              }
              if(validItem){
                  mapped = true;
                  return <MenuCard submitState = {submitState} setSubmitState = {setSubmitState} mItem={menuItem} hall={diningHall} station={station}></MenuCard>
              }
              else{
                  if(menuItem === menulist[meal][station][menulist[meal][station].length -1] && !mapped){
                  return <MenuCard mItem={noSuchItems["No Items"][0]} hall={diningHall} station={station}></MenuCard>
                  }
              }
              })}
          </div>
        </div>
        </>
    )
}