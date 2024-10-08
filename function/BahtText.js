const splitIntFrac = require(`./splitIntFrac`)
const MoneyLaundering = require(`./MoneyLaundering`)
const PrintBaht = require(`./PrintBaht`)
const { THAINUMBERWORDS , BAHT, FULLBAHT} = require(`../const`);
const PrintSatangs = require(`./PrintSatangs`);
const IsMoneyValidate = require("./IsMoneyValidate");
const op = require(`operation-strint`);
const MoneyInvalid = require(`../snippet/MoneyInvalid`);
const THB = require("../const/THB")
const READAS = require("../const/primitive/READAS");

module.exports = BahtText = (
  money,
  ed = false,
  currencyformat = THB,
  arrow = READAS,
  ClErr = MoneyInvalid,
  InvalidType = `"Invalid Type"`,
  NoInput = null,
  rounding = ``
) => {
  if (!money) return NoInput;
  if (typeof money !== "string") return InvalidType;
  const cleanedMoney = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney, rounding) || money === `.`)
    return ClErr(money);
  const [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/))
    return `${
      currencyformat ? currencyformat.format(moneyFull) : moneyFull
    } ${arrow} "${THAINUMBERWORDS[0]}${BAHT}${FULLBAHT}"`;
  const satang_part = PrintSatangs(moneyFrac, rounding);
  const opsum = op.sum(satang_part[1], moneyInt === `` ? `0` : moneyInt);
  const new_baht = opsum === `` ? `0` : opsum;

  const baht_part = PrintBaht(new_baht, ed).replace(/^บาท$/, ``);
  return `${
    currencyformat ? currencyformat.format(moneyFull) : moneyFull
  } ${arrow} "${baht_part}${satang_part[0]}"`;
};
