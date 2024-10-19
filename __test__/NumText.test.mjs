import NumText from "../function/NumText.mjs";

test("NumText", () => {
  expect(NumText(`ไม่เอา123`)).toBe(`ไม่เอาหนึ่งสองสาม`);
  expect(NumText(84000)).toBe(`Invalid Type`);
});
