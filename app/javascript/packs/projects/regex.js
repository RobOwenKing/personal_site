const regexInput = document.getElementById('regex');
const flagsInput = document.getElementById('flags');

const testStrings = [
  [
    "Test one",
    "Test two"
  ],
  [
    "Test three"
  ]
];

const reReplace = (string, i, re, valency) => {
  document.getElementById(`${valency}-${i}`)
    .innerHTML = string.replace(re, '<span class="green-txt">$&</span>');
};

const reMatch = (string, i, re, valency) => {

};

const timesToCheck = (i, valency) => {

};

regexInput.addEventListener('input', (event) => {
  const re = new RegExp(regexInput.innerHTML, flagsInput.innerHTML);

  testStrings[0].forEach((string, i) => {
    // document.getElementById(`yes-${i}`)
    //  .innerHTML = string.replace(re, '<span class="green-txt">$&</span>');
    reReplace(string, i, re, 'yes');
  });

  testStrings[1].forEach((string, i) => {
    // document.getElementById(`no-${i}`)
    //  .innerHTML = string.replace(re, '<span class="red-txt">$&</span>');
    reReplace(string, i, re, 'no');
  });
})

const buildHTML = () => {
  const div = document.getElementById('test-strings');
  let yesChecks = "";
  let noChecks = "";

  div.insertAdjacentHTML('beforeend', "<h3>Match these:</h3>");

  testStrings[0].forEach((string, i) => {
    div.insertAdjacentHTML('beforeend', `<div id="yes-${i}" class="left-align">${testStrings[0][i]}</div>`);
    yesChecks += `<i id="check-yes-${i}" class="far fa-times-circle red-txt"></i>`;
  });

  div.insertAdjacentHTML('beforeend', yesChecks);

  div.insertAdjacentHTML('beforeend', "<h3>Don't match these:</h3>");

  testStrings[1].forEach((string, i) => {
    div.insertAdjacentHTML('beforeend', `<div id="no-${i}" class="left-align">${testStrings[1][i]}</div>`);
    noChecks += `<i id="check-no-${i}" class="far fa-times-circle red-txt"></i>`;
  });

  div.insertAdjacentHTML('beforeend', noChecks);
};

buildHTML();
