const question = document.getElementById("question");
const input = document.getElementById("input");

const mapDisplay = document.getElementById("map");

const playingUI = document.getElementById("playing-ui");
const giveUp = document.getElementById("give-up");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");

const results = document.getElementById("results");
const resultsScore = document.getElementById("results-score");
const resultsTotal = document.getElementById("results-total");
const skippedDisplay = document.getElementById("skipped");
const timeDisplay = document.getElementById('time');
const restart = document.getElementById("restart");

let prompts, promptsArray;
let score = 0;
let filled = [];
let startTime, endTime;

const activateMisseds = () => {
  const misseds = document.querySelectorAll('.missed');
  misseds.forEach((missed) => {
    const path = document.getElementById(missed.dataset.code);
    missed.addEventListener('mouseenter', (event) => {
      path.style.fill = '#FF0000';
    })
    missed.addEventListener('mouseleave', (event) => {
      path.style.fill = '#f9f9f9';
    })
  })
};

const fillMissed = () => {
  const missed = promptsArray.map((prompt) => `<span class="missed" data-code="${prompt[0]}">${prompt[1][0]}</span>` );
  skippedDisplay.innerHTML = `You missed (hover over to check): ${missed.join(', ')}.`;
  activateMisseds();
};

const gameOver = () => {
  resultsScore.innerHTML = score;
  playingUI.style.display = "none";
  question.style.display = "none";

  fillMissed();

  endTime = new Date();
  const timeInMilliseconds = endTime - startTime;
  timeDisplay.innerHTML = formatTime(timeInMilliseconds);

  results.style.display = "block";
};

giveUp.addEventListener("click", (event) => {
  gameOver();
})

restart.addEventListener("click", (event) => {
  init();
  playingUI.style.display = "block";
  results.style.display = "none";
  score = 0;

  filleds.forEach((filled) => {
    const path = document.getElementById(filled.dataset.code);
    path.style.fill = '#f9f9f9';
  })
})

// Below based on code from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const formatTime = (millis) => {
  const mins = Math.floor(millis / 60000);
  const secs = ((millis % 60000) / 1000).toFixed(0);
  return mins + ":" + (secs < 10 ? '0' : '') + secs;
};

const correctAnswer = (element) => {
  return element[1].some(prompt => prompt == input.value);
}

input.addEventListener('input', (event) => {
  const index = promptsArray.findIndex(correctAnswer);
  if (index >= 0) {
    const path = document.getElementById(promptsArray[index][0]);
    promptsArray.splice(index, 1);
    path.style.fill = "#00FF00";
    input.value = "";
    score += 1;
    scoreDisplay.innerHTML = score;
    if (promptsArray.length == 0) { gameOver(); }
  }
})

const init = () => {
  prompts = JSON.parse(input.dataset.prompts);
  promptsArray = Object.entries(prompts);

  scoreDisplay.innerHTML = 0;
  totalDisplay.innerHTML = promptsArray.length;
  resultsTotal.innerHTML = promptsArray.length;

  startTime = new Date();
  question.style.display = "block";
};

init();
