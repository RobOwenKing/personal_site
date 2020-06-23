const board = document.getElementById('board');
const boardState = [];

const enterButton = document.getElementById('btn-enter');
const solveButton = document.getElementById('btn-solve');
let mode = 'enter';

solveButton.addEventListener('click', (event) => {
  mode = 'solve';
  solveButton.classList.add('btn-active');
  enterButton.classList.remove('btn-active');
});

enterButton.addEventListener('click', (event) => {
  mode = 'enter';
  enterButton.classList.add('btn-active');
  solveButton.classList.remove('btn-active');
});

const fillBoard = () => {
  for (let j = 0; j < 6; j += 1) {
    board.insertAdjacentHTML('beforeend', `<tr>`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < 8; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable"></td>`);
    }
    board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoardState = () => {
  for (let j = 0; j < 6; j += 1) {
    const latestRow = [];
    for (let i = 0; i < 8; i += 1) {
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
    })
  })
};

const createBoard = () => {
  fillBoard();
  createBoardState();
  activateBoard();
};

createBoard();
