import { checkValid } from './sudoku_validators.js';

let sudokuArray = [];
let solutionArray = [];
const candidatesArray = [];
const sudokuTable = document.querySelector('#sudoku tbody');
const solutionTable = document.querySelector('#solution tbody');

const enterButton = document.getElementById('btn-enter');
const solveButton = document.getElementById('btn-solve');
const enterMode = document.querySelector('.enter-mode');
const solveMode = document.querySelector('.solve-mode');

const clearButton = document.getElementById('clear-grid');
const bruteForceButton = document.getElementById('brute-force');
const validButton = document.getElementById('valid');

// Save the state of the grid in an array of arrays for ease of manipulation
const createSudokuArray = () => {
  for (let i = 0; i < 9; i += 1) {
    const latestRow = [];
    for (let j = 0; j < 9; j += 1) {
      latestRow.push(0);
    }
    sudokuArray.push(latestRow);
  }
  solutionArray = sudokuArray;
};

// Populate the html table of inputs we'll use for the interface
const createSudokuTable = () => {
  for (let i = 0; i < 9; i += 1) {
    sudokuTable.insertAdjacentHTML('beforeend', '<tr></tr>');
    const latestRow = document.querySelector('#sudoku tbody > tr:last-child');
    for (let j = 0; j < 9; j += 1) {
      latestRow.insertAdjacentHTML('beforeend', '<td><input type="text" /></td>');
    }
  }
};

// Populate the html table we'll use to display the solution
const createSolutionTable = () => {
  for (let i = 0; i < 9; i += 1) {
    solutionTable.insertAdjacentHTML('beforeend', '<tr></tr>');
    const latestRow = document.querySelector('#solution tbody > tr:last-child');
    for (let j = 0; j < 9; j += 1) {
      latestRow.insertAdjacentHTML('beforeend', '<td><input type="text" /></td>');
    }
  }
};

createSudokuArray();
createSudokuTable();
createSolutionTable();

const fillCandidatesArray = () => {
  for (let i = 0; i < 9; i += 1) {
    const latestRow = [];
    for (let j = 0; j < 9; j += 1) {
      const cellCandidates = []
      if (sudokuArray[j][i] === 0) {
        for (let k = 1; k < 10; k+= 1) {
          if (checkValid(k, i, j)) {
            cellCandidates.push(k);
          }
        }
      }
      latestRow.push(cellCandidates);
    }
    candidatesArray.push(latestRow);
  }
};

// Updates the value displayed in a single cell in the solution grid
const updateCellInSolution = (x, y) => {
  // Find the cell in question in the HTML and update its value
  const cell = solutionTable.childNodes[y + 1].childNodes[x].childNodes[0];
  if (solutionArray[y][x] >= 1 && solutionArray[y][x] <= 9) {
    cell.value = solutionArray[y][x];
    cell.disabled = true;
  } else {
    cell.value = "";
    cell.disabled = false;
  }

  // Change the colour of the number in the cell
  if (solutionArray[y][x] === sudokuArray[y][x]) {
    // Black if given by the user
    cell.style.color = "black";
  } else {
    // Blue if calculated by the algorithm
    cell.style.color = "blue";
  }

  cell.style.backgroundColor = "#FFFFFF";
};

// Updates the entire solution grid
const updateSolution = () => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      updateCellInSolution(i, j);
    }
  }
};

// Algorithm to solve by brute force. As yucky a method as the code.
const solveBruteForce = () => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      if (solutionArray[j][i] === 0) {
        for (let candidate = 1; candidate < 10; candidate += 1) {
          if (checkValid(candidate, i, j)) {
            solutionArray[j][i] = candidate;
            // updateCellInSolution(i, j);
            if (solveBruteForce()) {
              return true;
            }
            solutionArray[j][i] = 0;
            // updateCellInSolution(i, j);
          }
        }
        return false;
      }
    }
  }
  return true;
};

bruteForceButton.addEventListener('click', event => {
  solutionArray = JSON.parse(JSON.stringify(sudokuArray));
  solveBruteForce();
  updateSolution();
  goToSolveMode();
});


