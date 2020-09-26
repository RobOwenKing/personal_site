let direction = true;
let activeElement;

const showQuestion = (puzzle) => {
  const active = document.activeElement;

  if (direction) {
    question.innerText = puzzle.aQs[parseInt(active.dataset.a)][1];
  } else {
    question.innerText = puzzle.dQs[parseInt(active.dataset.d)][1];
  }
};

const activateInputs = (puzzle) => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.addEventListener('focus', (event) => {
      if (!input.dataset.a) { direction = false; }
      if (!input.dataset.d) { direction = true; }
      showQuestion(puzzle);
      highlightCells();
    });
  });
};

const highlightCells = () => {
  const current = document.querySelectorAll('.highlighted');
  current.forEach((cell) => {
    cell.classList.remove('highlighted');
    cell.classList.add('white');
  });

  const active = document.activeElement;
  const letter = direction ? 'a' : 'd';
  const target = direction ? active.dataset.a : active.dataset.d;
  const future = document.querySelectorAll(`[data-${letter}='${target}']`);
  future.forEach((cell) => {
    cell.classList.add('highlighted');
    cell.classList.remove('white');
  });
};

const handleArrow = (i, j, dir, puzzle) => {
  if (dir != direction) {
    direction = !direction;
    highlightCells();
    showQuestion(puzzle);
  } else {
    document.getElementById(`${i}-${j}`).childNodes[0].focus();
  }
};

const handleKeyPresses = (puzzle) => {
  const solution = puzzle.solution;

  document.addEventListener('keyup', (event) => {
    const input = document.activeElement;
    const i = parseInt(input.parentElement.dataset.i);
    const j = parseInt(input.parentElement.dataset.j);

    if (event.key === "ArrowRight" && solution[j][i+1] && solution[j][i+1] != '.') {
      handleArrow(i+1, j, true, puzzle);
    } else if (event.key === "ArrowLeft" && solution[j][i-1] && solution[j][i-1] != '.') {
      handleArrow(i-1, j, true, puzzle);
    } else if (event.key === "ArrowUp" && solution[j-1] && solution[j-1][i] != '.') {
      handleArrow(i, j-1, false, puzzle);
    } else if (event.key === "ArrowDown" && solution[j+1] && solution[j+1][i] != '.') {
      handleArrow(i, j+1, false, puzzle);
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      if (direction && solution[j][i+1] && solution[j][i+1] != '.') {
        handleArrow(i+1, j, true, puzzle);
      } else if (!direction && solution[j+1] && solution[j+1][i] != '.') {
        handleArrow(i, j+1, false, puzzle);
      }
    }
  });
};

export const activate = (puzzle) => {
  activateInputs(puzzle);
  handleKeyPresses(puzzle);
};
