const DEBUG = require(`../const/primitive/DEBUG`)
const FULLBAHT = require(`../const/primitive/FULLBAHT`)
const OneToTenTextRegex = require(`../const/regex/OneToTenTextRegex`)
const ElevenToNineteenRegex = require(`../const/regex/ElevenToNineteenRegex`)
const TwentyToNinetyNine = require(`../const/regex/TwentyToNinetyNine`)
const FTHAISATANGWORDS = require(`../const/array/FTHAISATANGWORDS`);
const LTHAISATANGWORDS = require(`../const/array/LTHAISATANGWORDS`);
const padWithLeadingZeros = require(`../snippet/padWithLeadingZeros`);

module.exports = SatangNum = (moneySatang) => {
  if (DEBUG) console.log(moneySatang);
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