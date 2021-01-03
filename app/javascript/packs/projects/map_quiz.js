// https://hjnilsson.github.io/country-flags/

let questions = [
  { prompt: "Alabama", answers: ['montgomery'] },
  { prompt: "Alaska", answers: ['juneau'] },
  { prompt: "Arizona", answers: ['phoenix'] },
  { prompt: "Arkansas", answers: ['little rock'] },
  { prompt: "California", answers: ['sacramento'] },
  { prompt: "Colorado", answers: ['denver'] },
  { prompt: "Connecticut", answers: ['hartford'] },
  { prompt: "Delaware", answers: ['dover'] },
  { prompt: "Florida", answers: ['tallahassee'] },
  { prompt: "Georgia", answers: ['atlanta'] },
  { prompt: "Hawaii", answers: ['honolulu'] },
  { prompt: "Idaho", answers: ['boise'] },
  { prompt: "Illinois", answers: ['springfield'] },
  { prompt: "Indiana", answers: ['indianapolis'] },
  { prompt: "Iowa", answers: ['des moines'] },
  { prompt: "Kansas", answers: ['topeka'] },
  { prompt: "Kentucky", answers: ['frankfort'] },
  { prompt: "Louisiana", answers: ['baton rouge'] },
  { prompt: "Maine", answers: ['augusta'] },
  { prompt: "Maryland", answers: ['annapolis'] },
  { prompt: "Massachusetts", answers: ['boston'] },
  { prompt: "Michigan", answers: ['lansing'] },
  { prompt: "Minnesota", answers: ['saint paul'] },
  { prompt: "Mississippi", answers: ['jackson'] },
  { prompt: "Missouri", answers: ['jefferson city'] },
  { prompt: "Montana", answers: ['helena'] },
  { prompt: "Nebraska", answers: ['lincoln'] },
  { prompt: "Nevada", answers: ['carson city'] },
  { prompt: "New Hampshire", answers: ['concord'] },
  { prompt: "New Jersey", answers: ['trenton'] },
  { prompt: "New Mexico", answers: ['santa fe'] },
  { prompt: "New York", answers: ['albany'] },
  { prompt: "North Carolina", answers: ['raleigh'] },
  { prompt: "North Dakota", answers: ['bismarck'] },
  { prompt: "Ohio", answers: ['columbus'] },
  { prompt: "Oklahoma", answers: ['oklahoma city'] },
  { prompt: "Oregon", answers: ['salem'] },
  { prompt: "Pennsylvania", answers: ['harrisburg'] },
  { prompt: "Rhode Island", answers: ['providence'] },
  { prompt: "South Carolina", answers: ['columbia'] },
  { prompt: "South Dakota", answers: ['pierre'] },
  { prompt: "Tennessee", answers: ['nashville'] },
  { prompt: "Texas", answers: ['austin'] },
  { prompt: "Utah", answers: ['salt lake city'] },
  { prompt: "Vermont", answers: ['montpelier'] },
  { prompt: "Virginia", answers: ['richmond'] },
  { prompt: "Washington", answers: ['olympia'] },
  { prompt: "West Virginia", answers: ['charleston'] },
  { prompt: "Wisconsin", answers: ['madison'] },
  { prompt: "Wyoming", answers: ['cheyenne'] }
];

const start = document.getElementById('start');

const game = document.getElementById('game');
const category = document.getElementById('category');
const prompt = document.getElementById('prompt');
const answerInput = document.getElementById('answer');
const skipButton = document.getElementById('skip');
const skippedAnswers = document.getElementById('skipped');
const results = document.getElementById('results');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
let question, answerArray;
let startTime, endTime;
let score = 0;

const newQuestion = () => {
  question = questions.pop();
  prompt.innerHTML = question.prompt;
  answerArray = question.answers;
};

// Below based on code from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const formatTime = (millis) => {
  const mins = Math.floor(millis / 60000);
  const secs = ((millis % 60000) / 1000).toFixed(0);
  return mins + ":" + (secs < 10 ? '0' : '') + secs;
};

const gameOver = () => {
  scoreDisplay.innerHTML = score;
  endTime = new Date();
  const timeInMilliseconds = endTime - startTime;
  timeDisplay.innerHTML = formatTime(timeInMilliseconds);

  game.style.display = "none";
  results.style.display = "block";
};

answerInput.addEventListener('input', (event) => {
  if (answerArray.includes(answerInput.value.toLowerCase())) {
    score += 1;
    if (questions.length > 0) {
      newQuestion();
      answerInput.value = '';
    } else {
      gameOver();
    }
  }
});

// Below based on code from https://stackoverflow.com/questions/42755664/capitalize-first-letter-of-each-word-in-js
const capitalise = (str) => {
  return str
      .toLowerCase()
      .split(' ')
      .map((word) => { return word[0].toUpperCase() + word.substr(1); })
      .join(' ');
};

skipButton.addEventListener('click', (event) => {
  const toInsert = `<p>The capital of <strong>${question.prompt}</strong> is <strong>${capitalise(answerArray[0])}</strong></p>`;
  skippedAnswers.insertAdjacentHTML('beforeend', toInsert);
  newQuestion();
});

start.addEventListener('click', (event) => {
  game.style.display = "block";
  start.style.display = "none";
  questions.sort((a, b) => Math.random() - 0.5);
  newQuestion();
  startTime = new Date();
});
