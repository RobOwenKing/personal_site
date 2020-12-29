import { updateRomanClock } from './clocks/roman.js';

// IDEAS
// Single-handed (colour = seconds, length = hour, direction = minutes?)
// Smooth between

const wrong = document.getElementById('wrong');
const canvasBetween = document.getElementById('between');
const canvasOrders = document.getElementById('orders');
const canvasOneHand = document.getElementById('one-hand');
const canvasBinary = document.getElementById('binary');
const canvasConnected = document.getElementById('connected');

const state = {};

const ctxBetween = canvasBetween.getContext('2d');
canvasBetween.width = 240;
canvasBetween.height = 180;

const ctxOrders = canvasOrders.getContext('2d');
canvasOrders.width = 240;
canvasOrders.height = 180;

const ctxOneHand = canvasOneHand.getContext('2d');
canvasOneHand.width = 240;
canvasOneHand.height = 180;

const ctxBinary = canvasBinary.getContext('2d');
canvasBinary.width = 240;
canvasBinary.height = 180;

const ctxConnected = canvasConnected.getContext('2d');
canvasConnected.width = 240;
canvasConnected.height = 180;

const randomOffset = (max) => {
  // 50/50 to return +/-1
  return Math.random() < 0.5 ? 1 : -1;
}

const formatNumber = (num) => {
  // Prepend a zero to single-digit numbers
  return num < 10 ? '0' + num.toString() : num;
}

const initWrongClock = (state) => {
  state.currentWrongHrs = state.hrs;
  state.currentWrongMins = state.mins;
  state.currentWrongSecs = (state.secs + randomOffset() + 60) % 60;

  const displayHrs = formatNumber(state.hrs);
  const displayMins = formatNumber(state.mins);
  const displaySecs = formatNumber(state.currentWrongSecs);

  wrong.innerHTML = `<span class="clock-large">${displayHrs}:${displayMins}</span>${displaySecs}`;
}

const updateWrongClock = (hrs, mins, secs) => {
  const targetSecs = (secs + randomOffset() + 60) % 60;
  let targetMins = state.currentWrongMins;

  if (state.currentWrongSecs > 45 && targetSecs < 15) {
    targetMins = (state.currentWrongMins + 1) % 60;
  } else if (state.currentWrongSecs < 15 && targetSecs > 45) {
    targetMins = (state.currentWrongMins + 59) % 60;
  }

  if (state.currentWrongMins > 45 && targetMins < 15) {
    state.currentWrongHrs = (state.currentWrongHrs + 1) % 24;
  } else if (state.currentWrongMins < 15 && targetMins > 45) {
    state.currentWrongHrs = (state.currentWrongHrs + 23) % 24;
  }

  state.currentWrongSecs = targetSecs;
  state.currentWrongMins = targetMins;

  const displayHrs = formatNumber(state.currentWrongHrs);
  const displayMins = formatNumber(state.currentWrongMins);
  const displaySecs = formatNumber(state.currentWrongSecs);

  wrong.innerHTML = `<span class="clock-large">${displayHrs}:${displayMins}</span>${displaySecs}`;
};

const drawArc = (startX, startY, radius, startAngle, endAngle, colour) => {
  ctxBetween.beginPath();
  ctxBetween.strokeStyle = colour;
  ctxBetween.arc(startX, startY, radius, startAngle, endAngle);
  ctxBetween.stroke();
}

const drawBetween = (hrs, mins, secs) => {
  // Draw background
  ctxBetween.fillStyle = 'black';
  ctxBetween.fillRect(0, 0, canvasBetween.width, canvasBetween.height);

  // Set up variables we'll need
  const startX = canvasBetween.width / 2;
  const startY = canvasBetween.height / 2;

  // For the angles we need an offset for the start to be vertical
  const angleHrs = (2 * Math.PI * ((hrs % 12) / 12)) - (0.5 * Math.PI);
  const angleMins = (2 * Math.PI * (mins / 60)) - (0.5 * Math.PI);
  const angleSecs = (2 * Math.PI * (secs / 60)) - (0.5 * Math.PI);

  const [angleA, angleB, angleC] = [angleHrs, angleMins, angleSecs].sort((a, b) => a - b);

  ctxBetween.lineWidth = 5;

  drawArc(startX, startY, 60, angleC, angleA, '#E01A4F');
  drawArc(startX, startY, 65, angleB, angleC, '#042D43');
  drawArc(startX, startY, 70, angleA, angleB, '#F57E2A');
};

