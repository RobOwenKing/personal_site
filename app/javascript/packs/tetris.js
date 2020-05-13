const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const res = 24;

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

const tPiece =  [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

const drawPiece = piece => {
  for (let y = 0; y < piece.length; y += 1) {
    for (let x = 0; x < piece[y].length; x += 1) {
      if (piece[y][x] !== 0) {
        ctx.fillStyle = 'red';
        ctx.fillRect(x * res, y * res, res, res);
      }
    }
  }
};

drawPiece(tPiece);
