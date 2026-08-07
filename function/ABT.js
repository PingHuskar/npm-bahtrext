import NEG from "./NEG";
import BF from "./BF";
import iTHBText from "./iTHBText";
import { negative } from "../const";
import { ed, allowNeg } from "../const/defaultConfig";

export default (money, defaultConfig = {}) => {
  const { ed: edParam = ed, allowNeg: allowNegParam = allowNeg } = defaultConfig;

  if (["number", "bigint"].includes(typeof money)) {
    return money < 0 ? `${negative}${iTHBText(-money)}` : iTHBText(money);
  }

  if (typeof money === "string") {
    return allowNegParam ? NEG(money, edParam) : BF(money, { ed: edParam });
  }

  return undefined;
};
