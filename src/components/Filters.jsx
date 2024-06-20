const allFilters = ["Vegetarian", "Contains Dairy", "Contains Gluten", "Contains Soy", "Contains Egg", "Halal Friendly", "Probability Stasis", "Vegan", "Contains Fish", "Smartchoice", "Contains Nuts", "Contains Shellfish", "Contains Sesame", "Locally Grown"]
const selected = []

export default function Filters({filters, setFilters, setSubmitState}){


    return(
        <>
            <h3>Filters:</h3>
            {allFilters.map(filterName => 
                <FilterButton setSubmitState = {setSubmitState} filterName = {filterName} filters = {filters} setFilters = {setFilters}></FilterButton>
            )}
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
