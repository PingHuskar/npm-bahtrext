import {
  REVERSETHAIDIGITWORDS,
  THAINUMBERWORDS,
  SPECIALONE,
  SPECIALTWO,
  TEN,
} from "../const";

import padWithLeadingZeros from "../snippet/padWithLeadingZeros";

const getDigit = (d) => {
  let w = "";
  switch (d) {
    case 2:
      w = `${SPECIALTWO}${TEN}`;
      break;
    case 1:
      w = TEN;
      break;
    default:
      w = `${THAINUMBERWORDS[d]}${REVERSETHAIDIGITWORDS[4]}`;
  }
  return w;
};

export default (digits, ed = false) => {
  let w = ``;
  const Z = padWithLeadingZeros(digits, 6);
  Z.split("").forEach((d, i) => {
    d = parseInt(d);
    if (!d) return;
    if (i === 4 && (w += getDigit(d))) return;
    if (i === 5) {
      if (d === 1 && (ed || Z[4] !== "0") && (w += SPECIALONE)) return;
      w += `${THAINUMBERWORDS[d]}${REVERSETHAIDIGITWORDS[i]}`;
      return;
    }
    w += `${THAINUMBERWORDS[d]}${REVERSETHAIDIGITWORDS[i]}`;
  });
  return w;
};
