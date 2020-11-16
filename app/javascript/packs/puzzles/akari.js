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

const updateNumber = (i, j) => {
  const cell = document.getElementById(`cell-${i}-${j}`);
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

const handleAddingLight = (i, j) => {
  if (puzzleBoard[j][i-1] && puzzleBoard[j][i-1] != '.') {
    handleAddingNeighbour(i-1, j);
  }
  if (puzzleBoard[j][i+1] && puzzleBoard[j][i+1] != '.') {
    handleAddingNeighbour(i+1, j);
  }
  if (puzzleBoard[j-1] && puzzleBoard[j-1][i] != '.') {
    handleAddingNeighbour(i, j-1);
  }
  if (puzzleBoard[j+1] && puzzleBoard[j+1][i] != '.') {
    handleAddingNeighbour(i, j+1);
  }
  console.log(checkBoard);
};

const handleClick = (cell) => {
  const j = parseInt(cell.dataset.y);
  const i = parseInt(cell.dataset.x);
  answerBoard[j][i] = (answerBoard[j][i] + 1) % 3;

  if (answerBoard[j][i] === 0) {
    cell.classList.remove('yellow-bg');
    cell.innerHTML = '';
  } else if (answerBoard[j][i] === 1) {
    cell.classList.add('red-txt');
    cell.innerHTML = '<i class="fas fa-times"></i>';
  } else {
    cell.classList.remove('red-txt');
    cell.classList.add('yellow-bg');
    cell.innerHTML = '<i class="far fa-lightbulb"></i>';
    handleAddingLight(i, j);
  }
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
