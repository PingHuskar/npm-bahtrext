const SPLITPATTERN = require(`../const/regex/SPLITPATTERN`)
module.exports = IsMoneyValidate = (money, rounding) => {
  if (rounding === ``) return SPLITPATTERN.test(money);
  return /\d*(\.\d+)?/.test(money);
};