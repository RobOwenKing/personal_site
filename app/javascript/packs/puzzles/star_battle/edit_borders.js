import { Vars } from './shared_vars.js';

const editBorderTop = (cell, i, j) => {
  if (Vars.cagesBoard[j - 1]) {
    if (Vars.cagesBoard[j - 1][i] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-top');
      Vars.board.childNodes[j - 1].childNodes[i].classList.add('border-bottom');
    } else {
      cell.classList.remove('border-top');
      Vars.board.childNodes[j - 1].childNodes[i].classList.remove('border-bottom');
    }
  }
};

const editBorderBottom = (cell, i, j) => {
  if (Vars.cagesBoard[j + 1]) {
    if (Vars.cagesBoard[j + 1][i] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-bottom');
      Vars.board.childNodes[j + 1].childNodes[i].classList.add('border-top');
    } else {
      cell.classList.remove('border-bottom');
      Vars.board.childNodes[j + 1].childNodes[i].classList.remove('border-top');
    }
  }
};

const editBorderLeft = (cell, i, j) => {
  if (i > 0) {
    if (Vars.cagesBoard[j][i - 1] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-left');
      Vars.board.childNodes[j].childNodes[i - 1].classList.add('border-right');
    } else {
      cell.classList.remove('border-left');
      Vars.board.childNodes[j].childNodes[i - 1].classList.remove('border-right');
    }
  }
};

const editBorderRight = (cell, i, j) => {
  if (i < Vars.cagesBoard[0].length - 1) {
    if (Vars.cagesBoard[j][i + 1] !== Vars.cagesBoard[j][i]) {
      cell.classList.add('border-right');
      Vars.board.childNodes[j].childNodes[i + 1].classList.add('border-left');
    } else {
      cell.classList.remove('border-right');
      Vars.board.childNodes[j].childNodes[i + 1].classList.remove('border-left');
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
