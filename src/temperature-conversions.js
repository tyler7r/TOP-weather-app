export function kelvinToFarenheit(kelvin) {
    let temp = 1.8 * (kelvin-273) + 32;
    return Math.floor(temp);
}

export function kelvinToCelsius(kelvin) {
    let temp = kelvin - 273.15;
    return Math.floor(temp);
}

export function celsiusToFarenheit(celsius) {
    let temp = celsius * (9/5) + 32;
    return Math.floor(temp);
}

export function farenheitToCelsius(farenheit) {
    let temp = (farenheit - 32) * (5/9);
    return Math.floor(temp);
}