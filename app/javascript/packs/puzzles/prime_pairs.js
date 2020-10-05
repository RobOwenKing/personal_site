import { isSquare, isPrime, isFibonacci } from '../shared/maths';

const inputMin = document.getElementById('min-term');
const inputMax = document.getElementById('max-term');
const inputTuple = document.getElementById('tuple-length');
const inputFilter = document.getElementById('filter');

let minTerm = parseInt(inputMin.value);
let maxTerm = parseInt(inputMax.value);
let tupleLength = parseInt(inputTuple.value);
let filter = inputFilter.value;

const solutionDisplay = document.getElementById('solution');

const reducer = (total, current) => {
  return total + current;
};

const checkLast = (solutionArray) => {
  if (solutionArray.length < tupleLength) { return true; }

  const tuple = solutionArray.slice(-tupleLength).reduce(reducer);
  return filter.call(this, tuple);
};

const addNumberToArray = (solutionArray, filter) => {
  if (solutionArray.length === (maxTerm - minTerm + 1)) {
    solution.innerHTML = solutionArray.join(', ');
    return true;
  }

  for (let i = minTerm; i <= maxTerm; i+= 1) {
    if (!solutionArray.includes(i)) {
      solutionArray.push(i);
      if (checkLast(solutionArray, filter) && addNumberToArray(solutionArray)) {
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
  }
}

const solve = () => {
  minTerm = parseInt(inputMin.value);
  maxTerm = parseInt(inputMax.value);
  tupleLength = parseInt(inputTuple.value);
  filter = setFilter(inputFilter.value);

  if (!addNumberToArray([], filter)) {
    solution.innerHTML = "No solution found, sorry";
  }
}

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
  input.addEventListener('input', (event) => {
    solve();
  })
});

document.querySelector('select').addEventListener('input', (event) => {
  solve();
});

solve();
