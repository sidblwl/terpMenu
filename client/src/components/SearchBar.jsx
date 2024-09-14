import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../App.css'

   export default function SearchBar({menulist, meal}){
    
    const [value, setValue] = useState("")
    const onChange = (e) => {
        console.log(e.target.value.toLowerCase())
        setValue(e.target.value.toLowerCase())
    }

    return(
        <>
            <div className="search">
                <div>
                    <input className="searchbar" type="text" onChange={onChange} value={value} placeholder="Search"></input>
                </div>
                <div className = {value == "" ? "search_dropdown_inactive" : "search_dropdown"}>
                    {Object.keys(menulist[meal]).map((station) => {
                        return(
                            menulist[meal][station].filter((mItem) => (mItem.name.toLowerCase().includes(value) && value != "")).map((mItem) => {
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

                                return (
                                    <div className="search_option_container">
                                        <p className="search_option">{mItem.name}</p>
                                        <div className="menuItemTagHolder">
                                            {mItem.tags.map((tag) => (
                                                <img src={tag}></img>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })
                        )
                    })}
                </div>
            </div>
        </>
     )
   }