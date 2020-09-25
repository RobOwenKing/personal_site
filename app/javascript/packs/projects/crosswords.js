import { puzzles } from './crosswords/data.js';

const grid = document.querySelector('#puzzle-grid tbody');
const puzzle = grid.parentElement.dataset.puzzle;

const solution = puzzles.find(element => element.name == puzzle).solution;

const createAcrossNumbers = (solution) => {
  const aNumbers = [];
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

  return aNumbers;
}

createAcrossNumbers(solution);

const createGrid = () => {
  let qNumber = 1;
  for (let j = 0; j < solution.length; j += 1) {
    grid.insertAdjacentHTML('beforeend', '<tr></tr>');

    const latestRow = document.querySelector('tbody tr:last-child');
    for (let i = 0; i < solution[0].length; i += 1) {
      if (solution[j][i] == '.') {
        // If the cell is empty, make it black
        latestRow.insertAdjacentHTML('beforeend', '<td class="black"></td>');
      } else {
        // Else, the cell should be white
        if ((solution[j-1] && solution[j-1][i] == '.') || solution[j][i-1] == '.') {
          // If the cell has a black cell to the left or above, it needs a question number
          latestRow.insertAdjacentHTML('beforeend',
            `<td class="white"><span class="q-number">${qNumber}</span><span contenteditable="true"></span></td>`);
          qNumber += 1;
        } else {
          // Else plain white cell
          latestRow.insertAdjacentHTML('beforeend',
            `<td class="white"><span contenteditable="true"></span></td>`);
        }
      }
    }
  }
};

createGrid();
