import { octalRegex1, octalRegex2 } from '../const';
import toDec from './base';

export const isOctal = (money) => {
  if (typeof money !== `string`) return undefined;
  if (/__/i.test(money)) return false;

  if (/^0o.+/i.test(money)) {
    money = money.replace(/(?<=[0-7])_(?=[0-7])/g, "");
  } else if (/_/i.test(money)) {
    return false;
  }

  return octalRegex1.test(money) || octalRegex2.test(money);
};

export const toDecOctal = (num) => toDec(num, 8, octalRegex1, /^0+o?/);

