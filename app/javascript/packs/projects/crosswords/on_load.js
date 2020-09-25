import { grid, question } from '../crosswords.js';

const createGrid = (puzzle) => {
  for (let j = 0; j < puzzle.size[1]; j += 1) {
    grid.insertAdjacentHTML('beforeend', '<tr></tr>');

    const latestRow = document.querySelector('tbody tr:last-child');
    for (let i = 0; i < puzzle.size[0]; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td id='${i}-${j}' data-i='${i}' data-j='${j}'></td>`);
    }
  }
};

const createAcrosses = (puzzle) => {
  puzzle.aQs.forEach((answer, pos) => {
    let j = answer[2];
    let i = answer[3];

    for (let k = 0; k < answer[0].length; k += 1) {
      const cell = document.getElementById(`${i+k}-${j}`);
      cell.classList.add('white');
      cell.insertAdjacentHTML('beforeend',
      `<input type="text" maxlength="1" data-a='${pos}' />`);
    }
  });
};

const createDowns = (puzzle) => {
  puzzle.dQs.forEach((answer, pos) => {
    let j = answer[2];
    let i = answer[3];

    for (let k = 0; k < answer[0].length; k += 1) {
      const cell = document.getElementById(`${i}-${j+k}`);
      if (cell.innerHTML == '') {
        cell.classList.add('white');
        cell.insertAdjacentHTML('beforeend',
        `<input type="text" maxlength="1" data-d='${pos}' />`);
      } else {
        cell.childNodes[0].dataset.d = pos;
      }
    }
  });
};

const createBlanks = (puzzle) => {
  const cells = document.querySelectorAll('td');

  cells.forEach((cell) => {
    if (cell.innerHTML == '') {
      cell.classList.add('black');
    }
  });
};

export const onLoad = (puzzle) => {
  createGrid(puzzle);
  createAcrosses(puzzle);
  createDowns(puzzle);
  createBlanks(puzzle);
  // fillGrid(puzzle);
};
