import THAI2ARABICNumerals from "../const/array/THAI2ARABICNumerals.mjs";
import BT from "./BT.mjs";

const BF = (flexmoney, ed = false, InvalidType = `Invalid Type`, OL = false) => {
  if (!flexmoney) return undefined;
  if (typeof flexmoney !== "string") return InvalidType;
  let money = flexmoney;
  for (const THAI2ARABICNumeral of THAI2ARABICNumerals) {
    money = money.replace(
      RegExp(THAI2ARABICNumeral.th, `g`),
      THAI2ARABICNumeral.a
    );
  }
  return BT(money, ed, OL);
};

export default BF;