const DEBUG = false;

const VERSION = `1.1.5`

const SPECIALONE = `เอ็ด`;
const SPECIALTWO = `ยี่`;
const TEN = `สิบ`;
const BAHT = `บาท`;
const MILLION = `ล้าน`;
const FULLBAHT = `ถ้วน`;
const SATANG = `สตางค์`;
const READAS = `อ่านว่า`;

const LAST6DIGITPATTERN = /\d{1,6}$/g;
const SPLITPATTERN = /^(\d*)(\.\d{0,2}0*)?$/;

const ZERO = `ศูนย์`;
const ONE = `หนึ่ง`;
const TWO = `สอง`;
const THREE = `สาม`;
const FOUR = `สี่`;
const FIVE = `ห้า`;
const SIX = `หก`;
const SEVEN = `เจ็ด`;
const EIGHT = `แปด`;
const NINE = `เก้า`;
const THAINUMBERWORDS = [
  ZERO,
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
];
const LTHAISATANGWORDS = [
  ``,
  SPECIALONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
];
const FTHAISATANGWORDS = [
  ``,
  ``,
  SPECIALTWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
];
const HUNDRED = `ร้อย`;
const THOUSAND = `พัน`;
const TENTHOUSAND = `หมื่น`;
const HUNDREDTHOUSAND = `แสน`;
const REVERSETHAIDIGITWORDS = [
  HUNDREDTHOUSAND,
  TENTHOUSAND,
  THOUSAND,
  HUNDRED,
  TEN,
  "",
];

const MoneyInvalid = (money) =>
  `Your Input is Invalid Format!\nThis is Your Input : ${money}\nTry Again`;

const removeLeadingingZeros = (string) => string.replace(/^0+/g, "");

const MoneyLaundering = (money) => {
  const removeComma = money.replace(/,/g, "");
  const removeCommaAndUnderScore = removeComma.replace(/_/g, "");
  const removeCommaAndUnderScoreAndLeadingingZeros = removeLeadingingZeros(
    removeCommaAndUnderScore
  );
  return removeCommaAndUnderScoreAndLeadingingZeros;
};
const IsMoneyValidate = (money) => SPLITPATTERN.test(money);
const splitIntFrac = (money) => {
  const match = money.match(SPLITPATTERN);
  let [moneyFull, moneyInt, moneyFrac] = match;
  moneyFrac === undefined
    ? (moneyFrac = "")
    : (moneyFrac = moneyFrac.replace(/^\./, ""));
  return [moneyFull, moneyInt, moneyFrac];
};

const padWithLeadingZeros = (num, totalLength) => {
  // https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number
  return String(num).padStart(totalLength, "0");
};

const hundredThousandToOne = (digits) => {
  let word = ``;
  let c = 0;
  const digitspadWithLeadingZeros = padWithLeadingZeros(digits, 6);
  for (let digit of digitspadWithLeadingZeros) {
    digit = parseInt(digit);
    if (!(digit === 0)) {
      if (c == 4 && digit == 2) {
        word += `${SPECIALTWO}${TEN}`;
      } else if (c == 4 && digit == 1) {
        word += TEN;
      } else if (c == 5 && digit == 1 && digitspadWithLeadingZeros[4] != 0) {
        word += SPECIALONE;
      } else {
        word += `${THAINUMBERWORDS[digit]}${REVERSETHAIDIGITWORDS[c]}`;
      }
    }
    c++;
  }
  return word;
};

const LeandingEdToOne = (money) => money.replace(/^เอ็ด(?=(ล้าน)+)/, ONE);

const PrintBaht = (money) => {
  if (!money) return ``;
  let newMoney = [];
  let f6 = true;
  while (money != ``) {
    let selectedupto6digit = money.match(LAST6DIGITPATTERN)[0];
    newMoney.push(
      `${hundredThousandToOne(selectedupto6digit)}${f6 ? "" : MILLION}`
    );
    f6 ? (f6 = !f6) : "";
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  const cleanLeadingEd = LeandingEdToOne(newMoney.reverse().join(""));
  return `${cleanLeadingEd}${BAHT}`;
};

const SatangFirstDigit = (digit) => {
  if (digit == 0) return ``;
  if (digit == 1) return `${TEN}`;
  if (digit == 2) return `${SPECIALTWO}${TEN}`;
  return `${THAINUMBERWORDS[parseInt(digit)]}${TEN}`;
};

const SatangSecondDigit = (digit) => {
  if (digit[1] === undefined || digit[1] === "0") return "";
  if (digit[0] !== "0" && digit[1] === "1") return SPECIALONE;
  return `${THAINUMBERWORDS[parseInt(digit[1])]}`;
};

const PrintSatangs = (satangs) => {
  if (satangs.match(/^0*$/)) return FULLBAHT;
  if (!(/^\d{0,2}$/.test(satangs))) return undefined;
  let satangword = `${SatangFirstDigit(satangs[0])}${SatangSecondDigit(
    satangs
  )}${SATANG}`;
  return satangword;
};

let THB = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
});

