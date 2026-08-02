import NEG from "./NEG";
import BF from "./BF";
import iTHBText from "./iTHBText";
import { negative } from "../const";
import { ed, allowNeg } from "../const/defaultConfig";

export default (money, defaultConfig = { ed, allowNeg }) => {
  const { ed, allowNeg } = defaultConfig;

  if (["number", "bigint"].includes(typeof money)) {
    return money < 0 ? `${negative}${iTHBText(-money)}` : iTHBText(money);
  }

  if (typeof money === "string") {
    return allowNeg ? NEG(money, ed) : BF(money, { ed });
  }

  return undefined;
};
