import FULLBAHT from "../const/primitive/FULLBAHT.mjs";
import OneToTenTextRegex from "../const/regex/OneToTenTextRegex.mjs";
import ElevenToNineteenRegex from "../const/regex/ElevenToNineteenRegex.mjs"
import TwentyToNinetyNine from "../const/regex/TwentyToNinetyNine.mjs"
import FTHAISATANGWORDS from "../const/array/FTHAISATANGWORDS.mjs"
import LTHAISATANGWORDS from "../const/array/LTHAISATANGWORDS.mjs"
import THAINUMBERWORDS from "../const/array/THAINUMBERWORDS.mjs"
import padWithLeadingZeros from "../snippet/padWithLeadingZeros.mjs"

const SatangNum = (moneySatang) => {
  if (moneySatang == FULLBAHT) {
    return `00`;
  } else if (OneToTenTextRegex.test(moneySatang)) {
    return `${padWithLeadingZeros(THAINUMBERWORDS.indexOf(moneySatang), 2)}`;
  } else if (ElevenToNineteenRegex.test(moneySatang)) {
    return `1${LTHAISATANGWORDS.indexOf(moneySatang.split(TEN).at(-1))}`;
  } else if (TwentyToNinetyNine.test(moneySatang)) {
    const [f, l] = moneySatang.split(TEN);
    return `${FTHAISATANGWORDS.indexOf(f)}${LTHAISATANGWORDS.indexOf(l)}`;
  }
  return undefined;
};
export default SatangNum;