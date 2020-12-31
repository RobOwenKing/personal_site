const areaSelect = document.getElementById('area-select');

const world = {
  name: "World",
  value: "world",
  total: 1798050,
  colours: [
    { red: 51,  green: 60,  blue: 26  }, // dark green
    { red: 108, green: 49,  blue: 12  }, // brown
    { red: 122, green: 132, blue: 145 }, // stone grey
    { red: 103, green: 174, blue: 230 }  // sea blue
  ]
};

const usa = {
  name: "United States of America",
  value: "us",
  total: 335789,
  colours: [
    { red: 185, green: 52,  blue: 48  }, // red
    { red: 247, green: 247, blue: 247 }, // white
    { red: 1,   green: 38,  blue: 101 }  // blue
  ]
};

const brazil = {
  name: "Brazil",
  value: "br",
  total: 192681,
  colours: [
    { red: 71,  green: 151, blue: 58  }, // green
    { red: 245, green: 217, blue: 55  }, // yellow
    { red: 4,   green: 43,  blue: 114 }  // blue
  ]
};

const india = {
  name: "India",
  value: "in",
  total: 148738,
  colours: [
    { red: 241, green: 148, blue: 49  }, // orange
    { red: 247, green: 247, blue: 247 }, // white
    { red: 63,  green: 133, blue: 23  }  // green
  ]
};

const mexico = {
  name: "Mexico",
  value: "mx",
  total: 123845,
  colours: [
    { red: 43,  green: 104, blue: 71  }, // green
    { red: 247, green: 247, blue: 247 }, // white
    { red: 207, green: 58,  blue: 40  }  // red
  ]
};

const uk = {
  name: "United Kingdom",
  value: "uk",
  total: 72548,
  colours: [
    { red: 185, green: 52,  blue: 48  }, // red
    { red: 247, green: 247, blue: 247 }, // white
    { red: 1,   green: 38,  blue: 101 }  // blue
  ]
};

const spain = {
  name: "Spain",
  value: "es",
  total: 50482,
  colours: [
    { red: 199, green: 54,  blue: 32 }, // red
    { red: 255, green: 197, blue: 53 }  // yellow
  ]
};

const china = {
  name: "China",
  value: "cn",
  total: 4788,
  colours: [
    { red: 199, green: 54,  blue: 32 }, // red
    { red: 255, green: 197, blue: 53 }  // yellow
  ]
};

const nz = {
  name: "New Zealand",
  value: "nz",
  total: 25,
  colours: [
    { red: 185, green: 52,  blue: 48  }, // red
    { red: 247, green: 247, blue: 247 }, // white
    { red: 1,   green: 38,  blue: 101 }  // blue
  ]
};

// We'll store the data in an array so we can control the order when iterating over it
const data = [world, usa, brazil, india, mexico, uk, spain, china, nz];

const buildSelect = () => {
  for (let i = 0; i < data.length; i += 1) {
    const value = data[i].value;
    const name = data[i].name;
    areaSelect.insertAdjacentHTML('beforeend', `<option value="${value}">${name}</option>`);
  }
};

const canvas = document.getElementById('circles');
const ctx = canvas.getContext('2d');
const countDisplay = document.getElementById('count');
const totalDisplay = document.getElementById('total');
const percentDisplay = document.getElementById('percent');
let interval;
let area = world;
let colourIndex;
const colours = [];

// Viewport size based on code from https://stackoverflow.com/questions/3437786
const docElem = document.documentElement;
const body = document.getElementsByTagName('body')[0];
const viewWidth = window.innerWidth || docElem.clientWidth || body.clientWidth;
const viewHeight = window.innerHeight|| docElem.clientHeight|| body.clientHeight;

const width = 0.6 * viewWidth;
const height = 0.6 * viewHeight;

let currentX = 0.5 * width;
let currentY = 0.5 * height;
let lastAngle = 360 * Math.random();
let count, total;

canvas.width = width;
canvas.height = height;

const queueColours = () => {
  if (colours.length < 2) {
    const currentColour = area.colours[colourIndex];
    if (Math.random() < 0.2) {
      const nextIndex = (colourIndex + 1) % area.colours.length;
      const targetColour = area.colours[nextIndex];
      let red, green, blue, rgb;
      for (let i = 0; i < 10; i += 1) {
        red = ((currentColour.red * (10 - i)) + targetColour.red * i) / 10;
        green = ((currentColour.green * (10 - i)) + targetColour.green * i) / 10;
        blue = ((currentColour.blue * (10 - i)) + targetColour.blue * i) / 10;
        rgb = `rgb(${red}, ${green}, ${blue})`;
        colours.push(rgb);
      }
      colourIndex = nextIndex;
    } else {
      const rgb = `rgb(${currentColour.red}, ${currentColour.green}, ${currentColour.blue})`;
      for (let i = 0; i < 5; i += 1) {
        colours.push(rgb);
      }
    }
  }
}

const drawBackground = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
};

const drawCircle = () => {
  const colour = colours.shift();
  ctx.beginPath();
  ctx.strokeStyle = `${colour}`;
  const radius = 3 + (2 * Math.random());
  ctx.arc(currentX, currentY, radius, 0, Math.PI * 2);
  ctx.stroke();
  count += 1;
};

const setCurrentCoords = () => {
  lastAngle = lastAngle - 120 + (240 * Math.random());
  const angle = (lastAngle / 360) * 2 * Math.PI;
  currentX = currentX + (9 * Math.cos(angle));
  currentY = currentY + (9 * Math.sin(angle));

  if (currentX < 0) { currentX = canvas.width + currentX; }
  if (currentX > canvas.width) { currentX = currentX - canvas.width; }
  if (currentY < 0) { currentY = canvas.height + currentY; }
  if (currentY > canvas.height) { currentY = currentY - canvas.height; }
};

const updateDisplay = () => {
  countDisplay.innerHTML = count;
  percentDisplay.innerHTML = Math.round((count / total) * 100);
}

const step = () => {
  if (count == total) {
    stopInterval();
  } else {
    setCurrentCoords();
    queueColours();
    drawCircle();
    updateDisplay();
  }
}

const stopInterval = () => {
  clearInterval(interval);
}

areaSelect.addEventListener('input', (event) => {
  area = data.find(element => element.value == areaSelect.value);
  stopInterval();
  init();
});

canvas.addEventListener('mousemove', (event) => {
  // Maybe change this at some point?
  // Will not work with older browsers
  currentX = event.offsetX;
  currentY = event.offsetY;
})


const init = () => {
  count = 0;
  total = area.total;
  totalDisplay.innerHTML = total;
  updateDisplay();

  colourIndex = 0;
  while (colours.length > 0) { colours.shift(); }
  queueColours();

  drawBackground();
  drawCircle();
  interval = setInterval(step, 250);
}

buildSelect();
init();
