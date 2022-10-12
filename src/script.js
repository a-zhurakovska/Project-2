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
  let cityCountry = document.querySelector(`#cityCountry h1`);
  cityCountry.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  let currentTemperature = document.querySelector(`#currentTemperature`);
  let currentTepm = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = currentTepm;

  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let wind = document.querySelector(`#wind`);
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
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
