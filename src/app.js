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
  "Saturday",
];
let dayName = days[currentTime.getDay()];
let today = document.querySelector("#today");
today.innerHTML = `${dayName} ${hour}:${minutes}`;

function getForecast(coordinates) {
  let apiKey = `0ocfta5c0e4602a2a90c32a9a4bbf5b9`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];
return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response)
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      ` 
                    <div class = "col-2">
                      <div class="weather-forecast-date">
                      ${formatDay(forecastDay.time)}
                      </div>
                      <img src="${forecastDay.condition.icon_url}"
                      alt=""
                      width="56" />
                      <div class="weather-forecast-temperatures">
                      <span class = "weather-forecast-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                      <span class = "weather-forecast-min">${Math.round(forecastDay.temperature.minimum)}°</span>
                      </div>
                    </div>`;
                    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  let apiKey = "0ocfta5c0e4602a2a90c32a9a4bbf5b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(function (response) {
    console.log(response.data);
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
    iconElement.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    getForecast(response.data.coordinates);
  });
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let city = searchInput.value;
  searchCity(city);
}
searchCity("Philadelphia");