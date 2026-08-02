import splitIntFrac from "../snippet/splitIntFrac";
import MoneyInvalid from "../snippet/MoneyInvalid";
import MoneyLaundering from "./MoneyLaundering";
import PrintBaht from "./PrintBaht";
import IsMoneyValidate from "./IsMoneyValidate";
import PrintSatangs from "./PrintSatangs";
import { THAINUMBERWORDS, BAHT, FULLBAHT, THB, READAS } from "../const";
import { sum } from "operation-strint";
import InvalidType from "../const/error/InvalidType";
import invariant from "tiny-invariant";

export default (
  money,
  ed = false,
  rounding = ``,
  currencyformat = THB,
  ClErr = MoneyInvalid,
  arrow = READAS
) => {
  if (!money) return "";
  invariant(typeof money === "string", String(InvalidType));

  const cleanedMoney = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney, rounding) || money === `.`) {
    return String(ClErr(money));
  }

  const [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/)) {
    return `${
      currencyformat ? currencyformat.format(moneyFull) : moneyFull
    } ${arrow} "${THAINUMBERWORDS[0]}${BAHT}${FULLBAHT}"`;
  }

  const satang_part = PrintSatangs(moneyFrac, rounding);
  const opsum = sum(satang_part.carry, moneyInt === `` ? `0` : moneyInt);
  const new_baht = opsum === `` ? `0` : opsum;

  const baht_part = PrintBaht(new_baht, ed).replace(/^บาท$/, "");
  console.warn(`Consider Use BahtTextv2`);
  return `${
    currencyformat ? currencyformat.format(moneyFull) : moneyFull
  } ${arrow} "${baht_part}${satang_part.word}"`;
};
