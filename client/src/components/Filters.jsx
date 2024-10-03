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
                    <div className = "filterTop">
                        <h1 className="filterTitle">Filters</h1>
                    </div>
                    <img className="filterCloseButton" src={close} onClick = {() => setFilterState(false)}></img>
                    <div className="filterOptions">
                        <p style={{
                                    color: filters.length === allFilters.length ? '#00000042' : '#007BC7',
                                    cursor: filters.length === allFilters.length ? 'not-allowed' : 'pointer'
                                  }} onClick = {() => {setFilters(allFilters.map(filter => convertFilterName(filter)))}}>Select All</p>
                        <p style={{
                                    color: filters.length === 0 ? '#00000042' : '#007BC7',
                                    cursor: filters.length === 0 ? 'not-allowed' : 'pointer'
                                  }} onClick = {() => {setFilters([])}}>Reset</p>
                    </div>
                    <FilterButtons filters = {filters} setFilters = {setFilters} setSubmitState = {setSubmitState}></FilterButtons>
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
    const handleFilterClick = () => {
        setSubmitState(false);
        let filterNameAdjusted = convertFilterName(filterName);
        
        if (filters.includes(filterNameAdjusted)) {
            setFilters(filters.filter(f => f !== filterNameAdjusted)); // Remove filter
        } else {
            setFilters([...filters, filterNameAdjusted]); // Add filter
        }
    };
    
    return (
        <div className="filterButton" onClick={handleFilterClick}>
            <input 
                className="checkbox" 
                checked={filters.includes(convertFilterName(filterName))} 
                type="checkbox"
                onChange={() => {}}
            />
            {filterName}
        </div>
    );
}
