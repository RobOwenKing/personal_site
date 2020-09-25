let direction = 'a';

export const activateCells = (puzzle) => {
  const inputs = document.querySelectorAll('input');

  inputs.forEach((input) => {
    input.addEventListener('focus', (event) => {
      question.innerText = puzzle.aQs[parseInt(input.dataset.a)];
    });
  });
}
