import { isOctal, toDecOctal } from "../base/octal";
import { isBin, toDecBin as toBin } from "../base/binary";
import { isHex, toHex } from "../base/hexadecimal";
import MoneyInvalid from "../snippet/MoneyInvalid";
import BahtText from "./BahtText";
import ISINFSTR from "./ISINFSTR";
import {
  THB,
  READAS,
  GoogleSheetsCellCharactersLimit,
  INFINITY,
} from "../const";

export default (money, ed = false, OL = false, rounding = "") => {
  if (ISINFSTR(money)) return INFINITY;
  if (OL && isOctal(money)) {
    money = toDecOctal(money);
  } else if (isBin(money)) {
    money = toBin(money);
  } else if (isHex(money)) {
    money = toHex(money);
  }

  const rBahtText = BahtText(money, ed, rounding, THB, MoneyInvalid, READAS);

  const retText = rBahtText.split('"').at(-2);
  if (!retText) return undefined;

  if (retText.length > GoogleSheetsCellCharactersLimit) {
    console.warn(
      `Return string exceeds Google Sheets Cell Limit (${GoogleSheetsCellCharactersLimit})`
    );
  }

  return retText;
};
