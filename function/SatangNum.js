import padWithLeadingZeros from "../snippet/padWithLeadingZeros";
import {
  FULLBAHT,
  TEN,
  THAINUMBERWORDS,
  LTHAISATANGWORDS,
  FTHAISATANGWORDS,
  OneToTenTextRegex,
  ElevenToNineteenRegex,
  TwentyToNinetyNine,
} from "../const";

export default (moneySatang) => {
  if (moneySatang === FULLBAHT) return `00`;
  if (OneToTenTextRegex.test(moneySatang)) {
    return padWithLeadingZeros(THAINUMBERWORDS.indexOf(moneySatang), 2);
  }
  if (ElevenToNineteenRegex.test(moneySatang)) {
    return `1${LTHAISATANGWORDS.indexOf(moneySatang.split(TEN).at(-1))}`;
  }
  if (TwentyToNinetyNine.test(moneySatang)) {
    const [f, l] = moneySatang.split(TEN);
    return `${FTHAISATANGWORDS.indexOf(f)}${LTHAISATANGWORDS.indexOf(l)}`;
  }

  return undefined;
};
