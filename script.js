const url = "https://api.github.com/users/";

const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const notFound = document.querySelector(".noresult");

btn.addEventListener("click", ()=>{
    if(input.value !== ""){
        getUserData(url + input.value);
    }
})

input.addEventListener("keydown", (event)=>{
    if(event.key == 'Enter'){
        if(input.value != ""){
            getUserData(url + input.value);
        }
    }
})

async function getUserData(gituser){
    const response = await fetch(gituser);
    const data = await response.json();
    if(!data){
        throw data;
    }
    updateProfile(data);
}

let dateSegment;

function updateProfile(data) {
    notFound.style.scale = 0;
    if (data.message !== "Not Found") {
        function checkNull(apiItem, domItem) {
            if (apiItem === "" || apiItem === null) {
                domItem.style.opacity = 0.5;
                domItem.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else {
                return true;
            }
        }
        const userImage = document.querySelector("#userImage");
        const name = document.querySelector("#name");
        const username = document.querySelector("#userName");
        const date = document.querySelector("#date");
        const repos = document.querySelector("#repos");
        const followers = document.querySelector("#followers");
        const following = document.querySelector("#following");
        const profileBio = document.querySelector("#profile-bio");
        const location = document.querySelector("#location");
        const website = document.querySelector("#website");
        const twitter = document.querySelector("#twitter");
        const company = document.querySelector("#company");
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        userImage.src = `${data.avatar_url}`;
        name.innerText = data?.name;
        username.innerText = `@${data?.login}`;
        username.href = data?.html_url;
        dateSegment = data?.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;
        profileBio.innerText = (data?.bio === null) ? "This Profile has no Bio" : data?.bio;
        followers.innerText = data?.followers;
        followers.href = data?.followers_url;
        following.innerText = data?.following;
        following.href = data?.following_url;
        repos.innerText = data?.public_repos;
        repos.href = data?.repos_url;
        
        location.innerText = checkNull(data?.location, location) ? data?.location : "Not Available";

        website.innerText = checkNull(data?.blog, website) ? data?.blog : "Not Available";
        website.href = checkNull(data?.blog, website) ? data?.blog : "#";

        twitter.innerText = checkNull(data?.twitter_username, twitter) ? data?.twitter_username : "Not Available";
        twitter.href = checkNull(data?.twitter_username, twitter) ? `https://twitter.com/${data?.twitter_username}` : "#";

        company.innerText = checkNull(data?.company, company) ? data?.company : "Not Available";
    }

    else {
        notFound.style.scale = 1;
        setTimeout(() => {
            notFound.style.scale = 0;
        }, 1600);
    }
}

const theme = document.querySelector("#theme");
const themetext = document.querySelector("#themeText");
const themeIcon = document.querySelector("#themeIcon");
const style = document.documentElement.style;
let darkMode = false;

theme.addEventListener("click", ()=>{
    if(darkMode === false){
        DarkMode();
    }
    else{
        LightMode();
    }
})

function DarkMode(){
    style.setProperty("--lm-bg", "#141D2F");
    style.setProperty("--lm-bg-content", "#1E2A47");
    style.setProperty("--lm-text", "white");
    style.setProperty("--lm-text-alt", "white");
    style.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    themetext.innerText = "LIGHT";
    themeIcon.src = "./Images/sun-icon.svg";
    style.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function LightMode() {
    style.setProperty("--lm-bg", "#F6F8FF");
    style.setProperty("--lm-bg-content", "#FEFEFE");
    style.setProperty("--lm-text", "#4B6A9B");
    style.setProperty("--lm-text-alt", "#2B3442");
    style.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    themetext.innerText = "DARK";
    themeIcon.src = "./Images/moon-icon.svg";
    style.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}


// checking if dark mode is on 
const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Check if there is a value for "dark-mode" in localStorage
if (localStorage.getItem("dark-mode") === null) {
    // If there is no value for "dark-mode" in localStorage, check the device preference
    if (prefersDarkMode) {
        // If the device preference is for dark mode, apply dark mode
        DarkMode();
    } else {
        LightMode();
    }
} else {
    // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
    if (localStorage.getItem("dark-mode") === "true") {
        // If the value is "true", apply dark mode properties
        DarkMode();
    } else {
        LightMode();
    }
}

getUserData(url + "Jatin-Th");

