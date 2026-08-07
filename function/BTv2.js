import { isOctal, toDecOctal as toDec } from "../base/octal";
import { isBin, toDecBin as toBin } from "../base/binary";
import { isHex, toHex } from "../base/hexadecimal";
import MoneyInvalid from "../snippet/MoneyInvalid";
import BahtText from "./BahtTextv2";
import INFINITY from "../const/primitive/INFINITY";
import ISINFSTR from "./ISINFSTR";
import { ed, OL, rounding } from "../const/defaultConfig";

export default (money, config = {}) => {
  if (ISINFSTR(money)) return String(INFINITY);
  const { ed: edParam = ed, OL: olParam = OL, rounding: roundingParam = rounding } = config;
  if (olParam && isOctal(money)) {
    money = toDec(money);
  } else if (isBin(money)) {
    money = toBin(money);
  } else if (isHex(money)) {
    money = toHex(money);
  }

  const rBahtText = BahtText(money, {
    ed: edParam,
    rounding: roundingParam,
    ClErr: () => MoneyInvalid,
  });

  // Always return a string
  return typeof rBahtText === "string" ? rBahtText : "";
};
