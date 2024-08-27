import '../App.css'
import React, { useState } from "react";

function HallSection({section, change, activeSection, setActiveSection}){
    return (section.name != "Favorites") ? (
       <button style={section.key == activeSection ? {backgroundColor: "lightgray"} : {backgroundColor: "white"}} className="sidebarBtn" onClick={() => {setActiveSection(section.key); change(section.name)}}>{section.name}</button>
    ) : ""
}

export default function HallSections({mobile, menulist, change, activeSection, setActiveSection, meal}){
    let sections = []
    let counter = 1
    Object.keys(menulist[meal]).forEach((section) => {
        sections.push({
            "name": section,
            "key": counter
        })
        counter++;
    })
    return !mobile? (
        <>
            {sections.map((section) => (
                <HallSection section = {section} change = {change} activeSection = {activeSection} setActiveSection = {setActiveSection}></HallSection>
            ))}
        </>
    ): (sections.map((section) => (
        <option className = "mobileSectionOption">{section.name}</option>
    )))
}