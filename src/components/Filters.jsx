import close from "../assets/close.png";
const allFilters = ["Vegetarian", "Contains Dairy", "Contains Gluten", "Contains Soy", "Contains Egg", "Halal Friendly", "Probability Stasis", "Vegan", "Contains Fish", "Smartchoice", "Contains Nuts", "Contains Shellfish", "Contains Sesame", "Locally Grown"]



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
    ): <button className = "filterButton" onClick={()=> {setFilterState(true)}}>Set Filters</button>
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
        <button style = {filters.includes(filterName.toLowerCase()) ? {backgroundColor: "#f07585"} : {backgroundColor: "gainsboro"}} className = "filterButton" onClick = {() => {
            let tempFilters = [];
            setSubmitState(false)
            if(filters.includes(filterName.toLowerCase())){
                filters.splice(filters.indexOf(filterName.toLowerCase()), 1)
                tempFilters = [...filters]
                setFilters(tempFilters)
            }
            else{
                filters.push(filterName.toLowerCase())
                tempFilters = [...filters]
                setFilters(tempFilters)
            }
        }}>{filterName}</button>
    )
}
