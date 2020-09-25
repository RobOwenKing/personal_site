import { puzzles } from './crosswords/data.js';
import { onLoad } from './crosswords/on_load.js';

export const grid = document.querySelector('#puzzle-grid tbody');
const puzzle = grid.parentElement.dataset.puzzle;

const solution = puzzles.find(element => element.name == puzzle).solution;

//const qNumbers = onLoad(solution);
onLoad(solution);
