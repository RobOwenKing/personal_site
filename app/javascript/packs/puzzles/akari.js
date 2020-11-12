import { deepCopy } from '../shared/copy.js';

const board = document.getElementById('board');

const puzzleBoard = [
  ['.', '?', '.'],
  ['.', '3', '.'],
  ['.', '.', '.'],
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
}

const fillCell = (i, j) => {
  const value = puzzleBoard[j][i];
  if (value === '.') {
    return `<td data-x="${i}" data-y="${j}" class="white clickable"></td>`
  } else {
    return `<td data-x="${i}" data-y="${j}" class="black">${value === '?' ? '' : value}</td>`
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

const handleClick = (cell) => {
  const j = cell.dataset.y;
  const i = cell.dataset.x;
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
  }
}

const activateCells = () => {
  const cells = document.querySelectorAll('#board [class*="white"]')
  console.log(cells);
  cells.forEach((cell) => {
    cell.addEventListener('mousedown', (event) => {
      handleClick(cell);
    });
  });
};

const answerBoard = createBoard();
const checkBoard = createBoard();

fillBoard();
activateCells();
