import { deepCopy } from '../shared/copy.js';
import { Vars } from './star_battle/shared_vars.js';

Vars.cagesBoard = JSON.parse(JSON.parse(Vars.board.parentElement.dataset.board));
const sizeValue = Vars.cagesBoard.length;

const checkGrid = document.getElementById('check-grid');
const clearGrid = document.getElementById('clear-grid');

const stars = parseInt(JSON.parse(Vars.board.parentElement.dataset.stars));

const fillBoard = () => {
  Vars.board.innerHTML = '';
  for (let j = 0; j < sizeValue; j += 1) {
    Vars.board.insertAdjacentHTML('beforeend', `<tr draggable="false">`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < sizeValue; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable" draggable="false"></td>`);
    }
    Vars.board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoards = () => {
  for (let j = 0; j < sizeValue; j += 1) {
    const latestRow = [];
    for (let i = 0; i < sizeValue; i += 1) {
      latestRow.push(0);
    }
    Vars.answerBoard.push(deepCopy(latestRow));
  }
};

const solveModeClick = (cell, i, j) => {
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
  const height = sizeValue;
  const width = sizeValue;
  for (let i = 0; i < width; i += 1) {
    Vars.board.childNodes[0].childNodes[i].classList.add('border-top');
    Vars.board.childNodes[height - 1].childNodes[i].classList.add('border-bottom');
  }
  for (let j = 0; j < height; j += 1) {
    Vars.board.childNodes[j].childNodes[0].classList.add('border-left');
    Vars.board.childNodes[j].childNodes[width - 1].classList.add('border-right');
  }
};

const createCageBorders = () => {
  Vars.cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    editCellBorders(cell, i, j);
  })
};

const editBorderTop = (cell, i, j) => {
  if (Vars.cagesBoard[j - 1]) {
    if (Vars.cagesBoard[j - 1][i] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-top');
      Vars.board.childNodes[j - 1].childNodes[i].classList.add('border-bottom');
    } else {
      cell.classList.remove('border-top');
      Vars.board.childNodes[j - 1].childNodes[i].classList.remove('border-bottom');
    }
  }
};

const editBorderBottom = (cell, i, j) => {
  if (Vars.cagesBoard[j + 1]) {
    if (Vars.cagesBoard[j + 1][i] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-bottom');
      Vars.board.childNodes[j + 1].childNodes[i].classList.add('border-top');
    } else {
      cell.classList.remove('border-bottom');
      Vars.board.childNodes[j + 1].childNodes[i].classList.remove('border-top');
    }
  }
};

const editBorderLeft = (cell, i, j) => {
  if (i > 0) {
    if (Vars.cagesBoard[j][i - 1] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-left');
      Vars.board.childNodes[j].childNodes[i - 1].classList.add('border-right');
    } else {
      cell.classList.remove('border-left');
      Vars.board.childNodes[j].childNodes[i - 1].classList.remove('border-right');
    }
  }
};

const editBorderRight = (cell, i, j) => {
  if (i < Vars.cagesBoard[0].length - 1) {
    if (Vars.cagesBoard[j][i + 1] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-right');
      Vars.board.childNodes[j].childNodes[i + 1].classList.add('border-left');
    } else {
      cell.classList.remove('border-right');
      Vars.board.childNodes[j].childNodes[i + 1].classList.remove('border-left');
    }
  }
};

const editCellBorders = (cell, i ,j) => {
  editBorderTop(cell, i, j);
  editBorderBottom(cell, i, j);
  editBorderLeft(cell, i, j);
  editBorderRight(cell, i, j);
};

const activateBoard = () => {
  Vars.cells.forEach((cell) => {
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
  createBoards();
  Vars.cells = document.querySelectorAll('#board td');
  createTableBorders();
  createCageBorders();
  activateBoard();
};

init();

clearGrid.addEventListener('click', (event) => {
  for (let j = 0; j < sizeValue; j += 1) {
    for (let i = 0; i < sizeValue; i += 1) {
      const cell = Vars.board.childNodes[j].childNodes[i];
      while (Vars.answerBoard[j][i] != 0) {
        solveModeClick(cell, i, j);
      }
    }
  }
})

const countStarsInRow = (j) => {
  let count = 0;
  for (let i = 0; i < sizeValue; i += 1) {
    if (Vars.answerBoard[j][i] == 2) {
      count += 1;
    }
  }
  return count;
};

const countStarsInCol = (i) => {
  let count = 0;
  for (let j = 0; j < sizeValue; j += 1) {
    if (Vars.answerBoard[j][i] == 2) {
      count += 1;
    }
  }
  return count;
};

const countStarsInCage = (cage) => {
  let count = 0;
  for (let i = 0; i < sizeValue; i += 1) {
    for (let j = 0; j < sizeValue; j += 1) {
      if (Vars.cagesBoard[j][i] == cage && Vars.answerBoard[j][i] == 2) {
        count += 1;
      }
    }
  }
  return count;
};

const checkNeighbourhoodEmpty = (i, j) => {
  if (j > 0) {
    if (Vars.answerBoard[j-1][i-1] == 2) { return false; }
    if (Vars.answerBoard[j-1][i] == 2) { return false; }
    if (Vars.answerBoard[j-1][i+1] == 2) { return false; }
  }
  if (Vars.answerBoard[j][i-1] == 2) { return false; }

  return true;
};

checkGrid.addEventListener('click', (event) => {
  let correct = true;
  const checkedCages = [];
  for (let i = 0; i < sizeValue; i += 1) {
    if (countStarsInRow(i) != stars || countStarsInCol(i) != stars) {
      correct = false;
    }
  }
  for (let i = 0; i < sizeValue; i += 1) {
    for (let j = 0; j < sizeValue; j += 1) {
      if (Vars.answerBoard[j][i] == 2 && !checkNeighbourhoodEmpty(i, j)) {
        correct = false;
      }
      const currentCage = Vars.cagesBoard[j][i]
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
