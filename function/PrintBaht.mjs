import hundredThousandToOne from "./hundredThousandToOne.mjs";
import LeadingSpecialOneToOne from "../snippet/LeadingSpecialOneToOne.mjs";
import LAST6DIGITPATTERN from "../const/regex/LAST6DIGITPATTERN.mjs";
import MILLION from "../const/primitive/MILLION.mjs";
import BAHT from "../const/primitive/BAHT.mjs";

const PrintBaht = (money, ed = false) => {
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

export default PrintBaht;