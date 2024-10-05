const NEG = require(`./NEG`)
const BF = require(`./BF`)
module.exports = ABT = (money, ed = false, allow_neg = false) => {
  let retVal = undefined;
  if (!money) return retVal;
  switch (typeof money) {
    case "number":
      if (money > MAX_SAFE_INTEGER) {
        console.warn(`Consider use BahtRext`);
      }
      const THBText = require("thai-baht-text");
      if (money < 0) {
        retVal = `ลบ${THBText(-money)}`;
      } else {
        retVal = THBText(money);
      }
      break;
    case "string":
      if (allow_neg) {
        retVal = NEG(money, ed);
      } else {
        retVal = BF(money, ed);
      }
      break;
  }
  return retVal;
};