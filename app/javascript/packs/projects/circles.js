const canvas = document.getElementById('circles');
const ctx = canvas.getContext('2d');

// Viewport size based on code from https://stackoverflow.com/questions/3437786
const docElem = document.documentElement;
const body = document.getElementsByTagName('body')[0];
const viewWidth = window.innerWidth || docElem.clientWidth || body.clientWidth;
const viewHeight = window.innerHeight|| docElem.clientHeight|| body.clientHeight;

const width = 0.6 * viewWidth;
const height = 0.6 * viewHeight;

canvas.width = width;
canvas.height = height;

const draw = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
};

draw();
