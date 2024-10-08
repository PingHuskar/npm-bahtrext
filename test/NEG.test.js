const NEG = require("../function/NEG");

test(`NEG`, () => {
  expect(NEG(`-0.67`)).toBe(`ลบหกสิบเจ็ดสตางค์`);
  expect(NEG(`--0.67`)).toBe(undefined);
  expect(NEG(`-2000000000000.00`)).toBe(`ลบสองล้านล้านบาทถ้วน`);
  expect(NEG(`-123`)).toBe(`ลบหนึ่งร้อยยี่สิบสามบาทถ้วน`);
  expect(NEG(`-8.00`)).toBe(`ลบแปดบาทถ้วน`);
  expect(NEG(`-5678.00`)).toBe(`ลบห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`);
  expect(NEG(`-63147.89`)).toBe(
    `ลบหกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
  );
  expect(NEG(`-51000001.00`)).toBe(`ลบห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`);
  expect(NEG(`-317.10`)).toBe(`ลบสามร้อยสิบเจ็ดบาทสิบสตางค์`);
  expect(NEG(`-422.26`)).toBe(`ลบสี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`);
  expect(NEG(`-11.11`)).toBe(`ลบสิบเอ็ดบาทสิบเอ็ดสตางค์`);
  expect(NEG(`-191415.11`)).toBe(
    `ลบหนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
  );
  expect(NEG(`-1.01`)).toBe(`ลบหนึ่งบาทหนึ่งสตางค์`);
  expect(NEG(`-๑.0๑`)).toBe(`ลบหนึ่งบาทหนึ่งสตางค์`);
  expect(NEG(`-5678.46`)).toBe(`ลบห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`);
  expect(NEG(`-768,601,800,000,000`)).toBe(
    `ลบเจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );

  expect(NEG(`101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
  expect(NEG(`101`, true)).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
  expect(NEG(`-101`)).toBe(`ลบหนึ่งร้อยหนึ่งบาทถ้วน`);
  expect(NEG(`-101`, true)).toBe(`ลบหนึ่งร้อยเอ็ดบาทถ้วน`);
});