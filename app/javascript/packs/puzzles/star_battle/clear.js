import { editCellBorders } from './edit_borders.js';
import { Vars } from './shared_vars.js';
import { createCagesBoard, solveModeClick } from '../star_battle.js';

const clearCages = document.getElementById('clear-cages');
const clearStars = document.getElementById('clear-stars');

const initClearCages = () => {
  clearCages.addEventListener('click', (event) => {
    createCagesBoard();
    for (let j = 0; j < Vars.sizeValue; j += 1) {
      for (let i = 0; i < Vars.sizeValue; i += 1) {
        editCellBorders(Vars.board.childNodes[j].childNodes[i], i, j);
      }
    }
  })
};

const initClearStars = () => {
  clearStars.addEventListener('click', (event) => {
    for (let j = 0; j < Vars.sizeValue; j += 1) {
      for (let i = 0; i < Vars.sizeValue; i += 1) {
        const cell = Vars.board.childNodes[j].childNodes[i];
        while (Vars.answerBoard[j][i] != 0) {
          solveModeClick(cell, i, j);
        }
      }
    }
  })
};

export { initClearCages, initClearStars };