const moveH = (target) => {
  if (target !== null) {
    target.firstElementChild.focus();
  }
};

const moveV = (currentFocus, up) => {
  const child = currentFocus.parentElement;
  const parent = child.parentElement;
  const childPos = Array.prototype.indexOf.call(parent.childNodes, child);
  const newRow = up === true ? parent.previousElementSibling : parent.nextElementSibling;
  if (newRow !== null) {
    const target = newRow.childNodes[childPos].childNodes[0];
    target.focus();
  }
};

document.addEventListener('keyup', (event) => {
  const currentFocus = document.activeElement;
  if (event.key === "ArrowRight") {
    const nextElement = currentFocus.parentElement.nextElementSibling;
    moveH(nextElement);
  } else if (event.key === "ArrowLeft") {
    const previousElement = currentFocus.parentElement.previousElementSibling;
    moveH(previousElement);
  } else if (event.key === "ArrowUp") {
    moveV(currentFocus, true);
  } else if (event.key === "ArrowDown") {
    moveV(currentFocus, false)
  }
});

const goToSolveMode = () => {
  enterMode.hidden = true;
  solveMode.hidden = false;
  solveButton.classList.add('btn-active');
  enterButton.classList.remove('btn-active');
};

solveButton.addEventListener('click', (event) => {
  goToSolveMode();
});

enterButton.addEventListener('click', (event) => {
  enterMode.hidden = false;
  solveMode.hidden = true;
  enterButton.classList.add('btn-active');
  solveButton.classList.remove('btn-active');
});

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', (event) => {
    input.style.backgroundColor = "yellow";
  });
  input.addEventListener('blur', (event) => {
    input.style.backgroundColor = "#FFFFFF";
    const y = input.closest("tr").rowIndex;
    const x = input.closest("td").cellIndex;
    const num = parseInt(input.value, 10);
    const digitRegex = /^[1-9]$/;
    if (input.closest('table').id === 'sudoku') {
      if (digitRegex.test(input.value)) {
        // checkValid(num, x, y);
        sudokuArray[y][x] = num;
      } else {
        sudokuArray[y][x] = 0;
      }
      updateCellInSolution(x, y);
    } else {
      if (digitRegex.test(input.value)) {
        // checkValid(num, x, y);
        solutionArray[y][x] = num;
      } else {
        solutionArray[y][x] = 0;
      }
    }
  });
});

clearButton.addEventListener('click', (event) => {
  sudokuArray = [];
  solutionArray = [];
  createSudokuArray();
  inputs.forEach(input => {
    input.value = '';
  });
  updateSolution();
});

validButton.addEventListener('click', (event) => {
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 9; j += 1) {
      const temp = solutionArray[j][i];
      solutionArray[j][i] = 0;
      // console.log(solutionArray[j][i]);
      if (!checkValid(temp, i, j)) {
        solutionTable.childNodes[j + 1].childNodes[i].childNodes[0].style.color = 'red';
      }
      solutionArray[j][i] = temp;
    }
  }
})

export { solutionArray };

/*const btnGenerateCandidates = document.getElementById('candidates');
btnGenerateCandidates.addEventListener('click', event => {
  // console.log(sudokuArray);
  fillCandidatesArray();
  // console.log(solutionArray);
  // console.log(sudokuArray);
});*/

// const createTableListeners = () => {
//   sudokuCells.forEach(cell => {
//     cell.addEventListener('blur', (event) => {
//       const y = cell.closest("tr").rowIndex;
//       const x = cell.closest("td").cellIndex;
//       const num = parseInt(cell.value, 10);
//       digitRegex = /^[1-9]$/;
//       if (digitRegex.test(cell.value)) {
//         // checkValid(num, x, y);
//         sudokuArray[y][x] = num;
//       } else {
//         sudokuArray[y][x] = 0;
//       }
//       updateCellInSolution(x, y);
//     });
//   });
// };

// const sudokuCells = document.querySelectorAll('input');
// createTableListeners();
