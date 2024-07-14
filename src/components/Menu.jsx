import MenuCard from "./MenuCard";
export default function Menu({section, menulist, filters, mapped, submitState, setSubmitState, diningHall}){
    return(
        <div className="menu">
            {menulist[section].map((menuItem) => {
                let validItem = true;
                if(filters.length > 0){
                filters.forEach((filter) =>{
                    if(!menuItem.tags.includes(filter)){
                    validItem = false;
                    }
                })
                }
                if(validItem){
                mapped = true;
                return <MenuCard submitState = {submitState} setSubmitState = {setSubmitState} mItem={menuItem} hall={diningHall} section={section}></MenuCard>
                }
                else{
                if(menuItem === menulist[section][menulist[section].length -1] && !mapped){
                    let noSuchItems =  {
                    "name": "No items matched your search",
                    "tags": [],
                    "image": "none.jpg"
                    }
                    return <MenuCard mItem={noSuchItems} hall={diningHall} section={section}></MenuCard>
                }
                }
            })}
            </div>
    )
}