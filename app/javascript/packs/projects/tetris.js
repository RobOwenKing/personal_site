import { pieces } from './tetris_pieces.js';
import { deepCopy, deepCopyObject } from '../shared/copy.js';
import { mode } from '../shared/modes.js';

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const unit = 24;

let delay = 500;
let lastIteration = 0;
let deltaTime = 0;

const scoreText = document.getElementById('score');
let score = 0;
let lastScoreTime = Date.now();

const grid = [];

const play = document.getElementById('play');
let playing = false;

const buildGrid = () => {
  for (let j = 0; j < canvas.height / unit; j += 1) {
    const row = [];
    for (let i = 0; i < canvas.width / unit; i += 1) {
      row.push('.');
    }
    grid.push(row);
  }
};

buildGrid();

const mod = (num) => {
  const limit = canvas.width / unit
  if (num < 0) {
    num = limit + num;
  } else if (num > (limit - 1)) {
    num = num - limit;
  }
  return num;
};

const player = {
  x: 5,
  y: 0
};

const newPiece = () => {
  const newPiece = pieces[Math.floor(Math.random() * pieces.length)]
  player.piece = deepCopyObject(newPiece);
  player.x = 4 - newPiece.xOffset;
  player.y = 0 - newPiece.piece.length;
  delay -= Math.ceil(delay / 100);
};

const drawPiece = (piece, x, y) => {
  for (let j = 0; j < piece.piece.length; j += 1) {
    for (let i = 0; i < piece.piece[j].length; i += 1) {
      if (piece.piece[j][i] !== '.') {
        ctx.fillStyle = mode === "dark" ? `hsl(${piece.piece[j][i]},100%,50%)` : `hsl(${piece.piece[j][i]},75%,75%)`;
        ctx.fillRect(mod(i + x) * unit,
                     (j + y) * unit,
                     unit, unit);
      }
    }
  }
};

const draw = () => {
  for (let j = 0; j < grid.length; j += 1) {
    for (let i = 0; i < grid[j].length; i += 1) {
      if (grid[j][i] === '.') {
        ctx.fillStyle = mode === "dark" ? "black" : "white";
      } else {
        ctx.fillStyle = mode === "dark" ? `hsl(${grid[j][i]},100%,50%)` : `hsl(${grid[j][i]},75%,75%)`;
      }
      ctx.fillRect(i * unit, j * unit, unit, unit);
    }
  }
  if (playing === true) {
    drawPiece(player.piece, player.x, player.y);
  }
};

draw();

const pieceAtBottom = () => {
  const piece = player.piece.piece;
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      if ((player.y + j) === 19 && piece[j][i] !== '.') {
        // console.log(grid[(player.y + j + 1)][mod(player.x + i)]);
        return true;
      }
    }
  }
  return false;
};

const pieceCollision = () => {
  const piece = player.piece.piece;
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      if ((player.y + j + 1) >= 0 && piece[j][i] !== '.') {
        if (grid[(player.y + j + 1)][mod(player.x + i)] !== '.') {
          // console.log(grid[(player.y + j + 1)][mod(player.x + i)]);
          return true;
        }
      }
    }
  }
  return false;
};

const addPieceToGrid = (piece, x, y) => {
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      if (piece[j][i] !== '.') {
        grid[(y + j)][mod(x + i)] = piece[j][i];
      }
    }
  }
};

const addToScore = () => {
  score += 100;
  const diff = Date.now() - lastScoreTime;
  if (diff <= 10000) {
    score += Math.ceil(100 - (diff / 100));
  }
  console.log(diff);
  lastScoreTime = Date.now();
  scoreText.innerText = score;
};

const deleteFullRows = () => {
  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i].every(element => element != '.')) {
      grid.splice(i, 1);
      const newRow = [];
      for (let i = 0; i < canvas.width / unit; i += 1) {
        newRow.push('.');
      }
      grid.unshift(newRow);
      addToScore();
      draw();
    }
  }
};

const update = (time = 0) => {
  draw();
  deltaTime = time - lastIteration;
  if (deltaTime > delay) {
    if (pieceAtBottom() || pieceCollision()) {
      addPieceToGrid(player.piece.piece, player.x, player.y);
      deleteFullRows();
      newPiece();
    } else {
      player.y += 1;
    }
    deltaTime = 0;
    lastIteration = time;
  }
  requestAnimationFrame(update);
};

const rotatePiece = (dir) => {
  const piece = player.piece.piece;
  const l = piece.length;
  const rotatedPiece = [];
  // All pieces are square so can do piece.length everywhere
  if (dir === 'cwise') {
    for (let j = 0; j < l; j += 1) {
      const row = [];
      for (let i = 0; i < l; i += 1) {
        row.push(piece[l - 1 - i][j]);
      }
      rotatedPiece.push(row);
    }
  } else {
    for (let j = 0; j < piece.length; j += 1) {
      const row = [];
      for (let i = 0; i < piece.length; i += 1) {
        row.push(piece[i][l - 1 - j]);
      }
      rotatedPiece.push(row);
    }
  }
  return rotatedPiece;
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    player.x -= 1;
  }
  if (event.key === 'd') {
    player.x += 1;
  }
  if (event.key === 'l') {
    player.piece.piece = rotatePiece('cwise');
  }
  if (event.key === 'j') {
    player.piece.piece = rotatePiece('acwise');
  }
  player.x = mod(player.x);
});

play.addEventListener('click', (event) => {
  if (playing === false) {
    newPiece();
    update();
  }
  playing = true;
  play.classList.add('btn-active');
});

// TO DO
// - Death
// - Check move legal
// - Dropping
// - Submit score
