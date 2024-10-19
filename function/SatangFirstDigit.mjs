import TEN from "../const/primitive/TEN.mjs"
import SPECIALTWO from "../const/primitive/SPECIALTWO.mjs"
import THAINUMBERWORDS from "../const/array/THAINUMBERWORDS.mjs"
const SatangFirstDigit = (digit) => {
  if (digit == 0) return ``;
  if (digit == 1) return `${TEN}`;
  if (digit == 2) return `${SPECIALTWO}${TEN}`;
  return `${THAINUMBERWORDS[parseInt(digit)]}${TEN}`;
};
export default SatangFirstDigit;