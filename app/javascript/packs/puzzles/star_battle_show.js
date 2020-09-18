import { VARS, createAnswerBoard, fillBoard, createTableBorders } from './star_battle/setup.js';
import { editCellBorders } from './star_battle/edit_borders.js';
import { initClearStars } from './star_battle/clear.js';
import { initCheckGrid } from './star_battle/check_grid.js';
import { solveModeClick } from './star_battle/clicks.js';

VARS.cagesBoard = JSON.parse(JSON.parse(VARS.board.parentElement.dataset.board));
VARS.sizeValue = VARS.cagesBoard.length;

initClearStars();
initCheckGrid();

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
