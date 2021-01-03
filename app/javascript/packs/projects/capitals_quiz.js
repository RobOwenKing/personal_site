// https://hjnilsson.github.io/country-flags/

import { capitalsUS } from './data/capitals_data.js';

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
let questions, question, answerArray;
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
  questions = capitalsUS;
  questions.sort((a, b) => Math.random() - 0.5);
  newQuestion();
  startTime = new Date();
});
