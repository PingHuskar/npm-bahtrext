import f from "../function/TB.mjs";

test(`TB`, () => {
  expect(f(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)).toBe(`11.11`);
  expect(f(`สามสิบสามแสนบาทถ้วน`)).toBe(`Invalid String`);
  expect(f(`สองล้านล้านบาทถ้วน`)).toBe(`2000000000000.00`);
  expect(f(`สองล้านล้านยี่สิบบาทถ้วน`)).toBe(`2000000000020.00`);
  expect(f(`หนึ่งล้านสามแสนบาทถ้วน`)).toBe(`1300000.00`);
  expect(f(`สามแสนล้านบาทถ้วน`)).toBe(`300000000000.00`);
  expect(f(`สามแสนสามสิบบาทถ้วน`)).toBe(`300030.00`);
  expect(f(`สามแสนสิบบาทถ้วน`)).toBe(`300010.00`);
  expect(f(`สิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
  expect(f(`สองสิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
  expect(f(`สี่บาท`)).toBe(`4.00`);
  expect(f(`สี่บาทถ้วน`)).toBe(`4.00`);
  expect(f(`สี่บาทหก`)).toBe(`Invalid String`);
  expect(f(`สี่บาทหกสิบ`)).toBe(`Invalid String`);
  expect(f(`สี่บาทหกสิบสตางค์`)).toBe(`4.60`);
  expect(f(`สี่บาทหกสตางค์`)).toBe(`4.06`);
});
