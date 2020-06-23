import { check } from './wahnu_check.js';

const board = document.getElementById('board');
const boardState = [];

const fillBoard = () => {
  for (let j = 0; j < puzzle.length; j += 1) {
    board.insertAdjacentHTML('beforeend', `<tr>`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < puzzle[0].length; i += 1) {
      if (puzzle[j][i] === '.') {
        latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable"></td>`);
      } else {
        latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white">${puzzle[j][i]}</td>`);
      }
    }
    board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoardState = () => {
  for (let j = 0; j < puzzle.length; j += 1) {
    const latestRow = [];
    for (let i = 0; i < puzzle[0].length; i += 1) {
      latestRow.push(0);
    }
    boardState.push(latestRow);
  }
};

const activateBoard = () => {
  const cells = document.querySelectorAll('#board td');
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      const j = cell.dataset.y;
      const i = cell.dataset.x;

      if (puzzle[j][i] === '.') {
        if (boardState[j][i] === 0) {
          cell.classList.remove('white');
          cell.classList.add('black');
          boardState[j][i] = 1;
        } else if (boardState[j][i] === 1) {
          cell.classList.remove('black');
          cell.classList.add('red');
          boardState[j][i] = 2;
        } else {
          cell.classList.remove('red');
          cell.classList.add('white');
          boardState[j][i] = 0;
        }
      }
    })
  })
};

const createBoard = () => {
  fillBoard();
  createBoardState();
  activateBoard();
};

createBoard();

export { puzzle, boardState };
