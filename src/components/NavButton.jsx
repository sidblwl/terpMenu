
// Dining hall button in the top navbar
// If the hall button being generated is that same as the activeTab, style it dark red
// If the hall button is not the active tab, run setup code to switch into the new dining hall
export default function NavButton({currentHall, setMenulist, setSection, setDiningHall, controller, activeTab, setActiveSection, setActiveTab}){
    return(
        <button style = {(currentHall.id == activeTab ? {backgroundColor: "darkred"} : {backgroundColor: "red"})} className = "navButton" onClick={() => {
         if(activeTab != currentHall.id){
           setActiveSection(1);
           setActiveTab(currentHall.id); 
           controller.abort()
           setDiningHall(currentHall.id); 
         }      
       }}>{currentHall.name}</button>
     )
   }