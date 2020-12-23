import { deepCopy, deepCopyObject } from '../shared/copy.js';

const rows = document.getElementById('rows');
const cols = document.getElementById('cols');
const turnColour = document.getElementById('turn-colour');
const displayBoard = document.getElementById('board');
const undoButton = document.getElementById('undo');
const resetButton = document.getElementById('reset');

let state = {};
const stateQueue = [];

const createInternalBoard = () => {
  const temp = [];
  for (let j = 0; j < rows.value; j += 1) {
    const latestRow = [];
    for (let i = 0; i < cols.value; i += 1) {
      latestRow.push('');
    }
    temp.push(deepCopy(latestRow));
  }
  return temp;
};

const createDisplayBoard = () => {
  displayBoard.innerHTML = '';
  for (let j = 0; j < rows.value; j += 1) {
    displayBoard.insertAdjacentHTML('beforeend', `<tr>`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < cols.value; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white"></td>`);
    }
    displayBoard.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const isSquareCandidate = (distances, i, j) => {
  return Math.abs(distances[i][0]) == Math.abs(distances[j][1])
    && Math.abs(distances[i][1]) == Math.abs(distances[j][0])
    && (distances[i][0] * distances[i][1] * distances[j][0] * distances[j][1]) <= 0;
};

const isSquare = (distances, i , j) => {
  const neededX = distances[i][0] + distances[j][0];
  const neededY = distances[i][1] + distances[j][1];
  return distances.some(([i, j]) => i == neededX && j == neededY);
};

const testForSquares = (colour, newX, newY) => {
  const moves = colour == 0 ? state.movesPlayer0 : state.movesPlayer1;
  if (moves.length > 0) {
    const distances = moves.map(([i,j]) => [newX - i, newY - j]);
    for (let i = 0; i < distances.length - 1; i += 1) {
      for (let j = i + 1; j < distances.length; j += 1) {
        if (isSquareCandidate(distances, i, j)) {
          if (isSquare(distances, i, j)) {
            window.alert('Square!');
          }
        }
      }
    }
  }
  moves.push([parseInt(newX), parseInt(newY)]);
};

const handleClick = (cell, x, y) => {
  // Update display board
  cell.innerHTML = 'o';
  if (state.playerColour == 0) {
    cell.classList.add('red-txt');
  } else {
    cell.classList.add('blue-txt');
  }

  // Update internal board
  state.internalBoard[y][x] = state.playerColour;

  // Test whether the new move has created any squares
  testForSquares(state.playerColour, x, y);

  // Change colour to give other player next turn
  state.playerColour = 1 - state.playerColour;
  turnColour.innerHTML = state.playerColour == 0 ? "Red" : "Blue";

  // Add the new state to the state queue
  state.boardHTML = displayBoard.innerHTML;
  stateQueue.push(deepCopyObject(state));
};

const activateDisplayBoard = () => {
  const cells = document.querySelectorAll('td');
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
        const x = cell.dataset.x;
        const y = cell.dataset.y;
        if (state.internalBoard[y][x] === '') {
          handleClick(cell, x, y);
        }
    })
  })
};

const init = () => {
  state.internalBoard = createInternalBoard();
  state.movesPlayer0 = [];
  state.movesPlayer1 = [];
  state.playerColour = 0;

  createDisplayBoard();
  activateDisplayBoard();
  turnColour.innerHTML = "Red";
};

init();

rows.addEventListener('input', (event) => { init(); })
cols.addEventListener('input', (event) => { init(); })

undoButton.addEventListener('click', (event) => {
  stateQueue.pop();
  state = deepCopyObject(stateQueue[stateQueue.length - 1]);
  board.innerHTML = state.boardHTML;
  activateDisplayBoard();
  turnColour.innerHTML = state.playerColour == 0 ? "Red" : "Blue";
})

resetButton.addEventListener('click', (event) => {
  init();
})
