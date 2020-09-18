import { VARS, createAnswerBoard } from './star_battle/setup.js';
import { editCellBorders } from './star_battle/edit_borders.js';
import { initClearStars } from './star_battle/clear.js';
import { initCheckGrid } from './star_battle/check_grid.js';
import { solveModeClick } from './star_battle/clicks.js';

VARS.cagesBoard = JSON.parse(JSON.parse(VARS.board.parentElement.dataset.board));
VARS.sizeValue = VARS.cagesBoard.length;

initClearStars();
initCheckGrid();

const fillBoard = () => {
  VARS.board.innerHTML = '';
  for (let j = 0; j < VARS.sizeValue; j += 1) {
    VARS.board.insertAdjacentHTML('beforeend', `<tr draggable="false">`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < VARS.sizeValue; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable" draggable="false"></td>`);
    }
    VARS.board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createTableBorders = () => {
  const height = VARS.sizeValue;
  const width = VARS.sizeValue;
  for (let i = 0; i < width; i += 1) {
    VARS.board.childNodes[0].childNodes[i].classList.add('border-top');
    VARS.board.childNodes[height - 1].childNodes[i].classList.add('border-bottom');
  }
  for (let j = 0; j < height; j += 1) {
    VARS.board.childNodes[j].childNodes[0].classList.add('border-left');
    VARS.board.childNodes[j].childNodes[width - 1].classList.add('border-right');
  }
};

const createCageBorders = () => {
  VARS.cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    editCellBorders(cell, i, j);
  })
};

const activateBoard = () => {
  VARS.cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    cell.addEventListener('mousedown', (event) => {
      solveModeClick(cell, i, j);
    })
  })
};

const init = () => {
  fillBoard();
  createAnswerBoard();
  VARS.cells = document.querySelectorAll('#board td');
  createTableBorders();
  createCageBorders();
  activateBoard();
};

init();
