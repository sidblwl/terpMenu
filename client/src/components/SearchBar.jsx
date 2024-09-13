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
                <div className="search_dropdown">
                    {Object.keys(menulist[meal]).map((station) => {
                        return(
                            menulist[meal][station].filter((mItem) => (mItem.name.toLowerCase().includes(value) && value != "")).map((mItem) => {
                                console.log(mItem.name)
                                return (
                                    <p>{mItem.name}</p>
                                )
                            })
                        )
                    })}
                </div>
            </div>
        </>
     )
   }