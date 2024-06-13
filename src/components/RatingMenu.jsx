import '../App.css'
import React, { useState } from "react";

export default function RatingMenu({popupState, setPopupState, rating, setRating, mItem}){
    function Star({id}){
        return(
            <div style = {(id <= rating ? {color: "orange"} : {color: "black"})} onClick = {() => {setRating(id)}} className="fa fa-star"></div>
        )
      }

    return (popupState) ? (
        <div className="popup">
            <div className="popup-inner">
                <button className="close-popup" onClick = {() => setPopupState(false)}>close</button>
                <h3>Ratings for {mItem.name}</h3>
                <Star rating = {rating} setRating = {setRating}  id = {1}></Star>
                <Star rating = {rating} setRating = {setRating}  id = {2}></Star>
                <Star rating = {rating} setRating = {setRating}  id = {3}></Star>
                <Star rating = {rating} setRating = {setRating}  id = {4}></Star>
                <Star rating = {rating} setRating = {setRating}  id = {5}></Star>
            </div>
        </div>
    ) : "";
}        