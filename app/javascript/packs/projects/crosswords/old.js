const createGrid = (solution) => {
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
            `<td class="white">
              <span class="q-number">${qNumber}</span>
              <span class="q" contenteditable="true" data-a='${aNumbers[j][i]}' data-d='${dNumbers[j][i]}'></span>
            </td>`);
          qNumber += 1;
        } else {
          // Else plain white cell
          latestRow.insertAdjacentHTML('beforeend',
            `<td class="white">
              <span class="q" contenteditable="true" data-a='${aNumbers[j][i]}' data-d='${dNumbers[j][i]}'></span>
            </td>`);
        }
      }
    }
  }
};
