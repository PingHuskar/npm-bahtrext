import negative from "../const/primitive/negative.mjs";
import BF from "./BF.mjs"

const NEG = (money, ed = false, f = BF, neg = negative) => {
  let retVal
  if (
    /^\-([\d๐-๙]*)(\.\[\d๐-๙]{0,2}0*)?/.test(money) &&
    !/^\-{2,}/.test(money)
  ) {
    money = money.replace(/^\-/, ``);
    retVal = `${neg}${f(money, ed)}`;
  } else {
    retVal = f(money, ed);
  }
  return retVal
}
export default NEG;