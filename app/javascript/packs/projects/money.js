import { selectOptions, countryOptions } from './data/money_data.js';

let rates, outputValue;

const inputNumber   = document.getElementById('input-value');
const inputCurrency = document.getElementById('input-currency');
const outputCurrency = document.getElementById('output-currency');
const outputCountry  = document.getElementById('output-country');
const countriesDatalist = document.getElementById('countries');
const input  = document.getElementById('input');
const output = document.getElementById('output');
const perPerson = document.getElementById('per-person');
const perPersonCountry = document.getElementById('per-person-country');
let country = countryOptions.filter(element => element["country"] == "The United Kingdom");

const getRates = () => {
  fetch('https://api.exchangeratesapi.io/latest')
      .then((response) => response.json())
      .then((data) => {
        rates = data.rates;
        rates["EUR"] = 1.0;
        update();
      });
};

const convert = () => {
  const inputValue = inputNumber.value;
  const firstRate  = rates[inputCurrency.value];
  const secondRate = rates[outputCurrency.value];

  outputValue = (inputValue / firstRate) * secondRate;

  input.innerHTML  = `${inputValue} ${inputCurrency.value}`;
  output.innerHTML = `${outputValue} ${outputCurrency.value}`;
};

const updatePerPerson = () => {
  country = countryOptions.filter(element => element["country"] == outputCountry.value);
  const population = parseInt(country[0]["population"]);
  const perPersonValue = outputValue / population;
  perPerson.innerHTML = `${perPersonValue} ${outputCurrency.value}`;
  perPersonCountry.innerHTML = outputCountry.value;
};

const update = () => {
  convert();
  updatePerPerson();
};

inputNumber.addEventListener('input', (event) => {
  update();
});

inputCurrency.addEventListener('input', (event) => {
  update();
});

outputCurrency.addEventListener('input', (event) => {
  update();
});

outputCountry.addEventListener('input', (event) => {
  update();
})

const fillCountriesDatalist = () => {
  for (let i = 0; i< countryOptions.length; i+= 1) {
    countriesDatalist.insertAdjacentHTML('beforeend', `<option value="${countryOptions[i]["country"]}">`);
  }
};

inputCurrency.insertAdjacentHTML('beforeend', selectOptions);
outputCurrency.insertAdjacentHTML('beforeend', selectOptions);
fillCountriesDatalist();
getRates();
