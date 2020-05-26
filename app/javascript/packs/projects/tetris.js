import { pieces } from './tetris_pieces.js';
import { deepCopy, deepCopyObject } from '../shared/copy.js';
import { light, dark, mode, lightToDark, darkToLight } from '../shared/modes.js';

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const unit = 24;

let delay = 500;
let lastIteration = 0;
let deltaTime = 0;

const scoreText = document.getElementById('score');
const scoreInput = document.getElementById('tetris_score_score');
let score = 0;
let scoreTimes = [Date.now(), Date.now(), Date.now()];

const grid = [];

const submit = document.querySelector('[type="submit"]');
const nameInput = document.querySelector('.form-control.string');

const play = document.getElementById('play');
let playing = false;

let drop = false;

const buildGrid = () => {
  grid.splice(0, grid.length);
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

const pieceCollision = (piece, x, y) => {
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      if ((y + j) >= 0 && piece[j][i] !== '.') {
        if (grid[(y +j)][mod(x + i)] !== '.') {
          // console.log(grid[(player.y + j + 1)][mod(player.x + i)]);
          return true;
        }
      }
    }
  }
  return false;
};

const gameOver = () => {
  playing = false;
  play.classList.remove('btn-active');
  ctx.fillStyle = mode === 'dark' ? 'white' : '#042D43';
  ctx.font = '42px "Open Sans", "Helvetica", "sans-serif"';
  ctx.fillText('Game over', 10, 80);
}

const addPieceToGrid = (piece, x, y) => {
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      if (y < 0) {
        gameOver();
      } else if (piece[j][i] !== '.') {
        grid[(y + j)][mod(x + i)] = piece[j][i];
      }
    }
  }
};

const addToScore = () => {
  score += 250;
  for (let i = 1; i < 4; i += 1) {
    const diff = Date.now() - scoreTimes[scoreTimes.length - i];
    if (diff <= 10000) {
      score += Math.ceil(250 - (diff / 40));
    }
  }
  scoreTimes.push(Date.now());
  scoreText.innerText = score;
  scoreInput.value = score;
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

const movePlayerDown = () => {
  if (pieceAtBottom() || pieceCollision(player.piece.piece, player.x, player.y + 1)) {
    addPieceToGrid(player.piece.piece, player.x, player.y);
    deleteFullRows();
    score += 500 - delay;
    newPiece();
    drop = false;
  } else {
    player.y += 1;
  }
  if (drop === true && playing === true) {
    score += 5;
    scoreText.innerText = score;
    scoreInput.value = score;
    setTimeout(movePlayerDown, 50);
  }
};

const update = (time = 0) => {
  draw();
  deltaTime = time - lastIteration;
  if (deltaTime > delay) {
    movePlayerDown();
    deltaTime = 0;
    lastIteration = time;
  }
  if (playing === true) {
    requestAnimationFrame(update);
  }
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
  return pieceCollision(rotatedPiece, player.x, player.y) ? piece : rotatedPiece;
}

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 65 || event.keyCode === 37) {
    if (!pieceCollision(player.piece.piece, player.x - 1, player.y)) {
      player.x -= 1;
    }
  }
  if (event.keyCode === 68 || event.keyCode === 39) {
    if (!pieceCollision(player.piece.piece, player.x + 1, player.y)) {
      player.x += 1;
    }
  }
  if (event.keyCode === 83 || event.keyCode === 32) {
    drop = true;
    movePlayerDown();
  } else {
    drop = false;
  }
  if (event.keyCode === 76 || event.keyCode === 38) {
    player.piece.piece = rotatePiece('cwise');
  }
  if (event.keyCode === 74 || event.keyCode === 40) {
    player.piece.piece = rotatePiece('acwise');
  }
  player.x = mod(player.x);
});

play.addEventListener('click', (event) => {
  playing = true;
  drop = false;
  buildGrid();
  newPiece();

  delay = 500;
  lastIteration = 0;
  score = 0;
  scoreText.innerText = score;
  scoreInput.value = score;
  scoreTimes = [Date.now(), Date.now(), Date.now()]

  update();
});

light.addEventListener('click', (event) => {
  darkToLight();
  draw();
});

dark.addEventListener('click', (event) => {
  lightToDark();
  draw();
});

submit.addEventListener('click', (event) => {
  if (nameInput.value === '') {
    window.alert("Please give a name to save your score");
  }
});
