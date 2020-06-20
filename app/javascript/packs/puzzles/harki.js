const board = document.getElementById('board');

const dimensions = [5, 4];
const cols = [1, 3, 1, 2, 2];
const rows = [1, 2, 1, 3];
const boardState = [];

/*const dimensions = [4, 4];
const cols = [1, 3, 1, 2];
const rows = [1, 2, 1, 4];*/

const fillBoard = () => {
  // Create top row
  board.insertAdjacentHTML('beforeend', '<tr><th></th>');
  const headers = document.querySelector('#board > tr:last-child');
  for (let i = 0; i < dimensions[0]; i += 1) {
    headers.insertAdjacentHTML('beforeend', `<th>${cols[i]}</th>`);
  }
  board.insertAdjacentHTML('beforeend', '</tr>');

  for (let j = 0; j < dimensions[1]; j += 1) {
    board.insertAdjacentHTML('beforeend', `<tr><th>${rows[j]}</th>`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let k = 0; k < dimensions[0]; k += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${k}" data-y="${j}"></td>`);
    }
    board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoardState = () => {
  for (let i = 0; i < dimensions[1]; i += 1) {
    const latestRow = [];
    for (let j = 0; j < dimensions[0]; j += 1) {
      latestRow.push('1');
    }
    boardState.push(latestRow);
  }
  console.log(boardState);
};

const activateBoard = () => {
  const cells = document.querySelectorAll('#board td');
  cells.forEach((cell) => {
    cell.addEventListener('click', (event) => {
      boardState[cell.dataset.y][cell.dataset.x] = 1 - boardState[cell.dataset.y][cell.dataset.x];
      cell.style.opacity = boardState[cell.dataset.y][cell.dataset.x];
    })
  })
};

const createBoard = () => {
  fillBoard();
  createBoardState();
  activateBoard();
};

createBoard();
