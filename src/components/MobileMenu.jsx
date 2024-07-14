
import Menu from "./Menu"
import MenuCard from "./MenuCard"
function MobileMenuSection({section, menulist, filters, mapped, submitState, setSubmitState, diningHall}){
    console.log(filters)
    return(
        <>
            <h1 className="sectionTitle">{section}</h1>
            <Menu section = {section} menulist = {menulist} filters = {filters} mapped = {mapped} submitState = {submitState} setSubmitState = {setSubmitState} diningHall = {diningHall}></Menu>
        </>
    )
}

export default function MobileMenu({menulist, diningHall, filters, submitState, mapped, setSubmitState}){
    let sections = Object.keys(menulist);
    return(
        <>
            {sections.map((section) => (
                <MobileMenuSection section = {section} menulist = {menulist} filters = {filters} diningHall = {diningHall} submitState = {submitState} mapped = {mapped} setSubmitState = {setSubmitState}></MobileMenuSection>
            ))}
        </>
    )
}