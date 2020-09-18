import { deepCopy } from '../shared/copy.js';
import { Vars } from './star_battle/shared_vars.js';
import { editCellBorders } from './star_battle/edit_borders.js';

let creatingCages = false;
let nextCageNumber = 0;

const enterButton = document.getElementById('btn-enter');
const solveButton = document.getElementById('btn-solve');
let mode = 'enter';

const clearCages = document.getElementById('clear-cages');
const clearStars = document.getElementById('clear-stars');
const bruteForce = document.getElementById('brute-force');

const size = document.getElementById('size');
let sizeValue = parseInt(size.value);
const stars = document.getElementById('stars');

const formStars = document.getElementById('star_battle_stars');
const formBoard = document.getElementById('star_battle_board');

solveButton.addEventListener('click', (event) => {
  mode = 'solve';
  solveButton.classList.add('btn-active');
  enterButton.classList.remove('btn-active');
});

enterButton.addEventListener('click', (event) => {
  mode = 'enter';
  enterButton.classList.add('btn-active');
  solveButton.classList.remove('btn-active');
});

const fillBoard = () => {
  Vars.board.innerHTML = '';
  for (let j = 0; j < sizeValue; j += 1) {
    Vars.board.insertAdjacentHTML('beforeend', `<tr draggable="false">`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < sizeValue; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable" draggable="false"></td>`);
    }
    Vars.board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createBoard = () => {
  const temp = [];
  for (let j = 0; j < sizeValue; j += 1) {
    const latestRow = [];
    for (let i = 0; i < sizeValue; i += 1) {
      latestRow.push(0);
    }
    temp.push(deepCopy(latestRow));
  }
  return temp;
}

const createCagesBoard = () => {
  Vars.cagesBoard = createBoard();
}

const createAnswerBoard = () => {
  Vars.answerBoard = createBoard();
}

const createBoards = () => {
  createCagesBoard();
  createAnswerBoard();
};

const solveModeClick = (cell, i, j) => {
  Vars.answerBoard[j][i] = (Vars.answerBoard[j][i] + 1) % 4;

  if (Vars.answerBoard[j][i] === 0) {
    cell.classList.remove('blue-txt');
    cell.classList.add('white');
    cell.innerHTML = '';
  } else if (Vars.answerBoard[j][i] === 1) {
    cell.classList.remove('white');
    cell.classList.add('red-txt');
    cell.innerHTML = '<i class="fas fa-times"></i>';
  } else if (Vars.answerBoard[j][i] === 2) {
    cell.classList.remove('red-txt');
    cell.classList.add('yellow-txt');
    cell.innerHTML = '<i class="fas fa-star"></i>';
  } else {
    cell.classList.remove('yellow-txt');
    cell.classList.add('blue-txt');
    cell.innerHTML = '<i class="fas fa-star-half"></i>';
  }
};

const createTableBorders = () => {
  const height = sizeValue;
  const width = sizeValue;
  for (let i = 0; i < width; i += 1) {
    Vars.board.childNodes[0].childNodes[i].classList.add('border-top');
    Vars.board.childNodes[height - 1].childNodes[i].classList.add('border-bottom');
  }
  for (let j = 0; j < height; j += 1) {
    Vars.board.childNodes[j].childNodes[0].classList.add('border-left');
    Vars.board.childNodes[j].childNodes[width - 1].classList.add('border-right');
  }
};

const enterModeClick = (cell, i, j) => {
  creatingCages = true;
  nextCageNumber += 1;
  Vars.cagesBoard[j][i] = nextCageNumber;
  editCellBorders(cell, i, j);
};

const activateBoard = () => {
  Vars.cells.forEach((cell) => {
    const j = parseInt(cell.dataset.y);
    const i = parseInt(cell.dataset.x);

    cell.addEventListener('mousedown', (event) => {
      if (mode === 'solve') {
        solveModeClick(cell, i, j);
      } else {
        enterModeClick(cell, i, j);
      }
    })

    cell.addEventListener('mouseenter', (event) => {
      if (creatingCages === true) {
        Vars.cagesBoard[j][i] = nextCageNumber;
        editCellBorders(cell, i, j);

        if (formBoard) {
          formBoard.value = JSON.stringify(Vars.cagesBoard);
        }
      }
    })
  })
};

document.addEventListener('mouseup', (event) => {
  creatingCages = false;
})

const init = () => {
  fillBoard();
  createBoards();
  Vars.cells = document.querySelectorAll('#board td');
  createTableBorders();
  activateBoard();

  if (formStars) {
    formStars.value = stars.value;
  }
};

init();

clearCages.addEventListener('click', (event) => {
  createCagesBoard();
  for (let j = 0; j < sizeValue; j += 1) {
    for (let i = 0; i < sizeValue; i += 1) {
      editCellBorders(Vars.board.childNodes[j].childNodes[i], i, j);
    }
  }
})

clearStars.addEventListener('click', (event) => {
  for (let j = 0; j < sizeValue; j += 1) {
    for (let i = 0; i < sizeValue; i += 1) {
      const cell = Vars.board.childNodes[j].childNodes[i];
      while (Vars.answerBoard[j][i] != 0) {
        solveModeClick(cell, i, j);
      }
    }
  }
})

size.addEventListener('input', (event) => {
  sizeValue = size.value;
  init();
})

stars.addEventListener('input', (event) => {
  if (formStars) {
    formStars.value = stars.value;
  }
})

const starPossibleInRow = (i, j) => {
  let starsInRow = 0;
  for (let k = 0; k < i; k += 1) {
    if (Vars.answerBoard[j][k] != 0) {
      starsInRow += 1;
    }
  }
  const answer = starsInRow < stars.value ? true : false;
  return answer;
};

const starPossibleInCol = (i, j) => {
  let starsInCol = 0;
  for (let k = 0; k < j; k += 1) {
    if (Vars.answerBoard[k][i] != 0) {
      starsInCol += 1;
    }
  }
  const answer = starsInCol < stars.value ? true : false;
  return answer;
};

const starPossibleInNeighbourhood = (i, j) => {
  if (j > 0) {
    if (Vars.answerBoard[j-1][i-1] && Vars.answerBoard[j-1][i-1] != 0) { return false; }
    if (Vars.answerBoard[j-1][i] != 0) { return false; }
    if (Vars.answerBoard[j-1][i+1] && Vars.answerBoard[j-1][i+1] != 0) { return false; }
  }

  if (i > 0) {
    if (Vars.answerBoard[j][i-1] != 0) { return false; }
    if (Vars.answerBoard[j+1] && Vars.answerBoard[j+1][i-1] != 0) { return false; }
  }

  return true;
};

const starPossibleInCage = (i, j) => {
  const cageNumber = Vars.cagesBoard[j][i];
  let starsInCage = 0;
  for (let l = 0; l < sizeValue; l += 1) {
    for (let k = 0; k < sizeValue; k += 1) {
      if (Vars.cagesBoard[l][k] === cageNumber && Vars.answerBoard[l][k] != 0) { starsInCage += 1; }
    }
  }
  const answer = starsInCage < stars.value ? true : false;
  return answer;
}

const starPossible = (i, j) => {
  if (!starPossibleInCol(i, j)) {
    return false;
  } else if (!starPossibleInRow(i,j)) {
    return false;
  } else if (!starPossibleInNeighbourhood(i, j)) {
    return false;
  } else if (!starPossibleInCage(i, j)) {
    return false;
  } else {
    return true;
  }
};


const drawSolution = () => {
  for (let i = 0; i < sizeValue; i += 1) {
    for (let j = 0; j < sizeValue; j += 1) {
      solveModeClick(Vars.board.childNodes[j].childNodes[i], i, j);
    }
  }
};

const numStarsInRow = (j) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return Vars.answerBoard[j].reduce(reducer);
};

const solve = (i, j) => {
  if (starPossible(i, j)) {
    Vars.answerBoard[j][i] = 1;
    if (i == sizeValue - 1) {
      if (numStarsInRow(j) == stars.value) {
        if (j == sizeValue - 1) {
          drawSolution();
          // console.log("1");
          return true;
        } else {
          if (solve(0, j + 1)) {
            // console.log("2");
            return true;
          }
        }
      } else {
        // console.log("3");
        Vars.answerBoard[j][i] = 0;
        return false;
      }
    } else {
      if (solve(i + 1, j)) {
        // console.log("4");
        return true;
      };
    }
    Vars.answerBoard[j][i] = 0;
  }
  if (i == sizeValue - 1) {
    if (numStarsInRow(j) == stars.value) {
      if (j == sizeValue - 1) {
        drawSolution();
        // console.log("5");
        return true;
      } else {
        if (solve(0, j + 1)) {
          // console.log("6");
          return true;
        }
      }
    } else {
      // console.log("7");
      return false;
    }
  } else {
    if (solve(i + 1, j)) {
      // console.log("8");
      return true;
    };
  }
};

bruteForce.addEventListener('click', (event) => {
  // solveBruteForce();
  console.log(Vars.cagesBoard);
  solve(0, 0);
  console.log(Vars.answerBoard);
  // drawSolution();
})

// export { board, cagesBoard };
