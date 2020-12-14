import { VARS } from './setup.js';

const checkGridButton = document.getElementById('check-grid');
const stars = parseInt(JSON.parse(VARS.board.parentElement.dataset.stars));

const countStarsInRow = (j) => {
  let count = 0;
  for (let i = 0; i < VARS.sizeValue; i += 1) {
    if (VARS.answerBoard[j][i] == 2) {
      count += 1;
    }
  }
  return count;
};

const countStarsInCol = (i) => {
  let count = 0;
  for (let j = 0; j < VARS.sizeValue; j += 1) {
    if (VARS.answerBoard[j][i] == 2) {
      count += 1;
    }
  }
  return count;
};

const countStarsInCage = (cage) => {
  let count = 0;
  for (let i = 0; i < VARS.sizeValue; i += 1) {
    for (let j = 0; j < VARS.sizeValue; j += 1) {
      if (VARS.cagesBoard[j][i] == cage && VARS.answerBoard[j][i] == 2) {
        count += 1;
      }
    }
  }
  return count;
};

const checkNeighbourhoodEmpty = (i, j) => {
  if (j > 0) {
    if (VARS.answerBoard[j-1][i-1] == 2) { return false; }
    if (VARS.answerBoard[j-1][i] == 2) { return false; }
    if (VARS.answerBoard[j-1][i+1] == 2) { return false; }
  }
  if (VARS.answerBoard[j][i-1] == 2) { return false; }

  return true;
};

const checkRowsAndCols = () => {
  let correct = true;
  for (let i = 0; i < VARS.sizeValue; i += 1) {
    if (countStarsInRow(i) != stars || countStarsInCol(i) != stars) {
      correct = false;
    }
  }
  return correct;
};

const checkNeighbourhoodsAndCages = () => {
  let correct = checkRowsAndCols();
  const checkedCages = [];
  for (let i = 0; i < VARS.sizeValue; i += 1) {
    for (let j = 0; j < VARS.sizeValue; j += 1) {
      if (VARS.answerBoard[j][i] == 2 && !checkNeighbourhoodEmpty(i, j)) {
        correct = false;
      }
      const currentCage = VARS.cagesBoard[j][i]
      if (checkedCages.indexOf(currentCage) == -1) {
        if (countStarsInCage(currentCage) != stars) {
          correct = false;
        } else {
          checkedCages.push(currentCage);
        }
      }
    }
  }
  return correct;
};

export const checkGrid = () => {
  return checkRowsAndCols() && checkNeighbourhoodsAndCages();
};

export const initCheckGrid = () => {
  checkGridButton.addEventListener('click', (event) => {
    checkGrid() ? window.alert('Looks good!') : window.alert("Seems there's something wrong, sorry!");
  })
};
