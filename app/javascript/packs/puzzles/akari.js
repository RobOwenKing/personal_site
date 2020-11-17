import { deepCopy } from '../shared/copy.js';

const board = document.getElementById('board');

const puzzleBoard = [
  ['.', '.', '.'],
  ['.', '3', '.'],
  ['.', '.', '2'],
];

const createBoard = () => {
  const temp = [];
  for (let j = 0; j < puzzleBoard.length; j += 1) {
    const latestRow = [];
    for (let i = 0; i < puzzleBoard[0].length; i += 1) {
      latestRow.push(0);
    }
    temp.push(deepCopy(latestRow));
  }
  return temp;
};

const createCheckBoard = (newBoard) => {
  for (let j = 0; j < puzzleBoard.length; j += 1) {
    for (let i = 0; i < puzzleBoard[0].length; i += 1) {
      if (puzzleBoard[j][i] === '-') { newBoard[j][i] = 1; }
    }
  }
  return newBoard;
};

const fillCell = (i, j) => {
  const value = puzzleBoard[j][i];
  if (value === '.') {
    return `<td id="cell-${i}-${j}" data-x="${i}" data-y="${j}" class="white clickable"></td>`
  } else {
    return `<td id="cell-${i}-${j}" data-x="${i}" data-y="${j}" class="black">${value === '-' ? '' : value}</td>`
  }
};

const fillBoard = () => {
  for (let j = 0; j < puzzleBoard.length; j += 1) {
    board.insertAdjacentHTML('beforeend', `<tr>`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < puzzleBoard[0].length; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', fillCell(i, j));
    }
    board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const findCell = (i, j) => {
  return document.getElementById(`cell-${i}-${j}`);
};

const updateNumber = (i, j) => {
  const cell = findCell(i, j);
  if (checkBoard[j][i] > puzzleBoard[j][i]) {
    cell.classList.remove('green-txt');
    cell.classList.add('red-txt');
    cell.innerHTML = puzzleBoard[j][i];
  } else if (checkBoard[j][i] == puzzleBoard[j][i]) {
    cell.classList.remove('red-txt');
    cell.classList.add('green-txt');
    cell.innerHTML = '<i class="fas fa-check"></i>';
  } else {
    cell.classList.remove('green-txt');
    cell.innerHTML = puzzleBoard[j][i];
  }
};

const handleAddingNeighbour = (i, j) => {
  checkBoard[j][i] += 1;
  updateNumber(i, j);
};

const handleRemovingNeighbour = (i, j) => {
  checkBoard[j][i] -= 1;
  updateNumber(i, j);
};

const handleYellowBackground = (i, j) => {
  const cell = findCell(i, j);
  if (checkBoard[j][i] > 0) {
    cell.classList.add('yellow-bg');
  } else {
    cell.classList.remove('yellow-bg');
  }
  if (answerBoard[j][i] == 2 && checkBoard[j][i] > 1) {
    cell.classList.add('red-txt');
  } else {
    cell.classList.remove('red-txt');
  }
};

const propagateAddedLight = (i, j, deltaI, deltaJ, isImmediateNeighbour) => {
  const currentI = i + deltaI;
  const currentJ = j + deltaJ;
  if (puzzleBoard[currentJ] && puzzleBoard[currentJ][currentI]) {
    if (puzzleBoard[currentJ][currentI] != '.') {
      if (isImmediateNeighbour) { handleAddingNeighbour(currentI, currentJ); }
    } else {
      checkBoard[currentJ][currentI] += 1;
      handleYellowBackground(currentI, currentJ);
      propagateAddedLight(currentI, currentJ, deltaI, deltaJ, false);
    }
  }
};

const propagateRemovedLight = (i, j, deltaI, deltaJ, isImmediateNeighbour) => {
  const currentI = i + deltaI;
  const currentJ = j + deltaJ;
  if (puzzleBoard[currentJ] && puzzleBoard[currentJ][currentI]) {
    if (puzzleBoard[currentJ][currentI] != '.') {
      if (isImmediateNeighbour) { handleRemovingNeighbour(currentI, currentJ); }
    } else {
      checkBoard[currentJ][currentI] -= 1;
      handleYellowBackground(currentI, currentJ);
      propagateRemovedLight(currentI, currentJ, deltaI, deltaJ, false);
    }
  }
};

const handleAddingLight = (i, j) => {
  propagateAddedLight(i, j, -1, 0, true);
  propagateAddedLight(i, j, 1, 0, true);
  propagateAddedLight(i, j, 0, -1, true);
  propagateAddedLight(i, j, 0, 1, true);
};

const handleRemovingLight = (i, j) => {
  propagateRemovedLight(i, j, -1, 0, true);
  propagateRemovedLight(i, j, 1, 0, true);
  propagateRemovedLight(i, j, 0, -1, true);
  propagateRemovedLight(i, j, 0, 1, true);
};

const handleClick = (cell) => {
  const j = parseInt(cell.dataset.y);
  const i = parseInt(cell.dataset.x);
  answerBoard[j][i] = (answerBoard[j][i] + 1) % 3;

  if (answerBoard[j][i] === 0) {
    checkBoard[j][i] -= 1;
    cell.innerHTML = '';
    handleRemovingLight(i, j);
  } else if (answerBoard[j][i] === 1) {
    cell.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    checkBoard[j][i] += 1;
    cell.innerHTML = '<i class="far fa-lightbulb"></i>';
    handleAddingLight(i, j);
  }
  handleYellowBackground(i, j);
};

const activateCells = () => {
  const cells = document.querySelectorAll('#board [class*="white"]')
  cells.forEach((cell) => {
    cell.addEventListener('mousedown', (event) => {
      handleClick(cell);
    });
  });
};

const answerBoard = createBoard();
const checkBoard = createCheckBoard(createBoard());

console.log(answerBoard);
console.log(checkBoard);

fillBoard();
activateCells();
