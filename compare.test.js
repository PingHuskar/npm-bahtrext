const BR = require("./index");
const THBText = require("thai-baht-text");

test("Compare", () => {
  expect(BR.BT("999999999999999")).toBe(THBText(999999999999999));
  expect(BR.BT((2 ** 53).toString())).toBe(THBText(2 ** 53));
  expect(BR.BT((2 ** 55).toString())).toBe(THBText(2 ** 55));
  expect(BR.BT((2 ** 60).toString())).toBe(THBText(2 ** 60));
  expect(BR.BT((2 ** 69).toString())).toBe(THBText(2 ** 69));
});
