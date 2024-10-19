import { isOctal,toDec } from "./octal.mjs";

test(`isOctal`, () => {
  expect(isOctal(`077`)).toBe(true)
  expect(isOctal(`000077`)).toBe(true);
  expect(isOctal(`0o77`)).toBe(true);
  expect(isOctal(`0000877`)).toBe(!true);
  expect(isOctal(`000o77`)).toBe(!true);
  expect(isOctal(`000oo77`)).toBe(!true);
  expect(isOctal(`053256462753462`)).toBe(true);
  expect(isOctal(0o77)).toBe(undefined);
  expect(isOctal(123)).toBe(undefined);
})

test(`toDec`, () => {
    expect(toDec(`077`)).toBe(`63`);
    expect(toDec(`0o17`)).toBe(`15`);
    expect(toDec(`0532`)).toBe(`346`);
    expect(toDec(`05325646`)).toBe(`1420198`);
    expect(toDec(234)).toBe(234);
});