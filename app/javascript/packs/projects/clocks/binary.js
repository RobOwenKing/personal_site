import { drawBackground } from './drawing_helpers.js';

const canvasBinary = document.getElementById('binary');

const ctxBinary = canvasBinary.getContext('2d');
canvasBinary.width = 240;
canvasBinary.height = 180;

export const drawBinary = (state) => {
  drawBackground(canvasBinary, ctxBinary);

  const binaryHrs  = state.hrs.toString(2);
  const binaryMins = state.mins.toString(2);
  const binarySecs = state.secs.toString(2);
  const strings = [binaryHrs, binaryMins, binarySecs];

  const xStep = canvasBinary.width / 8;
  const yStep = canvasBinary.height / 6;

  for (let j = 0; j < 3; j += 1) {
    for (let i = 0; i < 7; i += 1) {
      if (j == 0 && (i == 5 || i == 6)) {
        break;
      } else {
        ctxBinary.beginPath();
        if (i < strings[j].length && strings[j].charAt(strings[j].length - 1 - i) == '1') {
          ctxBinary.fillStyle = '#F57E2A';
        } else {
          ctxBinary.fillStyle = '#042D43';
        }
        ctxBinary.arc(xStep * (7 - i), yStep * (j + 2), 10, 0, 2 * Math.PI);
        ctxBinary.fill();
      }

    }
  }
};
