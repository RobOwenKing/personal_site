import { drawBackground } from './drawing_helpers.js';

const canvasRose = document.getElementById('rose');

const ctxRose = canvasRose.getContext('2d');
canvasRose.width = 240;
canvasRose.height = 180;

export const drawRose = (state) => {
  drawBackground(canvasRose, ctxRose);

  let k = state.hrs % 12;
  // We want hours to be over 1 - 12, not 0 - 11
  k = k == 0 ? 12 : k;
  // 60 mins in an hour, 360 degrees in a full circle
  // So stepMins = 360 / 60
  const stepMins = 6;
  const maxMins = state.mins * stepMins;
  // 60 secs in a minute, so stepSecs = stepMins / 60
  const stepSecs = 0.1;
  const maxSecs = maxMins + (state.secs * stepSecs);

  ctxRose.translate(canvasRose.width / 2, canvasRose.height / 2);

  // Draw minutes
  for (let i = 0; i <= maxMins; i += stepMins) {
    const theta = (i / 180) * Math.PI;
    const r = 60 * Math.cos(k * theta);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    ctxRose.beginPath();
    ctxRose.fillStyle = `hsl(${i}, 100%, 50%)`;
    ctxRose.arc(x, y, 2, 0, 2 * Math.PI);
    ctxRose.fill();
  }

  // Draw seconds
  for (let i = maxMins; i <= maxSecs; i += stepSecs) {
    const theta = (i / 180) * Math.PI;
    const r = 60 * Math.cos(k * theta);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    ctxRose.beginPath();
    ctxRose.fillStyle = `hsl(${i}, 100%, 50%)`;
    ctxRose.arc(x, y, 1, 0, 2 * Math.PI);
    ctxRose.fill();
  }

  ctxRose.translate(-(canvasRose.width / 2), -(canvasRose.height / 2));
};
