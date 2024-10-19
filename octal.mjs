import op from "operation-strint"

import octalRegex1 from './const/regex/octalRegex1.mjs';
import octalRegex2 from './const/regex/octalRegex2.mjs';

const isOctal = (money) => {
    if (typeof(money) !== `string`) return undefined;
    return octalRegex1.test(money) || octalRegex2.test(money);
}

const toDec = (num) => {
    let val = `0`
    if (!isOctal(num)) return num
    num = num.replace(/^0+o?/, ``)
    let pos = -1
    for (let i of num.split("").reverse()) {
      let thispos_val = op.multiply(op.pow(`8`, `${pos+1}`), i);
      val = op.sum(val, thispos_val);
      pos++;
    }
    return val
}

export {
  isOctal,
  toDec,
};