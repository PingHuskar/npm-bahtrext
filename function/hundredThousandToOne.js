const {
    REVERSETHAIDIGITWORDS
    ,THAINUMBERWORDS
    ,SPECIALONE
    ,SPECIALTWO
    ,TEN
} = require(`../const`)

const padWithLeadingZeros = require(`../snippet/padWithLeadingZeros`)
module.exports = hundredThousandToOne = (digits, ed = false) => {
  let word = ``;
  let c = 0;
  const digitspadWithLeadingZeros = padWithLeadingZeros(digits, 6);
  for (let digit of digitspadWithLeadingZeros) {
    digit = parseInt(digit);
    if (!(digit === 0)) {
      if (c == 4 && digit == 2) {
        word += `${SPECIALTWO}${TEN}`;
      } else if (c == 4 && digit == 1) {
        word += TEN;
      } else if (c == 5 && digit == 1 && ed) {
        word += SPECIALONE;
      } else if (c == 5 && digit == 1 && digitspadWithLeadingZeros[4] != 0) {
        word += SPECIALONE;
      } else {
        word += `${THAINUMBERWORDS[digit]}${REVERSETHAIDIGITWORDS[c]}`;
      }
    }
    c++;
  }
  return word;
};
