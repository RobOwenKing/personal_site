const parseThreeDigit = (input) => {
  let array = [input.slice(0,1),input.slice(1,2),input.slice(2)];
  array = array.map(element => element + element);
  return array.map(element => parseInt(element, 16));
};

const parseSixDigit = (input) => {
  const array = [input.slice(0,2),input.slice(2,4),input.slice(4)];
  return array.map(element => parseInt(element, 16));
};

export const parseHex = (inputHex) => {
  let input = inputHex.value;

  if (input[0] == "#") {
    input = input.slice(1);
  }

  if (input.length == 3) {
    return parseThreeDigit(input);
  } else if (input.length == 6) {
    return parseSixDigit(input);
  } else {
    window.alert("Invalid input");
  }
};

export const parseRGB = (inputRGB) => {
  const input = inputRGB.value;

  const reForm = /(\d{1,3}), ?(\d{1,3}), ?(\d{1,3})/;
  if (!reForm.test(input)) {
    window.alert("Invalid input");
  } else {
    const reCapture = /\d+/g;
    const matches = input.match(reCapture);

    if (matches.some(element => element > 255)) {
      window.alert("Invalid input");
    } else {
      return matches.map(element => parseInt(element));
    }
  }
};

export const parseHSL = (inputHSL) => {
  const input = inputHSL.value;

  const reForm = /(\d{1,3}), ?(\d{1,3}), ?(\d{1,3})/;
  if (!reForm.test(input)) {
    window.alert("Invalid input");
  } else {
    const reCapture = /\d+/g;
    const matches = input.match(reCapture);

    if (matches[0] > 359 || matches[1] > 100 || matches[2] > 100) {
      window.alert("Invalid input");
    } else {
      return matches.map(element => parseInt(element));
    }
  }
};
