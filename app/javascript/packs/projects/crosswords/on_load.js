import { grid, question } from '../crosswords.js';

const qNumbers = [];
const aNumbers = [];
const dNumbers = [];

const createQNumbers = (solution) => {
  let qNumber = 1;

  solution.forEach((row, j) => {
    qNumbers.push([]);

    for (let i = 0; i < solution[0].length; i += 1) {
      if (solution[j][i] == '.') {
        qNumbers[j][i] = '.';
      } else {
        if ((solution[j-1] && solution[j-1][i] == '.') || solution[j][i-1] == '.') {
          qNumbers[j][i] = qNumber;
          qNumber += 1;
        } else {
          qNumbers[j][i] = '.';
        }
      }
    }
  });
};

const createANumbers = (solution) => {
  let currentNumber = 0;

  solution.forEach((row, j) => {
    aNumbers.push([]);

    for (let i = 0; i < solution[0].length; i += 1) {
      if (solution[j][i] == '.') {
        aNumbers[j][i] = '.';
      } else {
        if (!solution[j][i-1] || solution[j][i-1] == '.') {
          aNumbers[j][i] = currentNumber;
          currentNumber += 1;
        } else {
          aNumbers[j][i] = aNumbers[j][i-1];
        }
      }
    };
  });
};

const createDNumbers = (solution) => {
  let currentNumber = 0;

  solution.forEach((row, j) => {
    dNumbers.push([]);

    for (let i = 0; i < solution[0].length; i += 1) {
      if (solution[j][i] == '.') {
        dNumbers[j][i] = '.';
      } else {
        if (!solution[j-1] || solution[j-1][i] == '.') {
          dNumbers[j][i] = currentNumber;
          currentNumber += 1;
        } else {
          dNumbers[j][i] = dNumbers[j-1][i];
        }
      }
    };
  });
};

const createGrid = (solution) => {
  for (let j = 0; j < solution.length; j += 1) {
    grid.insertAdjacentHTML('beforeend', '<tr></tr>');

    const latestRow = document.querySelector('tbody tr:last-child');
    for (let i = 0; i < solution[0].length; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td id='${i}-${j}' data-i='${i}' data-j='${j}'></td>`);

    }
  }
};

const fillGrid = (solution) => {
  const cells = document.querySelectorAll('td');

  cells.forEach((cell) => {
    const i = cell.dataset.i;
    const j = cell.dataset.j;
    if (solution[j][i] == '.') {
      cell.classList.add('black');
    } else {
      cell.classList.add('white');
      cell.insertAdjacentHTML('beforeend',
        `<input type="text" maxlength="1" data-a='${aNumbers[j][i]}' data-d='${dNumbers[j][i]}' />`);
    }
  });
};

export const onLoad = (solution) => {
  createQNumbers(solution);
  createANumbers(solution);
  createDNumbers(solution);
  createGrid(solution);
  fillGrid(solution);
};
