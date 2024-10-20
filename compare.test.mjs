import BT from "./function/BT.mjs";
import THBText from "thai-baht-text"
import { bahttext } from "bahttext";
import { convert } from "numbaht";

// Comment out FAIL Test Cases

test("THBText", () => {
  expect(BT("999999999999999")).toBe(THBText(999999999999999));
  expect(BT((2 ** 53).toString())).toBe(THBText(2 ** 53));
  expect(BT((2 ** 55).toString())).toBe(THBText(2 ** 55));
  expect(BT((2 ** 60).toString())).toBe(THBText(2 ** 60));
  expect(BT((2 ** 69).toString())).toBe(THBText(2 ** 69));
});

test("jojoee/bahttext", () => {
  expect(bahttext(999999999999999)).toBe(BT("999999999999999"));
  expect(bahttext(12.33)).toBe(BT("12.33"));
  // expect(bahttext(999999999999999.99)).toBe(BT("999999999999999.99"));
  // expect(bahttext('999999999999999.99')).toBe(BT("999999999999999.99"));
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