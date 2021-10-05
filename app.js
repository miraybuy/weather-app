function timeNday() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = document.querySelector("#currentTime");
  currentTime.innerHTML = `${day} ${hours}:${minutes}`;
}
timeNday();

function formatTime(timestamp) {
  let time = new Date(timestamp);

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#currentDegree").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#todaysHigh").innerHTML = `H:${Math.round(
    response.data.main.temp_max
  )}°C`;
  document.querySelector("#todaysLow").innerHTML = `L:${Math.round(
    response.data.main.temp_min
  )}°C`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/hr`;
  document.querySelector(
    "#precipitation"
  ).innerHTML = `${response.data.precipitation}`;
  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather.description;
}

function searchCity(city) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchbar").value;
  searchCity(city);
}

function getPosition(position) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Sofia");
