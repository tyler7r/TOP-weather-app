import { initializeSubmitBtn } from "./fetch-data";

const body = document.querySelector('body');

export default function renderUI() {
    renderUIContainer();
    renderForm();
    renderFormDetails();
    renderFormSubmit();
    initializeSubmitBtn();
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


