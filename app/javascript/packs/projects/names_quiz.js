const question = document.getElementById("question");

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

let prompts, promptsArray, prompt;
let score = 0;
let filled = [];
let missed = [];
let startTime, endTime;
let locked = false;

const newQuestion = () => {
  if (promptsArray.length == 0) { gameOver() }
  prompt = promptsArray.shift();
  promptDisplay.innerHTML = prompts[prompt][0];
  locked = false;
};

const activateMisseds = () => {
  const misseds = document.querySelectorAll('.missed');
  misseds.forEach((missed) => {
    const path = document.getElementById(missed.dataset.code);
    missed.addEventListener('mouseenter', (event) => {
      path.style.fill = '#00FF00';
    })
    missed.addEventListener('mouseleave', (event) => {
      path.style.fill = '#f9f9f9';
    })
  })
};

const fillMissed = () => {
  missed = missed.map((prompt) => `<span class="missed" data-code="${prompt}">${prompts[prompt][0]}</span>` );
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

const next = () => {
  // Reset colours
  filled.forEach((path) => { path.style.fill = '#f9f9f9'; });
  filled = [];
  if (promptsArray.length > 0) {
    newQuestion();
  } else {
    gameOver();
  }
};

const handlePathClick = (path) => {
  if (!locked) {
    if (path.id == prompt) {
      path.style.fill = '#00FF00';
      filled.push(path);
      score += 1;
      locked = true;
      scoreDisplay.innerHTML = score;
      window.setTimeout(next, 500);
    } else {
      path.style.fill = '#FF0000';
      filled.push(path);
      if (!missed.includes(prompt)) { missed.push(prompt); }
    }
  }
};

const activatePaths = () => {
  const paths = mapDisplay.querySelectorAll('path');
  paths.forEach((path) => {
    path.addEventListener('click', (event) => {
      handlePathClick(path);
    })
    path.addEventListener('mouseover', (event) => {
      path.style.strokeWidth = 3;
      // Only fill if not already red or green
      if (!filled.includes(path)) {
        path.style.fill = '#C5DBF5';
      }
    })
    path.addEventListener('mouseout', (event) => {
      path.style.strokeWidth = 1;
      // Only reset fill if not red or green
      if (!filled.includes(path)) {
        path.style.fill = '#f9f9f9';
      }
    })
  });
};

skip.addEventListener("click", (event) => {
  if (!missed.includes(prompt)) { missed.push(prompt); }
  newQuestion();
})

restart.addEventListener("click", (event) => {
  init();
  playingUI.style.display = "block";
  results.style.display = "none";
  score = 0;
})

// Below based on code from https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
const formatTime = (millis) => {
  const mins = Math.floor(millis / 60000);
  const secs = ((millis % 60000) / 1000).toFixed(0);
  return mins + ":" + (secs < 10 ? '0' : '') + secs;
};

const init = () => {
  prompts = JSON.parse(question.dataset.prompts);
  promptsArray = Object.keys(prompts);
  promptsArray.sort((a, b) => Math.random() - 0.5);
  // mapDisplay.innerHTML = svgUS;
  scoreDisplay.innerHTML = 0;
  totalDisplay.innerHTML = promptsArray.length;
  resultsTotal.innerHTML = promptsArray.length;
  startTime = new Date();
  locked = false;
  missed = [];
  activatePaths();
  newQuestion();
  question.style.display = "block";
};

init();
