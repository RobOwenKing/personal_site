const element = document.getElementById('greeting');
const greetings = ['Hi!', 'Hola!', 'Salut!', 'Hallo!', 'Cześć!', '你好!'];
let current = 0;

window.setInterval(() => {
  element.innerText = greetings[current];
  current += 1;
  current = current % greetings.length;
}, 2500);