const drawLineWithRotation = (context, angle, length, colour) => {
  context.rotate(angle);
  context.beginPath();
  context.strokeStyle = colour;
  context.moveTo(0, 0);
  context.lineTo(length, 0);
  context.stroke();
  context.rotate(-angle);
}

const drawOrders = (yrs, mths, dts, hrs, mins, secs, mscs) => {
  // Draw background
  ctxOrders.fillStyle = 'black';
  ctxOrders.fillRect(0, 0, canvasOrders.width, canvasOrders.height);

  // Set up variables we'll need
  const startX = canvasOrders.width / 2;
  const startY = canvasOrders.height / 2;

  const angleYrs = (2 * Math.PI * ((yrs % 100) / 100)) - (0.5 * Math.PI);
  const angleMths = (2 * Math.PI * (mths / 12)) - (0.5 * Math.PI);
  const angleDts = (2 * Math.PI * (dts / 31)) - (0.5 * Math.PI);
  const angleHrs = (2 * Math.PI * ((hrs % 12) / 12)) - (0.5 * Math.PI);
  const angleMins = (2 * Math.PI * (mins / 60)) - (0.5 * Math.PI);
  const angleSecs = (2 * Math.PI * (secs / 60)) - (0.5 * Math.PI);
  const angleMscs = (2 * Math.PI * (mscs / 1000)) - (0.5 * Math.PI);

  ctxOrders.lineWidth = 5;
  ctxOrders.lineCap = "round";

  ctxOrders.translate(startX, startY);
  drawLineWithRotation(ctxOrders, angleYrs, 75, '#ff0000');
  drawLineWithRotation(ctxOrders, angleMths, 70, '#ffa500');
  drawLineWithRotation(ctxOrders, angleDts, 65, '#ffff00');
  drawLineWithRotation(ctxOrders, angleHrs, 60, '#008000');
  drawLineWithRotation(ctxOrders, angleMins, 55, '#0000ff');
  drawLineWithRotation(ctxOrders, angleSecs, 50, '#4b0082');
  drawLineWithRotation(ctxOrders, angleMscs, 45, '#ee82ee');
  ctxOrders.translate(-startX, -startY);
}

const drawOneHand = (hrs, mins, secs) => {
  // Draw background
  ctxOneHand.fillStyle = 'black';
  ctxOneHand.fillRect(0, 0, canvasOneHand.width, canvasOneHand.height);

  // Set up variables we'll need
  const startX = canvasOneHand.width / 2;
  const startY = canvasOneHand.height / 2;

  const lengthHrs = ((hrs % 12) * 4) + 31;
  const angleMins = (2 * Math.PI * (mins / 60)) - (0.5 * Math.PI);
  const colourSecs = `hsl(${secs * 6},100%,50%)`;

  ctxOneHand.lineWidth = 5;
  ctxOneHand.lineCap = "round";

  ctxOneHand.translate(startX, startY);
  drawLineWithRotation(ctxOneHand, angleMins, lengthHrs, colourSecs);
  ctxOneHand.translate(-startX, -startY);
}

