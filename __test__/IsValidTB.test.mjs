import IsValidTB from "../function/IsValidTB.mjs";

test(`IsValidTB`, () => {
  expect(IsValidTB(`แปดสิบแปดบาท`)).toBe(true);
});