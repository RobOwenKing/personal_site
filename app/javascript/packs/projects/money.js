const selectOptions = `<option value="USD" selected="selected">United States Dollars</option>
    <option value="EUR">Euro</option>
    <option value="GBP">United Kingdom Pounds</option>
    <option value="AUD">Australia Dollars</option>
    <option value="BRL">Brazil Real</option>
    <option value="BGN">Bulgaria Lev</option>
    <option value="CAD">Canada Dollars</option>
    <option value="CNY">China Yuan Renmimbi</option>
    <option value="HRK">Croatia Kuna</option>
    <option value="CZK">Czech Republic Koruna</option>
    <option value="DKK">Denmark Kroner</option>
    <option value="HKD">Hong Kong Dollars</option>
    <option value="HUF">Hungary Forint</option>
    <option value="ISK">Iceland Krona</option>
    <option value="INR">India Rupees</option>
    <option value="IDR">Indonesia Rupiah</option>
    <option value="ILS">Israel New Shekels</option>
    <option value="JPY">Japan Yen</option>
    <option value="MYR">Malaysia Ringgit</option>
    <option value="MXN">Mexico Pesos</option>
    <option value="NZD">New Zealand Dollars</option>
    <option value="NOK">Norway Kroner</option>
    <option value="PHP">Philippines Pesos</option>
    <option value="PLN">Poland Zloty</option>
    <option value="RON">Romania Leu</option>
    <option value="RUB">Russia Rubles</option>
    <option value="SGD">Singapore Dollars</option>
    <option value="ZAR">South Africa Rand</option>
    <option value="KRW">South Korea Won</option>
    <option value="SEK">Sweden Krona</option>
    <option value="CHF">Switzerland Francs</option>
    <option value="THB">Thailand Baht</option>
    <option value="TRY">Turkey Lira</option>`;

let rates;
let ratesRetrieved;

const inputNumber   = document.getElementById('input-value');
const inputCurrency = document.getElementById('input-currency');
const outputCurrency = document.getElementById('output-currency');
const outputCountry  = document.getElementById('output-country');
const input  = document.getElementById('input');
const output = document.getElementById('output');

const getRates = () => {
  fetch('https://api.exchangeratesapi.io/latest')
      .then((response) => response.json())
      .then((data) => {
        rates = data.rates;
        rates["EUR"] = 1.0;
        ratesRetrieved = new Date(Date.now());
      });
};

const convert = () => {
  const inputValue = inputNumber.value;
  const firstRate  = rates[inputCurrency.value];
  const secondRate = rates[outputCurrency.value];

  const outputValue = (inputValue / firstRate) * secondRate;

  input.innerHTML  = `${inputValue} ${inputCurrency.value}`;
  output.innerHTML = `${outputValue} ${outputCurrency.value}`;
};

inputNumber.addEventListener('input', (event) => {
  convert();
})

inputCurrency.insertAdjacentHTML('beforeend', selectOptions);
outputCurrency.insertAdjacentHTML('beforeend', selectOptions);
getRates();
