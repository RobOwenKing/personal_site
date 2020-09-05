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

const matches = [
  ["Test"],
  ["Tes"]
];

const reReplace = (string, i, re, valency) => {
  const colour = valency === 'yes' ? 'green' : 'red';
  document.getElementById(`${valency}-${i}`)
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

  matches[i].forEach((string, j) => {
    if (string != match[j]) {
      bool = false;
    }
  })
  return bool;
}

const reMatch = (string, i, re, valency) => {
  const match = string.match(re);
  const icon = document.getElementById(`check-${valency}-${i}`);

  if (valency === 'no') {
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

  testStrings[0].forEach((string, i) => {
    // document.getElementById(`yes-${i}`)
    //  .innerHTML = string.replace(re, '<span class="green-txt">$&</span>');
    reReplace(string, i, re, 'yes');
    reMatch(string, i, re, 'yes');
  });

  testStrings[1].forEach((string, i) => {
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
