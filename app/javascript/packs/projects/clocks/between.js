import { drawBackground, drawArc } from './drawing_helpers.js';

const canvasBetween = document.getElementById('between');

const ctxBetween = canvasBetween.getContext('2d');
canvasBetween.width = 240;
canvasBetween.height = 180;

export const drawBetween = (state) => {
  drawBackground(canvasBetween, ctxBetween);

  // Set up variables we'll need
  const startX = canvasBetween.width / 2;
  const startY = canvasBetween.height / 2;

  // Note that .sort() treats everything as a string by default, hence the callback
  const [angleA, angleB, angleC] = [state.angleHrs, state.angleMins, state.angleSecs].sort((a, b) => a - b);

  ctxBetween.lineWidth = 5;

  drawArc(ctxBetween, startX, startY, 60, angleC, angleA, '#E01A4F');
  drawArc(ctxBetween, startX, startY, 65, angleB, angleC, '#042D43');
  drawArc(ctxBetween, startX, startY, 70, angleA, angleB, '#F57E2A');
};
