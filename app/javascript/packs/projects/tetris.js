const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const unit = 24;

let delay = 1000;
let lastIteration = 0;
let deltaTime = 0;

const grid = [];

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
  limit = canvas.width / unit
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

const tPiece = {
  piece: [
    ['.', '.', '.'],
    [1, 1, 1],
    ['.', 1, '.']
  ],
  colour: 'red',
  yMargin: 1,
  xOffset: 1
};

const oPiece = {
  piece: [
    [1, 1],
    [1, 1]
  ],
  colour: 'blue',
  yMargin: 0,
  xOffset: 0
};

const pieces = [tPiece, oPiece];

const newPiece = () => {
  const newPiece = pieces[Math.floor(Math.random() * pieces.length)]
  player.piece = newPiece;
  player.x = 4 - newPiece.xOffset;
  player.y = 0 - newPiece.yMargin;
};

const drawPiece = (piece, x, y) => {
  for (let j = 0; j < piece.piece.length; j += 1) {
    for (let i = 0; i < piece.piece[j].length; i += 1) {
      if (piece.piece[j][i] !== '.') {
        ctx.fillStyle = piece.colour;
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
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = 'red';
      }
      ctx.fillRect(i * unit, j * unit, unit, unit);
    }
  }

  drawPiece(player.piece, player.x, player.y);
};

const addPieceToGrid = (piece, x, y) => {
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      grid[(y + j)][mod(x + i)] = piece[j][i];
    }
  }
};

const pieceLanding = () => {
  if ((player.y + player.piece.piece.length) === (canvas.height / unit)) {
    addPieceToGrid(player.piece.piece, player.x, player.y);
    newPiece();
  }
};

const update = (time = 0) => {
  draw();
  deltaTime = time - lastIteration;
  if (deltaTime > delay) {
    player.y += 1;
    deltaTime = 0;
    lastIteration = time;
    pieceLanding();
  }
  requestAnimationFrame(update);
};

newPiece();
update();

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    player.x -= 1;
  }
  if (event.key === 'd') {
    player.x += 1;
  }
  player.x = mod(player.x);
});
