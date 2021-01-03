import { drawBackground, drawLine } from './drawing_helpers.js';

const canvasConnected = document.getElementById('connected');

const ctxConnected = canvasConnected.getContext('2d');
canvasConnected.width = 240;
canvasConnected.height = 180;

export const drawConnected = (state) => {
  drawBackground(canvasConnected, ctxConnected);

  const centreX = canvasConnected.width / 2;
  const centreY = canvasConnected.height / 2;
  const length = 30;

  const endHrsX = centreX + (length * Math.cos(state.angleHrs));
  const endHrsY = centreY + (length * Math.sin(state.angleHrs));

  const endMinsX = endHrsX + (length * Math.cos(state.angleMins));
  const endMinsY = endHrsY + (length * Math.sin(state.angleMins));

  const endSecsX = endMinsX + (length * Math.cos(state.angleSecs));
  const endSecsY = endMinsY + (length * Math.sin(state.angleSecs));

  ctxConnected.lineWidth = 5;
  ctxConnected.lineCap = "round";

  drawLine(ctxConnected, centreX, centreY, endHrsX, endHrsY, '#FF0000');
  drawLine(ctxConnected, endHrsX, endHrsY, endMinsX, endMinsY, '#00FF00');
  drawLine(ctxConnected, endMinsX, endMinsY, endSecsX, endSecsY, '#0000FF');
};
