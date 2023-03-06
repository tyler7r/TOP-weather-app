import { setCurrentCity, CURRENT_CITY, HOME_CITY, setHomeCity } from "./state";
import setView from "./state";

let cityInfo;
let startTime;
let finishTime;

export async function fetchData(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a154b4b6380db9c58a23283ed125177`);
    finishTime = new Date();
    const response = await data.json();
    cityInfo = response;
    console.log(cityInfo);
}

export function initialLoad () {
    window.addEventListener('load', () => {
        startTime = new Date();
        homeWeather(HOME_CITY);
    })
}

async function homeWeather(city) {
    await fetchData(city);
    setCurrentCity(city);
}

export function initializeSubmitBtn() {
    const button = document.querySelector('.submitButton');
    
    button.addEventListener('click', (e) => {
        startTime = new Date();
        console.log(startTime);
        e.preventDefault();
        submitForm();
    })
}

export function initializeSubmitHomeCityBtn() {
    const button = document.querySelector('.submitHomeCity');
    button.addEventListener('click', (e) => {
        startTime = new Date();
        e.preventDefault();
        submitHomeCityChange();
    })
}

async function submitHomeCityChange() {
    const form = document.querySelector('.homeCitySelect');
    form.classList.add('hidden');

    const input = document.querySelector('#homeCity').value;
    await fetchData(input);
    setHomeCity(input);
}

async function submitForm() {
    const input = document.querySelector('#city').value;
    await fetchData(input);
    setCurrentCity(input);
    clearCityData();
}

function clearCityData() {
    const input = document.querySelector('#city');
    input.value = '';
}

export { cityInfo, startTime, finishTime };