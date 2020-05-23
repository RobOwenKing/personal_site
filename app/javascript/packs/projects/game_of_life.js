import { light, dark, mode, lightToDark, darkToLight } from '../shared/modes.js';
import { patterns, patternButtons } from './game_of_life_pieces.js'

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let speedButton = document.getElementById('speed');
let speed = 101 - speedButton.value;
const autoplayButton = document.getElementById('autoplay');
let counter = 0;
let autoplay = false;
let lastTime;

const iterateButton = document.getElementById('iterate');
let iterate = false;

const clear = document.getElementById('clear');
const random = document.getElementById('random');

let adding = 'dot';

const resolution = 4;
canvas.width = 400;
canvas.height = 400;

let cols = canvas.width / resolution;
let rows = canvas.height / resolution;

const buildGrid = () => {
  return new Array(cols).fill(null)
    .map(() => new Array(rows).fill('.'));
};

let grid = buildGrid();

const drawCell = (col, row, value) => {
  if (mode === "dark") {
    ctx.fillStyle = value === '.' ? `hsl(0,0%,0%)` : `hsl(${value},100%,50%)`;
  } else if (mode === "light") {
    ctx.fillStyle = value === '.' ? `hsl(0,100%,100%)` : `hsl(${value},75%,75%)`;
  }
  ctx.fillRect(col * resolution, row * resolution, resolution, resolution);
};

const draw = () => {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const value = grid[col][row];
      drawCell(col, row, value);
    }
  }
};

draw();

canvas.addEventListener('click', (event) => {
  const col = Math.floor((event.offsetX - 3) / resolution);
  const row = Math.floor((event.offsetY - 3) / resolution);
  if (adding === 'delete') {
    grid[col][row] = '.';
  } else {
    let pattern = patterns.get(adding);

    for (let i = 0; i < pattern.length; i++) {
      const colPlus = col + parseInt(pattern[i][0]);
      const rowPlus = row + parseInt(pattern[i][1]);
      grid[colPlus][rowPlus] = '0';
    }
  }

  draw();
});

const countLivingNeighbours = (x, y) => {
  const neighbours = [
    grid[x][y+1],
    grid[x][y-1]
  ];
  if (x > 0) {
    neighbours.push(grid[x-1][y-1], grid[x-1][y], grid[x-1][y+1]);
  }
  if (x < grid.length - 1) {
    neighbours.push(grid[x+1][y+1], grid[x+1][y], grid[x+1][y-1]);
  }
  const livingNeighbours = neighbours.filter(n => n !== '.' && n !== undefined);
  return livingNeighbours.length;
}

const nextGeneration = (grid) => {
  const nextGen = buildGrid();
  for (let col = 0; col < nextGen.length; col++) {
    for (let row = 0; row < nextGen[col].length; row++) {
      const livingN = countLivingNeighbours(col, row);
      if (grid[col][row] === '.') {
        nextGen[col][row] = livingN === 3 ? '0' : '.';
      } else {
        if (livingN < 2 || livingN > 3) {
          nextGen[col][row] = '.';
        } else {
          nextGen[col][row] = (parseInt(grid[col][row]) + 11).toString();
        }
      }
    }
  }
  return nextGen;
}

const iteration = () => {
  if (iterate === true || counter === speed) {
    grid = nextGeneration(grid);
    draw();
    iterate = false;
  }

  if (counter >= speed) {
    counter = 0;
  }

  if (autoplay === true) {
    counter ++;
    requestAnimationFrame(iteration);
  }
}

iterateButton.addEventListener('click', (event) => {
  iterate = true;
  iteration();
});

autoplayButton.addEventListener('click', (event) => {
  autoplay = !autoplay;

  if (autoplay === true) {
    counter = speed - 1;
    iteration();
  }
  autoplayButton.classList.toggle('btn-active');
});

speedButton.addEventListener('input', (event) => {
  speed = 101 - speedButton.value;
});

random.addEventListener('click', (event) => {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      grid[col][row] = Math.random() < 0.5 ? '.' : '0';
    }
  }
  draw();
});

clear.addEventListener('click', (event) => {
  grid = buildGrid();
  draw();
});

for (let i = 0; i < patternButtons.length; i++) {
  patternButtons[i].addEventListener('click', (event) => {
    if (patternButtons[i].classList.contains('btn-active')) {
      patternButtons[i].classList.remove('btn-active');
      adding = 'dot';
    } else {
      for (let j = 0; j < patternButtons.length; j++) {
        patternButtons[j].classList.remove('btn-active');
      };
      patternButtons[i].classList.add('btn-active');
      adding = patternButtons[i].id;
    }
  });
};

light.addEventListener('click', (event) => {
  darkToLight();
  draw();
});

dark.addEventListener('click', (event) => {
  lightToDark();
  draw();
});
