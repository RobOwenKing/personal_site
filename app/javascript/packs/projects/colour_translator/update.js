import { red, green, blue, hue, sat, ltns } from '../colour_translator';

let hex, rgb, hsl;

const updateHex = () => {
  // First calculate the individual components of the hex colour
  let hexRed = parseInt(red).toString(16).toUpperCase();
  // We need to append 0 before a one digit value
  if (hexRed.length === 1) { hexRed = "0" + hexRed; }

  let hexGreen = parseInt(green).toString(16).toUpperCase();
  if (hexGreen.length === 1) { hexGreen = "0" + hexGreen; }

  let hexBlue = parseInt(blue).toString(16).toUpperCase();
  if (hexBlue.length === 1) { hexBlue = "0" + hexBlue; }

  // Update the hex colour based on the values calculated
  hex = `#${hexRed}${hexGreen}${hexBlue}`;
};

const updateSlidersRGB = (slidersRGB) => {
  // Set each slider to the new value
  slidersRGB[0].value = red;
  slidersRGB[1].value = green;
  slidersRGB[2].value = blue;

  // Update the gradient backgrounds for the new colour
  slidersRGB[0].style.background = `linear-gradient(to right, rgb(0, ${green}, ${blue}), rgb(255, ${green}, ${blue}))`;
  slidersRGB[1].style.background = `linear-gradient(to right, rgb(${red}, 0, ${blue}), rgb(${red}, 255, ${blue}))`;
  slidersRGB[2].style.background = `linear-gradient(to right, rgb(${red}, ${green}, 0), rgb(${red}, ${green}, 255))`;
};

const updateSlidersHSL = (slidersHSL) => {
  // Set each slider to the new value
  slidersHSL[0].value = hue;
  slidersHSL[1].value = sat;
  slidersHSL[2].value = ltns;

  // Update the gradient backgrounds for the new colour
  slidersHSL[0].style.background = `linear-gradient(to right, hsl(0, ${sat}%, ${ltns}%),
    hsl(120, ${sat}%, ${ltns}%),
    hsl(240, ${sat}%, ${ltns}%),
    hsl(360, ${sat}%, ${ltns}%))`;
  slidersHSL[1].style.background = `linear-gradient(to right, hsl(${hue}, 0%, ${ltns}%),
    hsl(${hue}, 50%, ${ltns}%),
    hsl(${hue}, 100%, ${ltns}%))`;
  slidersHSL[2].style.background = `linear-gradient(to right, hsl(${hue}, ${sat}%, 0%),
    hsl(${hue}, ${sat}%, 50%),
    hsl(${hue}, ${sat}%, 100%))`;
};

const updateInputs = (inputHex, inputRGB, inputHSL) => {
  // Hex code is longer so has its own function
  updateHex();
  inputHex.value = hex;

  rgb = `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
  inputRGB.value = rgb;

  hsl = `hsl(${Math.round(hue)}, ${Math.round(sat)}, ${Math.round(ltns)})`;
  inputHSL.value = hsl;
};

const updateSample = (sample) => {
  sample.style.backgroundColor = rgb;
};

export const updateAll = (slidersRGB, inputHex, inputRGB, inputHSL, slidersHSL, sample) => {
  updateSlidersRGB(slidersRGB);
  updateSlidersHSL(slidersHSL);
  updateInputs(inputHex, inputRGB, inputHSL);
  // Sample must be last so rgb used already updated by updateInputs
  updateSample(sample);
};
