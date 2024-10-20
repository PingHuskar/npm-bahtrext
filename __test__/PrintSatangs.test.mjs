import PrintSatangs from "../function/PrintSatangs.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";

test("PrintSatangs", () => {
  expect(PrintSatangs(`67`)[0]).toBe(`หกสิบเจ็ดสตางค์`);
  expect(PrintSatangs(`37`)[0]).toBe(`สามสิบเจ็ดสตางค์`);
  expect(PrintSatangs(`31`)[0]).toBe(`สามสิบเอ็ดสตางค์`);
  expect(PrintSatangs(`21`)[0]).toBe(`ยี่สิบเอ็ดสตางค์`);
  expect(PrintSatangs(`01`)[0]).toBe(`หนึ่งสตางค์`);
  expect(PrintSatangs(`1`)[0]).toBe(`สิบสตางค์`);
  expect(PrintSatangs(``)[0]).toBe(FULLBAHT);
  expect(PrintSatangs(`0`)[0]).toBe(FULLBAHT);
  expect(PrintSatangs(`00`)[0]).toBe(FULLBAHT);
  expect(PrintSatangs(`0000`)[0]).toBe(FULLBAHT);
  expect(PrintSatangs(`dd`)[0]).toBe(undefined);
  expect(PrintSatangs(`999`)[0]).toBe(undefined);
});

test(`PrintSatangs 2d+`, () => {
  expect(PrintSatangs(``, `c`)[0]).toBe(FULLBAHT);
  expect(PrintSatangs(`9900000000000000001`, `c`)[0]).toBe(FULLBAHT);
  expect(PrintSatangs(`99`, `c`)[0]).toBe(`เก้าสิบเก้าสตางค์`);
  expect(PrintSatangs(`499`, `c`)[0]).toBe(`ห้าสิบสตางค์`);
  expect(PrintSatangs(`490000000000001`, `c`)[0]).toBe(`ห้าสิบสตางค์`);
  expect(PrintSatangs(`499`, `c`)[0]).toBe(`ห้าสิบสตางค์`);
  expect(PrintSatangs(`499`, `f`)[0]).toBe(`สี่สิบเก้าสตางค์`);
  expect(PrintSatangs(`49239480239`, `f`)[0]).toBe(`สี่สิบเก้าสตางค์`);
});
