import IsValidText from "../function/IsValidText.mjs";

test(`IsValidText`, () => {
  expect(
    IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านสองสิบล้านหนึ่ง")
  ).toBe(false);
  expect(
    IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่ง")
  ).toBe(true);
  expect(
    IsValidText(
      "สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน"
    )
  ).toBe(true);
  expect(
    IsValidText(
      "สามแสนสองหมื่นห้าสิบเอ็ด@ล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน"
    )
  ).toBe(false);
  expect(IsValidText("สองล้าน")).toBe(true);
  expect(IsValidText("ล้าน")).toBe(false);
  expect(IsValidText("ล้านล้าน")).toBe(false);
  expect(IsValidText("ล้านล้านล้าน")).toBe(false);
  expect(IsValidText("asdf")).toBe(false);
  expect(IsValidText("123")).toBe(false);
  expect(IsValidText("")).toBe(false);
  expect(IsValidText(undefined)).toBe(false);
  expect(IsValidText(null)).toBe(false);
  expect(IsValidText(0)).toBe(false);
  expect(IsValidText(123)).toBe(false);
  expect(IsValidText(`แสนแสน`)).toBe(false);
  expect(IsValidText(`ยี่สิบ`)).toBe(true);
  expect(IsValidText(`สองสิบ`)).toBe(false);
});
