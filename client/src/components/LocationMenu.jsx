import '../App.css'

export default function LocationMenu({diningHall, locationMenu}){
    return locationMenu ? (
        <div className = "locationMenu">
            <img className="floorMap" src={`public/${diningHall}map.png`}></img>
        </div>
    ): ""
}