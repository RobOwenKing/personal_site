import { deepCopy, deepCopyObject } from '../shared/copy.js';

const rows = document.getElementById('rows');
const cols = document.getElementById('cols');
const turnColour = document.getElementById('turn-colour');
const displayBoard = document.getElementById('board');
const undoButton = document.getElementById('undo');
const resetButton = document.getElementById('reset');

let state = {};
// Saving copies of above state for undo function
const stateQueue = [];

// An array of arrays to store current board position
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

// Fill the empty <tbody> with rows and cells
const createDisplayBoard = () => {
  displayBoard.innerHTML = '';
  for (let j = 0; j < rows.value; j += 1) {
    displayBoard.insertAdjacentHTML('beforeend', `<tr>`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < cols.value; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td id="${i}-${j}" data-x="${i}" data-y="${j}" class="white"></td>`);
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

const addSymbolOutline = (cell) => {
  cell.classList.add('symbol-outline');
}

const highlightSquare = (cell, x, y, moves, i, j) => {
  // First corner
  addSymbolOutline(cell);

  // Second corner
  const corner2 = document.getElementById(`${moves[i][0]}-${moves[i][1]}`);
  addSymbolOutline(corner2);

  // Third corner
  const corner3 = document.getElementById(`${moves[j][0]}-${moves[j][1]}`);
  addSymbolOutline(corner3);

  // Fourth corner
  const corner4X = (moves[i][0] + moves[j][0]) - x;
  const corner4Y = (moves[i][1] + moves[j][1]) - y;
  const corner4 = document.getElementById(`${corner4X}-${corner4Y}`);
  addSymbolOutline(corner4);
};

const testForSquares = (colour, cell, newX, newY) => {
  const moves = colour == 0 ? state.movesPlayer0 : state.movesPlayer1;
  if (moves.length > 0) {
    const distances = moves.map(([i,j]) => [newX - i, newY - j]);
    for (let i = 0; i < distances.length - 1; i += 1) {
      for (let j = i + 1; j < distances.length; j += 1) {
        if (isSquareCandidate(distances, i, j)) {
          if (isSquare(distances, i, j)) {
            window.alert('Square!');
            highlightSquare(cell, newX, newY, moves, i ,j);
          }
        }
      }
    }
  }
  moves.push([newX, newY]);
};

const updateTurnColour = () => {
  if (state.playerColour == 0) {
    turnColour.innerHTML = '<strong class="b-orange-txt">Orange</strong>';
  } else {
    turnColour.innerHTML = '<strong class="b-blue-txt">Blue</strong>';
  }
}

const handleClick = (cell, x, y) => {
  // Update display board
  cell.innerHTML = '<i class="fas fa-circle"></i>';
  if (state.playerColour == 0) {
    cell.classList.add('b-orange-txt');
  } else {
    cell.classList.add('b-blue-txt');
  }

  // Update internal board
  state.internalBoard[y][x] = state.playerColour;

  // Test whether the new move has created any squares
  testForSquares(state.playerColour, cell, parseInt(x), parseInt(y));

  // Change colour to give other player next turn
  state.playerColour = 1 - state.playerColour;
  updateTurnColour();

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
  createDisplayBoard();
  activateDisplayBoard();
  state.boardHTML = displayBoard.innerHTML;

  state.internalBoard = createInternalBoard();
  state.movesPlayer0 = [];
  state.movesPlayer1 = [];

  state.playerColour = 0;
  updateTurnColour();

  // Push the initial state into the queue
  stateQueue.push(deepCopyObject(state));
};

// When the user changes the number of rows or columns, reset everything
rows.addEventListener('input', (event) => { init(); })
cols.addEventListener('input', (event) => { init(); })

undoButton.addEventListener('click', (event) => {
  // Remove the current state from the state queue
  stateQueue.pop();
  state = deepCopyObject(stateQueue[stateQueue.length - 1]);
  board.innerHTML = state.boardHTML;
  activateDisplayBoard();
  updateTurnColour();
})

resetButton.addEventListener('click', (event) => {
  init();
})

init();
