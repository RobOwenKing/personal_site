// IDEAS
// Single-handed (colour = seconds, length = hour, direction = minutes?)
// Rain and flowers
// Orders of magnitude

// Random clock
// Angle between

const roman = document.getElementById('roman');
const wrong = document.getElementById('wrong');
const canvasBetween = document.getElementById('between');
const canvasOrders = document.getElementById('orders');
const canvasOneHand = document.getElementById('one-hand');

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

const romanify = (num) => {
  // We only need Roman numerals up to L as we'll never reach 90
  const romans = ['L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  // The Arabic numerals matching the above Roman numerals, in order
  const arabics = [50, 40, 10, 9, 5, 4, 1];
  let answer = '';

  // We'll iterate over the above arrays
  for (let i = 0; i < romans.length; i += 1) {
    //
    while (num >= arabics[i]) {
      answer += romans[i];
      num -= arabics[i];
    }
  }

 return answer == '' ? 'Nulla' : answer;
};

const updateRomanClock = (hrs, mins, secs) => {
  roman.innerHTML = `<span class="clock-large">${romanify(hrs)}:${romanify(mins)}</span>${romanify(secs)}`;
};

const randomOffset = (max) => {
  return Math.random() < 0.5 ? 1 : -1;
}

const formatNumber = (num) => {
  // Prepend a zero for single-digit numbers
  return num < 10 ? '0' + num.toString() : num;
}

const initWrongClock = (hrs, mins, secs) => {
  state.currentWrongHrs = hrs;
  state.currentWrongMins = mins;
  state.currentWrongSecs = (secs + randomOffset() + 60) % 60;

  const displayHrs = formatNumber(hrs);
  const displayMins = formatNumber(mins);
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
    state.currentWrongHrs += 1;
  } else if (state.currentWrongMins < 15 && targetMins > 45) {
    state.currentWrongHrs -= 1;
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

const drawLine = (context, angle, length, colour) => {
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
  drawLine(ctxOrders, angleYrs, 75, '#ff0000');
  drawLine(ctxOrders, angleMths, 70, '#ffa500');
  drawLine(ctxOrders, angleDts, 65, '#ffff00');
  drawLine(ctxOrders, angleHrs, 60, '#008000');
  drawLine(ctxOrders, angleMins, 55, '#0000ff');
  drawLine(ctxOrders, angleSecs, 50, '#4b0082');
  drawLine(ctxOrders, angleMscs, 45, '#ee82ee');
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
  drawLine(ctxOneHand, angleMins, lengthHrs, colourSecs);
  ctxOneHand.translate(-startX, -startY);
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

  state.secs = secs;
  updateRomanClock(hrs, mins, secs);
  initWrongClock(hrs, mins, secs);
  drawBetween(hrs, mins, secs);
  drawOrders(yrs, mths, dts, hrs, mins, secs, mscs);
  drawOneHand(hrs, mins, secs);
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

  if (secs != state.secs) {
    state.secs = secs;

    updateRomanClock(hrs, mins, secs);
    updateWrongClock(hrs, mins, secs);
    drawBetween(hrs, mins, secs);
    drawOneHand(hrs, mins, secs);
  }

  drawOrders(yrs, mths, dts, hrs, mins, secs, mscs);
};

init();

// Set the clocks going as soon as the page loads
setInterval(updateClocks, 10);
