import '../App.css'
import React, { useState } from "react";

export default function FilterMenu({}){
    const [filter, setFilter] = useState(0)

    return(
        <>
            <button style = {(filter == 0 ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter(0)}}>Show All</button>
            <button style = {(filter == 1 ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter(1)}}>Vegetarian</button>
            <button style = {(filter == 2 ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter(2)}}>Vegan</button>
            <button style = {(filter == 3 ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter(3)}}>Gluten Free</button>
            <button style = {(filter == 4 ? {backgroundColor: "#f07585"} : {backgroundColor: "#dedede"})} onClick = {() => {setFilter(4)}}>Halal</button>
        </>
    )
}