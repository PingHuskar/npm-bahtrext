import f from "../function/repeat.mjs";

test("repeat", () => {
  expect(f(`ค`, [3])).toBe(`คคค`);
  expect(`ปิดสวิตซ์ ${f(`ป`, [3])} ป่าหี่`).toBe(`ปิดสวิตซ์ ปปป ป่าหี่`);
});