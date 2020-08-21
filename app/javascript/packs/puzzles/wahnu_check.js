import { puzzle, boardState } from './wahnu.js';

const checkGivensNeighbours = (i, j) => {
  let count = 0;

  if (boardState[j-1]) {
    if (boardState[j-1][i-1] == 1) { count += 1; }
    if (boardState[j-1][i] == 1) { count += 1; }
    if (boardState[j-1][i+1] == 1) { count += 1; }
  }
  if (boardState[j][i-1] == 1) { count += 1; }
  if (boardState[j][i+1] == 1) { count += 1; }
  if (boardState[j+1]) {
    if (boardState[j+1][i-1] == 1) { count += 1; }
    if (boardState[j+1][i] == 1) { count += 1; }
    if (boardState[j+1][i+1] == 1) { count += 1; }
  }

  return count == puzzle[j][i];
};

const check = () => {
  console.log(boardState);
  for (let j = 0; j < puzzle.length; j += 1) {
    for (let i = 0; i < puzzle[0].length; i += 1) {
      if (puzzle[j][i] != '.') {
        console.log(checkGivensNeighbours(i, j));
      }
    }
  }
};

export { check };
