import { deepCopy } from '../shared/copy.js';

const board = document.getElementById('board');
let cells;
const cagesBoard = JSON.parse(JSON.parse(board.parentElement.dataset.board));
const sizeValue = cagesBoard.length;
const answerBoard = [];

const checkGrid = document.getElementById('check-grid');
const clearGrid = document.getElementById('clear-grid');

const stars = parseInt(JSON.parse(board.parentElement.dataset.stars));

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
      countStarsInCol(i);
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
  for (let j = 0; j < sizeValue; j += 1) {
    for (let i = 0; i < sizeValue; i += 1) {
      const cell = board.childNodes[j].childNodes[i];
      while (answerBoard[j][i] != 0) {
        solveModeClick(cell, i, j);
      }
    }
  }
})

const countStarsInRow = (j) => {
  let count = 0;
  for (let i = 0; i < sizeValue; i += 1) {
    if (answerBoard[j][i] == 2) {
      count += 1;
    }
  }
  return count;
};

const countStarsInCol = (i) => {
  let count = 0;
  for (let j = 0; j < sizeValue; j += 1) {
    if (answerBoard[j][i] == 2) {
      count += 1;
    }
  }
  return count;
};

const countStarsInCage = (cage) => {
  let count = 0;
  for (let i = 0; i < sizeValue; i += 1) {
    for (let j = 0; j < sizeValue; j += 1) {
      if (cagesBoard[j][i] == cage && answerBoard[j][i] == 2) {
        count += 1;
      }
    }
  }
  return count;
};

const checkNeighbourhoodEmpty = (i, j) => {
  if (j > 0) {
    if (answerBoard[j-1][i-1] == 2) { return false; }
    if (answerBoard[j-1][i] == 2) { return false; }
    if (answerBoard[j-1][i+1] == 2) { return false; }
  }
  if (answerBoard[j][i-1] == 2) { return false; }

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
      if (answerBoard[j][i] == 2 && !checkNeighbourhoodEmpty(i, j)) {
        correct = false;
      }
      const currentCage = cagesBoard[j][i]
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
