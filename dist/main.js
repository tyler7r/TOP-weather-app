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
}

function createOutputContainer() {
    let container = document.createElement('div');
    container.classList.add('outputContainer');
    body.appendChild(container);
}

function renderCityName(city) {
    const container = document.querySelector('.outputContainer')
    let cityName = document.createElement('div');
    cityName.classList.add('cityName');
    cityName.textContent = city;
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
/* harmony export */   "initialLoad": () => (/* binding */ initialLoad),
/* harmony export */   "initializeSubmitBtn": () => (/* binding */ initializeSubmitBtn)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");



let cityInfo;

async function fetchData(city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0a154b4b6380db9c58a23283ed125177`);
    const response = await data.json();
    cityInfo = response;
    console.log(cityInfo);
    console.log(cityInfo.name); 
}

function initialLoad () {
    window.addEventListener('load', () => {
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
        e.preventDefault();
        submitForm();
    })
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
/* harmony export */   "setCurrentCity": () => (/* binding */ setCurrentCity)
/* harmony export */ });
/* harmony import */ var _city_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./city-select */ "./src/city-select.js");
/* harmony import */ var _city_weather__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./city-weather */ "./src/city-weather.js");



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

function render() {
    const body = document.querySelector('body');
    body.replaceChildren();

    (0,_city_select__WEBPACK_IMPORTED_MODULE_0__["default"])();
    
    switch (ACTIVE_VIEW) {
        case 'home':
            (0,_city_weather__WEBPACK_IMPORTED_MODULE_1__["default"])(HOME_CITY);
            break;
        case 'other':
            (0,_city_weather__WEBPACK_IMPORTED_MODULE_1__["default"])(CURRENT_CITY);
            break;
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUQ7O0FBRW5EOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGdFQUFtQjtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkR1QztBQUNDO0FBQytFOztBQUV2SDs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsMkVBQWlCLENBQUMsMkRBQWtCOztBQUVwRCw4QkFBOEIsTUFBTTtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLDJFQUFpQixDQUFDLCtEQUFzQjtBQUMvRCx1QkFBdUIsMkVBQWlCLENBQUMsK0RBQXNCOztBQUUvRDtBQUNBLDBDQUEwQyxhQUFhO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsYUFBYTtBQUN4RDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFbUU7QUFDckM7O0FBRTlCOztBQUVPO0FBQ1Asa0ZBQWtGLEtBQUs7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0Esb0JBQW9CLDZDQUFTO0FBQzdCLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxzREFBYztBQUNsQjs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzREFBYztBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0NxQztBQUNVOztBQUUvQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHdEQUFRO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsWUFBWSx5REFBaUI7QUFDN0I7QUFDQTtBQUNBLFlBQVkseURBQWlCO0FBQzdCO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQ2E7O0FBRTNDLHdEQUFXLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY2l0eS1zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NpdHktd2VhdGhlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmV0Y2gtZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RlbXBlcmF0dXJlLWNvbnZlcnNpb25zLmpzIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbml0aWFsaXplU3VibWl0QnRuIH0gZnJvbSBcIi4vZmV0Y2gtZGF0YVwiO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJVSSgpIHtcbiAgICByZW5kZXJVSUNvbnRhaW5lcigpO1xuICAgIHJlbmRlckZvcm0oKTtcbiAgICByZW5kZXJGb3JtRGV0YWlscygpO1xuICAgIHJlbmRlckZvcm1TdWJtaXQoKTtcbiAgICBpbml0aWFsaXplU3VibWl0QnRuKCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclVJQ29udGFpbmVyKCkge1xuICAgIGxldCBVSSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIFVJLmNsYXNzTGlzdC5hZGQoJ1VJQ29udGFpbmVyJyk7XG4gICAgYm9keS5hcHBlbmRDaGlsZChVSSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckZvcm0oKSB7XG4gICAgY29uc3QgVUkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuVUlDb250YWluZXInKVxuICAgIGxldCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uc2V0QXR0cmlidXRlKCdtZXRob2QnLCAnZ2V0Jyk7XG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdjaXR5U2VsZWN0Rm9ybScpO1xuICAgIFVJLmFwcGVuZENoaWxkKGZvcm0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJGb3JtRGV0YWlscygpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpdHlTZWxlY3RGb3JtJyk7XG5cbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NpdHlTZWxlY3QnKVxuXG4gICAgbGV0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsICdjaXR5Jyk7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSAnRW50ZXIgQ2l0eTogJztcblxuICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2NpdHknKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NpdHknKTtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgJ2VnLiBBdGxhbnRhJyk7XG5cbiAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGRpdi5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGRpdik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckZvcm1TdWJtaXQoKSB7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXR5U2VsZWN0Rm9ybScpO1xuXG4gICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdWJtaXRCdXR0b24nKTtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAnR28nO1xuXG4gICAgZm9ybS5hcHBlbmRDaGlsZChidXR0b24pO1xufVxuXG5cbiIsImltcG9ydCB7IENVUlJFTlRfQ0lUWSB9IGZyb20gXCIuL3N0YXRlXCI7XG5pbXBvcnQgeyBjaXR5SW5mbyB9IGZyb20gXCIuL2ZldGNoLWRhdGFcIjtcbmltcG9ydCB7IGtlbHZpblRvQ2Vsc2l1cywga2VsdmluVG9GYXJlbmhlaXQsIGZhcmVuaGVpdFRvQ2Vsc2l1cywgY2Vsc2l1c1RvRmFyZW5oZWl0IH0gZnJvbSBcIi4vdGVtcGVyYXR1cmUtY29udmVyc2lvbnNcIjtcblxuY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVuZGVyQ2l0eVdlYXRoZXIoY2l0eSkge1xuICAgIGNyZWF0ZU91dHB1dENvbnRhaW5lcigpXG4gICAgcmVuZGVyQ2l0eU5hbWUoY2l0eSk7XG4gICAgcmVuZGVyQ2l0eVRlbXBlcmF0dXJlKCk7XG4gICAgcmVuZGVyVGVtcGVyYXR1cmVFeHRyZW1lcygpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPdXRwdXRDb250YWluZXIoKSB7XG4gICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdXRwdXRDb250YWluZXInKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNpdHlOYW1lKGNpdHkpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub3V0cHV0Q29udGFpbmVyJylcbiAgICBsZXQgY2l0eU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjaXR5TmFtZS5jbGFzc0xpc3QuYWRkKCdjaXR5TmFtZScpO1xuICAgIGNpdHlOYW1lLnRleHRDb250ZW50ID0gY2l0eTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2l0eU5hbWUpO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDaXR5VGVtcGVyYXR1cmUoKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm91dHB1dENvbnRhaW5lcicpO1xuICAgIGxldCB0ZW1wZXJhdHVyZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRlbXBlcmF0dXJlRGl2LmNsYXNzTGlzdC5hZGQoJ3RlbXBlcmF0dXJlRGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRlbXBlcmF0dXJlRGl2KTtcblxuICAgIGxldCB0ZW1wVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZW1wVGl0bGUuY2xhc3NMaXN0LmFkZCgndGVtcFRpdGxlJyk7XG4gICAgdGVtcFRpdGxlLnRleHRDb250ZW50ID0gJ1RlbXBlcmF0dXJlJztcbiAgICB0ZW1wZXJhdHVyZURpdi5hcHBlbmRDaGlsZCh0ZW1wVGl0bGUpO1xuXG4gICAgbGV0IGNpdHlUZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2l0eVRlbXAuY2xhc3NMaXN0LmFkZCgnY2l0eVRlbXAnKTtcbiAgICBsZXQgZlRlbXAgPSBrZWx2aW5Ub0ZhcmVuaGVpdChjaXR5SW5mby5tYWluLnRlbXApO1xuXG4gICAgY2l0eVRlbXAudGV4dENvbnRlbnQgPSBgJHtmVGVtcH1cXHUwMEIwRmA7XG4gICAgdGVtcGVyYXR1cmVEaXYuYXBwZW5kQ2hpbGQoY2l0eVRlbXApO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUZW1wZXJhdHVyZUV4dHJlbWVzKCkge1xuICAgIGNvbnN0IHRlbXBlcmF0dXJlRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlRGl2JylcbiAgICBsZXQgZXh0cmVtZVRlbXBEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBleHRyZW1lVGVtcERpdi5jbGFzc0xpc3QuYWRkKCdtaW5UZW1wRGl2Jyk7XG4gICAgdGVtcGVyYXR1cmVEaXYuYXBwZW5kQ2hpbGQoZXh0cmVtZVRlbXBEaXYpO1xuXG4gICAgbGV0IG1pblRlbXBWYWx1ZSA9IGtlbHZpblRvRmFyZW5oZWl0KGNpdHlJbmZvLm1haW4udGVtcF9taW4pO1xuICAgIGxldCBtYXhUZW1wVmFsdWUgPSBrZWx2aW5Ub0ZhcmVuaGVpdChjaXR5SW5mby5tYWluLnRlbXBfbWF4KTtcblxuICAgIGxldCBtaW5UZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWluVGVtcC50ZXh0Q29udGVudCA9IGBUb2RheSdzIExvdzogJHttaW5UZW1wVmFsdWV9YFxuICAgIG1pblRlbXAuY2xhc3NMaXN0LmFkZCgnbWluVGVtcCcpO1xuICAgIGV4dHJlbWVUZW1wRGl2LmFwcGVuZENoaWxkKG1pblRlbXApO1xuXG4gICAgbGV0IG1heFRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtYXhUZW1wLnRleHRDb250ZW50ID0gYFRvZGF5J3MgSGlnaDogJHttYXhUZW1wVmFsdWV9YDtcbiAgICBtYXhUZW1wLmNsYXNzTGlzdC5hZGQoJ21heFRlbXAnKTtcbiAgICBleHRyZW1lVGVtcERpdi5hcHBlbmRDaGlsZChtYXhUZW1wKVxufSIsImltcG9ydCB7IHNldEN1cnJlbnRDaXR5LCBDVVJSRU5UX0NJVFksIEhPTUVfQ0lUWSwgfSBmcm9tIFwiLi9zdGF0ZVwiO1xuaW1wb3J0IHNldFZpZXcgZnJvbSBcIi4vc3RhdGVcIjtcblxubGV0IGNpdHlJbmZvO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hEYXRhKGNpdHkpIHtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtjaXR5fSZBUFBJRD0wYTE1NGI0YjYzODBkYjljNThhMjMyODNlZDEyNTE3N2ApO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgY2l0eUluZm8gPSByZXNwb25zZTtcbiAgICBjb25zb2xlLmxvZyhjaXR5SW5mbyk7XG4gICAgY29uc29sZS5sb2coY2l0eUluZm8ubmFtZSk7IFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdGlhbExvYWQgKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBob21lV2VhdGhlcihIT01FX0NJVFkpO1xuICAgIH0pXG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhvbWVXZWF0aGVyKGNpdHkpIHtcbiAgICBhd2FpdCBmZXRjaERhdGEoY2l0eSk7XG4gICAgc2V0Q3VycmVudENpdHkoY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplU3VibWl0QnRuKCkge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXRCdXR0b24nKTtcbiAgICBcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHN1Ym1pdEZvcm0oKTtcbiAgICB9KVxufVxuXG5hc3luYyBmdW5jdGlvbiBzdWJtaXRGb3JtKCkge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NpdHknKS52YWx1ZTtcbiAgICBhd2FpdCBmZXRjaERhdGEoaW5wdXQpO1xuICAgIHNldEN1cnJlbnRDaXR5KGlucHV0KTtcbiAgICBjbGVhckNpdHlEYXRhKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2l0eURhdGEoKSB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2l0eScpO1xuICAgIGlucHV0LnZhbHVlID0gJyc7XG59XG5cbmV4cG9ydCB7IGNpdHlJbmZvIH07IiwiaW1wb3J0IHJlbmRlclVJIGZyb20gXCIuL2NpdHktc2VsZWN0XCI7XG5pbXBvcnQgcmVuZGVyQ2l0eVdlYXRoZXIgZnJvbSBcIi4vY2l0eS13ZWF0aGVyXCI7XG5cbi8vaG9tZSBzdGF0ZSB3aWxsIGF1dG9tYXRpY2FsbHkgZmV0Y2ggYW5kIHJlbmRlciBBVEwgaW5mb1xuLy93b3VsZCBsaWtlIHVzZXIgdG8gYmUgYWJsZSB0byBjaGFuZ2UgaG9tZSBjaXR5XG4vL290aGVyIHdpbGwgcmUtcmVuZGVyIGZvciBuZXcgY2l0eSBiYXNlZCBvbiB3aGF0IHVzZXIgZW50ZXJzXG5cbmxldCBDVVJSRU5UX0NJVFkgPSAnJztcblxubGV0IEhPTUVfQ0lUWSA9ICdBdGxhbnRhJztcblxubGV0IEFDVElWRV9WSUVXID0gJ2hvbWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldFZpZXcodmlldykge1xuICAgIEFDVElWRV9WSUVXID0gdmlld1xuICAgIHJlbmRlcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0Q3VycmVudENpdHkoY2l0eSkge1xuICAgIENVUlJFTlRfQ0lUWSA9IGNpdHk7XG4gICAgaWYgKGNpdHkgPT09IEhPTUVfQ0lUWSkge1xuICAgICAgICBzZXRWaWV3KCdob21lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0Vmlldygnb3RoZXInKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuICAgIGJvZHkucmVwbGFjZUNoaWxkcmVuKCk7XG5cbiAgICByZW5kZXJVSSgpO1xuICAgIFxuICAgIHN3aXRjaCAoQUNUSVZFX1ZJRVcpIHtcbiAgICAgICAgY2FzZSAnaG9tZSc6XG4gICAgICAgICAgICByZW5kZXJDaXR5V2VhdGhlcihIT01FX0NJVFkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ290aGVyJzpcbiAgICAgICAgICAgIHJlbmRlckNpdHlXZWF0aGVyKENVUlJFTlRfQ0lUWSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG5cbmV4cG9ydCB7IENVUlJFTlRfQ0lUWSwgSE9NRV9DSVRZLCBBQ1RJVkVfVklFVyB9OyIsImV4cG9ydCBmdW5jdGlvbiBrZWx2aW5Ub0ZhcmVuaGVpdChrZWx2aW4pIHtcbiAgICBsZXQgdGVtcCA9IDEuOCAqIChrZWx2aW4tMjczKSArIDMyO1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRlbXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ga2VsdmluVG9DZWxzaXVzKGtlbHZpbikge1xuICAgIGxldCB0ZW1wID0ga2VsdmluIC0gMjczLjE1O1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRlbXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2Vsc2l1c1RvRmFyZW5oZWl0KGNlbHNpdXMpIHtcbiAgICBsZXQgdGVtcCA9IGNlbHNpdXMgKiAoOS81KSArIDMyO1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRlbXApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmFyZW5oZWl0VG9DZWxzaXVzKGZhcmVuaGVpdCkge1xuICAgIGxldCB0ZW1wID0gKGZhcmVuaGVpdCAtIDMyKSAqICg1LzkpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKHRlbXApO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHNldFZpZXcgZnJvbSBcIi4vc3RhdGVcIjtcbmltcG9ydCB7IGluaXRpYWxMb2FkIH0gZnJvbSBcIi4vZmV0Y2gtZGF0YVwiO1xuXG5pbml0aWFsTG9hZCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==