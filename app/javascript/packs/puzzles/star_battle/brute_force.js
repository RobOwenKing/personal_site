import { VARS } from './setup.js';
import { solveModeClick } from './clicks.js';
import { starPossible, numStarsInRow } from './validators.js';

const bruteForce = document.getElementById('brute-force');

const drawSolution = () => {
  for (let i = 0; i < VARS.sizeValue; i += 1) {
    for (let j = 0; j < VARS.sizeValue; j += 1) {
      solveModeClick(VARS.board.childNodes[j].childNodes[i], i, j);
    }
  }
};

const solve = (i, j) => {
  if (starPossible(i, j)) {
    VARS.answerBoard[j][i] = 1;
    if (i == VARS.sizeValue - 1) {
      if (numStarsInRow(j) == stars.value) {
        if (j == VARS.sizeValue - 1) {
          drawSolution();
          return true;
        } else {
          if (solve(0, j + 1)) {
            return true;
          }
        }
      } else {
        VARS.answerBoard[j][i] = 0;
        return false;
      }
    } else {
      if (solve(i + 1, j)) {
        return true;
      };
    }
    VARS.answerBoard[j][i] = 0;
  }
  if (i == VARS.sizeValue - 1) {
    if (numStarsInRow(j) == stars.value) {
      if (j == VARS.sizeValue - 1) {
        drawSolution();
        return true;
      } else {
        if (solve(0, j + 1)) {
          return true;
        }
      }
    } else {
      return false;
    }
  } else {
    if (solve(i + 1, j)) {
      return true;
    };
  }
};

export const initBruteForce = () => {
  bruteForce.addEventListener('click', (event) => {
    solve(0, 0);
  })
};
