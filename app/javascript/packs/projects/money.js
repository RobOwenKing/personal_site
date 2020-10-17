fetch('https://api.exchangeratesapi.io/latest')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
