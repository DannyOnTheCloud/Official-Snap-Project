/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 * My coding Notes: so I want to replcae hot text images to images that I downloaded but that means I must also replace the const var
 */

const Weather_Image = 
"images/4.png"; //This is the Weather Image

const Moon_Image =
"images/3.png"; //This is the Moon Phase Image
const Song_Image =
"images/5.png"; //This is the Song Image

// This is an array of strings (TV show titles)
let titles = [
  "Find your Birthdate's Weather",
  "Find your Birthdate's Moon Phase",
  "Find your Birthdate's Song of the Year",
];
// Your final submission should have much more data than this, and
// you should use more than just an array of strings to store it all.

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < titles.length; i++) {
    let title = titles[i];

    // This part of the code doesn't scale very well! After you add your
    // own data, you'll need to do something totally different here.
    let image = "";   //Variable decleration with statement
    if (i == 0) {
      image = Weather_Image;
    } else if (i == 1) {
      image = Moon_Image;
    } else if (i == 2) {
      image = Song_Image;
    }

    const nextCard = templateCard.cloneNode(true); // Copy the template card
    editCardContent(nextCard, title, image); // Edit title and image
    cardContainer.appendChild(nextCard); // Add new card to the container
  }
}

function editCardContent(card, newTitle, newImage) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = newTitle;

  const cardImage = card.querySelector("img");
  cardImage.src = newImage;
  cardImage.alt = newTitle + " Poster";

  // You can use console.log to help you debug!
  // View the output by right clicking on your website,
  // select "Inspect", then click on the "Console" tab
  console.log("new card:", newTitle, "- html: ", card);
}
//this function is all the info of the user such as birth date and city

function savebirthdate(){ 

  const birthdate = document.getElementById("birthdate").value; //this would store the users birthdate
  const dateObj = new Date(birthdate); //this allows javascript to do math with birth date
  const unixTime = Math.floor(dateObj.getTime() / 1000); //got this online allows accurate unix time stamp return
  console.log("UNIX timestamp:", unixTime);

//Converting Location City and State to Long and Lat
  const location = document.getElementById("location").value; //this would hold users city and state
  const encodedLocation = encodeURIComponent(location); //this would turn users location input to API format
  console.log(encodedLocation); //this grabs and stores users api format location to be called by API Key
  const OpenCage_API_Key = "95c5ef52b4ed48db8a35c424cae90be7"; //stores API Key for Open Cage not best practice
  const apiOpenCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodedLocation}&key=${OpenCage_API_Key }`; //Store APIs URL
  
  fetch(apiOpenCageUrl)
    .then(response => response.json())
    .then(data=> {
      const lat = data.results [0].geometry.lat;
      const lng = data.results [0].geometry.lng;
      console.log("Latitude", lat);
      console.log("Longtitude", lng);
      //Here we will nest our Weather API so that before we pass 
      //so that we make sure weather api grabs long and lat from 
      //Open API before making api request
      const Weather_API_Key = "e40e8c7f7be8a902adb1a95495456c41";
      const WeatherAPIUrl = `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${lat}&lon=${lng}&dt=${unixTime}&appid=${Weather_API_Key}&units=imperial`;
      fetch(WeatherAPIUrl)
      .then(response => response.json())
      .then(data => {
        const weather = data.data[0]
        const temperature = weather.temp;
        const description = weather.weather[0].description;
        console.log(`Weather on your birthday: ${description}, ${temperature}°F`);
        const weatherResult = document.getElementById("weather-result");
        weatherResult.innerText = `Weather on your birthday was: ${description}, ${temperature}°F`;
      });
      const APP_ID = "1a407542-5735-469a-bc2b-2832dfc294e0";
const APP_SECRET = "D2d333d7ae53e5fb1c269cbfdb69d3e496e49e5dc8c4cb8769b4e5c52ebd13d9476838fb3ed5f100bdc5dc58de332353b2022b09f78c865d1e971e6d1590318ba62be00e489ee3309b46a0f34f8907437d5bd433814405a0cf2f7927b7c54d627058de6abf24c0e07a40bda65a873c9d";
const authString = btoa (`${APP_ID}:${APP_SECRET}`);
const birthdateFormatted = birthdate;
//here we nest our Astronmy 
//here we will prepare the request to fetch
const url = `https://api.astronomyapi.com/api/v2/bodies/positions?latitude=${lat}&longitude=${lng}&from_date=${birthdateFormatted}&to_date=${birthdateFormatted}&bodies=moon`;
fetch(url, {
  method: "GET",
  headers: {
    Authorization: `Basic ${authString}`,
    "Content-Type": "application/json"
  }
})
.then(response => response.json())
.then(data => {
  console.log("Astronomy API response:", data);
})
.catch(error => {
  console.error("Error fetching astronomy data:", error);
});


const user = {
  birthdate: birthdate,
  location: location
};
console.log(user);
    });
}





// This calls the addCards() function when the page is first loaded
document.addEventListener("DOMContentLoaded", showCards);

function quoteAlert() {
  console.log("Today's Message is");
  alert(
    "Live today like no Tomorrow"
  );
}

function removeLastCard() {
  titles.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh


}

function restart() {
  window.location.reload()
}
