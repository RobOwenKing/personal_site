import { svgUS } from './data/maps_data.js';

const promptDisplay = document.getElementById("prompt");
const mapDisplay = document.getElementById("map");

const init = () => {
  mapDisplay.innerHTML = svgUS;
  const paths = mapDisplay.querySelectorAll('path');
  console.log(paths);
};

init();
