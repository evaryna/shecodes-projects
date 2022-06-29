function formatDate() {
  let now = new Date();

  let date = document.querySelector("#date");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let currentDate = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  date.innerHTML = `${hours}:${minutes} ${currentDay}, ${currentDate} ${currentMonth}`;
}
formatDate();

function showCityTemperature(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  let roundTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${roundTemp}ºC`;
  document.querySelector("#weather-icon").innerHTML =
    response.data.weather[0].icon;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let cityForm = document.querySelector("#city");
cityForm.addEventListener("submit", handleSubmit);

function searchCity(city) {
  let apiKey = "a891e6ecb8de24b57d2022631c614077";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function searchLocation(position) {
  let apiKey = "a891e6ecb8de24b57d2022631c614077";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function displayCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", displayCurrentCity);

searchCity();
