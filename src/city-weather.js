import { CURRENT_CITY } from "./state";
import { cityInfo } from "./fetch-data";
import { kelvinToCelsius, kelvinToFarenheit, farenheitToCelsius, celsiusToFarenheit } from "./temperature-conversions";

const body = document.querySelector('body');

export default function renderCityWeather(city) {
    createOutputContainer()
    renderCityName(city);
    renderCityTemperature();
    renderTemperatureExtremes();
    renderMainWeather();
}

function createOutputContainer() {
    let container = document.createElement('div');
    container.classList.add('outputContainer');
    body.appendChild(container);
}

function renderCityName() {
    const container = document.querySelector('.outputContainer')
    let cityName = document.createElement('div');
    cityName.classList.add('cityName');
    cityName.textContent = cityInfo.name;
    container.appendChild(cityName);
}

function renderCityTemperature() {
    const container = document.querySelector('.outputContainer');
    let temperatureDiv = document.createElement('div');
    temperatureDiv.classList.add('temperatureDiv');
    container.appendChild(temperatureDiv);

    let tempTitle = document.createElement('div');
    tempTitle.classList.add('tempTitle');
    tempTitle.textContent = 'Temperature';
    temperatureDiv.appendChild(tempTitle);

    let cityTemp = document.createElement('div');
    cityTemp.classList.add('cityTemp');
    let fTemp = kelvinToFarenheit(cityInfo.main.temp);

    cityTemp.textContent = `${fTemp}\u00B0F`;
    temperatureDiv.appendChild(cityTemp);
}

function renderTemperatureExtremes() {
    const temperatureDiv = document.querySelector('.temperatureDiv')
    let extremeTempDiv = document.createElement('div');
    extremeTempDiv.classList.add('minTempDiv');
    temperatureDiv.appendChild(extremeTempDiv);

    let minTempValue = kelvinToFarenheit(cityInfo.main.temp_min);
    let maxTempValue = kelvinToFarenheit(cityInfo.main.temp_max);

    let minTemp = document.createElement('div');
    minTemp.textContent = `Today's Low: ${minTempValue}`
    minTemp.classList.add('minTemp');
    extremeTempDiv.appendChild(minTemp);

    let maxTemp = document.createElement('div');
    maxTemp.textContent = `Today's High: ${maxTempValue}`;
    maxTemp.classList.add('maxTemp');
    extremeTempDiv.appendChild(maxTemp)
}

function renderMainWeather() {
    const container = document.querySelector('.outputContainer');
    let weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weatherDiv');
    container.appendChild(weatherDiv);

    weatherDiv.textContent = `Forecast: ${cityInfo.weather[0].main}`;
}