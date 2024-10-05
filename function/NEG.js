const negative = require(`../const/primitive/negative`)
const BF = require(`./BF`)
module.exports = NEG = (money, ed = false, f = BF, neg = negative) => {
  let retVal
  if (
    /^\-([\d๐-๙]*)(\.\[\d๐-๙]{0,2}0*)?/.test(money) &&
    !/^\-{2,}/.test(money)
  ) {
    money = money.replace(/^\-/, ``);
    retVal = `${neg}${f(money, ed)}`;
  } else {
    retVal = f(money, ed);
  }
  return retVal
}