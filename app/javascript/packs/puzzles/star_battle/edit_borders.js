import { VARS } from './setup.js';

const editBorderTop = (cell, i, j) => {
  if (VARS.cagesBoard[j - 1]) {
    if (VARS.cagesBoard[j - 1][i] !== VARS.cagesBoard[j][i]) {
      cell.classList.add('border-top');
      VARS.board.childNodes[j - 1].childNodes[i].classList.add('border-bottom');
    } else {
      cell.classList.remove('border-top');
      VARS.board.childNodes[j - 1].childNodes[i].classList.remove('border-bottom');
    }
  }
};

const editBorderBottom = (cell, i, j) => {
  if (VARS.cagesBoard[j + 1]) {
    if (VARS.cagesBoard[j + 1][i] !== VARS.cagesBoard[j][i]) {
      cell.classList.add('border-bottom');
      VARS.board.childNodes[j + 1].childNodes[i].classList.add('border-top');
    } else {
      cell.classList.remove('border-bottom');
      VARS.board.childNodes[j + 1].childNodes[i].classList.remove('border-top');
    }
  }
};

const editBorderLeft = (cell, i, j) => {
  if (i > 0) {
    if (VARS.cagesBoard[j][i - 1] !== VARS.cagesBoard[j][i]) {
      cell.classList.add('border-left');
      VARS.board.childNodes[j].childNodes[i - 1].classList.add('border-right');
    } else {
      cell.classList.remove('border-left');
      VARS.board.childNodes[j].childNodes[i - 1].classList.remove('border-right');
    }
  }
};

const editBorderRight = (cell, i, j) => {
  if (i < VARS.cagesBoard[0].length - 1) {
    if (VARS.cagesBoard[j][i + 1] !== VARS.cagesBoard[j][i]) {
      cell.classList.add('border-right');
      VARS.board.childNodes[j].childNodes[i + 1].classList.add('border-left');
    } else {
      cell.classList.remove('border-right');
      VARS.board.childNodes[j].childNodes[i + 1].classList.remove('border-left');
    }
  }
};

const editCellBorders = (cell, i ,j) => {
  editBorderTop(cell, i, j);
  editBorderBottom(cell, i, j);
  editBorderLeft(cell, i, j);
  editBorderRight(cell, i, j);
};

export { editCellBorders };
