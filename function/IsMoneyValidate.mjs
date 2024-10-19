import SPLITPATTERN from "../const/regex/SPLITPATTERN.mjs";
const IsMoneyValidate = (money, rounding) => {
  if (rounding === ``) return SPLITPATTERN.test(money);
  return /\d*(\.\d+)?/.test(money);
};
export default IsMoneyValidate;