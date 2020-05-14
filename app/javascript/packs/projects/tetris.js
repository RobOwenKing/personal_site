const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const res = 24;

let delay = 1000;
let lastIteration = 0;
let deltaTime = 0;

const grid = [];

const buildGrid = () => {
  const row = [];
  for (let i = 0; i < canvas.width / res; i += 1) {
    row.push('.');
  }
  for (let j = 0; j < canvas.height / res; j += 1) {
    grid.push(row);
  }
  console.log(grid);
};

buildGrid();

const mod = (num) => {
  limit = canvas.width / res
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
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
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
      if (piece.piece[j][i] !== 0) {
        ctx.fillStyle = piece.colour;
        ctx.fillRect(mod(i + x) * res,
                     (j + y) * res,
                     res, res);
      }
    }
  }
};

const draw = () => {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPiece(player.piece, player.x, player.y);
};

const update = (time = 0) => {
  draw();
  deltaTime = time - lastIteration;
  if (deltaTime > delay) {
    player.y += 1;
    deltaTime = 0;
    lastIteration = time;
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

// Movement code
// Piece array of objects
// Piece centre offsets
