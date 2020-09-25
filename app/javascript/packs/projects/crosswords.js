import { puzzles } from './crosswords/data.js';
import { onLoad } from './crosswords/on_load.js';
import { activate } from './crosswords/interaction.js';

export const grid = document.querySelector('#puzzle-grid tbody');

const puzzle = puzzles.find(element => element.name == grid.parentElement.dataset.puzzle);

export const question = document.getElementById('question');

onLoad(puzzle);
activate(puzzle);
