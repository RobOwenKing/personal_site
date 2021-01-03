import { drawBackground, drawLineWithRotation } from './drawing_helpers.js';

const canvasOneHand = document.getElementById('one-hand');

const ctxOneHand = canvasOneHand.getContext('2d');
canvasOneHand.width = 240;
canvasOneHand.height = 180;

export const drawOneHand = (state) => {
  drawBackground(canvasOneHand, ctxOneHand);

  // Set up variables we'll need
  const startX = canvasOneHand.width / 2;
  const startY = canvasOneHand.height / 2;

  const lengthHrs = ((state.hrs % 12) * 4) + 31;
  const colourSecs = `hsl(${state.secs * 6},100%,50%)`;

  ctxOneHand.lineWidth = 5;
  ctxOneHand.lineCap = "round";

  ctxOneHand.translate(startX, startY);
  drawLineWithRotation(ctxOneHand, state.angleMins, lengthHrs, colourSecs);
  ctxOneHand.translate(-startX, -startY);
};
