import { first } from './data/crosswords_data.js';

const grid = document.querySelector('#puzzle-grid tbody');

const createGrid = () => {
  let qNumber = 1;
  for (let j = 0; j < first.length; j += 1) {
    grid.insertAdjacentHTML('beforeend', '<tr></tr>');

    const latestRow = document.querySelector('tbody tr:last-child');
    for (let i = 0; i < first[0].length; i += 1) {
      if (first[j][i] == '.') {
        // If the cell is empty, make it black
        latestRow.insertAdjacentHTML('beforeend', '<td class="black"></td>');
      } else {
        // Else, the cell should be white
        if ((first[j-1] && first[j-1][i] == '.') || first[j][i-1] == '.') {
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
