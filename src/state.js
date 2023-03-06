import renderUI from "./city-select";
import renderCityWeather from "./city-weather";
import { renderLoadingTime } from "./loading-time";
import renderHomeCitySelect from "./set-home-city";

//home state will automatically fetch and render ATL info
//would like user to be able to change home city
//other will re-render for new city based on what user enters

let CURRENT_CITY = '';

let HOME_CITY = 'Atlanta';

let ACTIVE_VIEW = 'home'

export default function setView(view) {
    ACTIVE_VIEW = view
    render();
}

export function setCurrentCity(city) {
    CURRENT_CITY = city;
    if (city === HOME_CITY) {
        setView('home');
    } else {
        setView('other');
    }
}

export function setHomeCity(city) {
    HOME_CITY = city;
    setCurrentCity(city);
}

function render() {
    const body = document.querySelector('body');
    body.replaceChildren();

    renderHomeCitySelect();

    renderUI();

    console.log(HOME_CITY, ACTIVE_VIEW, CURRENT_CITY);
    
    switch (ACTIVE_VIEW) {
        case 'home':
            renderCityWeather(HOME_CITY);
            break;
        case 'other':
            renderCityWeather(CURRENT_CITY);
            break;
    }
    renderLoadingTime();
}

export { CURRENT_CITY, HOME_CITY, ACTIVE_VIEW };