const wrong = document.getElementById('wrong');

const randomOffset = (max) => {
  // 50/50 to return +/-1
  return Math.random() < 0.5 ? 1 : -1;
};

const formatNumber = (num) => {
  // Prepend a zero to single-digit numbers
  return num < 10 ? '0' + num.toString() : num;
};

export const initWrongClock = (state) => {
  // We want to keep track of the currently displayed values for hr, min and sec
  state.currentWrongHrs = state.hrs;
  state.currentWrongMins = state.mins;
  // We add 60 before taking modulus for case secs is 0 and offset -1
  state.currentWrongSecs = (state.secs + randomOffset() + 60) % 60;

  // Before we display for the first time, prepend 0s to any single digit numbers
  const displayHrs = formatNumber(state.hrs);
  const displayMins = formatNumber(state.mins);
  const displaySecs = formatNumber(state.currentWrongSecs);

  wrong.innerHTML = `<span class="clock-large">${displayHrs}:${displayMins}</span>${displaySecs}`;
};

export const updateWrongClock = (state) => {
  // Secs we want to display will be correct time +/- 1
  // By adding 60 before taking modulus we avoid issues with negatives
  const targetSecs = (state.secs + randomOffset() + 60) % 60;
  // Save current wrong mins to work out whether hour ticks over or not
  let targetMins = state.currentWrongMins;

  // Tick over to new minute (or back if necessary)
  if (state.currentWrongSecs > 45 && targetSecs < 15) {
    targetMins = (state.currentWrongMins + 1) % 60;
  } else if (state.currentWrongSecs < 15 && targetSecs > 45) {
    targetMins = (state.currentWrongMins + 59) % 60;
  }

  // Tick over to new hour (or back if necessary)
  if (state.currentWrongMins > 45 && targetMins < 15) {
    state.currentWrongHrs = (state.currentWrongHrs + 1) % 24;
  } else if (state.currentWrongMins < 15 && targetMins > 45) {
    state.currentWrongHrs = (state.currentWrongHrs + 23) % 24;
  }

  // Now we can set the secs and mins to their new values
  state.currentWrongSecs = targetSecs;
  state.currentWrongMins = targetMins;

  const displayHrs = formatNumber(state.currentWrongHrs);
  const displayMins = formatNumber(state.currentWrongMins);
  const displaySecs = formatNumber(state.currentWrongSecs);

  wrong.innerHTML = `<span class="clock-large">${displayHrs}:${displayMins}</span>${displaySecs}`;
};
