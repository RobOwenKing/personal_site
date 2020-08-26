const transition = document.querySelector('.transition');

const duration = document.getElementById('duration');
const delay = document.getElementById('delay');

duration.addEventListener('input', (event) => {
  transition.style.transition = `all ${duration.value}s ${delay.value}s`;
})

delay.addEventListener('input', (event) => {
  transition.style.transition = `all ${duration.value}s ${delay.value}s`;
})
