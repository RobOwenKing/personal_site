// https://hjnilsson.github.io/country-flags/

import { categories } from './data/capitals_data.js';

const intro = document.getElementById('intro');
const startButton = document.getElementById('start');

const game = document.getElementById('game');
const category = document.getElementById('category');
const prompt = document.getElementById('prompt');
const answerInput = document.getElementById('answer');
const skipButton = document.getElementById('skip');
const gameScore = document.getElementById('game-score');
const gameTotal = document.getElementById('game-total');

const results = document.getElementById('results');
const resultsScore = document.getElementById('results-score');
const resultsTotal = document.getElementById('results-total');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restart');

const skippedAnswers = document.getElementById('skipped');

let questions, question, answerArray;
let startTime, endTime;
let score = 0;

const newQuestion = () => {
  question = questions.pop();
  prompt.innerHTML = question.prompt;
  answerArray = question.answers;
  gameScore.innerHTML = score;
};

// Below based on code from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const formatTime = (millis) => {
  const mins = Math.floor(millis / 60000);
  const secs = ((millis % 60000) / 1000).toFixed(0);
  return mins + ":" + (secs < 10 ? '0' : '') + secs;
};

const gameOver = () => {
  resultsScore.innerHTML = score;
  endTime = new Date();
  const timeInMilliseconds = endTime - startTime;
  timeDisplay.innerHTML = formatTime(timeInMilliseconds);

  game.style.display = "none";
  results.style.display = "block";
};

answerInput.addEventListener('input', (event) => {
  if (answerArray.includes(answerInput.value.toLowerCase())) {
    score += 1;
    answerInput.value = '';
    if (questions.length > 0) {
      newQuestion();
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

startButton.addEventListener('click', (event) => {
  game.style.display = "block";
  intro.style.display = "none";
  questions = categories[0]["questions"];
  questions.sort((a, b) => Math.random() - 0.5);
  gameTotal.innerHTML = questions.length;
  resultsTotal.innerHTML = questions.length;
  newQuestion();
  startTime = new Date();
});

restartButton.addEventListener('click', (event) => {
  results.style.display = "none";
  intro.style.display = "block";
  skippedAnswers.innerHTML = "";
})
