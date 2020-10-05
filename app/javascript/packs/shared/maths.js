const isSquare = (number) => {
  return (Math.floor(Math.sqrt(number)) ** 2) === number;
}

const isPrime = (number) => {
  // Note that our number will always be > 2
  for (let i = 2; i < number; i += 1) {
    if (number % i == 0) {
      return false;
    }
  }
  return true;
};

const fibs = [0, 1];

const isFibonacci = (number) => {
  while (fibs[fibs.length-1] < number) {
    fibs.push(fibs[fibs.length-1] + fibs[fibs.length-2]);
  }
  return fibs.includes(number);
}

export { isSquare, isPrime, isFibonacci };
