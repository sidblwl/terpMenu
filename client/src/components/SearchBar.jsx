import React, { useState, useEffect, useRef } from "react";
import '../App.css';
import SearchDropdown from "./SearchDropdown";

export default function SearchBar({ menulist, meal }) {
  let displayedItems = [];
  
  const [value, setValue] = useState("");
  const searchRef = useRef(null); // Create a ref for the entire search bar area

  const onChange = (e) => {
    setValue(e.target.value);
    displayedItems = [];
  };

  // Function to detect clicks outside the search bar and dropdown
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setValue(""); // Clear the search when clicking outside
    }
  };

  // Add and remove event listeners for clicks outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={searchRef} className="search">
        <div>
          <input 
            className="searchbar" 
            type="text" 
            onChange={onChange} 
            value={value} 
            placeholder="Search" 
          />
        </div>
        <div className={value === "" ? "search_dropdown_inactive" : "search_dropdown"}>
          <SearchDropdown menulist={menulist} meal={meal} setValue = {setValue} value={value} />
        </div>
      </div>
    </>
  );
}
