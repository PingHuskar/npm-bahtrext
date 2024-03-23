const SPECIALONE = `เอ็ด`
const SPECIALTWO = `ยี่`
const TEN = `สิบ`;
const BAHT = `บาท`;
const MILLION = `ล้าน`;
const FULLBAHT = `ถ้วน`;
const SATANG = `สตางค์`;
const READAS = `อ่านว่า`

const LAST6DIGITPATTERN = /\d{1,6}$/g;
const SPLITPATTERN = /^(\d*)(\.\d{0,2}0*)?$/;

const ZERO = `ศูนย์`
const ONE = `หนึ่ง`
const TWO = `สอง`
const THREE = `สาม`
const FOUR = `สี่`
const FIVE = `ห้า`
const SIX = `หก`
const SEVEN = `เจ็ด`
const EIGHT = `แปด`
const NINE = `เก้า`
const THAINUMBERWORDS = [ZERO,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,TEN]
const LTHAISATANGWORDS = [``,SPECIALONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE]
const FTHAISATANGWORDS = [``,``,SPECIALTWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE]
const HUNDRED = `ร้อย`
const THOUSAND = `พัน`
const TENTHOUSAND = `หมื่น`
const HUNDREDTHOUSAND = `แสน`
const REVERSETHAIDIGITWORDS = [HUNDREDTHOUSAND, TENTHOUSAND, THOUSAND, HUNDRED, TEN, ""]

const MoneyInvalid = (money) => `Your Input is Invalid Format!\nThis is Your Input : ${money}\nTry Again`;

const MoneyLaundering = (money) => {
  const removeComma = money.replace(/,/g, "");
  const removeCommaAndTrailingZeros = removeComma.replace(/^0+/g, "");
  return removeCommaAndTrailingZeros;
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
    return String(num).padStart(totalLength, '0');
}

const hundredThousandToOne = (digits) => {
  let word = ``;
  let c = 0
  const digitspadWithLeadingZeros = padWithLeadingZeros(digits,6)
  for (let digit of digitspadWithLeadingZeros) {
    digit = parseInt(digit)
    if (!(digit === 0)) {
        if (c == 4 && digit == 2) {
            word += `${SPECIALTWO}${TEN}`
        } else if (c == 4 && digit == 1) {
            word += TEN
        } else if (c == 5 && digit == 1 && digitspadWithLeadingZeros[4] != 0) {
            word += SPECIALONE
        } else {
            word += `${THAINUMBERWORDS[digit]}${REVERSETHAIDIGITWORDS[c]}`;
        }
    }
    c++
  }
  return word;
};

const LeandingEdToOne = (money) => money.replace(/^เอ็ด(?=(ล้าน)+)/,ONE)

const PrintBaht = (money) => {
  if (!money) return `` 
  let newMoney = [];
  let f6 = true
  while (money != ``) {
    let selectedupto6digit = money.match(LAST6DIGITPATTERN)[0];
    newMoney.push(
      `${hundredThousandToOne(selectedupto6digit)}${f6 ? "" : MILLION}`
    );
    f6 ? f6 = !f6 : ""
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  const cleanLeadingEd = LeandingEdToOne(newMoney.reverse().join(""))
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
  let satangword = `${SatangFirstDigit(satangs[0])}${SatangSecondDigit(
    satangs
  )}${SATANG}`;
  return satangword;
};

let THB = new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
});

const BahtText = (money, currencyformat= THB, arrow = READAS, ClErr = MoneyInvalid,InvalidType=`"Invalid Type"`, NoInput=null) => {
  if (!money) return NoInput
  if (typeof money !== 'string') return InvalidType;
  const cleanedMoney = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney) || money === `.`) return ClErr(money)
  const [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/)) return `${currencyformat ? currencyformat.format(moneyFull) : moneyFull} ${arrow} "${THAINUMBERWORDS[0]}${BAHT}${FULLBAHT}"`
  return `${currencyformat ? currencyformat.format(moneyFull) : moneyFull} ${arrow} "${PrintBaht(moneyInt)}${PrintSatangs(moneyFrac)}"`;
};

const BT = (money) => {
  const rBahtText = BahtText(money)
  if (!rBahtText) return undefined
  return rBahtText.split('"').at(-2)
}

const IsMatchInSkipsPattern = (match,skips) => {
  for (const skip of skips) {
    if (skip.test(match)) return true
  }
  return false
}

const defaultBulkBahtTextPat = /\b(\d+)(\.\d{0,2}0*)?\b/g
const defaultBulkBahtTextSkips = [
  /\b5+\+?\b/
]

const BulkBahtText = (str, pat=defaultBulkBahtTextPat, skips=defaultBulkBahtTextSkips) => {
  if (typeof str !== 'string') return `Invalid Type`;
  if (!str) return null;
  const matches = str.match(pat)
  if (!matches) return str;
  for (const match of matches) {
    if (IsMatchInSkipsPattern(match, skips)) continue
    str = str.replace(match, BahtText(match).split('"').at(-2));
  }
  return str
}

const ValidSATANGRegex = /((ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?(สิบ))?(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?สตางค์|(หนึ่งสตางค์)|(ถ้วน)/gs

const NumText = (str, arr=THAINUMBERWORDS, flag=`g`) => {
  if (!str) return undefined
  if (typeof str !== 'string') return `Invalid Type`;
  for (const i in arr) {
    str = str.replace(new RegExp(i,flag), arr[i])
  }
  return str
}

const SatangNum = (moneySatang) => {
  if (moneySatang == FULLBAHT) return `00`
  else if (/^(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า|สิบ)$/.test(moneySatang)) {
    return `${padWithLeadingZeros(THAINUMBERWORDS.indexOf(moneySatang),2)}`
  } else if (/^สิบ(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)$/.test(moneySatang)) {
    return `1${LTHAISATANGWORDS.indexOf(moneySatang.split(TEN).at(-1))}`
  } else if (/^(ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)สิบ(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?$/.test(moneySatang)) {
    const [f,l] = moneySatang.split(TEN)
    return `${FTHAISATANGWORDS.indexOf(f)}${LTHAISATANGWORDS.indexOf(l)}`
  }
  return undefined
}

module.exports = {
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
  IsMoneyValidate,
  splitIntFrac,
  PrintBaht,
  PrintSatangs,
  THB,
  BahtText,
  BT,
  BulkBahtText,
  ValidSATANGRegex,
  NumText,
  SatangNum
}