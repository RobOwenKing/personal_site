import { VARS, createBoards, fillBoard, createTableBorders } from './star_battle/setup.js';
import { editCellBorders } from './star_battle/edit_borders.js';
import { mode, initModes } from './star_battle/modes.js';
import { solveModeClick } from './star_battle/clicks.js';
import { initClearCages, initClearStars } from './star_battle/clear.js';
import { initBruteForce } from './star_battle/brute_force.js';

let creatingCages = false;
let nextCageNumber = 0;

const size = document.getElementById('size');
VARS.sizeValue = parseInt(size.value);
const stars = document.getElementById('stars');

const formStars = document.getElementById('star_battle_stars');
const formBoard = document.getElementById('star_battle_board');

initModes();
initClearCages();
initClearStars();
initBruteForce();

const enterModeClick = (cell, i, j) => {
  creatingCages = true;
  nextCageNumber += 1;
  VARS.cagesBoard[j][i] = nextCageNumber;
  editCellBorders(cell, i, j);
};

const activateBoard = () => {
  VARS.cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    cell.addEventListener('mousedown', (event) => {
      if (mode === 'solve') {
        solveModeClick(cell, i, j);
      } else {
        enterModeClick(cell, i, j);
      }
    })

    cell.addEventListener('mouseenter', (event) => {
      if (creatingCages === true) {
        VARS.cagesBoard[j][i] = nextCageNumber;
        editCellBorders(cell, i, j);

        if (formBoard) {
          formBoard.value = JSON.stringify(VARS.cagesBoard);
        }
      }
    })
  })
};

document.addEventListener('mouseup', (event) => {
  creatingCages = false;
})

const init = () => {
  fillBoard();
  createBoards();
  VARS.cells = document.querySelectorAll('#board td');
  createTableBorders();
  activateBoard();

  if (formStars) {
    formStars.value = stars.value;
  }
};

init();

size.addEventListener('input', (event) => {
  VARS.sizeValue = size.value;
  init();
})

stars.addEventListener('input', (event) => {
  if (formStars) {
    formStars.value = stars.value;
  }
})
