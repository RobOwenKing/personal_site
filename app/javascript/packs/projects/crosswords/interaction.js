let direction = true;
let activeElement;

const activateInputs = (puzzle) => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.addEventListener('focus', (event) => {
      activeElement = input;
      if (direction) {
        question.innerText = puzzle.aQs[parseInt(input.dataset.a)];
      } else {
        question.innerText = puzzle.dQs[parseInt(input.dataset.d)];
      }
    });
  });
};

const handleArrow = (i, j, dir) => {
  if (dir != direction) {
    direction = !direction;
  } else {
    document.getElementById(`${i}-${j}`).childNodes[0].focus();
  }
};

const handleKeyPresses = (solution) => {
  document.addEventListener('keyup', (event) => {
    const input = document.activeElement;
    const i = parseInt(input.parentElement.dataset.i);
    const j = parseInt(input.parentElement.dataset.j);

    if (event.key === "ArrowRight" && solution[j][i+1] && solution[j][i+1] != '.') {
      handleArrow(i+1, j, true);
    } else if (event.key === "ArrowLeft" && solution[j][i-1] && solution[j][i-1] != '.') {
      handleArrow(i-1, j, true);
    } else if (event.key === "ArrowUp" && solution[j-1] && solution[j-1][i] != '.') {
      handleArrow(i, j-1, false);
    } else if (event.key === "ArrowDown" && solution[j+1] && solution[j+1][i] != '.') {
      handleArrow(i, j+1, false);
    } else if (event.key != "Backspace") {
      console.log(event);
    }
  });
};

export const activate = (puzzle) => {
  activateInputs(puzzle);
  handleKeyPresses(puzzle.solution);
};
