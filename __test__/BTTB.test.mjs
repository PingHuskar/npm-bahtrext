import { BT } from "../index.mjs";
import { TB } from "../index.mjs";

test("Reverse BahtText", () => {
  expect(TB(BT(`123`))).toBe(`123.00`);
  expect(TB(BT(`72`))).toBe(`72.00`);
  expect(TB(BT(`50000072.00`))).toBe(`50000072.00`);
  expect(TB(BT(`8.00`))).toBe(`8.00`);
  expect(TB(BT(`5678.00`))).toBe(`5678.00`);
  expect(TB(BT(`63147.89`))).toBe(`63147.89`);
  expect(TB(BT(`51000001.00`))).toBe(`51000001.00`);
  expect(TB(BT(`422.26`))).toBe(`422.26`);
  expect(TB(BT(`191415.11`))).toBe(`191415.11`);
  expect(TB(BT(`1.01`))).toBe(`1.01`);
  expect(TB(BT(`5678.46`))).toBe(`5678.46`);
  expect(TB(BT(`0.67`))).toBe(`0.67`);
  expect(TB(BT(`317.10`))).toBe(`317.10`);
  expect(TB(BT(`11.11`))).toBe(`11.11`);
  expect(TB(BT(`230000.00`))).toBe(`230000.00`);
  expect(TB(BT(`84000.00`))).toBe(`84000.00`);
});