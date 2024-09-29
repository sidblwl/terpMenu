import MenuCard from "./MenuCard";
import { useState, useEffect } from "react";

const noSuchItems =  {
    "No Items": [
      {
        "name": "No items matched your search",
        "tags": [],
        "image": "none.jpg"
      }
    ],
    "Top Rated": [
      {
        "name": "No items matched your search",
        "tags": [],
        "image": "none.jpg"
      }
    ]
  }

export default function TopRated({menulist, meal, setSubmitState, submitState, diningHall, filters}){
    const [topRated, setTopRated] = useState([]);
    let mapped = false;
    //reset topRated if any of these change
    useEffect(()=>{
        mapped = false;
        setTopRated([]);
    }, [meal, menulist, filters])

    //generate 5 items
    for(let i=0; i<5; i++){
        let currMaxItem = {rating: 0}
        //for each mealtime
        Object.keys(menulist).forEach(mealTime => {
            if(mealTime == meal){
                Object.keys(menulist[mealTime]).forEach(section => {
                    if(section != "Top Rated"){
                        menulist[mealTime][section].forEach(item => {
                            //console.log(item);
                            if(item.rating > currMaxItem.rating && !topRated.includes(item)){
                                currMaxItem = item;
                            }
                        });
                    }
                });
            }
        });
        if(currMaxItem.rating != 0){
            topRated.push(currMaxItem)
            setTopRated([...topRated]);
        }
    }
    return(
        <>
        <div className = "stationCard">
            <div className="stationName">
                <h1>Top Rated</h1>
            </div>
            <div className = "menu">
                {topRated.map((item)=>{
                    let validItem = true;
                    if(filters.length > 0){
                        filters.forEach((filter) =>{
                        if(filter.includes("no")){
                            let filterAdjustment = filter.substring(3) + ".gif"
                            if(item.tags.includes(filterAdjustment)){
                            validItem = false;
                            }
                        } else if(filter.includes("free")){
                            let filterAdjustment = filter.split(" ")[0] + ".gif"
                            if(item.tags.includes(filterAdjustment)){
                            validItem = false;
                            }
                        } else if(!item.tags.includes(filter)){
                            validItem = false;
                        }
                        })
                    }
                    if(validItem){
                        mapped = true;
                        return <MenuCard mItem = {item} hall = {item.hall} station = {item.station} submitState = {submitState} setSubmitState = {setSubmitState}></MenuCard>
                    }
                    else{
                        if(item === topRated[topRated.length -1] && !mapped){
                            return <MenuCard mItem={noSuchItems["No Items"][0]} hall={null} station={null}></MenuCard>
                        }
                    }
                })}  
            </div> 
        </div>
        </>     
    )
}


