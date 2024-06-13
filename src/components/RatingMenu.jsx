import '../App.css'
import React, { useState } from "react";
import close from "../assets/close.png";


export default function RatingMenu({popupState, setPopupState, rating, setRating, mItem}){
    function RatingStar({id}){
        return(
            <div style = {(id <= rating ? {color: "orange"} : {color: "black"})} onClick = {() => {setRating(id)}} className="fa fa-star ratingStar"></div>
        )
      }
    
      function Star({id, reviewRating}){
        return(
            <div style = {(id <= reviewRating ? {color: "orange"} : {color: "black"})} className="fa fa-star reviewRatingStar"></div>
        )
      }

      function Review({review}){
        let reviewRating = review["rating"]
        return(
            <div className="reviewCard">
                <div className="reviewInformation">
                    <Star id = {1} reviewRating={reviewRating}></Star>
                    <Star id = {2} reviewRating={reviewRating}></Star>
                    <Star id = {3} reviewRating={reviewRating}></Star>
                    <Star id = {4} reviewRating={reviewRating}></Star>
                    <Star id = {5} reviewRating={reviewRating}></Star>
                    <p>{review["name"]}</p>
                    <p>{review["date"]}</p>
                </div>
                <div className="reviewText">
                    <p>{review["text"]}</p>
                </div>
            </div>
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
                            <RatingStar rating = {rating} setRating = {setRating}  id = {1}></RatingStar>
                            <RatingStar rating = {rating} setRating = {setRating}  id = {2}></RatingStar>
                            <RatingStar rating = {rating} setRating = {setRating}  id = {3}></RatingStar>
                            <RatingStar rating = {rating} setRating = {setRating}  id = {4}></RatingStar>
                            <RatingStar rating = {rating} setRating = {setRating}  id = {5}></RatingStar>
                        </div>
                        <input className="ratingNameInput" type="text" placeholder="Name (optional)"></input>
                        <button className="ratingSubmitBtn" onClick={() => alert(document.getElementById("review-input").value)}>Submit</button>
                    </div>
                    <textarea name="content" cols="40" id="review-input" rows="10" maxLength="10000" placeholder="Add a review to this menu item" className="review-input"></textarea>
                </div>
                <h2 className="ratingTitle">Reviews</h2>
                {/* <h3>Info</h3>
                <h3>Review</h3> */}
                <div className="reviewsContainer">
                {mItem.reviews.map((review) => (
                    <Review review={review}></Review>
                ))}   
                </div>
            </div>
        </div>
    ) : "";
}        