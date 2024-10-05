const {
  VERSION,
  THAI2ARABICNumerals,
  large_numbers,
} = require("./const");

// const MoneyInvalid = require(`./snippet/MoneyInvalid`)
const removeLeadingingZeros = require(`./snippet/removeLeadingingZeros`)

const MoneyLaundering = require(`./function/MoneyLaundering`)
const IsMoneyValidate = require(`./function/IsMoneyValidate`)

// const splitIntFrac = require(`./function/splitIntFrac`)
// const padWithLeadingZeros = require(`./snippet/padWithLeadingZeros`)
// const hundredThousandToOne = require(`./function/hundredThousandToOne`)

const LeadingSpecialOneToOne = require(`./snippet/LeadingSpecialOneToOne`);

const PrintBaht = require(`./function/PrintBaht`)

// const SatangFirstDigit = require(`./function/SatangFirstDigit`)
// const SatangSecondDigit = require(`./function/SatangSecondDigit`)
const PrintSatangs = require(`./function/PrintSatangs`)
const BahtText = require(`./function/BahtText`)

const BT = require(`./function/BT`)
const BF = require(`./function/BF`)

const IsMatchInSkipsPattern = require(`./function/IsMatchInSkipsPattern`)
const BulkBahtText = require(`./function/BulkBahtText`);
const NumText = require(`./function/NumText`)
const SatangNum = require(`./function/SatangNum`)
const IsValidText = require(`./function/IsValidText`)
const TB = require(`./function/TB`)
const IsValidTB = require(`./function/IsValidTB`)
const NEG = require(`./function/NEG`)
const ABT = require(`./function/ABT`)
const repeat = require(`./function/repeat`)
const LNBT = require(`./function/LNBT`)
const OB = require(`./function/OB`)
const SEP = require(`./function/SEP`)

module.exports = {
  VERSION,
  MoneyLaundering,
  removeLeadingingZeros,
  IsMoneyValidate,
  PrintBaht,
  PrintSatangs,
  BahtText,
  BT,
  BulkBahtText,
  NumText,
  SatangNum,
  TB,
  IsValidTB,
  THAI2ARABICNumerals,
  BF,
  ABT,
  large_numbers,
  LNBT,
  LeadingSpecialOneToOne,
  OB,
  IsValidText,
  repeat,
  SEP,
  NEG,
};