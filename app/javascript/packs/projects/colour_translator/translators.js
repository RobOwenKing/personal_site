import { red, green, blue, hue, sat, ltns } from '../colour_translator';

const calculateH = (rPrime, gPrime, bPrime, cMax, cMin, delta) => {
  let hValue;
  if (delta == 0) {
    hValue = 0;
  } else if (cMax === rPrime) {
    hValue = 60 * (((gPrime - bPrime) / delta) % 6);
    hValue = hValue < 0 ? 360 + hValue : hValue;
  } else if (cMax === gPrime) {
    hValue = 60 * (((bPrime - rPrime) / delta) + 2);
  } else if (cMax === bPrime) {
    hValue = 60 * (((rPrime - gPrime) / delta) + 4);
  } else {
    throw new Error(`Error in calculateH(${rPrime}, ${gPrime}, ${bPrime}, ${cMax}, ${cMin}, ${delta})`);
  }
  return hValue;
};

const calculateS = (delta, lValue) => {
  if (delta === 0) {
    return 0;
  } else {
    return delta / (1 - Math.abs(2 * lValue - 1));
  }
};

export const RGBtoHSL = () => {
  // We need red, green and blue on 0 to 1
  const rPrime = red / 255;
  const gPrime = green / 255;
  const bPrime = blue / 255;

  // Calculate needed intermediate values
  const cMax = Math.max(rPrime, gPrime, bPrime);
  const cMin = Math.min(rPrime, gPrime, bPrime);
  const delta = cMax - cMin;

  // Use those to get our HSL (S and L on 0 to 1)
  const hValue = calculateH(rPrime, gPrime, bPrime, cMax, cMin, delta);
  const lRaw = (cMax + cMin) / 2;
  const sRaw = calculateS(delta, lRaw);

  // Return the values, moving S and L to 0 to 100
  return [Math.round(hValue), Math.round(sRaw * 100), Math.round(lRaw * 100)];
};

const calculateRGBPrimes = (cValue, xValue) => {
  if (hue < 60) {
    return [cValue, xValue, 0];
  } else if (hue < 120) {
    return [xValue, cValue, 0];
  } else if (hue < 180) {
    return [0, cValue, xValue];
  } else if (hue < 240) {
    return [0, xValue, cValue];
  } else if (hue < 300) {
    return [xValue, 0, cValue];
  } else if (hue < 360) {
    return [cValue, 0, xValue];
  } else {
    throw new Error(`Error in calculateRGBPrimes(${cValue}, ${xValue})`);
  }
};

export const HSLtoRGB = () => {
  // We need saturation and lightness on 0 to 1
  const sPrime = sat / 100;
  const lPrime = ltns / 100;

  // Calculate needed intermediary values
  const cValue = (1 - Math.abs(2 * lPrime - 1)) * sPrime;
  const xValue = cValue * (1 - Math.abs((hue / 60) % 2 - 1));
  const mValue = lPrime - (cValue / 2);

  // Now order them as required
  const RGBPrimes = calculateRGBPrimes(cValue, xValue);

  const rValue = (RGBPrimes[0] + mValue) * 255;
  const gValue = (RGBPrimes[1] + mValue) * 255;
  const bValue = (RGBPrimes[2] + mValue) * 255;

  return [Math.round(rValue), Math.round(gValue), Math.round(bValue)];
};
