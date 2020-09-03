const canvas = document.getElementById('circles-canvas');
const ctx = canvas.getContext('2d');

const page = 1;


const draw = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < canvas.width; x += 10) {
    for (let y = 0; y <= canvas.height; y += 10) {
      ctx.beginPath();

      const colour = ((x + 3) * (y - 3) * page) % 359;
      ctx.strokeStyle = `hsl(${colour},75%,75%)`;

      const radius = ((x + 11) * (y + 13) * page) % 150;

      ctx.arc(x + 5, y + 5, 3 + (radius / 100), 0, Math.PI * 2, true);

      ctx.stroke();
    }
  }
};

draw();
