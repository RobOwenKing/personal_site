import { Vars } from './shared_vars.js';

const starPossibleInRow = (i, j) => {
  let starsInRow = 0;
  for (let k = 0; k < i; k += 1) {
    if (Vars.answerBoard[j][k] != 0) {
      starsInRow += 1;
    }
  }
  const answer = starsInRow < stars.value ? true : false;
  return answer;
};

const starPossibleInCol = (i, j) => {
  let starsInCol = 0;
  for (let k = 0; k < j; k += 1) {
    if (Vars.answerBoard[k][i] != 0) {
      starsInCol += 1;
    }
  }
  const answer = starsInCol < stars.value ? true : false;
  return answer;
};

const starPossibleInNeighbourhood = (i, j) => {
  if (j > 0) {
    if (Vars.answerBoard[j-1][i-1] && Vars.answerBoard[j-1][i-1] != 0) { return false; }
    if (Vars.answerBoard[j-1][i] != 0) { return false; }
    if (Vars.answerBoard[j-1][i+1] && Vars.answerBoard[j-1][i+1] != 0) { return false; }
  }

  if (i > 0) {
    if (Vars.answerBoard[j][i-1] != 0) { return false; }
    if (Vars.answerBoard[j+1] && Vars.answerBoard[j+1][i-1] != 0) { return false; }
  }

  return true;
};

const starPossibleInCage = (i, j) => {
  const cageNumber = Vars.cagesBoard[j][i];
  let starsInCage = 0;
  for (let l = 0; l < Vars.sizeValue; l += 1) {
    for (let k = 0; k < Vars.sizeValue; k += 1) {
      if (Vars.cagesBoard[l][k] === cageNumber && Vars.answerBoard[l][k] != 0) { starsInCage += 1; }
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
  return Vars.answerBoard[j].reduce(reducer);
};
