import { deepCopy } from '../../shared/copy.js';

const VARS = {
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

export { VARS, createCagesBoard, createAnswerBoard, createBoards };
