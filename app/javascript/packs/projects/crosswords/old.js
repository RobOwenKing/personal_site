/*
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


////////////

const first = {
  name: "first",
  solution: [
    "......R......",
    ".....FUN.....",
    "....SALES....",
    "...RECEIPT...",
    "..MERE.FARM..",
    ".DOVE...RAIL.",
    "MORE.....DRAW",
    ".HARD...TIED.",
    "..LION.SAND..",
    "...EVENING...",
    "....EVADE....",
    ".....ARE.....",
    "......D......"
  ],
  aQs: [
    "N/A",
    "FUN (written in original grid)",
    "What bargain hunters enjoy",
    "A written acknowledgment",
    "Such and nothing more",
    "To cultivate"
  ],
  dQs: [
    "To govern",
    "Part of your head",
    "A fist",
    "A talon",
    "Part of a ship"
  ]
};

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
*/
