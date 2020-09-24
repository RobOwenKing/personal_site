import { challenges } from './regex_data.js';

let regex = '';
let flags = '';

const regexInput = document.getElementById('regex');
const flagsInput = document.getElementById('flags');

const challengeName = document.getElementById('challenge-name');
const challengeDescription = document.getElementById('challenge-description');
const testStrings = document.getElementById('test-strings');
const challengeSelect = document.getElementById('challenge-select');

let challenge = challenges[0];

const reReplace = (string, i, re, polarity) => {
  const colour = polarity === 'yes' ? 'green' : 'red';
  document.getElementById(`${polarity}-${i}`)
    .innerHTML = string.replace(re, `<span class="${colour}-txt">$&</span>`);
};

const timesToCheck = icon => {
  icon.classList.remove('fa-times-circle');
  icon.classList.remove('red-txt');
  icon.classList.add('fa-check-circle');
  icon.classList.add('green-txt');
};

const checkToTimes = icon => {
  icon.classList.remove('fa-check-circle');
  icon.classList.remove('green-txt');
  icon.classList.add('fa-times-circle');
  icon.classList.add('red-txt');
};

const checkMatch = (i, match) => {
  if (match === null) { return false; }

  let bool = true;

  challenge.matches[i].forEach((string, j) => {
    if (string != match[j]) {
      bool = false;
    }
  })
  return bool;
}

const reMatch = (string, i, re, polarity) => {
  const match = string.match(re);
  const icon = document.getElementById(`check-${polarity}-${i}`);

  if (polarity === 'no') {
    if (match === null && icon.classList.contains('fa-times-circle')) {
      timesToCheck(icon);
    } else if (match !== null && icon.classList.contains('fa-check-circle')) {
      checkToTimes(icon);
    }
  } else {
    if (checkMatch(i, match) && icon.classList.contains('fa-times-circle')) {
      timesToCheck(icon);
    } else if (!checkMatch(i, match) && icon.classList.contains('fa-check-circle')) {
      checkToTimes(icon);
    }
  }
};

const handleInput = () => {
  const re = new RegExp(regex, flags);

  challenge.strings[0].forEach((string, i) => {
    reReplace(string, i, re, 'yes');
    reMatch(string, i, re, 'yes');
  });

  challenge.strings[1].forEach((string, i) => {
    reReplace(string, i, re, 'no');
    reMatch(string, i, re, 'no');
  });
};

regexInput.addEventListener('input', (event) => {
  regex = regexInput.innerHTML;
  handleInput();
});

flagsInput.addEventListener('input', (event) => {
  flags = flagsInput.innerHTML;
  handleInput();
});

challengeSelect.addEventListener('input', (event) => {
  challenge = challenges.find(element => element.value == challengeSelect.value);
  buildHTML();
});

const buildSelect = () => {
  for (let i = 0; i < challenges.length; i += 1) {
    const value = challenges[i].value;
    const name = challenges[i].name;
    challengeSelect.insertAdjacentHTML('beforeend', `<option value="${value}">${name}</option>`);
  }
};

const buildHTML = () => {
  let yesChecks = "";
  let noChecks = "";

  challengeName.innerHTML = challenge.name;
  challengeDescription.innerHTML = challenge.description;
  regexInput.innerText = "Your regex here";
  flagsInput.innerText = "Flags";

  testStrings.innerHTML = "";

  testStrings.insertAdjacentHTML('beforeend', "<h3>Match these:</h3>");

  challenge.strings[0].forEach((string, i) => {
    testStrings.insertAdjacentHTML('beforeend', `<div id="yes-${i}" class="left-align">${challenge.strings[0][i]}</div>`);
    yesChecks += `<i id="check-yes-${i}" class="far fa-times-circle red-txt"></i>`;
  });

  testStrings.insertAdjacentHTML('beforeend', yesChecks);

  testStrings.insertAdjacentHTML('beforeend', "<h3>Don't match these:</h3>");

  challenge.strings[1].forEach((string, i) => {
    testStrings.insertAdjacentHTML('beforeend', `<div id="no-${i}" class="left-align">${challenge.strings[1][i]}</div>`);
    noChecks += `<i id="check-no-${i}" class="far fa-times-circle red-txt"></i>`;
  });

  testStrings.insertAdjacentHTML('beforeend', noChecks);
};

buildHTML();
buildSelect();
