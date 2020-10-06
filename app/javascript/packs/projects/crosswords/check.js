export const checkGrid = (puzzle) => {
  const inputs = Array.from(document.querySelectorAll('input'));
  inputs.forEach(input => {
    if (input.value.toUpperCase() == puzzle.solution[input.dataset.j][input.dataset.i]) {
      if (input.classList.contains('red')) {
        input.classList.remove('red');
      }
    } else {
      input.classList.add('red');
    }
  });

  const inputCorrect = (input) => {
    return input.value.toUpperCase() == puzzle.solution[input.dataset.j][input.dataset.i];
  };
  inputs.every(inputCorrect) ? window.alert("Well done!") : window.alert("Sorry, that doesn't look right");
}
