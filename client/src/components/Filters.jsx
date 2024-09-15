import close from "../assets/close.png";
import '../App.css'

const allFilters = ["Vegetarian", "Vegan", "Halal", "Dairy Free", "Gluten Free", "No Soy", "No Egg", "No Fish", "No Nuts", "No Shellfish", "No Sesame", "Smartchoice", "Locally Grown"]

function convertFilterName(filterName){
    if(filterName == "Smartchoice"){
        return "smart.gif"
    } else if(filterName == "Locally Grown"){
        return "local.gif"
    } else if(filterName.includes("No") || filterName.includes("Free")){
        return filterName.toLowerCase()
    } else{
        return filterName.toLowerCase() + ".gif"
    }
}

export default function Filters({filterState, setFilterState, filters, setFilters, setSubmitState}){
    return (filterState) ? (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <div className = "closeButtonContainer">
                        <img className="close-popup" src={close} onClick = {() => setFilterState(false)}></img>
                    </div>
                    <h1 className="popupTitle">Filters:</h1>
                    <FilterButtons filters = {filters} setFilters = {setFilters} setSubmitState = {setSubmitState}></FilterButtons>
                    <button className = "filterButton" onClick = {() => {
                        setFilters([])
                    }}>Reset Filters</button>
                </div>
            </div>
        </>
    ): <button className = "filtersButton" onClick={()=> {setFilterState(true)}}><span>Filters</span></button>
}

function FilterButtons({filters, setFilters, setSubmitState}){
    return(
        <>
            <div className = "filterButtonsContainer">
                {allFilters.map(filterName => 
                    <FilterButton setSubmitState = {setSubmitState} filterName = {filterName} filters = {filters} setFilters = {setFilters}></FilterButton>
                )}
            </div>
        </>
    )
}


function FilterButton({filterName, filters, setFilters, setSubmitState}){
    return(
        <button style = {filters.includes(convertFilterName(filterName)) ? {backgroundColor: "#f07585"} : {backgroundColor: "gainsboro"}} className = "filterButton" onClick = {() => {
            let tempFilters = [];
            setSubmitState(false)
            let filterNameAdjusted = convertFilterName(filterName)
            if(filters.includes(filterNameAdjusted)){
                filters.splice(filters.indexOf(filterNameAdjusted), 1)
                tempFilters = [...filters]
                setFilters(tempFilters)
            }
            else{
                filters.push(filterNameAdjusted)
                tempFilters = [...filters]
                setFilters(tempFilters)
            }
        }}>{filterName}</button>
    )
}
