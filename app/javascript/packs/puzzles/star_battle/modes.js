const enterButton = document.getElementById('btn-enter');
const solveButton = document.getElementById('btn-solve');
let mode = 'enter';

const initModes = () => {
  solveButton.addEventListener('click', (event) => {
    mode = 'solve';
    solveButton.classList.add('btn-active');
    enterButton.classList.remove('btn-active');
  });

  enterButton.addEventListener('click', (event) => {
    mode = 'enter';
    enterButton.classList.add('btn-active');
    solveButton.classList.remove('btn-active');
  });
}

export { mode, initModes };
