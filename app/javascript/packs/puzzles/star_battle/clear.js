import { editCellBorders } from './edit_borders.js';
import { VARS, createCagesBoard } from './setup.js';
import { solveModeClick } from './clicks.js';

const clearCages = document.getElementById('clear-cages');
const clearStars = document.getElementById('clear-stars');

const initClearCages = () => {
  clearCages.addEventListener('click', (event) => {
    createCagesBoard();
    for (let j = 0; j < VARS.sizeValue; j += 1) {
      for (let i = 0; i < VARS.sizeValue; i += 1) {
        editCellBorders(VARS.board.childNodes[j].childNodes[i], i, j);
      }
    }
  })
};

const initClearStars = () => {
  clearStars.addEventListener('click', (event) => {
    for (let j = 0; j < VARS.sizeValue; j += 1) {
      for (let i = 0; i < VARS.sizeValue; i += 1) {
        const cell = VARS.board.childNodes[j].childNodes[i];
        while (VARS.answerBoard[j][i] != 0) {
          solveModeClick(cell, i, j);
        }
      }
    }
  })
};

export { initClearCages, initClearStars };
