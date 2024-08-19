const BR = require("./index");
const oc = require("./octal");
const THBText = require("thai-baht-text");

let a = 29999999999999999;
let b = 29999999999999999.99;
console.log(a == b)
console.log(a === b)
console.log(a.toString() == a);
console.log(a.toString() === b.toString());
console.log(a.toString());
console.log(THBText(a));
console.log(BR.BT("29999999999999999"));
console.log(THBText(b));
console.log(BR.BT("29999999999999999.99"));

let c = 0o77;
let d = `0o77`
console.log(THBText(c));
console.log(THBText(d));
console.log(oc.toDec(d))
console.log(oc.toDec(c))