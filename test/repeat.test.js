const repeat = require("../function/repeat");

test("repeat", () => {
  expect(repeat(`ค`, [3])).toBe(`คคค`);
  expect(`ปิดสวิตซ์ ${repeat(`ป`, [3])} ป่าหี่`).toBe(`ปิดสวิตซ์ ปปป ป่าหี่`);
});