import { deepCopy } from '../shared/copy.js';

const board = document.getElementById('board');
let cells;
const cagesBoard = JSON.parse(JSON.parse(board.parentElement.dataset.board));
const sizeValue = cagesBoard.length;
const answerBoard = [];

const checkGrid = document.getElementById('check-grid');
const clearGrid = document.getElementById('clear-grid');

const stars = document.getElementById('stars');

const fillBoard = () => {
  board.innerHTML = '';
  for (let j = 0; j < sizeValue; j += 1) {
    board.insertAdjacentHTML('beforeend', `<tr draggable="false">`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < sizeValue; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable" draggable="false"></td>`);
    }
    board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoards = () => {
  for (let j = 0; j < sizeValue; j += 1) {
    const latestRow = [];
    for (let i = 0; i < sizeValue; i += 1) {
      latestRow.push(0);
    }
    answerBoard.push(deepCopy(latestRow));
  }
};

const solveModeClick = (cell, i, j) => {
  answerBoard[j][i] = (answerBoard[j][i] + 1) % 4;

  if (answerBoard[j][i] === 0) {
    cell.classList.remove('blue-txt');
    cell.classList.add('white');
    cell.innerHTML = '';
  } else if (answerBoard[j][i] === 1) {
    cell.classList.remove('white');
    cell.classList.add('red-txt');
    cell.innerHTML = '<i class="fas fa-times"></i>';
  } else if (answerBoard[j][i] === 2) {
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
    board.childNodes[0].childNodes[i].classList.add('border-top');
    board.childNodes[height - 1].childNodes[i].classList.add('border-bottom');
  }
  for (let j = 0; j < height; j += 1) {
    board.childNodes[j].childNodes[0].classList.add('border-left');
    board.childNodes[j].childNodes[width - 1].classList.add('border-right');
  }
};

const createCageBorders = () => {
  cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    editCellBorders(cell, i, j);
  })
};

const editBorderTop = (cell, i, j) => {
  if (cagesBoard[j - 1]) {
    if (cagesBoard[j - 1][i] !== cagesBoard[j][i]) {
      cell.classList.add('border-top');
      board.childNodes[j - 1].childNodes[i].classList.add('border-bottom');
    } else {
      cell.classList.remove('border-top');
      board.childNodes[j - 1].childNodes[i].classList.remove('border-bottom');
    }
  }
};

const editBorderBottom = (cell, i, j) => {
  if (cagesBoard[j + 1]) {
    if (cagesBoard[j + 1][i] !== cagesBoard[j][i]) {
      cell.classList.add('border-bottom');
      board.childNodes[j + 1].childNodes[i].classList.add('border-top');
    } else {
      cell.classList.remove('border-bottom');
      board.childNodes[j + 1].childNodes[i].classList.remove('border-top');
    }
  }
};

const editBorderLeft = (cell, i, j) => {
  if (i > 0) {
    if (cagesBoard[j][i - 1] !== cagesBoard[j][i]) {
      cell.classList.add('border-left');
      board.childNodes[j].childNodes[i - 1].classList.add('border-right');
    } else {
      cell.classList.remove('border-left');
      board.childNodes[j].childNodes[i - 1].classList.remove('border-right');
    }
  }
};

const editBorderRight = (cell, i, j) => {
  if (i < cagesBoard[0].length - 1) {
    if (cagesBoard[j][i + 1] !== cagesBoard[j][i]) {
      cell.classList.add('border-right');
      board.childNodes[j].childNodes[i + 1].classList.add('border-left');
    } else {
      cell.classList.remove('border-right');
      board.childNodes[j].childNodes[i + 1].classList.remove('border-left');
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
  cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    cell.addEventListener('mousedown', (event) => {
      solveModeClick(cell, i, j);
    })
  })
};

const init = () => {
  fillBoard();
  createBoards();
  cells = document.querySelectorAll('#board td');
  createTableBorders();
  createCageBorders();
  activateBoard();
};

init();

clearGrid.addEventListener('click', (event) => {
  init();
})

const starPossibleInRow = (i, j) => {
  let starsInRow = 0;
  for (let k = 0; k < i; k += 1) {
    if (answerBoard[j][k] != 0) {
      starsInRow += 1;
    }
  }
  const answer = starsInRow < stars.value ? true : false;
  return answer;
};

const starPossibleInCol = (i, j) => {
  let starsInCol = 0;
  for (let k = 0; k < j; k += 1) {
    if (answerBoard[k][i] != 0) {
      starsInCol += 1;
    }
  }
  const answer = starsInCol < stars.value ? true : false;
  return answer;
};

const starPossibleInNeighbourhood = (i, j) => {
  if (j > 0) {
    if (answerBoard[j-1][i-1] && answerBoard[j-1][i-1] != 0) { return false; }
    if (answerBoard[j-1][i] != 0) { return false; }
    if (answerBoard[j-1][i+1] && answerBoard[j-1][i+1] != 0) { return false; }
  }

  if (i > 0) {
    if (answerBoard[j][i-1] != 0) { return false; }
    if (answerBoard[j+1] && answerBoard[j+1][i-1] != 0) { return false; }
  }

  return true;
};

const starPossibleInCage = (i, j) => {
  const cageNumber = cagesBoard[j][i];
  let starsInCage = 0;
  for (let l = 0; l < sizeValue; l += 1) {
    for (let k = 0; k < sizeValue; k += 1) {
      if (cagesBoard[l][k] === cageNumber && answerBoard[l][k] != 0) { starsInCage += 1; }
    }
  }
  const answer = starsInCage < stars.value ? true : false;
  return answer;
}

const numStarsInRow = (j) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return answerBoard[j].reduce(reducer);
};