const drawBinary = (hrs, mins, secs) => {
  // Draw background
  ctxBinary.fillStyle = 'black';
  ctxBinary.fillRect(0, 0, canvasBinary.width, canvasBinary.height);

  const binaryHrs  = hrs.toString(2);
  const binaryMins = mins.toString(2);
  const binarySecs = secs.toString(2);
  const strings = [binaryHrs, binaryMins, binarySecs];

  const xStep = canvasBetween.width / 8;
  const yStep = canvasBetween.height / 6;

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

const drawLine = (context, startX, startY, endX, endY, colour) => {
  context.beginPath();
  context.strokeStyle = 'white';
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

const drawConnected = (hrs, mins, secs) => {
  // Draw background
  ctxConnected.fillStyle = 'black';
  ctxConnected.fillRect(0, 0, canvasConnected.width, canvasConnected.height);

  const angleHrs = (2 * Math.PI * ((hrs % 12) / 12)) - (0.5 * Math.PI);
  const angleMins = (2 * Math.PI * (mins / 60)) - (0.5 * Math.PI);
  const angleSecs = (2 * Math.PI * (secs / 60)) - (0.5 * Math.PI);

  const centreX = canvasConnected.width / 2;
  const centreY = canvasConnected.height / 2;

  const endHrsX = centreX + (25 * Math.cos(angleHrs));
  const endHrsY = centreY + (25 * Math.sin(angleHrs));

  const endMinsX = endHrsX + (25 * Math.cos(angleMins));
  const endMinsY = endHrsY + (25 * Math.sin(angleMins));

  const endSecsX = endMinsX + (25 * Math.cos(angleSecs));
  const endSecsY = endMinsY + (25 * Math.sin(angleSecs));

  ctxConnected.lineWidth = 5;
  ctxConnected.lineCap = "round";

  drawLine(ctxConnected, centreX, centreY, endHrsX, endHrsY, 'white');
  drawLine(ctxConnected, endHrsX, endHrsY, endMinsX, endMinsY, 'white');
  drawLine(ctxConnected, endMinsX, endMinsY, endSecsX, endSecsY, 'white');
};

const setState = () => {
  state.preupdateSecs = state.secs

  const time = new Date(Date.now());
  state.yrs  = parseInt(time.getFullYear());
  state.mths = parseInt(time.getMonth());
  state.dts  = parseInt(time.getDate());
  state.hrs  = parseInt(time.getHours());
  state.mins = parseInt(time.getMinutes());
  state.secs = parseInt(time.getSeconds());
  state.mscs = parseInt(time.getMilliseconds());
}

const init = () => {
  const time = new Date(Date.now());
  const yrs  = parseInt(time.getFullYear());
  const mths = parseInt(time.getMonth());
  const dts  = parseInt(time.getDate());
  const hrs  = parseInt(time.getHours());
  const mins = parseInt(time.getMinutes());
  const secs = parseInt(time.getSeconds());
  const mscs = parseInt(time.getMilliseconds());

  state.preupdateSecs = secs;
  setState();
  updateRomanClock(state);
  initWrongClock(state);
  drawBetween(hrs, mins, secs);
  drawOrders(yrs, mths, dts, hrs, mins, secs, mscs);
  drawOneHand(hrs, mins, secs);
  drawBinary(hrs, mins, secs);
  drawConnected(hrs, mins, secs);
}

const updateClocks = () => {
  const time = new Date(Date.now());
  const yrs  = parseInt(time.getFullYear());
  const mths = parseInt(time.getMonth());
  const dts  = parseInt(time.getDate());
  const hrs  = parseInt(time.getHours());
  const mins = parseInt(time.getMinutes());
  const secs = parseInt(time.getSeconds());
  const mscs = parseInt(time.getMilliseconds());
  setState();

  if (state.secs != state.preupdateSecs) {
    state.preupdateSecs = state.secs;

    updateRomanClock(state);
    updateWrongClock(hrs, mins, secs);
    drawBetween(hrs, mins, secs);
    drawOneHand(hrs, mins, secs);
    drawBinary(hrs, mins, secs);
    drawConnected(hrs, mins, secs);
  }

  drawOrders(yrs, mths, dts, hrs, mins, secs, mscs);
};

init();

// Set the clocks going as soon as the page loads
setInterval(updateClocks, 10);
