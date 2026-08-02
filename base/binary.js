import { binaryRegex } from '../const';
import toDec from './base';

export function isBin (money) {
  if (typeof money !== `string`) return undefined;
  if (/__/i.test(money)) return false;
  money = money.replace(/(?<=[01])_(?=[01])/g, "");
  return binaryRegex.test(money);
};

export const toDecBin = num => toDec(num, 2, binaryRegex, /^0b/i);
