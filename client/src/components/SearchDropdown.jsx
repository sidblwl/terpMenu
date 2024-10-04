import "../App.css"

export default function SearchDropdown({menulist, meal, value, setValue}){

    let displayedItems = [];
    Object.keys(menulist[meal]).map((station) => ((
        menulist[meal][station].filter((mItem) => (mItem.name.toLowerCase().includes(value.toLowerCase()) && value != "")).forEach((mItem) => {
            displayedItems.push(mItem)
        })
    )))

    const handleScroll = (itemName) => {

        const targetElement = document.querySelector(`[data-item="${itemName}"]`);
        if (targetElement) {
            const yOffset = -100; // The offset above the element
            const yPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
            window.scrollTo({ top: yPosition, behavior: "smooth" });
            setValue("");
        }
    };

    return (displayedItems.length != 0) ? (
        displayedItems.map((mItem) => (
            <div className="search_option_container" onClick={() => handleScroll(mItem.name)}>
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