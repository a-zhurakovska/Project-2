var date = new Date();
let dataHours = (date.getHours() < 10 ? "0" : "") + date.getHours();
let dataMinutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
document.getElementById(
  "currentTime"
).innerHTML = `${dataHours}:${dataMinutes}`;

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

//1
function showData(response) {
  console.log(response);
  let cityCountry = document.querySelector(`#cityCountry h1`);
  cityCountry.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  celsiusTemperature = response.data.main.temp;
  let currentTemperature = document.querySelector(`#currentTemperature`);
  let currentTepm = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = currentTepm;

  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector(`#wind`);
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;

  let iconCurrentWeather = document.querySelector(`#currentWeatherIcon`);
  iconCurrentWeather.setAttribute(
    `src`,
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconCurrentWeather.setAttribute(`alt`, `response.data.weather[0].main`);

  let describtion = document.querySelector(`#description-current-weather`);
  describtion.innerHTML = response.data.weather[0].main;
}

function cityData(event) {
  event.preventDefault();
  let search = document.querySelector(`#search-text-input`);
  let city = search.value;
  let apiKey = `57b2c40fdae71a6ba41d72685e3226e2`;
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
  let apiKey = `1a6432c5ca7b6f9b0bee45c98d54ea71`;
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

function showForecast() {
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class = "row">`;
  let days = [`THU`, `FRI`, `SAT`, `SUN`, `MON`];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
         <i class="fa-solid fa-cloud-sun fa-2x fa-beat-fade" style="--fa-animation-duration: 3s"></i>
         <p class="day">${day}</p>
         <p class="temperature">
            <span class="maxForecastTemperature">14</span>°C /
            <span class="minForecastTemperature">18</span>°C      
          </p>
        </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

showForecast();
