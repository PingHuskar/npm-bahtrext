import THBText from "thai-baht-text";
import INFINITY from "../const/primitive/INFINITY";

const iTHBText = (money) => {
  if (money === Number.MAX_VALUE) return `${INFINITY}`;
  if (money === 0) return "ศูนย์บาทถ้วน";
  return THBText(money);
};

export default iTHBText;
