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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  let day = date.getDay();

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#daily-forecast");

  let forecastHTML = ` <div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="row forecast-container">
          <div class="col-4 forecast-day"><p > ${formatDay(
            forecastDay.dt
          )}</p></div>
          <div class="col-4 ">
            <div class="forecast-high">${Math.round(
              forecastDay.temp.max
            )}°C</div>
            <div class="forecast-low">${Math.round(
              forecastDay.temp.min
            )}°C</div>
          </div>
          <div class="col-4">
           <img  class="float-left forecast-icon" src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
           }@2x.png"  alt="" width="67"/>         
            </div>
         </div>  
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#currentLocation").innerHTML = response.data.name;
  document.querySelector("#currentDegree").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#todaysHigh").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#todaysLow").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#feelsLike").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/hr`;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} hPa  `;
  document.querySelector("#sunrise").innerHTML = formatTime(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatTime(
    response.data.sys.sunset * 1000
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  celsiusTemperature = response.data.main.temp;
  celciusTempLow = response.data.main.temp_min;
  celciusTempHigh = response.data.main.temp_max;
  celciusTempFeelsLike = response.data.main.feels_like;
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

searchCity("Milan");

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currentDegree");
  let todaysLow = document.querySelector("#todaysLow");
  let todaysHigh = document.querySelector("#todaysHigh");
  let todaysFeelsLike = document.querySelector("#feelsLike");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let fahrenheitHigh = (celciusTempHigh * 9) / 5 + 32;
  let fahrenheitLow = (celciusTempLow * 9) / 5 + 32;
  let fahrenheitFeelsLike = (celciusTempFeelsLike * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

  todaysHigh.innerHTML = `${Math.round(fahrenheitHigh)}°`;
  todaysLow.innerHTML = `${Math.round(fahrenheitLow)}°`;
  todaysFeelsLike.innerHTML = `${Math.round(fahrenheitFeelsLike)}°`;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#currentDegree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  let todaysLow = document.querySelector("#todaysLow");
  todaysLow.innerHTML = `${Math.round(celciusTempLow)}°`;
  let todaysHigh = document.querySelector("#todaysHigh");
  todaysHigh.innerHTML = `${Math.round(celciusTempHigh)}°`;
  let todaysFeelsLike = document.querySelector("#feelsLike");
  todaysFeelsLike.innerHTML = `${Math.round(celciusTempFeelsLike)}°`;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
