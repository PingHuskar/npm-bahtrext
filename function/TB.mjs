import SatangNum from "./SatangNum.mjs";
import IsValidText from "./IsValidText.mjs";
import removeLeadingZeros from "../snippet/removeLeadingZeros.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";
import BAHT from "../const/primitive/BAHT.mjs";
import SATANG from "../const/primitive/SATANG.mjs";
import MILLION from "../const/primitive/MILLION.mjs";
import padWithLeadingZeros from "../snippet/padWithLeadingZeros.mjs";

const TB = (BT, error = `Invalid String`) => {
  if (!BT) return undefined;
  if (/บาท$/.test(BT)) BT = `${BT}${FULLBAHT}`;
  if (!/สตางค์$/.test(BT) && !/ถ้วน$/.test(BT)) return error;
  const [moneyBaht, moneySatang] = BT.split(BAHT);
  if (/สตางค์$/.test(moneyBaht) && !moneySatang) {
    return `0.${SatangNum(moneyBaht.replace(SATANG, ``))}`;
  }
  const retSatang = SatangNum(moneySatang.replace(SATANG, ``));
  if (!retSatang) return error;
  const moneyBahts = [];
  const millions = moneyBaht.split(MILLION).reverse();
  if (!IsValidText(moneyBaht)) return error;
  for (const million of millions) {
    if (SatangNum(million)) {
      moneyBahts.push(padWithLeadingZeros(SatangNum(million), 6));
      continue;
    }
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
    const VL =
      SatangNum(
        million
          .replace(/.+แสน/, ``)
          .replace(/.+หมื่น/, ``)
          .replace(/.+พัน/, ``)
          .replace(/.+ร้อย/, ``)
      ) || `00`;
    moneyBahts.push(
      padWithLeadingZeros(
        `${VHUNDREDTHOUSAND}${VTENTHOUSAND}${VTHOUSAND}${VHUNDRED}${VL}`,
        6
      )
    );
  }
  return `${removeLeadingZeros(moneyBahts.reverse().join(""))}.${SatangNum(
    moneySatang.replace(SATANG, ``)
  )}`;
};
export default TB;