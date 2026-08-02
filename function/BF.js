import { THAI2ARABICNumerals } from "../const";
import BT from "./BTv2";
import BulkReplace from "../snippet/BulkReplace";
import InvalidType from "../const/error/InvalidType";
import ed from "../const/defaultConfig/ed";
import OL from "../const/defaultConfig/OL";
import TBF from "./TBF";

export default (
  flexmoney,
  options = {
    ed,
    OL,
    InvalidType,
  }
) => {
  const { ed, OL, InvalidType } = options;
  if (!flexmoney) return undefined;
  if (typeof flexmoney !== "string") return InvalidType;

  let money = TBF(flexmoney);

  return BT(money, { ed, OL });
};
