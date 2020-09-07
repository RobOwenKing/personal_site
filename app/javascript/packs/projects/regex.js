import { challenges } from './regex_data.js';

const regexInput = document.getElementById('regex');
const flagsInput = document.getElementById('flags');

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

  challenges[0].matches[i].forEach((string, j) => {
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

regexInput.addEventListener('input', (event) => {
  const re = new RegExp(regexInput.innerHTML, flagsInput.innerHTML);

  challenges[0].strings[0].forEach((string, i) => {
    // document.getElementById(`yes-${i}`)
    //  .innerHTML = string.replace(re, '<span class="green-txt">$&</span>');
    reReplace(string, i, re, 'yes');
    reMatch(string, i, re, 'yes');
  });

  challenges[0].strings[1].forEach((string, i) => {
    // document.getElementById(`no-${i}`)
    //  .innerHTML = string.replace(re, '<span class="red-txt">$&</span>');
    reReplace(string, i, re, 'no');
    reMatch(string, i, re, 'no');
  });
})

const buildHTML = () => {
  const div = document.getElementById('test-strings');
  let yesChecks = "";
  let noChecks = "";

  div.insertAdjacentHTML('beforeend', "<h3>Match these:</h3>");

  challenges[0].strings[0].forEach((string, i) => {
    div.insertAdjacentHTML('beforeend', `<div id="yes-${i}" class="left-align">${challenges[0].strings[0][i]}</div>`);
    yesChecks += `<i id="check-yes-${i}" class="far fa-times-circle red-txt"></i>`;
  });

  div.insertAdjacentHTML('beforeend', yesChecks);

  div.insertAdjacentHTML('beforeend', "<h3>Don't match these:</h3>");

  challenges[0].strings[1].forEach((string, i) => {
    div.insertAdjacentHTML('beforeend', `<div id="no-${i}" class="left-align">${challenges[0].strings[1][i]}</div>`);
    noChecks += `<i id="check-no-${i}" class="far fa-times-circle red-txt"></i>`;
  });

  div.insertAdjacentHTML('beforeend', noChecks);
};

buildHTML();
