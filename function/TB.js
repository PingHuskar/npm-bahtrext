import SatangNum from "./SatangNum";
import IsValidText from "./IsValidText";
import { padWithLeadingZeros, removeLeadingZeros } from "../snippet";
import THAINUMBERWORDS from "../const/array/THAINUMBERWORDS";
import { FULLBAHT, BAHT, SATANG, MILLION, ZERO } from "../const";
import BulkReplace from "../snippet/BulkReplace";
import InvalidString from "../const/error/InvalidString";

// Converts Thai Baht text (BT) to a numeric string representation.
// Returns the numeric value as a string, or the error string if conversion fails.
export default (BT, error = InvalidString) => {
  // If BT ends with "บาท", append "ถ้วน"
  if (BT.endsWith(BAHT)) BT = `${BT}${FULLBAHT}`;
  // If BT does not end with "สตางค์" or "ถ้วน", return error
  if (!BT.endsWith(SATANG) && !BT.endsWith(FULLBAHT)) return error;

  // Split into baht and satang parts
  const [moneyBaht, moneySatang] = BT.split(BAHT);

  // If only satang is present (no baht), return as decimal
  if (moneyBaht.endsWith(SATANG) && !moneySatang) {
    return `0.${SatangNum(moneyBaht.replace(SATANG, ""))}`;
  }

  // Validate baht text
  if (!IsValidText(moneyBaht)) return error;

  const moneyBahts = [];
  // Split baht part by "ล้าน" and process each group (from least to most significant)
  const millions = moneyBaht.split(MILLION).toReversed();

  for (const million of millions) {
    // If the group is a simple number word, convert directly
    if (SatangNum(million)) {
      moneyBahts.push(padWithLeadingZeros(SatangNum(million), 6));
      continue;
    }

    // Extract each digit group using regex, defaulting to ZERO if not found
    const THUNDREDTHOUSAND =
      /(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?แสน/.exec(million)?.at(1) ||
      ZERO;
    const VHUNDREDTHOUSAND = THAINUMBERWORDS.indexOf(THUNDREDTHOUSAND);

    const TTENTHOUSAND =
      /(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?หมื่น/.exec(million)?.at(1) ||
      ZERO;
    const VTENTHOUSAND = THAINUMBERWORDS.indexOf(TTENTHOUSAND);

    const TTHOUSAND =
      /(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?พัน/.exec(million)?.at(1) ||
      ZERO;
    const VTHOUSAND = THAINUMBERWORDS.indexOf(TTHOUSAND);

    const THUNDRED =
      /(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?ร้อย/.exec(million)?.at(1) ||
      ZERO;
    const VHUNDRED = THAINUMBERWORDS.indexOf(THUNDRED);

    // Extract the last two digits (สิบ/หน่วย) using BulkReplace and SatangNum
    const VL =
      SatangNum(
        BulkReplace(million, "", /.*?แสน/, /.*?หมื่น/, /.*?พัน/, /.*?ร้อย/)
      ) || `00`;

    // Combine all digit groups and pad to 6 digits
    moneyBahts.push(
      padWithLeadingZeros(
        `${VHUNDREDTHOUSAND}${VTENTHOUSAND}${VTHOUSAND}${VHUNDRED}${VL}`,
        6
      )
    );
  }

  // Combine all baht groups, remove leading zeros, and append satang
  return `${removeLeadingZeros(moneyBahts.toReversed().join(""))}.${SatangNum(
    moneySatang.replace(SATANG, "")
  )}`;
};
