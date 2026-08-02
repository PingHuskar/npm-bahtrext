import {
  MILLION,
  SPECIALONE,
  SPECIALTWO,
  HUNDREDTHOUSAND,
  TENTHOUSAND,
  THOUSAND,
  HUNDRED,
  TEN,
  REVERSETHAIDIGITWORDS,
  ONETONINE,
} from "../const";

import ISGREQ from "../snippet/ISGREQ";

// Helper function to check if digit positions are in correct order
const areDigitPositionsValid = (indices) => {
  const ii = Object.fromEntries(
    Object.entries(indices).map(([key, value]) => [
      key,
      value === -1 ? 0 : value,
    ])
  );

  return (
    ISGREQ(
      ii.TEN,
      ii.HUNDRED,
      ii.THOUSAND,
      ii.TENTHOUSAND,
      ii.HUNDREDTHOUSAND
    ) &&
    ISGREQ(ii.HUNDRED, ii.THOUSAND, ii.TENTHOUSAND, ii.HUNDREDTHOUSAND) &&
    ISGREQ(ii.THOUSAND, ii.TENTHOUSAND, ii.HUNDREDTHOUSAND) &&
    (ii.TENTHOUSAND >= ii.HUNDREDTHOUSAND || ii.TENTHOUSAND === 0)
  );
};

// Helper function to validate individual digits
const areDigitsValid = (eachdigits) => {
  for (const digit of eachdigits.filter((x) => x)) {
    if (ONETONINE.includes(digit) || [SPECIALONE, SPECIALTWO].includes(digit)) {
      continue;
    }
    return false;
  }
  return true;
};

export default (text) => {
  // Basic validation checks
  if (typeof text !== `string`) return false;
  if (text.replace(/ล้าน/g, "") === "") return false;
  if (/สองสิบ|สิบหนึ่ง|เอ็ดสิบ/.test(text)) return false;

  // Process each million segment
  const millionSegments = text.split(MILLION);
  for (const sixdigitsword of millionSegments) {
    // Check for duplicate position words
    if (
      REVERSETHAIDIGITWORDS.slice(0, -1).some(
        (word) => sixdigitsword.split(word).length > 2
      )
    ) {
      return false;
    }

    // Get indices of position words
    const indices = {
      HUNDREDTHOUSAND: sixdigitsword.indexOf(HUNDREDTHOUSAND),
      TENTHOUSAND: sixdigitsword.indexOf(TENTHOUSAND),
      THOUSAND: sixdigitsword.indexOf(THOUSAND),
      HUNDRED: sixdigitsword.indexOf(HUNDRED),
      TEN: sixdigitsword.indexOf(TEN),
    };

    // Check if position words are in correct order
    if (!areDigitPositionsValid(indices)) {
      return false;
    }

    // Validate individual digits
    const eachdigits = sixdigitsword.split(/แสน|หมื่น|พัน|ร้อย|สิบ/);
    if (!areDigitsValid(eachdigits)) {
      return false;
    }
  }

  return true;
};
