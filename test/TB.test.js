const TB = require("../function/TB");

test(`TB`, () => {
  expect(TB(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)).toBe(`11.11`);
  expect(TB(`สามสิบสามแสนบาทถ้วน`)).toBe(`Invalid String`);
  expect(TB(`สองล้านล้านบาทถ้วน`)).toBe(`2000000000000.00`);
  expect(TB(`สองล้านล้านยี่สิบบาทถ้วน`)).toBe(`2000000000020.00`);
  expect(TB(`หนึ่งล้านสามแสนบาทถ้วน`)).toBe(`1300000.00`);
  expect(TB(`สามแสนล้านบาทถ้วน`)).toBe(`300000000000.00`);
  expect(TB(`สามแสนสามสิบบาทถ้วน`)).toBe(`300030.00`);
  expect(TB(`สามแสนสิบบาทถ้วน`)).toBe(`300010.00`);
  expect(TB(`สิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
  expect(TB(`สองสิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
  expect(TB(`สี่บาท`)).toBe(`4.00`);
  expect(TB(`สี่บาทถ้วน`)).toBe(`4.00`);
  expect(TB(`สี่บาทหก`)).toBe(`Invalid String`);
  expect(TB(`สี่บาทหกสิบ`)).toBe(`Invalid String`);
  expect(TB(`สี่บาทหกสิบสตางค์`)).toBe(`4.60`);
  expect(TB(`สี่บาทหกสตางค์`)).toBe(`4.06`);
});
