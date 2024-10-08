const { FULLBAHT, BAHT } = require("../const");
const {
  NumText,
  BT,
  ABT,
  PrintSatangs,
  BulkBahtText,
  TB,
  repeat,
  IsValidTB,
  IsValidText,
  OB,
  LNBT,
  SEP,
} = require("../");

test(`data type`, () => {
  const d = {
    s: `string`,
    f: `function`,
    o: `object`,
  };
  expect(typeof FULLBAHT).toBe(d.s);
  expect(typeof BAHT).toBe(d.s);
  expect(typeof NumText).toBe(d.f);
  expect(typeof BT).toBe(d.f);
  expect(typeof ABT).toBe(d.f);
  expect(typeof PrintSatangs).toBe(d.f);
  expect(typeof BulkBahtText).toBe(d.f);
  expect(typeof TB).toBe(d.f);
  expect(typeof repeat).toBe(d.f);
  expect(typeof IsValidTB).toBe(d.f);
  expect(typeof IsValidText).toBe(d.f);
  expect(typeof OB).toBe(d.f);
  expect(typeof LNBT).toBe(d.f);
  expect(typeof SEP).toBe(d.f);
});
