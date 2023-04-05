import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(() => {findCountry()}, DEBOUNCE_DELAY, {
      leading: false,
      trailing: true,
    }));
function findCountry(letter) {
    const requiredCountry = inputEl.value.trim();
    // console.log(requiredCountry);
    if (requiredCountry === '') {
        clearListEl();
        clearInfoEl()
        return 
    }
    fetchCountries(requiredCountry).then(data => {
        // console.log(data);
        if (data.length > 10) {
            clearListEl();
            clearInfoEl()
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (data.length >= 2 & data.length <= 10) {
            clearInfoEl()
            countryListEl.innerHTML = createListOfCountries(data);
            
        } else if (data.length === 1) {
            countryListEl.innerHTML = createListOfCountries(data);
            countryListEl.lastElementChild.style.fontSize = "30px";
            countryInfoEl.innerHTML = showInfoRequiredCountry(data);
        }
    }).catch((err) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        clearListEl();
        clearInfoEl()
    })
}

function createListOfCountries(data) {
    return data.map(({ flags, name }) => {
        return `
        <li class="country-item">
            <img class="country-flag" width="30px" height="30px" src=${flags.svg} alt="flag of this country">
            <p class="country-name">${name.official}</p>
        </li>
    `}).join('');
}

function showInfoRequiredCountry(data) {
    return data.map(({ capital, population, languages }) => {
        return  `
    <p class="country-capital"><span>Capital: </span>${capital}</p>
    <p class="country-population"><span>Population: </span>${population}</p>
    <p class="country-languages"><span>Languages: </span>${Object.values(languages)}</p>
    `}).join('');
}

function clearListEl() {
    countryListEl.innerHTML = '';
}
function clearInfoEl() {
    countryInfoEl.innerHTML = '';
}
