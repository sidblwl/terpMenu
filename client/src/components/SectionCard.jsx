import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RatingMenu from './RatingMenu'
import '../App.css'
import MenuCard from './MenuCard'

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