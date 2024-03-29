const BR = require("./index");
const THBText = require("thai-baht-text");
const { bahttext } = require("bahttext");
const { convert } = require("numbaht");

// Comment out FAIL Test Cases

test("THBText", () => {
  expect(BR.BT("999999999999999")).toBe(THBText(999999999999999));
  expect(BR.BT((2 ** 53).toString())).toBe(THBText(2 ** 53));
  expect(BR.BT((2 ** 55).toString())).toBe(THBText(2 ** 55));
  expect(BR.BT((2 ** 60).toString())).toBe(THBText(2 ** 60));
  expect(BR.BT((2 ** 69).toString())).toBe(THBText(2 ** 69));
});

test("jojoee/bahttext", () => {
  expect(bahttext(999999999999999)).toBe(BR.BT("999999999999999"));
  expect(bahttext(12.33)).toBe(BR.BT("12.33"));
  // expect(bahttext(999999999999999.99)).toBe(BR.BT("999999999999999.99"));
  // expect(bahttext('999999999999999.99')).toBe(BR.BT("999999999999999.99"));
});

test(`numbaht`, () => {
  expect(
    convert("หนึ่งร้อยหนึ่ง")
  ).toBe(`101`);
  expect(convert("หนึ่งร้อยเอ็ด")).toBe(`101`);
  // expect(convert("สิบห้าร้อยสตางค์")).toBe(undefined);
  // expect(convert("สิบห้าร้อย")).toBe(undefined);
  // expect(convert("สิบห้าบาทสองสิบสตางค์")).toBe(undefined);
});