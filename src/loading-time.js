import { startTime, finishTime } from "./fetch-data";

export function renderLoadingTime() {
    const body = document.querySelector('body');
    const loadTime = document.createElement('div');
    loadTime.classList.add('loadTime');
    body.appendChild(loadTime);

    loadTime.textContent = `Load Time: ${finishTime - startTime}ms`
}