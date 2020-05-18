const dark = document.getElementById('dark');
const light = document.getElementById('light');
let mode = "dark";

light.addEventListener('click', (event) => {
  if (mode === "dark") {
    mode = "light";
    dark.classList.remove('btn-active');
    light.classList.add('btn-active');
    draw();
  }
});

dark.addEventListener('click', (event) => {
  if (mode === "light") {
    mode = "dark";
    dark.classList.add('btn-active');
    light.classList.remove('btn-active');
    draw();
  }
});

export { mode };