const BahtText = (
  money,
  currencyformat = THB,
  arrow = READAS,
  ClErr = MoneyInvalid,
  InvalidType = `"Invalid Type"`,
  NoInput = null
) => {
  if (!money) return NoInput;
  if (typeof money !== "string") return InvalidType;
  const cleanedMoney = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney) || money === `.`) return ClErr(money);
  const [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/))
    return `${
      currencyformat ? currencyformat.format(moneyFull) : moneyFull
    } ${arrow} "${THAINUMBERWORDS[0]}${BAHT}${FULLBAHT}"`;
  return `${
    currencyformat ? currencyformat.format(moneyFull) : moneyFull
  } ${arrow} "${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}"`;
};

const BT = (money) => {
  const rBahtText = BahtText(money);
  if (!rBahtText) return undefined;
  return rBahtText.split('"').at(-2);
};

const THAI2ARABICNumerals = [
  { th: `๐`, a: `0` },
  { th: `๑`, a: `1` },
  { th: `๒`, a: `2` },
  { th: `๓`, a: `3` },
  { th: `๔`, a: `4` },
  { th: `๕`, a: `5` },
  { th: `๖`, a: `6` },
  { th: `๗`, a: `7` },
  { th: `๘`, a: `8` },
  { th: `๙`, a: `9` },
];

const BF = (flexmoney, InvalidType = `Invalid Type`) => {
  if (!flexmoney) return undefined;
  if (typeof flexmoney !== "string") return InvalidType;
  let money = flexmoney;
  if (DEBUG) console.log(money);
  for (const THAI2ARABICNumeral of THAI2ARABICNumerals) {
    money = money.replace(
      RegExp(THAI2ARABICNumeral.th, `g`),
      THAI2ARABICNumeral.a
    );
  }
  if (DEBUG) console.log(money);
  return BT(money);
};

const IsMatchInSkipsPattern = (match, skips) => {
  for (const skip of skips) {
    if (skip.test(match)) return true;
  }
  return false;
};

const defaultBulkBahtTextPat = /\b(\d+)(\.\d{0,2}0*)?\b/g;
const defaultBulkBahtTextSkips = [/\b5+\+?\b/];

const BulkBahtText = (
  str,
  pat = defaultBulkBahtTextPat,
  skips = defaultBulkBahtTextSkips
) => {
  if (typeof str !== "string") return `Invalid Type`;
  if (!str) return null;
  const matches = str.match(pat);
  if (!matches) return str;
  for (const match of matches) {
    if (IsMatchInSkipsPattern(match, skips)) continue;
    str = str.replace(match, BahtText(match).split('"').at(-2));
  }
  return str;
};

