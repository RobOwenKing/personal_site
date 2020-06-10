import { solutionArray } from './sudoku.js';

const xSudoku = document.getElementById('x-sudoku');
const antiKing = document.getElementById('anti-king');

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
  // Is our block No 0, 1 or 2 horizontally and vertically?
  const blockCol = Math.floor(x / 3);
  const blockRow = Math.floor(y / 3);
  // Iterate over the cells in that block to check whether they match
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (solutionArray[(blockRow * 3) + i][(blockCol * 3) + j] === num) {
        return false;
      }
    }
  }
  return true;
};

// Validators for X-Sudoku
const validXLtoR = (num) => {
  for (let i = 0; i < 9; i += 1) {
    if (solutionArray[i][i] === num) {
      return false;
    }
  }
  return true;
};

const validXRtoL = (num) => {
  for (let i = 0; i < 9; i += 1) {
    if (solutionArray[i][8 - i] === num) {
      return false;
    }
  }
  return true;
};

// Validators for Chess Sudoku
const validAntiKing = (num, x, y) => {
  if (solutionArray[y-1]) {
    if (solutionArray[y-1][x-1] === num) {
      return false;
    } else if (solutionArray[y-1][x+1] === num) {
      return false;
    }
  }
  if (solutionArray[y+1]) {
    if (solutionArray[y+1][x-1] === num) {
      return false;
    } else if (solutionArray[y+1][x+1] === num) {
      return false;
    }
  }
  return true;
};

// Checks whether a number can go in a cell (x,y) based on the others in its row, column and block
const checkValid = (num, x, y) => {
  if (!validInRow(num, y)) {
    return false;
  } else if (!validInCol(num, x)) {
    return false;
  } else if (!validInBlock(num, x, y)) {
    return false;
  } else if ((xSudoku.checked) && (x === y) && (!validXLtoR(num))) {
    return false;
  } else if ((xSudoku.checked) && (x === 8 - y) && (!validXRtoL(num))) {
    return false;
  } else if ((antiKing.checked) && (!validAntiKing(num, x, y))) {
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

// Old version of Anti-King code
/*const validAntiKing = (num, x, y) => {
  let valid = true;
  // if (((x === 2 || x === 5) && (y > 0)) || ((x < 8) && (y === 3 || y === 6)))
  // Below easier to write + maintain, plus the above needs a lot more comparisons
  if ((y > 0) && (x < 8)) {
    if (num === solutionArray[y - 1][x + 1]) {
      valid = false;
    }
  }
  if ((y > 0) && (x > 0)) {
    if (num === solutionArray[y - 1][x - 1]) {
      valid = false;
    }
  }
  if ((y < 8) && (x < 8)) {
    if (num === solutionArray[y + 1][x + 1]) {
      valid = false;
    }
  }
  if ((y < 8) && (x > 0)) {
    if (num === solutionArray[y + 1][x - 1]) {
      valid = false;
    }
  }
  return valid;
};*/
