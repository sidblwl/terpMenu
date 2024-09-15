import { Routes, Route, useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../App.css'
import SearchDropdown from "./SearchDropdown";

   export default function SearchBar({menulist, meal}){

    let displayedItems = [];
    
    const [value, setValue] = useState("")
    const onChange = (e) => {
        setValue(e.target.value)
        displayedItems = [];
    }

    return(
        <>
            <div className="search">
                <div>
                    <input className="searchbar" type="text" onChange={onChange} onBlur = {() => {setValue("")}} value={value} placeholder="Search"></input>
                </div>
                <div className = {value == "" ? "search_dropdown_inactive" : "search_dropdown"}>
                    <SearchDropdown menulist = {menulist} meal = {meal} value = {value}></SearchDropdown>
                </div>
            </div>
        </>
     )
   }