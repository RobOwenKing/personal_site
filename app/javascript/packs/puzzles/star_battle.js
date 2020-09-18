import { deepCopy } from '../shared/copy.js';
import { Vars } from './star_battle/shared_vars.js';
import { editCellBorders } from './star_battle/edit_borders.js';
import { mode, initModes } from './star_battle/modes.js';
import { initClearCages, initClearStars } from './star_battle/clear.js';
import { initBruteForce } from './star_battle/brute_force.js';

let creatingCages = false;
let nextCageNumber = 0;

const size = document.getElementById('size');
Vars.sizeValue = parseInt(size.value);
const stars = document.getElementById('stars');

const formStars = document.getElementById('star_battle_stars');
const formBoard = document.getElementById('star_battle_board');

initModes();
initClearCages();
initClearStars();
initBruteForce();

const fillBoard = () => {
  Vars.board.innerHTML = '';
  for (let j = 0; j < Vars.sizeValue; j += 1) {
    Vars.board.insertAdjacentHTML('beforeend', `<tr draggable="false">`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < Vars.sizeValue; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable" draggable="false"></td>`);
    }
    Vars.board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoard = () => {
  const temp = [];
  for (let j = 0; j < Vars.sizeValue; j += 1) {
    const latestRow = [];
    for (let i = 0; i < Vars.sizeValue; i += 1) {
      latestRow.push(0);
    }
    temp.push(deepCopy(latestRow));
  }
  return temp;
}

export const createCagesBoard = () => {
  Vars.cagesBoard = createBoard();
}

const createAnswerBoard = () => {
  Vars.answerBoard = createBoard();
}

const createBoards = () => {
  createCagesBoard();
  createAnswerBoard();
};

export const solveModeClick = (cell, i, j) => {
  Vars.answerBoard[j][i] = (Vars.answerBoard[j][i] + 1) % 4;

  if (Vars.answerBoard[j][i] === 0) {
    cell.classList.remove('blue-txt');
    cell.classList.add('white');
    cell.innerHTML = '';
  } else if (Vars.answerBoard[j][i] === 1) {
    cell.classList.remove('white');
    cell.classList.add('red-txt');
    cell.innerHTML = '<i class="fas fa-times"></i>';
  } else if (Vars.answerBoard[j][i] === 2) {
    cell.classList.remove('red-txt');
    cell.classList.add('yellow-txt');
    cell.innerHTML = '<i class="fas fa-star"></i>';
  } else {
    cell.classList.remove('yellow-txt');
    cell.classList.add('blue-txt');
    cell.innerHTML = '<i class="fas fa-star-half"></i>';
  }
};

const createTableBorders = () => {
  const height = Vars.sizeValue;
  const width = Vars.sizeValue;
  for (let i = 0; i < width; i += 1) {
    Vars.board.childNodes[0].childNodes[i].classList.add('border-top');
    Vars.board.childNodes[height - 1].childNodes[i].classList.add('border-bottom');
  }
  for (let j = 0; j < height; j += 1) {
    Vars.board.childNodes[j].childNodes[0].classList.add('border-left');
    Vars.board.childNodes[j].childNodes[width - 1].classList.add('border-right');
  }
};

const enterModeClick = (cell, i, j) => {
  creatingCages = true;
  nextCageNumber += 1;
  Vars.cagesBoard[j][i] = nextCageNumber;
  editCellBorders(cell, i, j);
};

const activateBoard = () => {
  Vars.cells.forEach((cell) => {
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
        Vars.cagesBoard[j][i] = nextCageNumber;
        editCellBorders(cell, i, j);

        if (formBoard) {
          formBoard.value = JSON.stringify(Vars.cagesBoard);
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
  Vars.cells = document.querySelectorAll('#board td');
  createTableBorders();
  activateBoard();

  if (formStars) {
    formStars.value = stars.value;
  }
};

init();

size.addEventListener('input', (event) => {
  Vars.sizeValue = size.value;
  init();
})

stars.addEventListener('input', (event) => {
  if (formStars) {
    formStars.value = stars.value;
  }
})
