import React from "react";
import { useState } from "react";
import RatingMenu from "./RatingMenu";
export default function MenuCard({mItem, hall, section, submitState, setSubmitState}){ 
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