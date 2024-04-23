// Search Input
let searchInput = document.getElementById("searchInput")
let searchbtn = document.getElementById("searchbtn")
// Current Forecast Data
var current_day = document.getElementById("currentDay");
var current_date = document.getElementById("currentDateMonth");
var city = document.getElementById("city");
var currentTemp = document.getElementById("currentTemp");
var currentIcon = document.getElementById("currentIcon");
var currentRain = document.getElementById("currentRain");
var currentWind = document.getElementById("currentWind");
var currentSpeed = document.getElementById("currentSpeed");
var Currentstatus = document.getElementById("status");

// tomorrow Forecast Data

//fetch API
async function getWeatherData(city) {
    let Response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=c99311638d304fd4992173524242004&q=${city}&days=3`)
    let waatherData = await Response.json();
    console.log(waatherData);
    return (waatherData);
}

// Add an event listener to the submit button
searchbtn.addEventListener("click", function () {
    // Get the value entered in the input field 
    const searchValue = searchInput.value;
    mainFunction(searchValue);
});

// display Current Weather Data
function displayCurrentWeatherData(data) {
    city.innerHTML = data.location.name;
    currentTemp.innerHTML = data.current.temp_c;
    currentIcon.setAttribute("src", "https:" + data.current.condition.icon);
    currentRain.innerHTML = data.current.humidity;
    currentWind.innerHTML = data.current.wind_kph;
    currentSpeed.innerHTML = data.current.wind_kph;
    Currentstatus.innerHTML = data.current.condition.text;
    var localtime = new Date(data.location.localtime);
    var dayOfWeek = localtime.toLocaleDateString(undefined, { weekday: 'long' });
    var day = localtime.getDate();
    var month = localtime.getMonth() + 1;
    current_day.innerHTML = dayOfWeek;
    current_date.innerHTML = day + " / " + month;
}
function displayTomorrowWeatherData(data) {
    let forecastData = data.forecast.forecastday[1]; // Accessing the second forecastday (index 1) for tomorrow's data
    document.getElementById("nextDayIcon").setAttribute("src", "https:" + forecastData.day.condition.icon);
    let nextDayElement = document.getElementById("nextDay");
    let nextDateElement = document.getElementById("nextDate");
    let nextDayMaxElement = document.getElementById("tempC2");
    let nextDayTempElement = document.getElementById("condition2");
    var localtime = new Date(forecastData.date);
    var dayOfWeek = localtime.toLocaleDateString(undefined, { weekday: 'long' });
    var day = localtime.getDate();
    var month = localtime.getMonth() + 1;
    nextDayElement.innerHTML = dayOfWeek;
    nextDateElement.innerHTML = day + " / " + month;
    let maxTempC = forecastData.day.maxtemp_c;
    let maxTempF = forecastData.day.maxtemp_f;
    let conditionText = forecastData.day.condition.text;
    nextDayMaxElement.textContent = maxTempC + " C";
    nextDayTempElement.innerHTML = maxTempF + " F <br/> " + conditionText;
}

function displayAfterTomorrowWeatherData(data) {
    let forecastData = data.forecast.forecastday[2]; // Accessing the second forecastday (index 1) for tomorrow's data
    let maxTempC = forecastData.day.maxtemp_c;
    let maxTempF = forecastData.day.maxtemp_f;
    let conditionText = forecastData.day.condition.text;

    let nextDayElement = document.getElementById("day2");
    let nextDateElement = document.getElementById("date2");
    let nextDayMaxElement = document.querySelector(".card-title.fs-1.my-2");
    let nextDayTempElement = document.querySelector(".fs-5");
    document.getElementById("AfterDayIcon").setAttribute("src", "https:" + forecastData.day.condition.icon);
    var localtime = new Date(forecastData.date);
    var dayOfWeek = localtime.toLocaleDateString(undefined, { weekday: 'long' });
    var day = localtime.getDate();
    var month = localtime.getMonth() + 1;
    nextDayElement.innerHTML = dayOfWeek;
    nextDateElement.innerHTML = day + " / " + month;
    nextDayMaxElement.textContent = maxTempC + " C";
    nextDayTempElement.innerHTML = maxTempF + " F <br/> " + conditionText;

}

// Main Function
async function mainFunction(city = "london") {
    let weatherData = await getWeatherData(city);
    displayCurrentWeatherData(weatherData);
    displayTomorrowWeatherData(weatherData);
    displayAfterTomorrowWeatherData(weatherData);
}
