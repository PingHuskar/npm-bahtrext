import { isOctal, toDec } from "../octal.mjs";
import MoneyInvalid from "../snippet/MoneyInvalid.mjs";
import BahtText from "./BahtText.mjs";
import READAS from "../const/primitive/READAS.mjs";
import THB from "../const/THB.mjs";
import GoogleSheetsCellCharactersLimit from "../const/primitive/GoogleSheetsCellCharactersLimit.mjs";

const BT = (money, ed = false, OL = false, rounding = ``) => {
  const isOL = OL && isOctal(money);
  if (isOL) {
    money = toDec(money);
  }
  const rBahtText = BahtText(
    money,
    ed,
    THB,
    READAS,
    MoneyInvalid,
    `"Invalid Type"`,
    null,
    rounding
  );
  if (!rBahtText) return undefined;
  const retText = rBahtText.split('"').at(-2);
  if (!retText) return undefined;
  if (retText.length > GoogleSheetsCellCharactersLimit) {
    console.warn(
      `return string Exceed Google Sheets Cell Limit (${GoogleSheetsCellCharactersLimit})`
    );
  }
  return retText;
};
export default BT;