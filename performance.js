const pass = (val) => {
    return
}

const performance = (money_array) => {
  const THBText = require("thai-baht-text");
  console.time("thai-baht-text");
  for (const money of money_array) {
    // console.log(THBText(money));
    pass(THBText(money));
  }
  console.timeEnd("thai-baht-text");
  return `return`;
};

const performanceBR = (money_array) => {
    const BahtRext = require('./index');
  console.time("BahtRext");
  for (const money of money_array) {
    // console.log(BahtRext.BF(money));
    pass(BahtRext.BF(money));
  }
  console.timeEnd("BahtRext");
  return `return`;
};

const performance_arr = [];
const performance_arr_s = [];

for (i = 1; i <= 1000000; i++) {
  performance_arr.push(i);
  performance_arr_s.push(`${i}`);
}

console.log(performanceBR(performance_arr_s));
console.log(performance(performance_arr));
