import { promptsUS, svgUS } from './data/maps_data.js';

const promptDisplay = document.getElementById("prompt");
const mapDisplay = document.getElementById("map");
let prompt;
const filled = [];

const handlePathClick = (path) => {

};

const activatePaths = () => {
  const paths = mapDisplay.querySelectorAll('path');
  paths.forEach((path) => {
    path.addEventListener('click', (event) => {
      console.log(path.dataset.name);
    })
    path.addEventListener('mouseover', (event) => {
      path.style.strokeWidth = 3;
      path.style.fill = '#C5DBF5';
    })
    path.addEventListener('mouseout', (event) => {
      path.style.strokeWidth = 1;
      path.style.fill = '#f9f9f9';
    })
  });
};

const newQuestion = () => {
  prompt = promptsUS.shift();
  promptDisplay.innerHTML = prompt;
};

const init = () => {
  mapDisplay.innerHTML = svgUS;
  activatePaths();
  newQuestion();
};

init();
