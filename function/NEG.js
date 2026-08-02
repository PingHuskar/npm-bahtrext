import INFINITY from "../const/primitive/INFINITY";
import negative from "../const/primitive/negative";
import BF from "./BF";
import BulkReplace from "../snippet/BulkReplace";
import ISINFSTR from "./ISINFSTR";

export default (money, ed = false, f = BF, neg = negative) => {
  if (/^-([\d๐-๙]*)(\.\[\d๐-๙]{0,2}0*)?/.test(money) && !/^-{2,}/.test(money)) {
    money = BulkReplace(money, "", /^-/);
    if (ISINFSTR(money)) return `${neg}${INFINITY}`;
    return `${neg}${f(money, { ed })}`;
  }

  return f(money, { ed });
};
