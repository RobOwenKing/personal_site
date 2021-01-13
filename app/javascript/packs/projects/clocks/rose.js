import { drawBackground } from './drawing_helpers.js';

const canvasRose = document.getElementById('rose');

const ctxRose = canvasRose.getContext('2d');
canvasRose.width = 240;
canvasRose.height = 180;

const drawLoop = (min, max, step, k, radius) => {
  for (let i = min; i <= max; i += step) {
    const theta = (i / 180) * Math.PI;
    const r = 60 * Math.cos(k * theta);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    ctxRose.beginPath();
    ctxRose.fillStyle = `hsl(${i}, 100%, 50%)`;
    ctxRose.arc(x, y, radius, 0, 2 * Math.PI);
    ctxRose.fill();
  }
};

export const drawRose = (state) => {
  drawBackground(canvasRose, ctxRose);

  let k = state.hrs % 12;
  // We want hours to be over 1 - 12, not 0 - 11
  k = k == 0 ? 12 : k;
  // 60 mins in an hour, 360 degrees in a full circle
  // So stepMins = 360 / 60
  const stepMins = 6;
  // We need to subtract 90 to start from the vertical
  const maxMins = (state.mins * stepMins) - 90;
  // 60 secs in a minute, so stepSecs = stepMins / 60
  const stepSecs = 0.1;
  const maxSecs = maxMins + (state.secs * stepSecs);

  ctxRose.translate(canvasRose.width / 2, canvasRose.height / 2);

  drawLoop(-90, maxMins, stepMins, k, 2);
  drawLoop(maxMins, maxSecs, stepSecs, k, 1);

  ctxRose.translate(-(canvasRose.width / 2), -(canvasRose.height / 2));
};
