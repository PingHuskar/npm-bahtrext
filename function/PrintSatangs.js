import { FULLBAHT, SATANG } from "../const";
import SatangFirstDigit from "./SatangFirstDigit";
import SatangSecondDigit from "./SatangSecondDigit";
import defaultRounding from "../const/defaultConfig/rounding";
import ceiling from "../const/defaultConfig/ceiling";

export default (satangs, rounding = defaultRounding) => {
  const digits = String(satangs);
  if (/^0*$/.test(digits)) return { word: FULLBAHT, carry: `0` };

  const hasNonZeroRest = /[^0]/.test(digits.slice(2));
  if (/[^\d]/.test(digits) || (hasNonZeroRest && rounding === defaultRounding)) {
    return { word: undefined, carry: `0` };
  }

  const value =
    Number(digits.slice(0, 2).padEnd(2, `0`)) +
    (hasNonZeroRest && rounding === ceiling ? 1 : 0);

  if (value === 100) return { word: FULLBAHT, carry: `1` };
  if (value === 0) return { word: FULLBAHT, carry: `0` };

  const twoDigits = String(value).padStart(2, `0`);
  const satangWord = `${SatangFirstDigit(twoDigits[0])}${SatangSecondDigit(
    twoDigits
  )}${SATANG}`;
  return { word: satangWord, carry: `0` };
};
