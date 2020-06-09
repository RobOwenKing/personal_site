import { solutionArray } from './sudoku.js';

const xSudoku = document.getElementById('x-sudoku');

// Check whether a number already appears in a row
const validInRow = (num, row) => {
  if (solutionArray[row].some(entry => entry === num)) {
    return false;
  } else {
    return true;
  }
};

// Check whether a number already appears in a column
const validInCol = (num, col) => {
  if (solutionArray.some(entry => entry[col] === num)) {
    return false;
  } else {
    return true;
  }
};

// Check whether a number already appears in a block
const validInBlock = (num, x, y) => {
  let valid = true;
  // Is our block No 0, 1 or 2 horizontally and vertically?
  const blockCol = Math.floor(x / 3);
  const blockRow = Math.floor(y / 3);
  // Iterate over the cells in that block to check whether they match
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (solutionArray[(blockRow * 3) + i][(blockCol * 3) + j] === num) {
        valid = false;
      }
    }
  }
  return valid;
};

const validXLeftToRight = (num, x, y) => {
  let valid = true;
  for (let i = 0; i < 9; i += 1) {
    if (solutionArray[i][i] === num) {
      valid = false;
    }
  }
  return valid;
}

// Checks whether a number can go in a cell (x,y) based on the others in its row, column and block
const checkValid = (num, x, y) => {
  if (!validInRow(num, y)) {
    return false;
  } else if (!validInCol(num, x)) {
    return false;
  } else if (!validInBlock(num, x, y)) {
    return false;
  } else {
    return true;
  }
  // if (validInRow(num, y) && validInCol(num, x) && validInBlock(num, x, y)) {
  //   return true;
  // } else {
  //   return false;
  // }
};

export { checkValid };
