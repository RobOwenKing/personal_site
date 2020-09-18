import { Vars } from './shared_vars.js';
import { solveModeClick } from '../star_battle.js';
import { starPossible, numStarsInRow } from './validators.js';

const bruteForce = document.getElementById('brute-force');

const drawSolution = () => {
  for (let i = 0; i < Vars.sizeValue; i += 1) {
    for (let j = 0; j < Vars.sizeValue; j += 1) {
      solveModeClick(Vars.board.childNodes[j].childNodes[i], i, j);
    }
  }
};

const solve = (i, j) => {
  if (starPossible(i, j)) {
    Vars.answerBoard[j][i] = 1;
    if (i == Vars.sizeValue - 1) {
      if (numStarsInRow(j) == stars.value) {
        if (j == Vars.sizeValue - 1) {
          drawSolution();
          return true;
        } else {
          if (solve(0, j + 1)) {
            return true;
          }
        }
      } else {
        Vars.answerBoard[j][i] = 0;
        return false;
      }
    } else {
      if (solve(i + 1, j)) {
        return true;
      };
    }
    Vars.answerBoard[j][i] = 0;
  }
  if (i == Vars.sizeValue - 1) {
    if (numStarsInRow(j) == stars.value) {
      if (j == Vars.sizeValue - 1) {
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
