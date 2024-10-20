import f from "../function/PrintSatangs.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";

test("PrintSatangs", () => {
  expect(f(`67`)[0]).toBe(`หกสิบเจ็ดสตางค์`);
  expect(f(`37`)[0]).toBe(`สามสิบเจ็ดสตางค์`);
  expect(f(`31`)[0]).toBe(`สามสิบเอ็ดสตางค์`);
  expect(f(`21`)[0]).toBe(`ยี่สิบเอ็ดสตางค์`);
  expect(f(`01`)[0]).toBe(`หนึ่งสตางค์`);
  expect(f(`1`)[0]).toBe(`สิบสตางค์`);
  expect(f(``)[0]).toBe(FULLBAHT);
  expect(f(`0`)[0]).toBe(FULLBAHT);
  expect(f(`00`)[0]).toBe(FULLBAHT);
  expect(f(`0000`)[0]).toBe(FULLBAHT);
  expect(f(`dd`)[0]).toBe(undefined);
  expect(f(`999`)[0]).toBe(undefined);
});

test(`f 2d+`, () => {
  expect(f(``, `c`)[0]).toBe(FULLBAHT);
  expect(f(`9900000000000000001`, `c`)[0]).toBe(FULLBAHT);
  expect(f(`99`, `c`)[0]).toBe(`เก้าสิบเก้าสตางค์`);
  expect(f(`499`, `c`)[0]).toBe(`ห้าสิบสตางค์`);
  expect(f(`490000000000001`, `c`)[0]).toBe(`ห้าสิบสตางค์`);
  expect(f(`499`, `c`)[0]).toBe(`ห้าสิบสตางค์`);
  expect(f(`499`, `f`)[0]).toBe(`สี่สิบเก้าสตางค์`);
  expect(f(`49239480239`, `f`)[0]).toBe(`สี่สิบเก้าสตางค์`);
});
