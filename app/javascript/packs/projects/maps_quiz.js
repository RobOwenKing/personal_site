import { promptsUS, svgUS } from './data/maps_data.js';

const promptDisplay = document.getElementById("prompt");
const mapDisplay = document.getElementById("map");
let prompt;
let score = 0;
let filled = [];

const handlePathClick = (path) => {
  if (path.dataset.name == prompt) {
    path.style.fill = '#00FF00';
    filled.push(path);
    score += 1;
    newQuestion();
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

const newQuestion = () => {
  prompt = promptsUS.shift();
  promptDisplay.innerHTML = prompt;
  // Reset colours
  filled.forEach((path) => { path.style.fill = '#f9f9f9'; });
  filled = [];
};

const init = () => {
  mapDisplay.innerHTML = svgUS;
  activatePaths();
  newQuestion();
};

init();
