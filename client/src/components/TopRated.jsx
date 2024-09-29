import MenuCard from "./MenuCard";
import { useEffect } from "react";

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
    //without the dummVal, the topRated.map function does not run at all, causing the No items to never render.
    //May not be needed once every menu has at least one item with a review 
    let topRated = ["dummyVal"];
    let mapped = false;
    //reset topRated if any of these change
    useEffect(()=>{
        topRated = [];
    }, [meal, menulist, filters])


    //generate 5 items
    for(let i=0; i<3; i++){
        let currMaxItem = {rating: 0}
        //for each mealtime
        Object.keys(menulist).forEach(mealTime => {
            if(mealTime == meal){
                Object.keys(menulist[mealTime]).forEach(section => {
                    
                    //idk what this if statement is doing but it breaks everything if you remove it
                    if(section != "Top Rated"){
                        menulist[mealTime][section].forEach(item => {
                            //console.log(item);
                            if(item.rating > currMaxItem.rating && !topRated.includes(item)){
                                currMaxItem = item;

                                //add section to item for review information
                                currMaxItem["section"] = section;
                            }
                        });
                    }
                });
            }
        });
        if(currMaxItem.rating != 0){
            topRated.push(currMaxItem)
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
                    if(item != "dummyVal"){
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
                            return <MenuCard mItem = {item} hall = {diningHall} station = {item.section} submitState = {submitState} setSubmitState = {setSubmitState}></MenuCard>
                        }
                        else{
                            if(item === topRated[topRated.length -1] && !mapped){
                                return <MenuCard mItem={noSuchItems["No Items"][0]} hall={null} station={null}></MenuCard>
                            }
                        }
                    }
                    else if(item == "dummyVal" && topRated.length == 1){
                        return <MenuCard mItem={noSuchItems["No Items"][0]} hall={null} station={null}></MenuCard>
                    }
                })}  
            </div> 
        </div>
        </>     
    )
}


