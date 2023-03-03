import { setCurrentCity, CURRENT_CITY, HOME_CITY, } from "./state";
import setView from "./state";

let cityInfo;

export async function fetchData(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a154b4b6380db9c58a23283ed125177`);
    const response = await data.json();
    cityInfo = response;
    console.log(cityInfo);
    console.log(cityInfo.name); 
}

export function initialLoad () {
    window.addEventListener('load', () => {
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
        e.preventDefault();
        submitForm();
    })
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

export { cityInfo };