import THBText from "thai-baht-text";
import INFINITY from "../const/primitive/INFINITY";

const iTHBText = (money) => {
  if (money === Number.MAX_VALUE) return `${INFINITY}`;
  if (money === 0) return "\u0e28\u0e39\u0e19\u0e22\u0e4c\u0e1a\u0e32\u0e17\u0e16\u0e49\u0e27\u0e19";
  return THBText(money);
};

export default iTHBText;
