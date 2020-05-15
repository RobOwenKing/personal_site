// From https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}

const deepCopyObject = (obj) => {
  let tempObj = {};
  for (let [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      tempObj[key] = deepCopy(value);
    } else {
      if (typeof value === 'object') {
        tempObj[key] = deepCopyObject(value);
      } else {
        tempObj[key] = value
      }
    }
  }
  return tempObj;
}

const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

canvas.width = 240;
canvas.height = 480;
const unit = 24;

let delay = 1000;
let lastIteration = 0;
let deltaTime = 0;

const dark = document.getElementById('dark');
const light = document.getElementById('light');
let mode = "dark";

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
    [0, 0, 0],
    ['.', 0, '.']
  ],
  colour: 'red',
  yMargin: 1,
  xOffset: 1
};

const oPiece = {
  piece: [
    [30, 30],
    [30, 30]
  ],
  colour: 'blue',
  yMargin: 0,
  xOffset: 0
};

const pieces = [tPiece, oPiece];

const newPiece = () => {
  const newPiece = pieces[Math.floor(Math.random() * pieces.length)]
  player.piece = deepCopyObject(newPiece);
  player.x = 4 - newPiece.xOffset;
  player.y = 0 - newPiece.piece.length;
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

  drawPiece(player.piece, player.x, player.y);
};

const pieceAtBottom = () => {
  return (player.y + player.piece.piece.length) === (canvas.height / unit);
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

const deleteFullRows = () => {
  // To do!
};

const pieceLanding = () => {
  if (pieceAtBottom() || pieceCollision()) {
    addPieceToGrid(player.piece.piece, player.x, player.y);
    deleteFullRows();
    newPiece();
  }
};

const update = (time = 0) => {
  draw();
  deltaTime = time - lastIteration;
  if (deltaTime > delay) {
    pieceLanding();
    player.y += 1;
    deltaTime = 0;
    lastIteration = time;
  }
  requestAnimationFrame(update);
};

newPiece();
update();

const rotatePiece = (dir) => {
  const piece = player.piece.piece;
  const rotatedPiece = [];
  // All pieces are square so can do piece.length everywhere
  for (let j = 0; j < piece.length; j += 1) {
    const row = [];
    for (let i = 0; i < piece.length; i += 1) {
      row.push(piece[2 - i][j]);
    }
    rotatedPiece.push(row);
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
  player.x = mod(player.x);
});

light.addEventListener('click', (event) => {
  if (mode === "dark") {
    mode = "light";
    dark.classList.remove('btn-active');
    light.classList.add('btn-active');
    draw(grid);
  }
});

dark.addEventListener('click', (event) => {
  if (mode === "light") {
    mode = "dark";
    dark.classList.add('btn-active');
    light.classList.remove('btn-active');
    draw(grid);
  }
});
