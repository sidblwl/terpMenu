import '../App.css'
export default function ErrorMessage({errorMessage}){
    return (errorMessage != "") ? 
        (
        <p className = "errorMessage">{errorMessage}</p>

        ): null
}