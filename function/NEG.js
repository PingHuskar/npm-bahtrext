import INFINITY from "../const/primitive/INFINITY";
import negative from "../const/primitive/negative";
import BF from "./BF";
import BulkReplace from "../snippet/BulkReplace";
import ISINFSTR from "./ISINFSTR";
import { THAINUMBERWORDS, BAHT, FULLBAHT } from "../const";

export default (money, ed = false, f = BF, neg = negative) => {
  if (/^-([\d๐-๙]*)(\.\[\d๐-๙]{0,2}0*)?/.test(money) && !/^-{2,}/.test(money)) {
    money = BulkReplace(money, "", /^-/);
    if (ISINFSTR(money)) return `${neg}${INFINITY}`;
    const text = f(money, { ed });
    if (!text) return "";
    return text === `${THAINUMBERWORDS[0]}${BAHT}${FULLBAHT}` ? text : `${neg}${text}`;
  }

  return f(money, { ed });
};
