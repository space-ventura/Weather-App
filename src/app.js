let currentTime = new Date ();
let day = currentTime.getDay();
let hour = currentTime.getHours();
if (hour<10) {
  hour = `0${hour}`;}
let minutes = currentTime.getMinutes();
if (minutes<10) {
  minutes = `0${minutes}`;
}
let days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayName = days[currentTime.getDay()];
today.innerHTML = `${dayName} ${hour}:${minutes}`;

function searchCity(event) {
event.preventDefault();
  let searchInput=document.querySelector("#searchInput");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
let city =searchInput.value;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(function(response){
 let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;
});
} 
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

