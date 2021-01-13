const canvas = document.getElementById('canvas-rose');
const ctx = canvas.getContext('2d');

const numerator = document.getElementById('numerator');
const denominator = document.getElementById('denominator');
const pointsToDraw = document.getElementById('points-to-draw');
const step = document.getElementById('step');

canvas.width = 320;
canvas.height = 240;

let k = 4;
let max = 360;

const draw = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);

  for (let i = 0; i < max; i += parseFloat(step.value)) {
    const theta = (i / 180) * Math.PI;
    const r = 100 * Math.cos(k * theta);
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    ctx.beginPath();
    ctx.fillStyle = `hsl(${i}, 100%, 50%)`;
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.translate(-(canvas.width / 2), -(canvas.height / 2));
};

pointsToDraw.addEventListener('input', (event) => {
  max = parseInt(pointsToDraw.value);
  draw();
})

numerator.addEventListener('input', (event) => {
  k = parseInt(numerator.value) / parseInt(denominator.value);
  draw();
})

denominator.addEventListener('input', (event) => {
  k = parseInt(numerator.value) / parseInt(denominator.value);
  pointsToDraw.max = parseInt(denominator.value) * 360;
  if (pointsToDraw.value > pointsToDraw.max) { pointsToDraw.value = pointsToDraw.max; }
  draw();
})

step.addEventListener('input', (event) => {
  draw();
})

draw();
