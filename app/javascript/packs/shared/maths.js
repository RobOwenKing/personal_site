const isSquare = (number) => {
  if (number < 0) { return false; }

  return (Math.floor(Math.sqrt(number)) ** 2) === number;
};

const isPrime = (number) => {
  if (number < 2) { return false; }
  if (number === 2) { return true; }

  for (let i = 2; i < number; i += 1) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
};

const fibs = [0, 1];

const isFibonacci = (number) => {
  if (number < 0) { return false; }

  while (fibs[fibs.length-1] < number) {
    fibs.push(fibs[fibs.length-1] + fibs[fibs.length-2]);
  }
  return fibs.includes(number);
};

const isTriangle = (number) => {
  const option = Math.floor(Math.sqrt(number * 2));

  return (option * (option + 1)) / 2 === number;
};

export { isSquare, isPrime, isFibonacci, isTriangle };
