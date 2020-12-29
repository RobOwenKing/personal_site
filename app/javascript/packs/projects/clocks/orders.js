import { drawBackground, drawLineWithRotation } from './drawing_helpers.js';

const canvasOrders = document.getElementById('orders');

const ctxOrders = canvasOrders.getContext('2d');
canvasOrders.width = 240;
canvasOrders.height = 180;

export const drawOrders = (state) => {
  drawBackground(canvasOrders, ctxOrders);

  // Set up variables we'll need
  const startX = canvasOrders.width / 2;
  const startY = canvasOrders.height / 2;

  ctxOrders.lineWidth = 5;
  ctxOrders.lineCap = "round";

  ctxOrders.translate(startX, startY);
  drawLineWithRotation(ctxOrders, state.angleYrs, 75, '#ff0000');
  drawLineWithRotation(ctxOrders, state.angleMths, 70, '#ffa500');
  drawLineWithRotation(ctxOrders, state.angleDts, 65, '#ffff00');
  drawLineWithRotation(ctxOrders, state.angleHrs, 60, '#008000');
  drawLineWithRotation(ctxOrders, state.angleMins, 55, '#0000ff');
  drawLineWithRotation(ctxOrders, state.angleSecs, 50, '#4b0082');
  drawLineWithRotation(ctxOrders, state.angleMscs, 45, '#ee82ee');
  ctxOrders.translate(-startX, -startY);
};
