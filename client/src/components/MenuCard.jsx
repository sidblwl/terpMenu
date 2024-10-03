import { useState } from "react";
import RatingMenu from "./RatingMenu";
export default function MenuCard({mItem, hall, station, submitState, setSubmitState}){ 
    const [popupState, setPopupState] = useState(false);
    
    function Star({id}){
      return(
        <div style = {(id <= mItem.rating ? {color: "orange"} : {color: "lightgray"})} className="fa fa-star"></div>
      )
    }
  
    return(
      <>
        <div className="menuItem" data-item={mItem.name}>
          <img className="menuItemImage" src = {mItem.image}></img>
          <div className="menuItemInfo">
            <h1 className="menuItemName">{mItem.name}</h1>
            <MenuCardTags></MenuCardTags>
            <MenuCardBody submitState = {submitState} setSubmitState = {setSubmitState}></MenuCardBody>
          </div>
        </div>
      </>
    )

    function MenuCardTags(){
      return (mItem.name != "Loading Items..." && mItem.name != "No items matched your search" && mItem.name != "Could Not Load Items" && mItem.tags.length != 0) ? (
        <>
          <div className="menuItemTagHolder">
              {mItem.tags.map((tag) => (
                  <img src={tag}></img>
              ))}
          </div>
        </>
      ): ""
    }
  
    function MenuCardBody({submitState, setSubmitState}){
    
      return (mItem.name != "Loading Items..." && mItem.name != "No items matched your search" && mItem.name != "Could Not Load Items") ? (
        <>
          <div className="menuItemStarHolder">
            <Star id = {1}></Star>
            <Star id = {2}></Star>
            <Star id = {3}></Star>
            <Star id = {4}></Star>
            <Star id = {5}></Star>
          </div>
          <button className="reviewButton" onClick={() => {
            setPopupState(true)
            setSubmitState(false)
          }}>Review</button>
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