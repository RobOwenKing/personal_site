const board = document.getElementById('board');

const puzzleBoard = [
  ['.', '?', '.'],
  ['.', '3', '.'],
  ['.', '.', '.'],
];

const fillCell = (i, j) => {
  const value = puzzleBoard[j][i];
  if (value === '.') {
    return `<td data-x="${i}" data-y="${j}" class="white clickable"></td>`
  } else if (value === '?') {
    return `<td data-x="${i}" data-y="${j}" class="black"></td>`
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

fillBoard();
