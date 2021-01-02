let rates;
let ratesRetrieved;

const getRates = () => {
  fetch('https://api.exchangeratesapi.io/latest')
      .then((response) => response.json())
      .then((data) => {
        rates = data.rates;
        rates["EUR"] = 1.0;
        ratesRetrieved = new Date(Date.now());
        console.log(rates);
      });
};

getRates();
