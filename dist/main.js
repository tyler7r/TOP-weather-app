/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/city-select.js":
/*!****************************!*\
  !*** ./src/city-select.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderUI)
/* harmony export */ });
/* harmony import */ var _fetch_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch-data */ "./src/fetch-data.js");


const body = document.querySelector('body');

function renderUI() {
    renderUIContainer();
    renderForm();
    renderFormDetails();
    renderFormSubmit();
    (0,_fetch_data__WEBPACK_IMPORTED_MODULE_0__.initializeSubmitBtn)();
}

function renderUIContainer() {
    let UI = document.createElement('div');
    UI.classList.add('UIContainer');
    body.appendChild(UI);
}

function renderForm() {
    const UI = document.querySelector('.UIContainer')
    let form = document.createElement('form');
    form.setAttribute('method', 'get');
    form.classList.add('citySelectForm');
    UI.appendChild(form);
}

function renderFormDetails() {
    const form = document.querySelector('.citySelectForm');

    let div = document.createElement('div');
    div.classList.add('citySelect')

    let label = document.createElement('label');
    label.setAttribute('for', 'city');
    label.textContent = 'Enter City: ';

    let input = document.createElement('input');
    input.setAttribute('name', 'city');
    input.setAttribute('id', 'city');
    input.setAttribute('placeholder', 'eg. Atlanta');

    div.appendChild(label);
    div.appendChild(input);

    form.appendChild(div);
}

function renderFormSubmit() {
    const form = document.querySelector('.citySelectForm');

    let button = document.createElement('button');
    button.classList.add('submitButton');
    button.textContent = 'Go';

    form.appendChild(button);
}




/***/ }),

/***/ "./src/city-weather.js":
/*!*****************************!*\
  !*** ./src/city-weather.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderCityWeather)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _fetch_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch-data */ "./src/fetch-data.js");
/* harmony import */ var _temperature_conversions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./temperature-conversions */ "./src/temperature-conversions.js");




const body = document.querySelector('body');

function renderCityWeather(city) {
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
    cityName.textContent = _fetch_data__WEBPACK_IMPORTED_MODULE_1__.cityInfo.name;
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
    let fTemp = (0,_temperature_conversions__WEBPACK_IMPORTED_MODULE_2__.kelvinToFarenheit)(_fetch_data__WEBPACK_IMPORTED_MODULE_1__.cityInfo.main.temp);

    cityTemp.textContent = `${fTemp}\u00B0F`;
    temperatureDiv.appendChild(cityTemp);
}

function renderTemperatureExtremes() {
    const temperatureDiv = document.querySelector('.temperatureDiv')
    let extremeTempDiv = document.createElement('div');
    extremeTempDiv.classList.add('minTempDiv');
    temperatureDiv.appendChild(extremeTempDiv);

    let minTempValue = (0,_temperature_conversions__WEBPACK_IMPORTED_MODULE_2__.kelvinToFarenheit)(_fetch_data__WEBPACK_IMPORTED_MODULE_1__.cityInfo.main.temp_min);
    let maxTempValue = (0,_temperature_conversions__WEBPACK_IMPORTED_MODULE_2__.kelvinToFarenheit)(_fetch_data__WEBPACK_IMPORTED_MODULE_1__.cityInfo.main.temp_max);

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

    weatherDiv.textContent = `Forecast: ${_fetch_data__WEBPACK_IMPORTED_MODULE_1__.cityInfo.weather[0].main}`;
}

/***/ }),

/***/ "./src/fetch-data.js":
/*!***************************!*\
  !*** ./src/fetch-data.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cityInfo": () => (/* binding */ cityInfo),
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "finishTime": () => (/* binding */ finishTime),
/* harmony export */   "initialLoad": () => (/* binding */ initialLoad),
/* harmony export */   "initializeSubmitBtn": () => (/* binding */ initializeSubmitBtn),
/* harmony export */   "initializeSubmitHomeCityBtn": () => (/* binding */ initializeSubmitHomeCityBtn),
/* harmony export */   "startTime": () => (/* binding */ startTime)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");



