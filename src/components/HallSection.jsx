import '../App.css'
import React, { useState } from "react";

const ySections = ["Breakfast", "Good Food Gluten Free", "Sprouts", "Terp Comfort", "Salad Bar", "Maryland Bakery", "Mezza", "Chef's Corner", "Joe's Grill", "Terp Grain Bowl", "Woks"];
const northSections = ["Smash Burger", "Harvest Greens", "Harvest Vegan-LUNCH", "Purple Zone", "Purple Zone-ALL DAY",  "Smash Deli", "Ciao All-Day", "Ciao Chilled Salads", "Ciao Pizza", "Ciao Pasta", "Ciao Entree", "Chef's Table Mains", "Chef's Table Extras",  "Chef's Table Vegetarian", "Halal at Chef's Table", "Harvest Entree", "Soups", "Scoops Homemade Ice Cream"];
const southSections = ["Broiler Works", "Grill Works", "Chef's Table", "Salad Bar", "Waffle Donut Bagel Bar", "Purple Zone", "Roaster", "Pasta", "Pizza", "Soup Du Jour", "Deli+", "Deli", "Roma Vegan Salads and Panini", "Vegan Desserts", "Mongolian Grill", "Mongolian Grill Made to Ord"];
const sections = [northSections, ySections, southSections]

export default function HallSection({hall, change}){
    return(
        <>
            {sections[hall].map((section) => (
                <button className="sidebarBtn" onClick={() => change(section)}>{section}</button>
            ))}
        </>
    )
}