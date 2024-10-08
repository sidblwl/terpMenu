import '../App.css'
import React, { useState } from "react";
import close from "../assets/close.png";
import ErrorMessage from './ErrorMessage';


export default function RatingMenu({setSubmitState, popupState, setPopupState, mItem, hall, station}){
    const [rating, setRating] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    async function addReview(review, name){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // console.log("menuItem: " + mItem.name)
        // console.log("section: " + station)
        // console.log("diningHall: " + hall)
        // console.log("name: " + name)
        // console.log("date: " + getDate())
        // console.log("rating: " + rating)
        // console.log("text: " +review)
        const raw = JSON.stringify({
            "menuItem": mItem.name,
            "section": station,
            "diningHall": hall,
            "name": name,
            "date": getDate(),
            "rating": rating,
            "text": review,
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        const response = await fetch("https://seal-app-vpwsv.ondigitalocean.app/review", requestOptions)
        mItem.reviews.push({
            "menuItem": mItem.name,
            "section": station,
            "diningHall": hall,
            "name": name,
            "date": getDate(),
            "rating": rating,
            "text": review,
            })

            let ratingSum = 0
            let numRatings = 0
            mItem.reviews.forEach(review => {
                ratingSum += review.rating;
                numRatings++;
            })
            let newRating = ratingSum/numRatings
            mItem.rating = newRating
            setSubmitState(true)
            setPopupState(false)
    }

    function RatingStar({id}){
        return(
            <div style = {(id <= rating ? {color: "orange"} : {color: "black"})} onClick = {() => {setRating(id)}} className="fa fa-star ratingStar"></div>
        )
    }
    
    function Star({id, reviewRating}){
        return(
            <div style = {(id <= reviewRating ? {color: "orange"} : {color: "black"})} className="fa fa-star reviewRatingStar"></div>
        )
    }

    function Review({review}){
        let reviewRating = review["rating"]
        return(
            <div className="reviewCard">
                <div className="reviewInformation">
                    <div className="reviewStars">
                        <Star id = {1} reviewRating={reviewRating}></Star>
                        <Star id = {2} reviewRating={reviewRating}></Star>
                        <Star id = {3} reviewRating={reviewRating}></Star>
                        <Star id = {4} reviewRating={reviewRating}></Star>
                        <Star id = {5} reviewRating={reviewRating}></Star>
                    </div>
                    <p>{review["date"]}</p>
                </div>
                <p className="reviewerName">{review["name"]}</p>
                <div className="reviewText">
                    <p>{review["text"]}</p>
                </div>
            </div>
        )
    }

    function filter(text){
        let bannedWords = ["retard", "a55hole", "aeolus", "ahole", "anal", "analprobe", "anilingus", "anus", "areola", "areole", "arian", "aryan", "ass", "assbang", "assbanged", "assbangs", "asses", "assfuck", "assfucker", "assh0le", "asshat", "assho1e", "ass hole", "assholes", "assmaster", "assmunch", "asswipe", "asswipes", "azazel", "azz", "b1tch", "babe", "babes", "ballsack", "bang", "banger", "barf", "bastard", "bastards", "bawdy", "beaner", "beardedclam", "beastiality", "beatch", "beater", "beaver", "beer", "beeyotch", "beotch", "biatch", "bigtits", "big tits", "bimbo", "bitch", "bitched", "bitches", "bitchy", "blow job", "blow", "blowjob", "blowjobs", "bod", "bodily", "boink", "bollock", "bollocks", "bollok", "bone", "boned", "boner", "boners", "bong", "boob", "boobies", "boobs", "booby", "booger", "bookie", "bootee", "bootie", "booty", "booze", "boozer", "boozy", "bosom", "bosomy", "bowel", "bowels", "bra", "brassiere", "breast", "breasts", "bugger", "bukkake", "bullshit", "bull shit", "bullshits", "bullshitted", "bullturds", "bung", "busty", "butt", "butt fuck", "buttfuck", "buttfucker", "buttfucker", "buttplug", "c.0.c.k", "c.o.c.k.", "c.u.n.t", "c0ck", "c-0-c-k", "caca", "cahone", "cameltoe", "carpetmuncher", "cawk", "cervix", "chinc", "chincs", "chink", "chink", "chode", "chodes", "cl1t", "climax", "clit", "clitoris", "clitorus", "clits", "clitty", "cocain", "cocaine", "cock", "c-o-c-k", "cockblock", "cockholster", "cockknocker", "cocks", "cocksmoker", "cocksucker", "cock sucker", "coital", "commie", "condom", "coon", "coons", "corksucker",  "crack", "cracker", "crackwhore", "crap", "crappy", "cum", "cummin", "cumming", "cumshot", "cumshots", "cumslut", "cumstain", "cunilingus", "cunnilingus", "cunny", "cunt", "cunt", "c-u-n-t", "cuntface", "cunthunter", "cuntlick", "cuntlicker", "cunts", "d0ng", "d0uch3", "d0uche", "d1ck", "d1ld0", "d1ldo", "dago", "dagos", "dammit", "damn", "damned", "damnit", "dawgie-style", "dick", "dickbag", "dickdipper", "dickface", "dickflipper", "dickhead", "dickheads", "dickish", "dick-ish", "dickripper", "dicksipper", "dickweed", "dickwhipper", "dickzipper", "diddle", "dike", "dildo", "dildos", "diligaf", "dillweed", "dimwit", "dingle", "dipship", "doggie-style", "doggy-style", "dong", "doofus", "doosh", "dopey", "douch3", "douche", "douchebag", "douchebags", "douchey", "drunk", "dumass", "dumbass", "dumbasses", "dummy", "dyke", "dykes", "ejaculate", "enlargement", "erect", "erection", "erotic", "essohbee", "extacy", "extasy", "f.u.c.k", "fack", "fag", "fagg", "fagged", "faggit", "faggot", "fagot", "fags", "faig", "faigt", "fannybandit", "fart", "fartknocker", "fat", "felch", "felcher", "felching", "fellate", "fellatio", "feltch", "feltcher", "fisted", "fisting", "fisty", "floozy", "foad", "fondle", "foobar", "foreskin", "freex", "frigg", "frigga", "fubar", "fuck", "f-u-c-k", "fuckass", "fucked", "fucked", "fucker", "fuckface", "fuckin", "fucking", "fucknugget", "fucknut", "fuckoff", "fucks", "fucktard", "fuck-tard", "fuckup", "fuckwad", "fuckwit", "fudgepacker", "fuk", "fvck", "fxck", "gae", "gai", "ganja", "gay", "gays", "gey", "gfy", "ghay", "ghey", "gigolo", "glans", "goatse", "godamn", "godamnit", "goddam", "goddammit", "goddamn", "goldenshower", "gonad", "gonads", "gook", "gooks", "gringo", "gspot", "g-spot", "gtfo", "guido", "h0m0", "h0mo", "handjob", "hard on", "he11", "hebe", "heeb", "hell", "hemp", "heroin", "herp", "herpes", "herpy", "hitler", "hiv", "hobag", "hom0", "homey", "homo", "homoey", "honky", "hooch", "hookah", "hooker", "hoor", "hootch", "hooter", "hooters", "horny", "hump", "humped", "humping", "hussy", "hymen", "inbred", "incest", "injun", "j3rk0ff", "jackass", "jackhole", "jackoff", "jap", "japs", "jerk", "jerk0ff", "jerked", "jerkoff", "jism", "jiz", "jizm", "jizz", "jizzed", "junkie", "junky", "kike", "kikes", "kill", "kinky", "kkk", "klan", "knobend", "kooch", "kooches", "kootch", "kraut", "kyke", "labia", "lech", "leper", "lesbians", "lesbo", "lesbos", "lez", "lezbian", "lezbians", "lezbo", "lezbos", "lezzie", "lezzies", "lezzy", "lmao", "lmfao", "loin", "loins", "lube", "lusty", "mams", "massa", "masterbate", "masterbating", "masterbation", "masturbate", "masturbating", "masturbation", "maxi", "menses", "menstruate", "menstruation", "meth", "m-fucking", "mofo", "molest", "moolie", "moron", "motherfucka", "motherfucker", "motherfucking", "mtherfucker", "mthrfucker", "mthrfucking", "muff", "muffdiver", "murder", "muthafuckaz", "muthafucker", "mutherfucker", "mutherfucking", "muthrfucking", "nad", "nads", "naked", "napalm", "nappy", "nazi", "nazism", "negro", "nigga", "niggah", "niggas", "niggaz", "nigger", "nigger", "niggers", "niggle", "niglet", "nimrod", "ninny", "nipple", "nooky", "nympho", "opiate", "opium", "oral", "orally", "organ", "orgasm", "orgasmic", "orgies", "orgy", "ovary", "ovum", "ovums", "p.u.s.s.y.", "paddy", "paki", "pantie", "panties", "panty", "pastie", "pasty", "pcp", "pecker", "pedo", "pedophile", "pedophilia", "pedophiliac", "pee", "peepee", "penetrate", "penetration", "penial", "penile", "penis", "perversion", "peyote", "phalli", "phallic", "phuck", "pillowbiter", "pimp", "pinko", "piss", "pissed", "pissoff", "piss-off", "pms", "polack", "pollock", "poon", "poontang", "porn", "porno", "pornography", "pot", "potty", "prick", "prig", "prostitute", "prude", "pube", "pubic", "pubis", "punkass", "punky", "puss", "pussies", "pussy", "pussypounder", "puto", "queaf", "queef", "queef", "queero", "queers", "quicky", "quim", "racy", "rape", "raped", "raper", "rapist", "raunch", "rectal", "rectum", "rectus", "reefer", "reetard", "reich", "retard", "retarded", "revue", "rimjob", "ritard", "rtard", "r-tard", "rum", "rump", "rumprammer", "ruski", "s.h.i.t.", "s.o.b.", "s0b", "sadism", "sadist", "scag", "scantily", "schizo", "schlong", "screw", "screwed", "scrog", "scrot", "scrote", "scrotum", "scrud", "seaman", "seamen","semen", "sex", "sexual", "sh1t", "s-h-1-t", "shamedame", "shit", "s-h-i-t", "shite", "shiteater", "shitface", "shithead", "shithole", "shithouse", "shits", "shitt", "shitted", "shitter", "shitty", "shiz", "sissy", "skag", "skank", "slave", "sleaze", "sleazy", "slut", "slutdumper", "slutkiss", "sluts", "smegma", "smut", "smutty", "snatch", "sniper", "snuff", "s-o-b", "sodom", "souse", "soused", "sperm", "spic", "spick", "spik", "spiks", "spooge", "spunk", "steamy", "stfu", "stiffy", "suck", "sucked", "sucking", "sumofabiatch", "t1t", "tampon", "tard", "tawdry", "teabagging", "teat", "terd", "teste", "testee", "testes", "testicle", "testis", "thrust", "thug", "tinkle", "tit", "titfuck", "titi", "tits", "tittiefucker", "titties", "titty", "tittyfuck", "tittyfucker", "toke", "toots", "tramp", "transsexual", "trashy", "tubgirl", "turd", "tush", "twat", "twats", "ugly", "undies", "unwed", "urinal", "urine", "uterus", "uzi", "vag", "vagina", "valium", "viagra", "virgin", "vixen", "vodka", "vomit", "voyeur", "vulgar", "vulva", "wad", "wang", "wank", "wanker", "wazoo", "wedgie", "weed", "weenie", "weewee", "weiner", "weirdo", "wench", "wetback", "wh0re", "wh0reface", "whitey", "whiz", "whoralicious", "whore", "whorealicious", "whored", "whoreface", "whorehopper", "whorehouse", "whores", "whoring", "wigger", "womb", "woody", "wop", "wtf", "x-rated", "xxx", "yeasty", "yobbo", "zoophile", "pervy"]
        text = text.toLowerCase();
        text = text.split(" ");
        let ban = false;
        text.forEach((word) => {
            word = word.trim();
            if(bannedWords.includes(word)){
                ban = true;
            }
        })

        if(ban){
            return false;
        }
        return true;
    }

    return (popupState) ? (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <div className = "closeButtonContainer">
                        <img className="close-popup" src={close} onClick = {() => setPopupState(false)}></img>
                    </div>
                    <h1 className="popupTitle">{mItem.name}</h1>
                    <h2 className="ratingTitle">Add your own review</h2>
                    <ErrorMessage errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}></ErrorMessage>
                    <div className="ratingSection">
                        <div className="starSection">
                            <div>
                                <RatingStar rating = {rating} setRating = {setRating}  id = {1}></RatingStar>
                                <RatingStar rating = {rating} setRating = {setRating}  id = {2}></RatingStar>
                                <RatingStar rating = {rating} setRating = {setRating}  id = {3}></RatingStar>
                                <RatingStar rating = {rating} setRating = {setRating}  id = {4}></RatingStar>
                                <RatingStar rating = {rating} setRating = {setRating}  id = {5}></RatingStar>
                            </div>
                            <div className="nameSubmitSection">
                                <input id = "nameInput" className="ratingNameInput" type="text" placeholder="Name (optional)"></input>
                                <button className="ratingSubmitBtn" onClick={() => {
                                    let text = document.getElementById("review-input").value
                                    text = text.trim() 
                                    let name = document.getElementById("nameInput").value
                                    name = name.trim()
                                    if(name == ""){
                                        name = "Anonymous";
                                    }
                                    
                                    if(rating == 0){
                                        setErrorMessage("Please select a star rating.")
                                    }
                                    else if(text == ""){
                                        setErrorMessage("You must add text to your review.")
                                    }
                                    else if(text.length < 10){
                                        setErrorMessage("Review must be at least 10 characters.")
                                    }
                                    else if(name.length > 20){
                                        setErrorMessage("Please use a shorter name.")
                                    }
                                    else{
                                        if(filter(text) && filter(name)){
                                            addReview(text, name)
                                        }
                                        else{
                                            setErrorMessage("Please keep your review appropriate.");
                                        }
                                    }                            
                                }}>Submit</button>
                            </div>
                        </div>
                        <textarea name="content" cols="40" id="review-input" rows="10" maxLength="10000" placeholder="Add a review to this menu item" className="review-input"></textarea>
                    </div>
                    <h2 className="reviewsHeading">Reviews</h2>
                    <div className="reviewsContainer">
                    {mItem.reviews.map((review) => (
                        <Review review={review}></Review>
                    ))}   
                    </div>
                </div>
            </div>
        </>
    ) : "";
}     

