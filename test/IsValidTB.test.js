const IsValidTB = require("../function/IsValidTB");

test(`IsValidTB`, () => {
  expect(IsValidTB(`แปดสิบแปดบาท`)).toBe(true);
});