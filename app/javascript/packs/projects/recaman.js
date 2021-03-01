import { isPrime } from '../shared/maths';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const animateButton = document.getElementById('animate');
const termsInput = document.getElementById('terms');
const sequenceInput = document.getElementById('sequence-input');
const speedInput = document.getElementById('speed');
const resultsDisplay = document.getElementById('results');

canvas.width = 320;
canvas.height = 240;

let start, sequence, scale, finalScale;
let startScale = (canvas.width - 16) / 10;
let maxValue, targetScale;
let duration = 250;

const buildBaseSequence = (sequence, noOfTerms) => {
  let seq = [];
  if (sequence == 'fibonacci') { seq = [0, 1]; }

  for (let i = 1; seq.length < noOfTerms; i += 1) {
    if (sequence == 'integers') {
      seq.push(i);
    } else if (sequence == 'squares') {
      seq.push(i * i);
    } else if (sequence == 'fibonacci') {
      seq.push(seq[seq.length-1] + seq[seq.length-2]);
    } else if (sequence == 'triangles') {
      seq.push((i * (i+1)) / 2);
    } else if (sequence == 'primes' && isPrime(i)) {
      seq.push(i);
    }
  }

  return seq;
};

const buildRecamansSequence = (sequence, noOfTerms) => {
  let seq;
  if (sequence != 'recamans') {
    seq = buildBaseSequence(sequence, noOfTerms);
  } else {
    seq = buildRecamansSequence('integers', noOfTerms);
  }
  const recamans = [0];

  let lastTerm = recamans[0];

  for (let i = 0; i < seq.length; i += 1) {
    const option = lastTerm - seq[i];
    if (option > 0 && !recamans.includes(option)) {
      lastTerm = option;
    } else {
      lastTerm += seq[i];
    }
    recamans.push(lastTerm);
  }

  return recamans;
};

const drawArc = (x1, x2, fraction, scale) => {
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  const x = (x1 + x2) / 2;
  const r = Math.abs(x2 - x);
  let startAngle, endAngle;
  if (x2 < x1) {
    startAngle = 0;
    endAngle = Math.PI * fraction;
  } else {
    startAngle = Math.PI;
    endAngle = Math.PI * (1 + fraction);
  }
  ctx.arc(x * scale, 0, r * scale, startAngle, endAngle);
  ctx.stroke();
};

const drawSetup = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const setFinalScale = () => {
  finalScale = (canvas.width - 16) / Math.max(...sequence);
};

const setScale = (elapsedSteps) => {
  const fraction = (elapsedSteps - 1) / sequence.length;
  scale = (scale * (1 - fraction)) + (targetScale * fraction);
};

const drawAll = () => {
  setFinalScale();
  drawSetup();

  ctx.translate(8, canvas.height/2);
  for (let i = 0; i < sequence.length; i += 1) {
    drawArc(sequence[i], sequence[i+1], 1, finalScale);
  }
  ctx.translate(-8, -canvas.height/2);
};

const drawPartial = (timestamp) => {
  drawSetup();
  ctx.translate(8, canvas.height/2);

  const now = new Date();
  const elapsedSteps = (now - start) / duration;
  const maxTerm = Math.floor(elapsedSteps);

  if (sequence[maxTerm + 1] > maxValue) {
    maxValue = sequence[maxTerm + 1];
    targetScale = (canvas.width - 16) / sequence[maxTerm + 1];
  }
  if (scale != targetScale) { setScale(elapsedSteps); }

  for (let i = 0; i < maxTerm; i += 1) {
    drawArc(sequence[i], sequence[i+1], 1, scale);
  }

  if (maxTerm < sequence.length) {
    drawArc(sequence[maxTerm], sequence[maxTerm+1], elapsedSteps - maxTerm, scale);
  }
  ctx.translate(-8, -canvas.height/2);
  if (maxTerm <= sequence.length) { requestAnimationFrame(drawPartial); }
};

animateButton.addEventListener('click', (event) => {
  start = new Date();
  scale = startScale;
  targetScale = startScale;
  maxValue = 10;
  drawPartial();
})

const updateDrawAll = () => {
  sequence = buildRecamansSequence(sequenceInput.value, parseInt(termsInput.value));
  drawAll();
  resultsDisplay.innerHTML = sequence.join(', ') + '...';
}

termsInput.addEventListener('input', (event) => {
  updateDrawAll();
})

sequenceInput.addEventListener('input', (event) => {
  updateDrawAll();
})

speedInput.addEventListener('input', (event) => {
  duration = 1000 / parseInt(event.target.value);
})

updateDrawAll();
