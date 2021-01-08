import { promptsUS, svgUS } from './data/maps_data.js';

const promptDisplay = document.getElementById("prompt");
const mapDisplay = document.getElementById("map");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");

const playingUI = document.getElementById("playing-ui");
const results = document.getElementById("results");

let promptsArray, prompt;
let score = 0;
let filled = [];

const handlePathClick = (path) => {
  if (path.id == prompt) {
    path.style.fill = '#00FF00';
    filled.push(path);
    score += 1;
    scoreDisplay.innerHTML = score;
    window.setTimeout(newQuestion, 500);
  } else {
    path.style.fill = '#FF0000';
    filled.push(path);
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

const gameOver = () => {
  playingUI.style.display = "none";
  results.style.display = "block";
};

const newQuestion = () => {
  // Reset colours
  filled.forEach((path) => { path.style.fill = '#f9f9f9'; });
  filled = [];
  if (promptsArray.length > 0) {
    prompt = promptsArray.shift();
    promptDisplay.innerHTML = promptsUS[prompt];
  } else {
    gameOver();
  }
};

const init = () => {
  promptsArray = Object.keys(promptsUS);
  promptsArray.sort((a, b) => Math.random() - 0.5);
  mapDisplay.innerHTML = svgUS;
  scoreDisplay.innerHTML = 0;
  totalDisplay.innerHTML = promptsArray.length;
  activatePaths();
  newQuestion();
};

init();
