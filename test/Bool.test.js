test(`Bool`, () => {
  expect(true).toBe(true);
  expect(true).toBe(!false);
  expect(false).toBe(false);
  expect(false).toBe(!true);
});