const ValidSATANGRegex =
  /((ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?(สิบ))?(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?สตางค์|(หนึ่งสตางค์)|(ถ้วน)/gs;

const NumText = (str, arr = THAINUMBERWORDS, flag = `g`) => {
  if (!str) return undefined;
  if (typeof str !== "string") return `Invalid Type`;
  for (const i in arr) {
    str = str.replace(new RegExp(i, flag), arr[i]);
  }
  return str;
};

const OneToTenTextRegex = /^(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า|สิบ)$/;
const ElevenToNineteenRegex = /^สิบ(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)$/;
const TwentyToNinetyNine =
  /^(ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)สิบ(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?$/;

const SatangNum = (moneySatang) => {
  if (DEBUG)  console.log(moneySatang);
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

const TB = (BT, error = `Invalid String`) => {
  if (!BT) return undefined;
  if (!(/สตางค์$/.test(BT)) && !(/บาท$/.test(BT)) && !(/ถ้วน$/.test(BT))) return error;
  const [moneyBaht, moneySatang] = BT.split(BAHT);
  if (DEBUG) console.log(moneyBaht, moneySatang);
  if (/สตางค์$/.test(moneyBaht) && !moneySatang) {
    return `0.${SatangNum(moneyBaht.replace(SATANG, ``))}`;
  }
  const retSatang = SatangNum(moneySatang.replace(SATANG, ``));
  if (!retSatang) return error;
  const moneyBahts = [];
  const millions = moneyBaht.split(MILLION).reverse();
  for (const million of millions) {
    if (/สองสิบ/.test(million)) return error
    if (/สิบหนึ่ง/.test(million)) return error
    if (SatangNum(million)) {
      moneyBahts.push(padWithLeadingZeros(SatangNum(million), 6));
      continue;
    }
    const iHUNDREDTHOUSAND = million.indexOf(HUNDREDTHOUSAND);
    const iTENTHOUSAND = million.indexOf(TENTHOUSAND);
    const iTHOUSAND = million.indexOf(THOUSAND);
    const iHUNDRED = million.indexOf(HUNDRED);
    const iTEN = million.indexOf(TEN);
    const iiTEN = iTEN == -1 ? 0 : iTEN;
    const iiHUNDRED = iHUNDRED == -1 ? 0 : iHUNDRED;
    const iiTHOUSAND = iTHOUSAND == -1 ? 0 : iTHOUSAND;
    const iiTENTHOUSAND = iTENTHOUSAND == -1 ? 0 : iTENTHOUSAND;
    const iiHUNDREDTHOUSAND = iHUNDREDTHOUSAND == -1 ? 0 : iHUNDREDTHOUSAND;
    if (DEBUG) {
      console.log(iiTEN);
      console.log(iiHUNDRED);
      console.log(iiTHOUSAND);
      console.log(iiTENTHOUSAND);
      console.log(iiHUNDREDTHOUSAND);
    }
    if (
      !(
        ((iiTEN >= iiHUNDRED &&
          iiTEN >= iiTHOUSAND &&
          iiTEN >= iiTENTHOUSAND &&
          iiTEN >= iiHUNDREDTHOUSAND) ||
          iiTEN == 0) &&
        ((iiHUNDRED >= iiTHOUSAND &&
          iiHUNDRED >= iiTENTHOUSAND &&
          iiHUNDRED >= iiHUNDREDTHOUSAND) ||
          iiHUNDRED == 0) &&
          ((iiTHOUSAND >= iiTENTHOUSAND && 
            iiTHOUSAND >= iiHUNDREDTHOUSAND) ||
            iiTHOUSAND == 0) &&
        (iiTENTHOUSAND >= iiHUNDREDTHOUSAND || iiTENTHOUSAND == 0)
      )
    )
      return error;
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
  return `${removeLeadingingZeros(moneyBahts.reverse().join(""))}.${
    SatangNum(moneySatang.replace(SATANG, ``))
  }`;
};

const IsValidTB = (str) => {
  return str === BT(TB(str)).replace(FULLBAHT, "");
};

const ABT = (money) => {
  if (!money) return undefined;
  switch (typeof money) {
    case "number":
      const MAX_SAFE_INTEGER = 9007199254740991
      if (money > MAX_SAFE_INTEGER) {
        console.warn(`Consider use BahtRext`);
      }
      const THBText = require("thai-baht-text");
      return THBText(money);
    case "string":
      return BF(money);
    default:
      return undefined;
  }
}

const large_numbers = [
  { name: "Million", powof10: 6 },
  { name: "Billion", powof10: 9 },
  { name: "Trillion", powof10: 12 },
  { name: "Quadrillion", powof10: 15 },
  { name: "Quintillion", powof10: 18 },
  { name: "Sextillion", powof10: 21 },
  { name: "Septillion", powof10: 24 },
  { name: "Octillion", powof10: 27 },
  { name: "Nonillion", powof10: 30 },
  { name: "Decillion", powof10: 33 },
  { name: "Undecillion", powof10: 36 },
  { name: "Duodecillion", powof10: 39 },
  { name: "Tredecillion", powof10: 42 },
  { name: "Quattuordecillion", powof10: 45 },
  { name: "Quindecillion", powof10: 48 },
  { name: "Sedecillion", powof10: 51 },
  { name: "Septendecillion", powof10: 54 },
  { name: "Octodecillion", powof10: 57 },
  { name: "Novendecillion", powof10: 60 },
  { name: "Vigintillion", powof10: 63 },
  { name: "Unvigintillion", powof10: 66 },
  { name: "Duovigintillion", powof10: 69 },
  { name: "Tresvigintillion", powof10: 72 },
  { name: "Quattuorvigintillion", powof10: 75 },
  { name: "Quinvigintillion", powof10: 78 },
  { name: "Sesvigintillion", powof10: 81 },
  { name: "Septemvigintillion", powof10: 84 },
  { name: "Octovigintillion", powof10: 87 },
  { name: "Novemvigintillion", powof10: 90 },
  { name: "Trigintillion", powof10: 93 },
  { name: "Untrigintillion", powof10: 96 },
  { name: "Duotrigintillion", powof10: 99 },
  { name: "Trestrigintillion", powof10: 102 },
  { name: "Quattuortrigintillion", powof10: 105 },
  { name: "Quintrigintillion", powof10: 108 },
  { name: "Sestrigintillion", powof10: 111 },
  { name: "Septentrigintillion", powof10: 114 },
  { name: "Octotrigintillion", powof10: 117 },
  { name: "Noventrigintillion", powof10: 120 },
  { name: "Quadragintillion", powof10: 123 },
  { name: "Quinquagintillion", powof10: 153 },
  { name: "Sexagintillion", powof10: 183 },
  { name: "Septuagintillion", powof10: 213 },
  { name: "Octogintillion", powof10: 243 },
  { name: "Nonagintillion", powof10: 273 },
  { name: "Centillion", powof10: 303 },
  { name: "Uncentillion", powof10: 306 },
  { name: "Decicentillion", powof10: 333 },
  { name: "Undecicentillion", powof10: 336 },
  { name: "Viginticentillion", powof10: 363 },
  { name: "Unviginticentillion", powof10: 366 },
  { name: "Trigintacentillion", powof10: 393 },
  { name: "Quadragintacentillion", powof10: 423 },
  { name: "Quinquagintacentillion", powof10: 453 },
  { name: "Sexagintacentillion", powof10: 483 },
  { name: "Septuagintacentillion", powof10: 513 },
  { name: "Octogintacentillion", powof10: 543 },
  { name: "Nonagintacentillion", powof10: 573 },
  { name: "Ducentillion", powof10: 603 },
  { name: "Trecentillion", powof10: 903 },
  { name: "Quadringentillion", powof10: 1203 },
  { name: "Quingentillion", powof10: 1503 },
  { name: "Sescentillion", powof10: 1803 },
  { name: "Septingentillion", powof10: 2103 },
  { name: "Octingentillion", powof10: 2403 },
  { name: "Nongentillion", powof10: 2703 },
  { name: "Millinillion", powof10: 3003 },
  { name: "Googol", powof10: 100 },
];

const LNBT = (nameorpowerof10, d=`1`) => {
  const tnameorpowerof10 = typeof(nameorpowerof10)
  switch (tnameorpowerof10) {
    case `string`:
      try {
        if (nameorpowerof10 == `Googolplex`) {
          return BT(d + `0`.repeat(10).repeat(10).repeat(10));
        }
        const v = large_numbers.find(n => n.name === nameorpowerof10).powof10
        if (v < 0) return undefined
        return BT(d + `0`.repeat(v));
      } catch (error) {
        return undefined
      }
    case `number`:
      if (nameorpowerof10 < 0) return undefined
      return BT(d + `0`.repeat(nameorpowerof10))
    default:
      return undefined;
  }
}

module.exports = {
  VERSION,
  SPECIALONE,
  SPECIALTWO,
  TEN,
  BAHT,
  SATANG,
  FULLBAHT,
  MILLION,
  LAST6DIGITPATTERN,
  SPLITPATTERN,
  REVERSETHAIDIGITWORDS,
  THAINUMBERWORDS,
  FTHAISATANGWORDS,
  LTHAISATANGWORDS,
  MoneyLaundering,
  removeLeadingingZeros,
  IsMoneyValidate,
  splitIntFrac,
  PrintBaht,
  PrintSatangs,
  THB,
  BahtText,
  BT,
  BulkBahtText,
  ValidSATANGRegex,
  OneToTenTextRegex,
  ElevenToNineteenRegex,
  TwentyToNinetyNine,
  NumText,
  SatangNum,
  TB,
  IsValidTB,
  THAI2ARABICNumerals,
  BF,
  ABT,
  large_numbers,
  LNBT
};
