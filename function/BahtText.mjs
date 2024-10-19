import splitIntFrac from "./splitIntFrac.mjs";
import MoneyLaundering from "./MoneyLaundering.mjs";
import PrintBaht from "./PrintBaht.mjs";
import THAINUMBERWORDS from "../const/array/THAINUMBERWORDS.mjs";
import BAHT from "../const/primitive/BAHT.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";
import PrintSatangs from "./PrintSatangs.mjs";
import IsMoneyValidate from "./IsMoneyValidate.mjs";
import op from "operation-strint"
import MoneyInvalid from "../snippet/MoneyInvalid.mjs";
import THB from "../const/THB.mjs";
import READAS from "../const/primitive/READAS.mjs";

const BahtText = (
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
export default BahtText;