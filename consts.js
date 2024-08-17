const DEBUG = false;

const GoogleSheetsCellCharactersLimit = 50000;
const VERSION = `1.2.1`;

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
const ONETONINE = [ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE];
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

const ValidSATANGRegex =
  /((ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?(สิบ)(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?)สตางค์|(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า|สิบ)สตางค์|(ถ้วน)/gs;

const defaultBulkBahtTextPat = /\b(\d+)(\.\d{0,2}0*)?\b/g;
const defaultBulkBahtTextSkips = [/\b5+\+?\b/];


const OneToTenTextRegex = /^(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า|สิบ)$/;
const ElevenToNineteenRegex = /^สิบ(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)$/;
const TwentyToNinetyNine =
  /^(ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)สิบ(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?$/;

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

module.exports = {
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
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
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
};