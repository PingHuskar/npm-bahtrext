import { BAHT, FULLBAHT, SATANG, ZERO } from "../const";
import InvalidType from "../const/error/InvalidType";
import TB from "./TB";
import BT from "./BTv2";

// Converts Thai number text (e.g. "สอง", "สองบาทห้าสิบสตางค์") to a numeric string.
// Returns undefined when the text is not a canonical Thai number.
const toNum = (text) => {
  if (typeof text !== "string") return undefined;
  const str = text.replace(/\s/g, "");
  if (!str) return undefined;
  if (str === ZERO || str === `${ZERO}${BAHT}${FULLBAHT}`) return "0.00";

  const money =
    str.endsWith(SATANG) || str.endsWith(FULLBAHT)
      ? str
      : str.endsWith(BAHT)
      ? `${str}${FULLBAHT}`
      : `${str}${BAHT}${FULLBAHT}`;

  try {
    const num = TB(money);
    if (typeof num !== "string" || !/^\d+\.\d{2}$/.test(num)) return undefined;
    // round-trip check: reject text TB parses loosely (e.g. "สองสอง", "สิบห้าร้อย")
    return BT(num) === money ? num : undefined;
  } catch {
    return undefined;
  }
};

// Compares two non-negative numeric strings ("123.45") without precision loss.
const compare = (a, b) => {
  const [aInt, aFrac] = a.split(".");
  const [bInt, bFrac] = b.split(".");
  if (aInt.length !== bInt.length) return aInt.length - bInt.length;
  if (aInt !== bInt) return aInt < bInt ? -1 : 1;
  if (aFrac !== bFrac) return aFrac < bFrac ? -1 : 1;
  return 0;
};

// Sorts an array of Thai number text by numeric value.
// Invalid entries are removed (removeInvalid) or kept at the end in original order.
export default function SortNumText(arr, { desc = false, removeInvalid = false } = {}) {
  if (!Array.isArray(arr)) return InvalidType;

  const valid = [];
  const invalid = [];
  for (const text of arr) {
    const num = toNum(text);
    if (num === undefined) invalid.push(text);
    else valid.push({ text, num });
  }

  const sorted = valid
    .sort((a, b) => (desc ? compare(b.num, a.num) : compare(a.num, b.num)))
    .map(({ text }) => text);

  return removeInvalid ? sorted : [...sorted, ...invalid];
}
