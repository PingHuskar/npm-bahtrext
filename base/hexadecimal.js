import hexadecRegex from '../const/regex/hexadecRegex';
import toDec from './base';

export const isHex = (money) => {
  if (typeof money !== `string`) return undefined;
  if (/__/i.test(money)) return false;
  money = money.replace(/(?<=[\da-f])_(?=[\da-f])/gi, "");
  return hexadecRegex.test(money);
};

const hexToDecMap = {
  a: "10",
  b: "11",
  c: "12",
  d: "13",
  e: "14",
  f: "15",
};

export const charToDec = atof => hexToDecMap[atof.toLowerCase()] || atof;

export const toHex = num => toDec(num, 16, hexadecRegex, /^0x/i, charToDec);
