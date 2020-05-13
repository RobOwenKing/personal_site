const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const res = 24;

let delay = 1000;
let lastIteration = 0;
let deltaTime = 0;

const player = {
  x: 5,
  y: 0
};

const tPiece =  [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

player.piece = tPiece;

const drawPiece = (piece, x, y) => {
  for (let j = 0; j < piece.length; j += 1) {
    for (let i = 0; i < piece[j].length; i += 1) {
      if (piece[j][i] !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect((i + x) * res,
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

update();

document.addEventListener('keydown', (event) => {
  if (event.key === 'a') {
    player.x = (player.x - 1) % 10;
  }
  if (event.key === 'd') {
    player.x += 1;
  }
});
