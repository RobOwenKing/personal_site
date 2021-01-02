import { selectOptions, countryOptions } from './data/money_data.js';

let rates, outputValue;

const inputNumber   = document.getElementById('input-value');
const inputCurrency = document.getElementById('input-currency');
const outputCurrency = document.getElementById('output-currency');
const outputCountry  = document.getElementById('output-country');
const countriesDatalist = document.getElementById('countries');
const input  = document.getElementById('input');
const output = document.getElementById('output');

const getRates = () => {
  fetch('https://api.exchangeratesapi.io/latest')
      .then((response) => response.json())
      .then((data) => {
        rates = data.rates;
        rates["EUR"] = 1.0;
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

const update = () => {
  convert();
}

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

// getRates();
