const {
  DEBUG,
  GoogleSheetsCellCharactersLimit,
  VERSION,
  SPECIALONE,
  SPECIALTWO,
  TEN,
  BAHT,
  MILLION,
  FULLBAHT,
  SATANG,
  READAS,
  LAST6DIGITPATTERN,
  SPLITPATTERN,
  ZERO,
  ONE,
  THAINUMBERWORDS,
  ONETONINE,
  LTHAISATANGWORDS,
  FTHAISATANGWORDS,
  HUNDRED,
  THOUSAND,
  TENTHOUSAND,
  HUNDREDTHOUSAND,
  REVERSETHAIDIGITWORDS,
  THAI2ARABICNumerals,
  ValidSATANGRegex,
  defaultBulkBahtTextPat,
  defaultBulkBahtTextSkips,
  OneToTenTextRegex,
  ElevenToNineteenRegex,
  TwentyToNinetyNine,
  large_numbers,
} = require("./consts.js");

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

const hundredThousandToOne = (digits, ed = false) => {
  let word = ``;
  let c = 0;
  if (DEBUG) console.log(`ed`,ed)
  const digitspadWithLeadingZeros = padWithLeadingZeros(digits, 6);
  for (let digit of digitspadWithLeadingZeros) {
    digit = parseInt(digit);
    if (!(digit === 0)) {
      if (c == 4 && digit == 2) {
        word += `${SPECIALTWO}${TEN}`;
      } else if (c == 4 && digit == 1) {
        word += TEN;
      } else if (c == 5 && digit == 1 && (ed)) {
        word += SPECIALONE;
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

const LeadingSpecialOneToOne = (money) => money.replace(/^เอ็ด(?=(ล้าน)+)/, ONE);

const PrintBaht = (money, ed = false) => {
  if (!money) return ``;
  let newMoney = [];
  while (money != ``) {
    let selectedupto6digit = money.match(LAST6DIGITPATTERN)[0];
    newMoney.push(
      `${hundredThousandToOne(selectedupto6digit, ed)}${MILLION}`
    );
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  return `${LeadingSpecialOneToOne(newMoney.reverse().join("")).replace(
    /ล้าน$/,
    ``
  )}${BAHT}`;
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
  ed=false,
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
  } ${arrow} "${PrintBaht(moneyInt, ed)}${PrintSatangs(moneyFrac)}"`;
};

const BT = (money, ed = false) => {
  const rBahtText = BahtText(money, ed);;
  if (!rBahtText) return undefined;
  const retText = rBahtText.split('"').at(-2);
  if (!retText) return undefined;
  if (retText.length > GoogleSheetsCellCharactersLimit) {
    console.warn(`return string Exceed Google Sheets Cell Limit (${GoogleSheetsCellCharactersLimit})`);
  }
  return retText;
};

const BF = (flexmoney, ed = false, InvalidType = `Invalid Type`) => {
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
  return BT(money, ed);
};

const IsMatchInSkipsPattern = (match, skips) => {
  for (const skip of skips) {
    if (skip.test(match)) return true;
  }
  return false;
};

const BulkBahtText = (
  str,
  pat = defaultBulkBahtTextPat,
  skips = defaultBulkBahtTextSkips,
  ed = false
) => {
  if (typeof str !== "string") return `Invalid Type`;
  if (!str) return null;
  const matches = str.match(pat);
  if (!matches) return str;
  for (const match of matches) {
    if (IsMatchInSkipsPattern(match, skips)) continue;
    str = str.replace(match, BahtText(match.replace(/[^\d]/g,'')).split('"').at(-2), ed);
  }
  return str;
};

const NumText = (str, arr = THAINUMBERWORDS, flag = `g`) => {
  if (!str) return undefined;
  if (typeof str !== "string") return `Invalid Type`;
  for (const i in arr) {
    str = str.replace(new RegExp(i, flag), arr[i]);
  }
  return str;
};

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

const IsValidText = (text) => {
  if (typeof(text) !== `string`) return false
  if (text.replace(/ล้าน/g,"") === "") return false
  const sixdigitswords = text.split(MILLION);
  for (const sixdigitsword of sixdigitswords) {
    if (/สองสิบ/.test(sixdigitsword)) return false;
    if (/สิบหนึ่ง/.test(sixdigitsword)) return false;
    for (const REVERSETHAIDIGITWORD of REVERSETHAIDIGITWORDS.slice(0, -1)) {
      if (
        (sixdigitsword.match(new RegExp(REVERSETHAIDIGITWORD, "g"))?.length ||
          0) > 1
      )
        return false;
    }
    const iHUNDREDTHOUSAND = sixdigitsword.indexOf(HUNDREDTHOUSAND);
    const iTENTHOUSAND = sixdigitsword.indexOf(TENTHOUSAND);
    const iTHOUSAND = sixdigitsword.indexOf(THOUSAND);
    const iHUNDRED = sixdigitsword.indexOf(HUNDRED);
    const iTEN = sixdigitsword.indexOf(TEN);
    const iiTEN = iTEN == -1 ? 0 : iTEN;
    const iiHUNDRED = iHUNDRED == -1 ? 0 : iHUNDRED;
    const iiTHOUSAND = iTHOUSAND == -1 ? 0 : iTHOUSAND;
    const iiTENTHOUSAND = iTENTHOUSAND == -1 ? 0 : iTENTHOUSAND;
    const iiHUNDREDTHOUSAND = iHUNDREDTHOUSAND == -1 ? 0 : iHUNDREDTHOUSAND;
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
        ((iiTHOUSAND >= iiTENTHOUSAND && iiTHOUSAND >= iiHUNDREDTHOUSAND) ||
          iiTHOUSAND == 0) &&
        (iiTENTHOUSAND >= iiHUNDREDTHOUSAND || iiTENTHOUSAND == 0)
      )
    ) {
      return false;
    }
    let eachdigits = sixdigitsword.split(/แสน|หมื่น|พัน|ร้อย|สิบ/);
    for (let i = 0; i < eachdigits.length; i++) {
      if (eachdigits.at(i) === "") continue;
      if (ONETONINE.indexOf(eachdigits.at(i)) === -1) {
        if (eachdigits.at(i) === SPECIALONE) {
          // if (sixdigitsword.indexOf(`สิบเอ็ด`) === -1) {
          //   return false;
          // }
          continue;
        } else if (eachdigits.at(i) === SPECIALTWO) {
          // if (sixdigitsword.indexOf(`ยี่สิบ`) === -1) {
          //   return false;
          // }
          continue;
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

const TB = (BT, error = `Invalid String`) => {
  if (!BT) return undefined;
  if (/บาท$/.test(BT)) BT = `${BT}${FULLBAHT}`
  if (!(/สตางค์$/.test(BT)) && !(/ถ้วน$/.test(BT))) return error;
  const [moneyBaht, moneySatang] = BT.split(BAHT);
  if (DEBUG) console.log(moneyBaht, moneySatang);
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
  return `${removeLeadingingZeros(moneyBahts.reverse().join(""))}.${
    SatangNum(moneySatang.replace(SATANG, ``))
  }`;
};

const IsValidTB = (str) => {
  const BTTB = BT(TB(str)).replace(/\s/g, "");
  return str === BTTB.replace(FULLBAHT, "");
};

const ABT = (money, ed = false) => {
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
      return BF(money, ed);
    default:
      return undefined;
  }
}

const repeat = (str,x) => {
  for (const i of x) {
    str = `${str}`.repeat(i)
  }
  return str
}

const LNBT = (nameorpowerof10, d=`1`) => {
  const tnameorpowerof10 = typeof(nameorpowerof10)
  switch (tnameorpowerof10) {
    case `string`:
      try {
        if (nameorpowerof10 == `Googolplex`) {
          return `Don't Try This`
        }
        const v = large_numbers.find(n => n.name === nameorpowerof10).powof10
        if (v < 0) return undefined
        return BT(d + repeat(`0`,[v]));
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

const OB = (money) => {
  return {
    val: money,
    typ: typeof money,
    err: typeof(ABT(money)) === "undefined",
    txt: ABT(money),
  };
}

// if (!DEBUG) {
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
    repeat,
    large_numbers,
    LNBT,
    LeadingSpecialOneToOne,
    OB,
    ONETONINE,
    million: MILLION,
    HUNDREDTHOUSAND,
    TENTHOUSAND,
    THOUSAND,
    HUNDRED,
    TEN,
    IsValidText,
  };
// }