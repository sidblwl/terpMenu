import '../App.css'
import React, { useState } from "react";

export default function FilterMenu({filter, setFilter}){

    return(
        <>
            <button style = {(filter == "Show All" ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter("Show All")}}>Show All</button>
            <button style = {(filter == "vegetarian" ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter("vegetarian")}}>Vegetarian</button>
            <button style = {(filter == "vegan" ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter("vegan")}}>Vegan</button>
            <button style = {(filter == "contains gluten" ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter("contains gluten")}}>Gluten Free</button>
            <button style = {(filter == "HalalFriendly" ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter("HalalFriendly")}}>Halal</button>
        </>
    )
}