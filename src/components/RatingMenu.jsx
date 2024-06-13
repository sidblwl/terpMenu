import '../App.css'
import React, { useState } from "react";
import close from "../assets/close.png";


export default function RatingMenu({popupState, setPopupState, rating, setRating, mItem}){
    function Star({id}){
        return(
            <div style = {(id <= rating ? {color: "orange"} : {color: "black"})} onClick = {() => {setRating(id)}} className="fa fa-star ratingStar"></div>
        )
      }

    return (popupState) ? (
        <div className="popup">
            <div className="popup-inner">
                <img className="close-popup" src={close} onClick = {() => setPopupState(false)}></img>
                <h1 className="popupTitle">{mItem.name}</h1>
                <h2 className="ratingTitle">Add your own review</h2>
                <div className="rating-section">
                    <div className="starSection">
                        <div>
                            <Star rating = {rating} setRating = {setRating}  id = {1}></Star>
                            <Star rating = {rating} setRating = {setRating}  id = {2}></Star>
                            <Star rating = {rating} setRating = {setRating}  id = {3}></Star>
                            <Star rating = {rating} setRating = {setRating}  id = {4}></Star>
                            <Star rating = {rating} setRating = {setRating}  id = {5}></Star>
                        </div>
                        <input className="ratingNameInput" type="text" placeholder="Name (optional)"></input>
                        <button className="ratingSubmitBtn">Submit</button>
                    </div>
                    <textarea name="content" cols="40" rows="10" maxLength="10000" placeholder="Add a review to this menu item" className="review-input"></textarea>
                </div>
                <h2 className="ratingTitle">Reviews</h2>
            </div>
        </div>
    ) : "";
}        