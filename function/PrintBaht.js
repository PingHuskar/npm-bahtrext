const hundredThousandToOne = require(`./hundredThousandToOne`)
const LeadingSpecialOneToOne = require(`../snippet/LeadingSpecialOneToOne`);
const LAST6DIGITPATTERN = require(`../const/regex/LAST6DIGITPATTERN`);

module.exports = PrintBaht = (money, ed = false) => {
  if (!money) return ``;
  let newMoney = [];
  while (money != ``) {
    let selectedupto6digit = money.match(LAST6DIGITPATTERN)[0];
    newMoney.push(`${hundredThousandToOne(selectedupto6digit, ed)}${MILLION}`);
    money = money.replace(LAST6DIGITPATTERN, "");
  }
  return `${LeadingSpecialOneToOne(newMoney.reverse().join("")).replace(
    /ล้าน$/,
    ``
  )}${BAHT}`;
};