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

const inputValue = document.getElementById('input-value');
const inputCurrency = document.getElementById('input-currency');

const getRates = () => {
  fetch('https://api.exchangeratesapi.io/latest')
      .then((response) => response.json())
      .then((data) => {
        rates = data.rates;
        rates["EUR"] = 1.0;
        ratesRetrieved = new Date(Date.now());
      });
};

inputCurrency.insertAdjacentHTML('beforeend', selectOptions);
//getRates();


AUD: 1.5896
BGN: 1.9558
BRL: 6.3735
CAD: 1.5633
CHF: 1.0802
CNY: 8.0225
CZK: 26.242
DKK: 7.4409
EUR: 1
GBP: 0.89903
HKD: 9.5142
HRK: 7.5519
HUF: 363.89
IDR: 17240.76
ILS: 3.9447
INR: 89.6605
ISK: 156.1
JPY: 126.49
KRW: 1336
MXN: 24.416
MYR: 4.934
NOK: 10.4703
NZD: 1.6984
PHP: 59.125
PLN: 4.5597
RON: 4.8683
RUB: 91.4671
SEK: 10.0343
SGD: 1.6218
THB: 36.727
TRY: 9.1131
USD: 1.2271
ZAR: 18.0219
