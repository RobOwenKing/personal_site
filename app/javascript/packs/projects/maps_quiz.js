import { svgUS } from './data/maps_data.js';

const promptDisplay = document.getElementById("prompt");
const mapDisplay = document.getElementById("map");

const init = () => {
  mapDisplay.innerHTML = svgUS;
  const paths = mapDisplay.querySelectorAll('path');
  const names = [];
  paths.forEach((path) => {
    path.addEventListener('click', (event) => {
      console.log(path.dataset.name);
    })
    names.push(path.dataset.name);
  });
  console.log(names);
};

init();
