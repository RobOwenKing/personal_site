const dark = document.getElementById('dark');
const light = document.getElementById('light');
let mode = "dark";

const darkToLight = () => {
  if (mode === "dark") {
    mode = "light";
    dark.classList.remove('btn-active');
    light.classList.add('btn-active');
  }
};

const lightToDark = () => {
  if (mode === "light") {
    mode = "dark";
    dark.classList.add('btn-active');
    light.classList.remove('btn-active');
  }
};

export { dark, light, mode, lightToDark, darkToLight };

// import { light, dark, mode, lightToDark, darkToLight } from '../shared/modes.js';

// light.addEventListener('click', (event) => {
//   darkToLight();
//   draw();
// });

// dark.addEventListener('click', (event) => {
//   lightToDark();
//   draw();
// });
