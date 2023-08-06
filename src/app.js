let currentTime = new Date();
let day = currentTime.getDay();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayName = days[currentTime.getDay()];
let today = document.querySelector("#today");
today.innerHTML = `${dayName} ${hour}:${minutes}`;


function getForecast(coordinates) {
let apiKey = `0ocfta5c0e4602a2a90c32a9a4bbf5b9`
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&long=${coordinates.longitude}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Thu", "Fri", "Sat",]
  days.forEach(function(day){
forecastHTML = forecastHTML + ` 
                    <div class = "col-2">
                      <div class="weather-forecast-date">
                      ${day}
                      </div>
                      <img src = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png"
                      alt=""
                      width="56" />
                      <div class="weather-forecast-temperatures">
                      <span class = "weather-forecast-max">18°</span>
                      <span class = "weather-forecast-min">12°</span>
                      </div>
                    </div>`;
  })

                  forecastHTML = forecastHTML + `</div>`;
                  forecastElement.innerHTML = forecastHTML;
}



function searchCity(city) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  let apiKey = "0ocfta5c0e4602a2a90c32a9a4bbf5b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(function(response){
    console.log(response.data)
    celsiusTemperature = Math.round(response.data.temperature.current);
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let humidityElement = document.querySelector("#humid");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
  });
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let searchInput=document.querySelector("#searchInput");
  let city =searchInput.value;
  searchCity(city)
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) /5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click" , displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click" , displayCelsius);

searchCity("Philadelphia");
displayForecast();


