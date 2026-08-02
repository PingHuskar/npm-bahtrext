import { FULLBAHT, SATANG } from "../const";
import SatangFirstDigit from "./SatangFirstDigit";
import SatangSecondDigit from "./SatangSecondDigit";
import { sum } from "operation-strint";
import defaultRounding from "../const/defaultConfig/rounding";
import ceiling from "../const/defaultConfig/ceiling";

export default (satangs, rounding = defaultRounding) => {
  if (/^0*$/.exec(satangs)) return { word: FULLBAHT, carry: `0` };
  if (
    (!/^\d{0,2}$/.test(satangs) && rounding === defaultRounding) ||
    /[^\d]/.test(satangs)
  ) {
    return { word: undefined, carry: `0` };
  }

  let first2digit = satangs.slice(0, 2);
  if (rounding === ceiling) {
    const theRest = satangs.slice(2);
    if (/^\d*[1-9]+/.exec(theRest) && /^\d*$/.exec(theRest)) {
      first2digit = sum(`1`, first2digit);
    }
    satangs = first2digit;
  }

  if (satangs === `100`) return { word: FULLBAHT, carry: `1` };

  const satangWord = `${SatangFirstDigit(satangs[0])}${SatangSecondDigit(
    satangs
  )}${SATANG}`;
  return { word: satangWord, carry: `0` };
};
