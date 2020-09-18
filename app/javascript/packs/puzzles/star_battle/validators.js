import { VARS } from './setup.js';

const starPossibleInRow = (i, j) => {
  let starsInRow = 0;
  for (let k = 0; k < i; k += 1) {
    if (VARS.answerBoard[j][k] != 0) {
      starsInRow += 1;
    }
  }
  const answer = starsInRow < stars.value ? true : false;
  return answer;
};

const starPossibleInCol = (i, j) => {
  let starsInCol = 0;
  for (let k = 0; k < j; k += 1) {
    if (VARS.answerBoard[k][i] != 0) {
      starsInCol += 1;
    }
  }
  const answer = starsInCol < stars.value ? true : false;
  return answer;
};

const starPossibleInNeighbourhood = (i, j) => {
  if (j > 0) {
    if (VARS.answerBoard[j-1][i-1] && VARS.answerBoard[j-1][i-1] != 0) { return false; }
    if (VARS.answerBoard[j-1][i] != 0) { return false; }
    if (VARS.answerBoard[j-1][i+1] && VARS.answerBoard[j-1][i+1] != 0) { return false; }
  }

  if (i > 0) {
    if (VARS.answerBoard[j][i-1] != 0) { return false; }
    if (VARS.answerBoard[j+1] && VARS.answerBoard[j+1][i-1] != 0) { return false; }
  }

  return true;
};

const starPossibleInCage = (i, j) => {
  const cageNumber = VARS.cagesBoard[j][i];
  let starsInCage = 0;
  for (let l = 0; l < VARS.sizeValue; l += 1) {
    for (let k = 0; k < VARS.sizeValue; k += 1) {
      if (VARS.cagesBoard[l][k] === cageNumber && VARS.answerBoard[l][k] != 0) { starsInCage += 1; }
    }
  }
  const answer = starsInCage < stars.value ? true : false;
  return answer;
}

export const starPossible = (i, j) => {
  if (!starPossibleInCol(i, j)) {
    return false;
  } else if (!starPossibleInRow(i,j)) {
    return false;
  } else if (!starPossibleInNeighbourhood(i, j)) {
    return false;
  } else if (!starPossibleInCage(i, j)) {
    return false;
  } else {
    return true;
  }
};

export const numStarsInRow = (j) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return VARS.answerBoard[j].reduce(reducer);
};