let cityInfo;
let startTime;
let finishTime;

async function fetchData(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a154b4b6380db9c58a23283ed125177`);
    finishTime = new Date();
    const response = await data.json();
    cityInfo = response;
    console.log(cityInfo);
}

function initialLoad () {
    window.addEventListener('load', () => {
        startTime = new Date();
        homeWeather(_state__WEBPACK_IMPORTED_MODULE_0__.HOME_CITY);
    })
}

async function homeWeather(city) {
    await fetchData(city);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setCurrentCity)(city);
}

function initializeSubmitBtn() {
    const button = document.querySelector('.submitButton');
    
    button.addEventListener('click', (e) => {
        startTime = new Date();
        console.log(startTime);
        e.preventDefault();
        submitForm();
    })
}

function initializeSubmitHomeCityBtn() {
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
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setHomeCity)(input);
}

async function submitForm() {
    const input = document.querySelector('#city').value;
    await fetchData(input);
    (0,_state__WEBPACK_IMPORTED_MODULE_0__.setCurrentCity)(input);
    clearCityData();
}

function clearCityData() {
    const input = document.querySelector('#city');
    input.value = '';
}



/***/ }),

/***/ "./src/loading-time.js":
/*!*****************************!*\
  !*** ./src/loading-time.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderLoadingTime": () => (/* binding */ renderLoadingTime)
/* harmony export */ });
/* harmony import */ var _fetch_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch-data */ "./src/fetch-data.js");


function renderLoadingTime() {
    const body = document.querySelector('body');
    const loadTime = document.createElement('div');
    loadTime.classList.add('loadTime');
    body.appendChild(loadTime);

    loadTime.textContent = `Load Time: ${_fetch_data__WEBPACK_IMPORTED_MODULE_0__.finishTime - _fetch_data__WEBPACK_IMPORTED_MODULE_0__.startTime}ms`
}

/***/ }),

/***/ "./src/set-home-city.js":
/*!******************************!*\
  !*** ./src/set-home-city.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ renderHomeCitySelect)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _fetch_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch-data */ "./src/fetch-data.js");



function renderHomeCitySelect() {
    changeHomeCityButton();
}

function changeHomeCityButton() {
    const body = document.querySelector('body');
    let button = document.createElement('button');
    button.classList.add('changeHomeCity');
    button.textContent = 'Set Home City';
    body.appendChild(button);
    initializeChangeHomeCityBtn();
}

function initializeChangeHomeCityBtn() {
    const button = document.querySelector('.changeHomeCity');
    button.addEventListener('click', (e) => {
        homeCitySelectForm();
        const form = document.querySelector('.homeCitySelect');
        form.classList.remove('hidden');
    })
}

function homeCitySelectForm() {
    const body = document.querySelector('body');

    let form = document.createElement('form');
    form.classList.add('homeCitySelect');
    form.classList.add('hidden');
    body.appendChild(form);

    let label = document.createElement('label');
    label.setAttribute('for', 'homeCity');
    label.textContent = 'Home City: ';
    form.appendChild(label);

    let input = document.createElement('input');
    input.setAttribute('id', 'homeCity');
    input.setAttribute('name', 'homeCity');
    input.setAttribute('type', 'text');
    form.appendChild(input);

    let button = document.createElement('button');
    button.classList.add('submitHomeCity');
    button.textContent = 'Done';
    form.appendChild(button);

    (0,_fetch_data__WEBPACK_IMPORTED_MODULE_1__.initializeSubmitHomeCityBtn)();
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ACTIVE_VIEW": () => (/* binding */ ACTIVE_VIEW),
/* harmony export */   "CURRENT_CITY": () => (/* binding */ CURRENT_CITY),
/* harmony export */   "HOME_CITY": () => (/* binding */ HOME_CITY),
/* harmony export */   "default": () => (/* binding */ setView),
/* harmony export */   "setCurrentCity": () => (/* binding */ setCurrentCity),
/* harmony export */   "setHomeCity": () => (/* binding */ setHomeCity)
/* harmony export */ });
/* harmony import */ var _city_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./city-select */ "./src/city-select.js");
/* harmony import */ var _city_weather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./city-weather */ "./src/city-weather.js");
/* harmony import */ var _loading_time__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loading-time */ "./src/loading-time.js");
/* harmony import */ var _set_home_city__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./set-home-city */ "./src/set-home-city.js");





//home state will automatically fetch and render ATL info
//would like user to be able to change home city
//other will re-render for new city based on what user enters

let CURRENT_CITY = '';

let HOME_CITY = 'Atlanta';

let ACTIVE_VIEW = 'home'

function setView(view) {
    ACTIVE_VIEW = view
    render();
}

function setCurrentCity(city) {
    CURRENT_CITY = city;
    if (city === HOME_CITY) {
        setView('home');
    } else {
        setView('other');
    }
}

function setHomeCity(city) {
    HOME_CITY = city;
    setCurrentCity(city);
}

function render() {
    const body = document.querySelector('body');
    body.replaceChildren();

    (0,_set_home_city__WEBPACK_IMPORTED_MODULE_3__["default"])();

    (0,_city_select__WEBPACK_IMPORTED_MODULE_0__["default"])();

    console.log(HOME_CITY, ACTIVE_VIEW, CURRENT_CITY);
    
    switch (ACTIVE_VIEW) {
        case 'home':
            (0,_city_weather__WEBPACK_IMPORTED_MODULE_1__["default"])(HOME_CITY);
            break;
        case 'other':
            (0,_city_weather__WEBPACK_IMPORTED_MODULE_1__["default"])(CURRENT_CITY);
            break;
    }
    (0,_loading_time__WEBPACK_IMPORTED_MODULE_2__.renderLoadingTime)();
}



/***/ }),

/***/ "./src/temperature-conversions.js":
/*!****************************************!*\
  !*** ./src/temperature-conversions.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "celsiusToFarenheit": () => (/* binding */ celsiusToFarenheit),
/* harmony export */   "farenheitToCelsius": () => (/* binding */ farenheitToCelsius),
/* harmony export */   "kelvinToCelsius": () => (/* binding */ kelvinToCelsius),
/* harmony export */   "kelvinToFarenheit": () => (/* binding */ kelvinToFarenheit)
/* harmony export */ });
function kelvinToFarenheit(kelvin) {
    let temp = 1.8 * (kelvin-273) + 32;
    return Math.floor(temp);
}

function kelvinToCelsius(kelvin) {
    let temp = kelvin - 273.15;
    return Math.floor(temp);
}

function celsiusToFarenheit(celsius) {
    let temp = celsius * (9/5) + 32;
    return Math.floor(temp);
}

function farenheitToCelsius(farenheit) {
    let temp = (farenheit - 32) * (5/9);
    return Math.floor(temp);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _fetch_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetch-data */ "./src/fetch-data.js");



(0,_fetch_data__WEBPACK_IMPORTED_MODULE_1__.initialLoad)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxZQUFZLHlEQUFpQjtBQUM3QjtBQUNBO0FBQ0EsSUFBSSxnRUFBaUI7QUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRE87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7Ozs7OztVQ2xCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ044QjtBQUNhOztBQUUzQyx3REFBVyxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NpdHktc2VsZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jaXR5LXdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZldGNoLWRhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvYWRpbmctdGltZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0LWhvbWUtY2l0eS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RlbXBlcmF0dXJlLWNvbnZlcnNpb25zLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplU3VibWl0QnRuIH0gZnJvbSBcIi4vZmV0Y2gtZGF0YVwiO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJVSSgpIHtcbiAgICByZW5kZXJVSUNvbnRhaW5lcigpO1xuICAgIHJlbmRlckZvcm0oKTtcbiAgICByZW5kZXJGb3JtRGV0YWlscygpO1xuICAgIHJlbmRlckZvcm1TdWJtaXQoKTtcbiAgICBpbml0aWFsaXplU3VibWl0QnRuKCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclVJQ29udGFpbmVyKCkge1xuICAgIGxldCBVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFVJLmNsYXNzTGlzdC5hZGQoJ1VJQ29udGFpbmVyJyk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChVSSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckZvcm0oKSB7XG4gICAgY29uc3QgVUkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuVUlDb250YWluZXInKVxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnZ2V0Jyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdjaXR5U2VsZWN0Rm9ybScpO1xuICAgIFVJLmFwcGVuZENoaWxkKGZvcm0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGb3JtRGV0YWlscygpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHlTZWxlY3RGb3JtJyk7XG5cbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NpdHlTZWxlY3QnKVxuXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdjaXR5Jyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSAnRW50ZXIgQ2l0eTogJztcblxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2NpdHknKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdHknKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ2VnLiBBdGxhbnRhJyk7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGRpdik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckZvcm1TdWJtaXQoKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5U2VsZWN0Rm9ybScpO1xuXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdWJtaXRCdXR0b24nKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnR28nO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG5cbiIsImltcG9ydCB7IENVUlJFTlRfQ0lUWSB9IGZyb20gXCIuL3N0YXRlXCI7XG5pbXBvcnQgeyBjaXR5SW5mbyB9IGZyb20gXCIuL2ZldGNoLWRhdGFcIjtcbmltcG9ydCB7IGtlbHZpblRvQ2Vsc2l1cywga2VsdmluVG9GYXJlbmhlaXQsIGZhcmVuaGVpdFRvQ2Vsc2l1cywgY2Vsc2l1c1RvRmFyZW5oZWl0IH0gZnJvbSBcIi4vdGVtcGVyYXR1cmUtY29udmVyc2lvbnNcIjtcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyQ2l0eVdlYXRoZXIoY2l0eSkge1xuICAgIGNyZWF0ZU91dHB1dENvbnRhaW5lcigpXG4gICAgcmVuZGVyQ2l0eU5hbWUoY2l0eSk7XG4gICAgcmVuZGVyQ2l0eVRlbXBlcmF0dXJlKCk7XG4gICAgcmVuZGVyVGVtcGVyYXR1cmVFeHRyZW1lcygpO1xuICAgIHJlbmRlck1haW5XZWF0aGVyKCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU91dHB1dENvbnRhaW5lcigpIHtcbiAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ291dHB1dENvbnRhaW5lcicpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2l0eU5hbWUoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm91dHB1dENvbnRhaW5lcicpXG4gICAgbGV0IGNpdHlOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2l0eU5hbWUuY2xhc3NMaXN0LmFkZCgnY2l0eU5hbWUnKTtcbiAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGNpdHlJbmZvLm5hbWU7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNpdHlOYW1lKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2l0eVRlbXBlcmF0dXJlKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vdXRwdXRDb250YWluZXInKTtcbiAgICBsZXQgdGVtcGVyYXR1cmVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wZXJhdHVyZURpdi5jbGFzc0xpc3QuYWRkKCd0ZW1wZXJhdHVyZURpdicpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0ZW1wZXJhdHVyZURpdik7XG5cbiAgICBsZXQgdGVtcFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGVtcFRpdGxlLmNsYXNzTGlzdC5hZGQoJ3RlbXBUaXRsZScpO1xuICAgIHRlbXBUaXRsZS50ZXh0Q29udGVudCA9ICdUZW1wZXJhdHVyZSc7XG4gICAgdGVtcGVyYXR1cmVEaXYuYXBwZW5kQ2hpbGQodGVtcFRpdGxlKTtcblxuICAgIGxldCBjaXR5VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNpdHlUZW1wLmNsYXNzTGlzdC5hZGQoJ2NpdHlUZW1wJyk7XG4gICAgbGV0IGZUZW1wID0ga2VsdmluVG9GYXJlbmhlaXQoY2l0eUluZm8ubWFpbi50ZW1wKTtcblxuICAgIGNpdHlUZW1wLnRleHRDb250ZW50ID0gYCR7ZlRlbXB9XFx1MDBCMEZgO1xuICAgIHRlbXBlcmF0dXJlRGl2LmFwcGVuZENoaWxkKGNpdHlUZW1wKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGVtcGVyYXR1cmVFeHRyZW1lcygpIHtcbiAgICBjb25zdCB0ZW1wZXJhdHVyZURpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZURpdicpXG4gICAgbGV0IGV4dHJlbWVUZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZXh0cmVtZVRlbXBEaXYuY2xhc3NMaXN0LmFkZCgnbWluVGVtcERpdicpO1xuICAgIHRlbXBlcmF0dXJlRGl2LmFwcGVuZENoaWxkKGV4dHJlbWVUZW1wRGl2KTtcblxuICAgIGxldCBtaW5UZW1wVmFsdWUgPSBrZWx2aW5Ub0ZhcmVuaGVpdChjaXR5SW5mby5tYWluLnRlbXBfbWluKTtcbiAgICBsZXQgbWF4VGVtcFZhbHVlID0ga2VsdmluVG9GYXJlbmhlaXQoY2l0eUluZm8ubWFpbi50ZW1wX21heCk7XG5cbiAgICBsZXQgbWluVGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1pblRlbXAudGV4dENvbnRlbnQgPSBgVG9kYXkncyBMb3c6ICR7bWluVGVtcFZhbHVlfWBcbiAgICBtaW5UZW1wLmNsYXNzTGlzdC5hZGQoJ21pblRlbXAnKTtcbiAgICBleHRyZW1lVGVtcERpdi5hcHBlbmRDaGlsZChtaW5UZW1wKTtcblxuICAgIGxldCBtYXhUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWF4VGVtcC50ZXh0Q29udGVudCA9IGBUb2RheSdzIEhpZ2g6ICR7bWF4VGVtcFZhbHVlfWA7XG4gICAgbWF4VGVtcC5jbGFzc0xpc3QuYWRkKCdtYXhUZW1wJyk7XG4gICAgZXh0cmVtZVRlbXBEaXYuYXBwZW5kQ2hpbGQobWF4VGVtcClcbn1cblxuZnVuY3Rpb24gcmVuZGVyTWFpbldlYXRoZXIoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm91dHB1dENvbnRhaW5lcicpO1xuICAgIGxldCB3ZWF0aGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgd2VhdGhlckRpdi5jbGFzc0xpc3QuYWRkKCd3ZWF0aGVyRGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHdlYXRoZXJEaXYpO1xuXG4gICAgd2VhdGhlckRpdi50ZXh0Q29udGVudCA9IGBGb3JlY2FzdDogJHtjaXR5SW5mby53ZWF0aGVyWzBdLm1haW59YDtcbn0iLCJpbXBvcnQgeyBzZXRDdXJyZW50Q2l0eSwgQ1VSUkVOVF9DSVRZLCBIT01FX0NJVFksIHNldEhvbWVDaXR5IH0gZnJvbSBcIi4vc3RhdGVcIjtcbmltcG9ydCBzZXRWaWV3IGZyb20gXCIuL3N0YXRlXCI7XG5cbmxldCBjaXR5SW5mbztcbmxldCBzdGFydFRpbWU7XG5sZXQgZmluaXNoVGltZTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoRGF0YShjaXR5KSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mQVBQSUQ9MGExNTRiNGI2MzgwZGI5YzU4YTIzMjgzZWQxMjUxNzdgKTtcbiAgICBmaW5pc2hUaW1lID0gbmV3IERhdGUoKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgIGNpdHlJbmZvID0gcmVzcG9uc2U7XG4gICAgY29uc29sZS5sb2coY2l0eUluZm8pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbExvYWQgKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBob21lV2VhdGhlcihIT01FX0NJVFkpO1xuICAgIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhvbWVXZWF0aGVyKGNpdHkpIHtcbiAgICBhd2FpdCBmZXRjaERhdGEoY2l0eSk7XG4gICAgc2V0Q3VycmVudENpdHkoY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplU3VibWl0QnRuKCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXRCdXR0b24nKTtcbiAgICBcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhzdGFydFRpbWUpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHN1Ym1pdEZvcm0oKTtcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZVN1Ym1pdEhvbWVDaXR5QnRuKCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXRIb21lQ2l0eScpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgc3VibWl0SG9tZUNpdHlDaGFuZ2UoKTtcbiAgICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBzdWJtaXRIb21lQ2l0eUNoYW5nZSgpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVDaXR5U2VsZWN0Jyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcblxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWVDaXR5JykudmFsdWU7XG4gICAgYXdhaXQgZmV0Y2hEYXRhKGlucHV0KTtcbiAgICBzZXRIb21lQ2l0eShpbnB1dCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN1Ym1pdEZvcm0oKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpLnZhbHVlO1xuICAgIGF3YWl0IGZldGNoRGF0YShpbnB1dCk7XG4gICAgc2V0Q3VycmVudENpdHkoaW5wdXQpO1xuICAgIGNsZWFyQ2l0eURhdGEoKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJDaXR5RGF0YSgpIHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXR5Jyk7XG4gICAgaW5wdXQudmFsdWUgPSAnJztcbn1cblxuZXhwb3J0IHsgY2l0eUluZm8sIHN0YXJ0VGltZSwgZmluaXNoVGltZSB9OyIsImltcG9ydCB7IHN0YXJ0VGltZSwgZmluaXNoVGltZSB9IGZyb20gXCIuL2ZldGNoLWRhdGFcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckxvYWRpbmdUaW1lKCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XG4gICAgY29uc3QgbG9hZFRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsb2FkVGltZS5jbGFzc0xpc3QuYWRkKCdsb2FkVGltZScpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQobG9hZFRpbWUpO1xuXG4gICAgbG9hZFRpbWUudGV4dENvbnRlbnQgPSBgTG9hZCBUaW1lOiAke2ZpbmlzaFRpbWUgLSBzdGFydFRpbWV9bXNgXG59IiwiaW1wb3J0IHsgc2V0SG9tZUNpdHkgfSBmcm9tIFwiLi9zdGF0ZVwiO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVN1Ym1pdEhvbWVDaXR5QnRuIH0gZnJvbSBcIi4vZmV0Y2gtZGF0YVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJIb21lQ2l0eVNlbGVjdCgpIHtcbiAgICBjaGFuZ2VIb21lQ2l0eUJ1dHRvbigpO1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VIb21lQ2l0eUJ1dHRvbigpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnY2hhbmdlSG9tZUNpdHknKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnU2V0IEhvbWUgQ2l0eSc7XG4gICAgYm9keS5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIGluaXRpYWxpemVDaGFuZ2VIb21lQ2l0eUJ0bigpO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplQ2hhbmdlSG9tZUNpdHlCdG4oKSB7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYW5nZUhvbWVDaXR5Jyk7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaG9tZUNpdHlTZWxlY3RGb3JtKCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUNpdHlTZWxlY3QnKTtcbiAgICAgICAgZm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBob21lQ2l0eVNlbGVjdEZvcm0oKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaG9tZUNpdHlTZWxlY3QnKTtcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICBsZXQgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgJ2hvbWVDaXR5Jyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSAnSG9tZSBDaXR5OiAnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuXG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2hvbWVDaXR5Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2hvbWVDaXR5Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQnKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnc3VibWl0SG9tZUNpdHknKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnRG9uZSc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgaW5pdGlhbGl6ZVN1Ym1pdEhvbWVDaXR5QnRuKCk7XG59IiwiaW1wb3J0IHJlbmRlclVJIGZyb20gXCIuL2NpdHktc2VsZWN0XCI7XG5pbXBvcnQgcmVuZGVyQ2l0eVdlYXRoZXIgZnJvbSBcIi4vY2l0eS13ZWF0aGVyXCI7XG5pbXBvcnQgeyByZW5kZXJMb2FkaW5nVGltZSB9IGZyb20gXCIuL2xvYWRpbmctdGltZVwiO1xuaW1wb3J0IHJlbmRlckhvbWVDaXR5U2VsZWN0IGZyb20gXCIuL3NldC1ob21lLWNpdHlcIjtcblxuLy9ob21lIHN0YXRlIHdpbGwgYXV0b21hdGljYWxseSBmZXRjaCBhbmQgcmVuZGVyIEFUTCBpbmZvXG4vL3dvdWxkIGxpa2UgdXNlciB0byBiZSBhYmxlIHRvIGNoYW5nZSBob21lIGNpdHlcbi8vb3RoZXIgd2lsbCByZS1yZW5kZXIgZm9yIG5ldyBjaXR5IGJhc2VkIG9uIHdoYXQgdXNlciBlbnRlcnNcblxubGV0IENVUlJFTlRfQ0lUWSA9ICcnO1xuXG5sZXQgSE9NRV9DSVRZID0gJ0F0bGFudGEnO1xuXG5sZXQgQUNUSVZFX1ZJRVcgPSAnaG9tZSdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0Vmlldyh2aWV3KSB7XG4gICAgQUNUSVZFX1ZJRVcgPSB2aWV3XG4gICAgcmVuZGVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRDdXJyZW50Q2l0eShjaXR5KSB7XG4gICAgQ1VSUkVOVF9DSVRZID0gY2l0eTtcbiAgICBpZiAoY2l0eSA9PT0gSE9NRV9DSVRZKSB7XG4gICAgICAgIHNldFZpZXcoJ2hvbWUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRWaWV3KCdvdGhlcicpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvbWVDaXR5KGNpdHkpIHtcbiAgICBIT01FX0NJVFkgPSBjaXR5O1xuICAgIHNldEN1cnJlbnRDaXR5KGNpdHkpO1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBib2R5LnJlcGxhY2VDaGlsZHJlbigpO1xuXG4gICAgcmVuZGVySG9tZUNpdHlTZWxlY3QoKTtcblxuICAgIHJlbmRlclVJKCk7XG5cbiAgICBjb25zb2xlLmxvZyhIT01FX0NJVFksIEFDVElWRV9WSUVXLCBDVVJSRU5UX0NJVFkpO1xuICAgIFxuICAgIHN3aXRjaCAoQUNUSVZFX1ZJRVcpIHtcbiAgICAgICAgY2FzZSAnaG9tZSc6XG4gICAgICAgICAgICByZW5kZXJDaXR5V2VhdGhlcihIT01FX0NJVFkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ290aGVyJzpcbiAgICAgICAgICAgIHJlbmRlckNpdHlXZWF0aGVyKENVUlJFTlRfQ0lUWSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmVuZGVyTG9hZGluZ1RpbWUoKTtcbn1cblxuZXhwb3J0IHsgQ1VSUkVOVF9DSVRZLCBIT01FX0NJVFksIEFDVElWRV9WSUVXIH07IiwiZXhwb3J0IGZ1bmN0aW9uIGtlbHZpblRvRmFyZW5oZWl0KGtlbHZpbikge1xuICAgIGxldCB0ZW1wID0gMS44ICogKGtlbHZpbi0yNzMpICsgMzI7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGVtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBrZWx2aW5Ub0NlbHNpdXMoa2VsdmluKSB7XG4gICAgbGV0IHRlbXAgPSBrZWx2aW4gLSAyNzMuMTU7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGVtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjZWxzaXVzVG9GYXJlbmhlaXQoY2Vsc2l1cykge1xuICAgIGxldCB0ZW1wID0gY2Vsc2l1cyAqICg5LzUpICsgMzI7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGVtcCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmYXJlbmhlaXRUb0NlbHNpdXMoZmFyZW5oZWl0KSB7XG4gICAgbGV0IHRlbXAgPSAoZmFyZW5oZWl0IC0gMzIpICogKDUvOSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodGVtcCk7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgc2V0VmlldyBmcm9tIFwiLi9zdGF0ZVwiO1xuaW1wb3J0IHsgaW5pdGlhbExvYWQgfSBmcm9tIFwiLi9mZXRjaC1kYXRhXCI7XG5cbmluaXRpYWxMb2FkKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9