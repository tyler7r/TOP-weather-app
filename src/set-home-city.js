import { setHomeCity } from "./state";
import { initializeSubmitHomeCityBtn } from "./fetch-data";

export default function renderHomeCitySelect() {
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

    initializeSubmitHomeCityBtn();
}