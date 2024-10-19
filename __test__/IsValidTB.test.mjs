import { IsValidTB } from "../index.mjs";

test(`IsValidTB`, () => {
  expect(IsValidTB(`แปดสิบแปดบาท`)).toBe(true);
});