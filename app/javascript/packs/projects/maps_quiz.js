import { svgUS } from './data/maps_data.js';

const promptDisplay = document.getElementById("prompt");
const mapDisplay = document.getElementById("map");

const init = () => {
  mapDisplay.innerHTML = svgUS;
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

init();
