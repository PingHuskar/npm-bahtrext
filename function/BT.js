const {isOctal, toDec} = require(`../octal`)
const MoneyInvalid = require(`../snippet/MoneyInvalid`);
module.exports = BT = (money, ed = false, OL = false, rounding = ``) => {
  const isOL = OL && isOctal(money);
  if (isOL) {
    money = toDec(money);
  }
  const rBahtText = BahtText(
    money,
    ed,
    THB,
    READAS,
    MoneyInvalid,
    `"Invalid Type"`,
    null,
    rounding
  );
  if (!rBahtText) return undefined;
  const retText = rBahtText.split('"').at(-2);
  if (!retText) return undefined;
  if (retText.length > GoogleSheetsCellCharactersLimit) {
    console.warn(
      `return string Exceed Google Sheets Cell Limit (${GoogleSheetsCellCharactersLimit})`
    );
  }
  return retText;
};
