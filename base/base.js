import { sum, multiply, pow } from 'operation-strint';

export default (num, base, regex, replaceRegex, charToDec = (i) => i) => {
  if (!regex.test(num)) return num;
  num = num.replace(replaceRegex, '');

  return num
    .split("")
    .toReversed()
    .reduce((acc, digit, index) => {
      const thispos_val = multiply(pow(`${base}`, `${index}`), charToDec(digit));
      return sum(acc, thispos_val) || "0";
    }, "0");
};