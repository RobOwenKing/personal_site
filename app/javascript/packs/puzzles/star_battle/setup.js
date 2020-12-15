import { deepCopy } from '../../shared/copy.js';

const VARS = {
  puzzleData: document.getElementById('puzzle-grid').dataset,
  board: document.getElementById('board'),
  cagesBoard: [],
  answerBoard: [],
  cells: [],
  sizeValue: 0
};

const createBoard = () => {
  const temp = [];
  for (let j = 0; j < VARS.sizeValue; j += 1) {
    const latestRow = [];
    for (let i = 0; i < VARS.sizeValue; i += 1) {
      latestRow.push(0);
    }
    temp.push(deepCopy(latestRow));
  }
  return temp;
}

const createCagesBoard = () => {
  VARS.cagesBoard = createBoard();
}

const createAnswerBoard = () => {
  VARS.answerBoard = createBoard();
}

const createBoards = () => {
  createCagesBoard();
  createAnswerBoard();
};

const fillBoard = () => {
  VARS.board.innerHTML = '';
  for (let j = 0; j < VARS.sizeValue; j += 1) {
    VARS.board.insertAdjacentHTML('beforeend', `<tr draggable="false">`);
    const latestRow = document.querySelector('#board > tr:last-child');
    for (let i = 0; i < VARS.sizeValue; i += 1) {
      latestRow.insertAdjacentHTML('beforeend', `<td data-x="${i}" data-y="${j}" class="white clickable" draggable="false"></td>`);
    }
    VARS.board.insertAdjacentHTML('beforeend', '</tr>');
  }
};

const createTableBorders = () => {
  const height = VARS.sizeValue;
  const width = VARS.sizeValue;
  for (let i = 0; i < width; i += 1) {
    VARS.board.childNodes[0].childNodes[i].classList.add('border-top');
    VARS.board.childNodes[height - 1].childNodes[i].classList.add('border-bottom');
  }
  for (let j = 0; j < height; j += 1) {
    VARS.board.childNodes[j].childNodes[0].classList.add('border-left');
    VARS.board.childNodes[j].childNodes[width - 1].classList.add('border-right');
  }
};

export { VARS, createCagesBoard, createAnswerBoard, createBoards, fillBoard, createTableBorders };
