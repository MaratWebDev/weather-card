// variables for fetching data
const APIkey = "&units=metric&APPID=630bfe1349893957897a602d88e5d319";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
let url;
const submit = document.querySelector("[type='submit']");
const search = document.querySelector("[type='search']");
let searchInfo = search.value;

// Variables for displaying in UI
let main = document.querySelector("main");
const section = document.createElement("section");
let city = document.createElement("h2");
let temp = document.createElement("h3");
let humidity = document.createElement("p");
humidity.classList.add("humidity");
let wind = document.createElement("p");
wind.classList.add("wind");
let maxtemp = document.createElement("p");
maxtemp.classList.add("maxtemp");
let mintemp = document.createElement("p");
mintemp.classList.add("mintemp");

// clearing search input on focus
search.addEventListener("focus", function() {
  search.value = "";
});

submit.addEventListener("click", submitSearch);

function submitSearch() {
  fetchData();
}

// fetching and transforming data to json format
function fetchData(e) { 
  // stops to submitting before
  // e.preventDefault();
  url = baseURL + searchInfo + APIkey;
  fetch(url, { cache: "no-store" })
    .then(function(response) {
      // checking if we get data before parsing to json
      if (!response.ok) {
        throw Error(response.statusText);
        // return
      }
      // transforming data into json
      return response.json();
    })
    .then(function(jsonData) {
      displayData(jsonData);
    })
    .catch(function(error) {
      console.log(error);
      window.alert("Oops, ssomething went wrong! More details in console");
    });

  return;
}

// Function for displaying data

function displayData(jsonData) {
  main.appendChild(section);
  section.appendChild(city);
  section.appendChild(temp);
  section.appendChild(humidity);
  section.appendChild(wind);
  section.appendChild(maxtemp);
  section.appendChild(mintemp);

  city.textContent = jsonData.name;
  temp.textContent = jsonData.main.temp + "°C";
  humidity.textContent = "Humidity: " + jsonData.main.humidity + "%";
  wind.textContent = "Wind speed: " + jsonData.wind.speed + "m/s";
  maxtemp.textContent = "Max Temperature: " + jsonData.main.temp_max + "°C";
  mintemp.textContent = "Min Temperature: " + jsonData.main.temp_min + "°C";

  console.log(jsonData);
}
