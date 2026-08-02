import splitIntFrac from "../snippet/splitIntFrac";
import MoneyLaundering from "./MoneyLaundering";
import PrintBaht from "./PrintBaht";
import IsMoneyValidate from "./IsMoneyValidate";
import PrintSatangs from "./PrintSatangs";
import MoneyInvalid from "../snippet/MoneyInvalid";
import { THAINUMBERWORDS, BAHT, FULLBAHT } from "../const";
import { sum } from "operation-strint";
import InvalidType from "../const/error/InvalidType";
import { ed, rounding } from "../const/defaultConfig";
import invariant from "tiny-invariant";

export default (
  money,
  options = {
    ed,
    rounding,
    ClErr: () => MoneyInvalid,
  }
) => {
  const { ed, rounding, ClErr } = options;

  if (!money) return undefined;
  invariant(typeof money === "string", String(InvalidType));

  const cleanedMoney = MoneyLaundering(money);
  if (!IsMoneyValidate(cleanedMoney, rounding) || money === `.`) {
    console.error(ClErr(money));
    return undefined;
  }

  const [moneyFull, moneyInt, moneyFrac] = splitIntFrac(cleanedMoney);
  if (moneyFull.match(/^(0*)(\.0*)?$/)) {
    return `${THAINUMBERWORDS[0]}${BAHT}${FULLBAHT}`;
  }

  const satang_part = PrintSatangs(moneyFrac, rounding);
  const opsum = sum(satang_part.carry, moneyInt === `` ? `0` : moneyInt);
  const new_baht = opsum === `` ? `0` : opsum;

  const baht_part = PrintBaht(new_baht, ed).replace(/^บาท$/, "");
  return `${baht_part}${satang_part.word}`;
};
