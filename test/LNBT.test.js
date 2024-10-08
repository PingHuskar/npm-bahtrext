const LNBT = require(`../function/LNBT`)

test(`LNBT`, () => {
  expect(LNBT(`Googolplex`)).toBe(`Don't Try This`);
  expect(LNBT(`Septillion`)).toBe(`หนึ่งล้านล้านล้านล้านบาทถ้วน`);
  expect(LNBT(`JumNumKaoEpu`)).toBe(undefined);
  expect(LNBT(1, 0)).toBe(`ศูนย์บาทถ้วน`);
  expect(LNBT([`asdf`])).toBe(undefined);
});
