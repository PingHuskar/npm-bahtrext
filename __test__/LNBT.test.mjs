import f from "../function/LNBT.mjs";

test(`LNBT`, () => {
  expect(f(`Googolplex`)).toBe(`Don't Try This`);
  expect(f(`Septillion`)).toBe(`หนึ่งล้านล้านล้านล้านบาทถ้วน`);
  expect(f(`JumNumKaoEpu`)).toBe(undefined);
  expect(f(1, 0)).toBe(`ศูนย์บาทถ้วน`);
  expect(f([`asdf`])).toBe(undefined);
  expect(f()).toBe(undefined);
});
