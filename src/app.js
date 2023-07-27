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

function searchCity(event) {
  event.preventDefault();
  let searchInput=document.querySelector("#searchInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let city =searchInput.value;
  let apiKey = "0ocfta5c0e4602a2a90c32a9a4bbf5b9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(function(response){
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let humidityElement = document.querySelector("#humid");
    humidityElement.innerHTML = response.data.temperature.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed;
  });
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);