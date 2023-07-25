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
