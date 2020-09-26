import { puzzles } from './crosswords/data.js';
import { onLoad } from './crosswords/on_load.js';
import { activate } from './crosswords/interaction.js';
import { checkGrid } from './crosswords/check.js';

export const grid = document.querySelector('#puzzle-grid tbody');
export const question = document.getElementById('question');

const puzzle = puzzles.find(element => element.name == grid.parentElement.dataset.puzzle);

onLoad(puzzle);
activate(puzzle);

const btnCheck = document.getElementById('check-grid');
btnCheck.addEventListener('click', (event) => {
  checkGrid(puzzle);
});
