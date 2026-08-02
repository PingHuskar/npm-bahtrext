import { isBin, toDecBin as toBin } from "./binary";

test(`isBin true`, () => {
  expect(isBin(`0b101010`)).toBe(true);
  expect(isBin(`0b1_0101_0`)).toBe(true);
  expect(isBin(`0b1`)).toBe(true);
  expect(isBin(`0B1`)).toBe(true);
  expect(isBin(`0b0`)).toBe(true);
  expect(isBin(`0B0`)).toBe(true);
  expect(isBin(`0B00101010101001010101011001010010010100100001010010001001`)).toBe(true);
});

test(`isBin false`, () => {
  expect(isBin(`0b`)).toBe(false);
  expect(isBin(`0b1_`)).toBe(false);
  expect(isBin(`0b0_`)).toBe(false);
  expect(isBin(`0b_0_`)).toBe(false);
  expect(isBin(`0b_1`)).toBe(false);
  expect(isBin(`0b0_1010__111`)).toBe(false);
  expect(isBin(`0b01_101010_`)).toBe(false);
  expect(isBin(`0b1013010`)).toBe(false);
  expect(isBin(`077`)).toBe(false);
  expect(isBin(`000077`)).toBe(false);
  expect(isBin(`0o77`)).toBe(false);
  expect(isBin(`0000877`)).toBe(false);
  expect(isBin(`000o77`)).toBe(false);
  expect(isBin(`000oo77`)).toBe(false);
  expect(isBin(`053256462753462`)).toBe(false);
  expect(isBin(0o77)).toBe(undefined);
  expect(isBin(123)).toBe(undefined);
});

test(`toBin return self`, () => {
  expect(toBin(`077`)).toBe(`077`);
  expect(toBin(`0o17`)).toBe(`0o17`);
  expect(toBin(`0532`)).toBe(`0532`);
  expect(toBin(`05325646`)).toBe(`05325646`);
  expect(toBin(234)).toBe(234);
});

test(`toBin`, () => {
  expect(toBin(`0b101010`)).toBe(`42`);
  expect(toBin(`0b1`)).toBe(`1`);
  expect(toBin(`0B1`)).toBe(`1`);
  expect(toBin(`0b0`)).toBe(`0`);
  expect(toBin(`0B0`)).toBe(`0`);
  expect(
    toBin(`0B00101010101001010101011001010010010100100001010010001001`)
  ).toBe(`12003739188728969`);
});
