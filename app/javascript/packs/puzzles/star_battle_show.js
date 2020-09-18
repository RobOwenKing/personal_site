import { VARS, createAnswerBoard } from './star_battle/setup.js';
import { editCellBorders } from './star_battle/edit_borders.js';
import { initClearStars } from './star_battle/clear.js';

VARS.cagesBoard = JSON.parse(JSON.parse(VARS.board.parentElement.dataset.board));
VARS.sizeValue = VARS.cagesBoard.length;

initClearStars();

const checkGrid = document.getElementById('check-grid');
const clearGrid = document.getElementById('clear-grid');

const stars = parseInt(JSON.parse(VARS.board.parentElement.dataset.stars));

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

const solveModeClick = (cell, i, j) => {
  VARS.answerBoard[j][i] = (VARS.answerBoard[j][i] + 1) % 4;

  if (VARS.answerBoard[j][i] === 0) {
    cell.classList.remove('blue-txt');
    cell.classList.add('white');
    cell.innerHTML = '';
  } else if (VARS.answerBoard[j][i] === 1) {
    cell.classList.remove('white');
    cell.classList.add('red-txt');
    cell.innerHTML = '<i class="fas fa-times"></i>';
  } else if (VARS.answerBoard[j][i] === 2) {
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
      countStarsInCol(i);
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

checkGrid.addEventListener('click', (event) => {
  let correct = true;
  const checkedCages = [];
  for (let i = 0; i < VARS.sizeValue; i += 1) {
    if (countStarsInRow(i) != stars || countStarsInCol(i) != stars) {
      correct = false;
    }
  }
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
  console.log(correct);
})
