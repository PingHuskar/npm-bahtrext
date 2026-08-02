import hundredThousandToOne from "./hundredThousandToOne";
import LeadingSpecialOneToOne from "./LeadingSpecialOneToOne";
import { MILLION, BAHT, LAST6DIGITPATTERN } from "../const";
import defaultEd from "../const/defaultConfig/ed";

export default (money, ed = defaultEd) => {
  if (!money) return ``;

  const newMoney = [];

  while (money) {
    const selectedUpTo6digit = money.match(LAST6DIGITPATTERN)[0];
    newMoney.push(`${hundredThousandToOne(selectedUpTo6digit, ed)}${MILLION}`);
    money = money.replace(LAST6DIGITPATTERN, "");
  }

  return `${LeadingSpecialOneToOne(newMoney.toReversed().join("")).replace(
    /ล้าน$/,
    ``
  )}${BAHT}`;
};
