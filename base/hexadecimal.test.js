import { isHex, toHex } from "./hexadecimal";

test(`isHex true`, () => {
  expect(isHex(`0x101A010`)).toBe(true);
  expect(isHex(`0x1F`)).toBe(true);
  expect(isHex(`0X1F`)).toBe(true);
  expect(isHex(`0x0F`)).toBe(true);
  expect(isHex(`0X0E`)).toBe(true);
  expect(isHex(`0x101_A010`)).toBe(true);
  expect(isHex(`0x1_F`)).toBe(true);
  expect(isHex(`0X1_F`)).toBe(true);
  expect(isHex(`0x0_F`)).toBe(true);
  expect(isHex(`0X0_E`)).toBe(true);
  expect(
    isHex(`0X001010101010A01C01010F1011E001010010010100100001010010001001`)
  ).toBe(true);
});

test(`isHex false`, () => {
  expect(isHex(`0x101__A010`)).toBe(false);
  expect(isHex(`0x1__F`)).toBe(false);
  expect(isHex(`0X1__F`)).toBe(false);
  expect(isHex(`0x0_F_`)).toBe(false);
  expect(isHex(`0X_0_E`)).toBe(false);

  expect(isHex(`0xVb`)).toBe(false);
  expect(isHex(`0xb10W13010`)).toBe(false);
  expect(isHex(`0x7G7`)).toBe(false);
  expect(isHex(`0x00V077`)).toBe(false);
  expect(isHex(`0xo7M7`)).toBe(false);
  expect(isHex(`0x0T00877`)).toBe(false);
  expect(isHex(`0x00po77`)).toBe(false);
  expect(isHex(`00x0ozo77`)).toBe(false);
  expect(isHex(`053x2564627R53462`)).toBe(false);
  expect(isHex(0o77)).toBe(undefined);
  expect(isHex(123)).toBe(undefined);
});

test(`toHex return self`, () => {
  expect(toHex(`077`)).toBe(`077`);
  expect(toHex(`0o17`)).toBe(`0o17`);
  expect(toHex(`0532`)).toBe(`0532`);
  expect(toHex(`05325646`)).toBe(`05325646`);
  expect(toHex(234)).toBe(234);
});

test(`toHex`, () => {
  expect(toHex(`0x71`)).toBe(`113`);
  expect(toHex(`0x7abc`)).toBe(`31420`);
  expect(toHex(`0x0123456789AB`)).toBe(`1250999896491`);
  expect(toHex(`0x0123456789ABCDEF`)).toBe(`81985529216486895`);
});
