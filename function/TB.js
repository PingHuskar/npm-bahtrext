const SatangNum = require(`./SatangNum`)
const IsValidText = require(`./IsValidText`);
const removeLeadingingZeros = require(`../snippet/removeLeadingingZeros`);
const FULLBAHT = require(`../const/primitive/FULLBAHT`)
const BAHT = require(`../const/primitive/BAHT`)
const SATANG = require(`../const/primitive/SATANG`)

module.exports = TB = (BT, error = `Invalid String`) => {
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
  return `${removeLeadingingZeros(moneyBahts.reverse().join(""))}.${SatangNum(
    moneySatang.replace(SATANG, ``)
  )}`;
};