import { isSquare, isPrime, isFibonacci, isTriangle } from '../shared/maths';

const inputMin = document.getElementById('min-term');
const inputMax = document.getElementById('max-term');
const inputTuple = document.getElementById('tuple-length');
const inputFilter = document.getElementById('filter');
const inputCount = document.getElementById('count');

let minTerm = parseInt(inputMin.value);
let maxTerm = parseInt(inputMax.value);
let tupleLength = parseInt(inputTuple.value);
let filter = inputFilter.value;

const solutionDisplay = document.getElementById('solution');
const totalDisplay = document.getElementById('total');

const reducer = (total, current) => {
  return total + current;
};

const checkLast = (array) => {
  if (array.length < tupleLength) { return true; }

  const tuple = array.slice(-tupleLength).reduce(reducer);
  return filter.call(this, tuple);
};

const iterateSolve = (solutionArray) => {
  if (solutionArray.length === (maxTerm - minTerm + 1)) {
    solution.innerHTML = solutionArray.join(', ');
    return true;
  }

  for (let i = minTerm; i <= maxTerm; i+= 1) {
    if (!solutionArray.includes(i)) {
      solutionArray.push(i);
      if (checkLast(solutionArray) && iterateSolve(solutionArray)) {
        return true;
      } else {
        solutionArray.pop();
      }
    }
  }
  return false;
};

const setFilter = (filterValue) => {
  switch(filterValue) {
    case 'prime': return isPrime;
    case 'square': return isSquare;
    case 'fibonacci': return isFibonacci;
    case 'triangle': return isTriangle;
  }
};

const updateValues = () => {
  minTerm = parseInt(inputMin.value);
  maxTerm = parseInt(inputMax.value);
  tupleLength = parseInt(inputTuple.value);
  filter = setFilter(inputFilter.value);
};

const solve = () => {
  updateValues();

  if (!iterateSolve([])) {
    solution.innerHTML = "No solution found, sorry";
  }
};

const iterateCount = (countArray, counter) => {
  if (countArray.length === (maxTerm - minTerm + 1)) {
    counter += 1;
    return counter;
  }

  for (let i = minTerm; i <= maxTerm; i+= 1) {
    if (!countArray.includes(i)) {
      countArray.push(i);
      if (checkLast(countArray)) {
        counter = iterateCount(countArray, counter);
      }
      countArray.pop();
    }
  }

  return counter;
};

const count = () => {
  updateValues();

  totalDisplay.innerHTML = iterateCount([], 0);
};

const run = () => {
  solve();
  if (inputCount.checked) {
    count();
  } else {
    totalDisplay.innerHTML = "Not counting";
  }
};

inputMin.addEventListener('input', (event) => {
  inputMax.setAttribute('min', parseInt(inputMin.value) + 1);
  run();
});

inputMax.addEventListener('input', (event) => {
  inputMin.setAttribute('max', parseInt(inputMax.value) - 1);
  run();
});

inputTuple.addEventListener('input', (event) => {
  run();
});

inputFilter.addEventListener('input', (event) => {
  run();
});

run();
