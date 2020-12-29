const roman = document.getElementById('roman');

const romanify = (num) => {
  // We only need Roman numerals up to L as we'll never reach 90
  const romans = ['L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
  // The Arabic numerals matching the above Roman numerals, in order
  const arabics = [50, 40, 10, 9, 5, 4, 1];
  let answer = '';

  // We'll iterate over the above arrays, note from larger to smaller
  for (let i = 0; i < romans.length; i += 1) {
    // If our num is still bigger than next Arabic numeral
    // We need to append its Roman expression to our answer
    // Note inclusion of 4, 9 and 40 to handle prepending of Is and Xs
    while (num >= arabics[i]) {
      answer += romans[i];
      num -= arabics[i];
    }
  }

 return answer == '' ? 'Nulla' : answer;
};

export const updateRomanClock = (state) => {
  // Convert each element to Roman numerals
  const romanHrs = romanify(state.hrs);
  const romanMins = romanify(state.mins);
  const romanSecs = romanify(state.secs);
  // Enter them into the dom in one go
  roman.innerHTML = `<span class="clock-large">${romanHrs}:${romanMins}</span>${romanSecs}`;
};
