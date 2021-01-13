import { drawBetween } from './clocks/between.js';
import { drawBinary } from './clocks/binary.js';
import { drawConnected } from './clocks/connected.js';
import { drawOneHand } from './clocks/one_hand.js';
import { drawOrders } from './clocks/orders.js';
import { updateRomanClock } from './clocks/roman.js';
import { drawRose } from './clocks/rose.js';
import { initWrongClock, updateWrongClock } from './clocks/wrong.js';

const state = {};

const daysInMonth = (yrs, mths) => {
  return new Date(yrs, mths, 0).getDate();
}

const setState = () => {
  const time = new Date(Date.now());
  state.yrs  = parseInt(time.getFullYear());
  state.mths = parseInt(time.getMonth());
  state.dts  = parseInt(time.getDate());
  state.hrs  = parseInt(time.getHours());
  state.mins = parseInt(time.getMinutes());
  state.secs = parseInt(time.getSeconds());
  state.mscs = parseInt(time.getMilliseconds());

  state.angleYrs = (2 * Math.PI * ((state.yrs % 100) / 100)) - (0.5 * Math.PI);
  state.angleMths = (2 * Math.PI * (state.mths / 12)) - (0.5 * Math.PI);
  state.angleDts = (2 * Math.PI * (state.dts / daysInMonth(state.yrs, state.mths))) - (0.5 * Math.PI);
  state.angleHrs = (2 * Math.PI * ((state.hrs % 12) / 12)) - (0.5 * Math.PI);
  state.angleMins = (2 * Math.PI * (state.mins / 60)) - (0.5 * Math.PI);
  state.angleSecs = (2 * Math.PI * (state.secs / 60)) - (0.5 * Math.PI);
  state.angleMscs = (2 * Math.PI * (state.mscs / 1000)) - (0.5 * Math.PI);
}

const init = () => {
  // Set a temporary state.secs so setState() can create preupdateSecs
  state.secs = 0;
  setState();

  updateRomanClock(state);
  initWrongClock(state);
  drawBetween(state);
  drawOrders(state);
  drawOneHand(state);
  drawBinary(state);
  drawConnected(state);
  drawRose(state);
};

const updateClocks = () => {
  setState();

  if (state.secs != state.preupdateSecs) {
    state.preupdateSecs = state.secs;

    drawBetween(state);
    drawBinary(state);
    drawOneHand(state);
    updateRomanClock(state);
    updateWrongClock(state);
    drawConnected(state);
    drawRose(state);
  }

  drawOrders(state);
};

init();

// Set the clocks going as soon as the page loads
setInterval(updateClocks, 10);
