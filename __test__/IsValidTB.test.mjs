import f from "../function/IsValidTB.mjs";

test(`IsValidTB`, () => {
  expect(f(`แปดสิบแปดบาท`)).toBe(true);
  expect(f()).toBe(undefined);
  expect(f(123)).toBe(false);
  expect(f(`2334`)).toBe(false);
});