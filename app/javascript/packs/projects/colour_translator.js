import { RGBtoHSL, HSLtoRGB } from './colour_translator/translators';
import { updateAll } from './colour_translator/update';
import { parseHex, parseRGB, parseHSL } from './colour_translator/parse';

// Elements from the page
const sample = document.getElementById('box');

const slidersRGB = document.querySelectorAll('.rgb input');
const sliderR = document.getElementById('red');
const sliderG = document.getElementById('green');
const sliderB = document.getElementById('blue');

const inputHex = document.getElementById('hex');
const inputRGB = document.getElementById('rgb');
const inputHSL = document.getElementById('hsl');

const slidersHSL = document.querySelectorAll('.hsl input');
const sliderH = document.getElementById('hue');
const sliderS = document.getElementById('saturation');
const sliderL = document.getElementById('lightness');

// Colour variables
export let red = Math.floor(Math.random() * 256);
export let green = Math.floor(Math.random() * 256);
export let blue = Math.floor(Math.random() * 256);

export let hue, sat, ltns;

const update = () => {
  updateAll(slidersRGB, inputHex, inputRGB, inputHSL, slidersHSL, sample);
};

slidersRGB.forEach((slider) => {
  slider.addEventListener('input', (event) => {
    red = sliderR.value;
    green = sliderG.value;
    blue = sliderB.value;

    [hue, sat, ltns] = RGBtoHSL();

    update();
  });
});

slidersHSL.forEach((slider) => {
  slider.addEventListener('input', (event) => {
    hue = sliderH.value;
    sat = sliderS.value;
    ltns = sliderL.value;

    [red, green, blue] = HSLtoRGB();

    update();
  });
});

inputHex.addEventListener('blur', (event) => {
  [red, green, blue] = parseHex(inputHex);;
  [hue, sat, ltns] = RGBtoHSL();

  update();
})

inputRGB.addEventListener('blur', (event) => {
  [red, green, blue] = parseRGB(inputRGB);
  [hue, sat, ltns] = RGBtoHSL();

  update();
});

inputHSL.addEventListener('blur', (event) => {
  [hue, sat, ltns] = parseHSL(inputHSL);
  [red, green, blue] = HSLtoRGB();

  update();
});

[hue, sat, ltns] = RGBtoHSL();
update();
