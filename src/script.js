var date = new Date();
let dataHours = (date.getHours() < 10 ? "0" : "") + date.getHours();
let dataMinutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
let updatedTime = `${dataHours}:${dataMinutes}`;
document.getElementById("currentTime").innerHTML = updatedTime;

function formatDate(date) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];

  let CurrentDay = `${days[date.getDay()]}, ${date.getDate()} ${
    months[date.getMonth()]
  } `;

  return CurrentDay;
}

let h2 = document.querySelector(`#currentDay`);
h2.textContent = formatDate(new Date());

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML += `
      <div class="col-2">
         <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="weather icon"
                id="currentWeatherIcon"
              />
         <p class="day">${formatDay(forecastDay.dt)}</p>
         <p class="temperature">
            <span class="maxForecastTemperature"> ${Math.round(
              forecastDay.temp.max
            )} / </span>
            <span class="minForecastTemperature">${Math.round(
              forecastDay.temp.min
            )}</span>     
          </p>
        </div>
      `;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `9eca7aac0b071aa16e3cb063adba0785`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function changeVideoBackground(response) {
  let lowerCaseWord = response.charAt(0).toLowerCase() + response.slice(1);
  console.log(lowerCaseWord);
  document.getElementById(
    `background-video`
  ).src = `src/videos/${lowerCaseWord}.mp4`;
}

function showData(response) {
  let cityCountry = document.querySelector(`#cityCountry h1`);
  cityCountry.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  celsiusTemperature = response.data.main.temp;
  let currentTemperature = document.querySelector(`#currentTemperature`);
  let currentTepm = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = currentTepm;

  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector(`#wind`);
  wind.innerHTML = `Wind: ${response.data.wind.speed} m/h`;

  let iconCurrentWeather = document.querySelector(`#currentWeatherIcon`);
  iconCurrentWeather.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCurrentWeather.setAttribute(`alt`, `response.data.weather[0].main`);

  let describtion = document.querySelector(`#description-current-weather`);
  describtion.innerHTML = response.data.weather[0].main;

  getForecast(response.data.coord);
  changeVideoBackground(response.data.weather[0].main);
}

function cityData(event) {
  event.preventDefault();
  let search = document.querySelector(`#search-text-input`);
  let city = search.value;
  let apiKey = `9eca7aac0b071aa16e3cb063adba0785`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showData);
}

let searchCity = document.querySelector(`#buttonFindCity`);
searchCity.addEventListener("click", cityData);

//bonus feature. Please, wait about 4 seconds.
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `9eca7aac0b071aa16e3cb063adba0785`;
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(showData);
}

function showGeo() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonLoc = document.querySelector(`#buttonLocation`);
buttonLoc.addEventListener("click", showGeo);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsius.classList.replace("active", "inert");
  fahrenheit.classList.replace("inert", "active");
  let convertToFarenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  let currentTemperature = document.querySelector(`#currentTemperature`);
  currentTemperature.innerHTML = convertToFarenheit;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsius.classList.replace("inert", "active");
  fahrenheit.classList.replace("active", "inert");
  let currentTemperature = document.querySelector(`#currentTemperature`);
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector(`#fahrenheit`);
fahrenheit.addEventListener(`click`, showFahrenheitTemperature);

let celsius = document.querySelector(`#celsius`);
celsius.addEventListener(`click`, showCelsiusTemperature);
