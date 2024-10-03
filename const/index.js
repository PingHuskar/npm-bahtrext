const DEBUG = require('./primitive/DEBUG')
const GoogleSheetsCellCharactersLimit = require("./primitive/GoogleSheetsCellCharactersLimit");
const VERSION = require(`./primitive/VERSION`);
const negative = require(`./primitive/negative`);
const SPECIALONE = require("./primitive/SPECIALONE");
const SPECIALTWO = require("./primitive/SPECIALTWO");
const TEN = require("./primitive/TEN");
const BAHT = require("./primitive/BAHT");
const MILLION = require("./primitive/MILLION");
const FULLBAHT = require("./primitive/FULLBAHT");
const SATANG = require("./primitive/SATANG");
const READAS = require("./primitive/READAS");

const LAST6DIGITPATTERN = require(`./regex/LAST6DIGITPATTERN`);
const SPLITPATTERN = require(`./regex/SPLITPATTERN`);

const ZERO = require(`./primitive/ZERO`);
const ONE = require(`./primitive/ONE`);
const TWO = require(`./primitive/TWO`)
const THREE = require(`./primitive/THREE`)
const FOUR = require(`./primitive/FOUR`);
const FIVE = require(`./primitive/FIVE`);
const SIX = require(`./primitive/SIX`);
const SEVEN = require(`./primitive/SEVEN`);
const EIGHT = require(`./primitive/EIGHT`);
const NINE = require(`./primitive/NINE`);
const THAINUMBERWORDS = require(`./array/THAINUMBERWORDS`)
const ONETONINE = require(`./array/ONETONINE`);
const LTHAISATANGWORDS = require(`./array/LTHAISATANGWORDS`);
const FTHAISATANGWORDS = require(`./array/FTHAISATANGWORDS`);
const HUNDRED = require(`./primitive/HUNDRED`);
const THOUSAND = require(`./primitive/THOUSAND`);
const TENTHOUSAND = require(`./primitive/TENTHOUSAND`);
const HUNDREDTHOUSAND = require(`./primitive/HUNDREDTHOUSAND`);
const REVERSETHAIDIGITWORDS = require(`./array/REVERSETHAIDIGITWORDS`);
const THAI2ARABICNumerals = require(`./array/THAI2ARABICNumerals`);
const ValidSATANGRegex = require(`./regex/ValidSATANGRegex`)
const defaultBulkBahtTextPat = require(`./regex/defaultBulkBahtTextPat`);
const defaultBulkBahtTextSkips = require(`./regex/defaultBulkBahtTextSkips`);
const OneToTenTextRegex = require(`./regex/OneToTenTextRegex`);
const ElevenToNineteenRegex = require(`./regex/ElevenToNineteenRegex`);
const TwentyToNinetyNine = require(`./regex/TwentyToNinetyNine`)

const large_numbers = require(`./array/large_numbers`);
const MAX_SAFE_INTEGER = require(`./primitive/MAX_SAFE_INTEGER`);
const octalRegex1 = require(`./regex/octalRegex1`);
const octalRegex2 = require(`./regex/octalRegex2`);
let THB = require(`./THB`);

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
  octalRegex1,
  octalRegex2,
  MAX_SAFE_INTEGER,
  THB,
  negative,
};