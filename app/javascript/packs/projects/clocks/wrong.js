const wrong = document.getElementById('wrong');

const randomOffset = (max) => {
  // 50/50 to return +/-1
  return Math.random() < 0.5 ? 1 : -1;
}

const formatNumber = (num) => {
  // Prepend a zero to single-digit numbers
  return num < 10 ? '0' + num.toString() : num;
}

export const initWrongClock = (state) => {
  state.currentWrongHrs = state.hrs;
  state.currentWrongMins = state.mins;
  state.currentWrongSecs = (state.secs + randomOffset() + 60) % 60;

  const displayHrs = formatNumber(state.hrs);
  const displayMins = formatNumber(state.mins);
  const displaySecs = formatNumber(state.currentWrongSecs);

  wrong.innerHTML = `<span class="clock-large">${displayHrs}:${displayMins}</span>${displaySecs}`;
}

export const updateWrongClock = (state) => {
  const targetSecs = (state.secs + randomOffset() + 60) % 60;
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
