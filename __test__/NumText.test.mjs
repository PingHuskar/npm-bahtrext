import f from "../function/NumText.mjs";

test("NumText", () => {
  expect(f()).toBe(undefined);
  expect(f(`ไม่เอา123`)).toBe(`ไม่เอาหนึ่งสองสาม`);
  expect(f(84000)).toBe(`Invalid Type`);
});
