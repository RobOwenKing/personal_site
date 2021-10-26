const element = document.getElementById('greeting');
const greetings = ['Hi!', 'Hola!', 'Salut!', 'Servus!', 'Cześć!', '你好!'];
let current = 0;

window.setInterval(() => {
  element.innerText = greetings[current];
  current = (current + 1) % greetings.length;
}, 2500);
