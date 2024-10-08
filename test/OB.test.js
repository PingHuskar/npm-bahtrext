const OB = require("../function/OB");

test(`OB`, () => {
  expect(OB(`33`)).toEqual({
    err: false,
    txt: "สามสิบสามบาทถ้วน",
    typ: "string",
    val: "33",
  });
  expect(OB(`๑๕๕`)).toEqual({
    err: false,
    txt: "หนึ่งร้อยห้าสิบห้าบาทถ้วน",
    typ: "string",
    val: "๑๕๕",
  });
  expect(OB(`2000000000000.00`)).toEqual({
    err: false,
    txt: "สองล้านล้านบาทถ้วน",
    typ: "string",
    val: "2000000000000.00",
  });
  expect(OB(`s6d7f6d7f6`)).toEqual({
    err: true,
    txt: undefined,
    typ: "string",
    val: "s6d7f6d7f6",
  });
});
