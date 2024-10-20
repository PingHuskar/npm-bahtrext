import f from "../function/IsValidText.mjs";

test(`IsValidText`, () => {
  expect(
    f("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านสองสิบล้านหนึ่ง")
  ).toBe(false);
  expect(
    f("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่ง")
  ).toBe(true);
  expect(
    f(
      "สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน"
    )
  ).toBe(true);
  expect(
    f(
      "สามแสนสองหมื่นห้าสิบเอ็ด@ล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน"
    )
  ).toBe(false);
  expect(f("สองล้าน")).toBe(true);
  expect(f("ล้าน")).toBe(false);
  expect(f("ล้านล้าน")).toBe(false);
  expect(f("ล้านล้านล้าน")).toBe(false);
  expect(f("asdf")).toBe(false);
  expect(f("123")).toBe(false);
  expect(f("")).toBe(false);
  expect(f(undefined)).toBe(false);
  expect(f(null)).toBe(false);
  expect(f(0)).toBe(false);
  expect(f(123)).toBe(false);
  expect(f(`แสนแสน`)).toBe(false);
  expect(f(`ยี่สิบ`)).toBe(true);
  expect(f(`สองสิบ`)).toBe(false);
});
