export default function SearchDropdown({menulist, meal, value}){

    let displayedItems = [];
    Object.keys(menulist[meal]).map((station) => ((
        menulist[meal][station].filter((mItem) => (mItem.name.toLowerCase().includes(value) && value != "")).forEach((mItem) => {
            displayedItems.push(mItem)
        })
    )))



    return (displayedItems.length != 0) ? (
        displayedItems.map((mItem) => (
            <div className="search_option_container">
                <p className="search_option">{mItem.name}</p>
                <div className="menuItemTagHolder">
                    {mItem.tags.map((tag) => (
                        <img src={tag}></img>
                    ))}
                </div>
            </div>
        ))
    ):
    <div className="search_option_container">
        <p className="search_option">No items matched your search</p>
    </div>
}