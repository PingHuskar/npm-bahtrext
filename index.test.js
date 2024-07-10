const BR = require('./index');
const op = require('operation-strint');

test('NumText', () => {
    expect(BR.NumText(`ไม่เอา123`)).toBe(`ไม่เอาหนึ่งสองสาม`);
    expect(BR.NumText(84000)).toBe(`Invalid Type`);
});

test('BT', () => {
    expect(BR.BT(`lol`)).toBe(undefined);
    expect(BR.BT(`2000000000000.00`)).toBe(`สองล้านล้านบาทถ้วน`)
    expect(BR.BT(`1000001000001`)).toBe(`หนึ่งล้านหนึ่งล้านหนึ่งบาทถ้วน`);
    expect(BR.BT(`1000001000001`, true)).toBe(`หนึ่งล้านเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(BR.BT(`1000011000001`, true)).toBe(`หนึ่งล้านสิบเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(BR.BT(`101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
    expect(BR.BT(`101`, true)).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(BR.BT(`123`)).toBe(`หนึ่งร้อยยี่สิบสามบาทถ้วน`);
    expect(BR.BT(`8.00`)).toBe(`แปดบาทถ้วน`)
    expect(BR.BT(`5678.00`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`)
    expect(BR.BT(`63147.89`)).toBe(`หกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`)
    expect(BR.BT(`51000001.00`, true)).toBe(`ห้าสิบเอ็ดล้านเอ็ดบาทถ้วน`)
    expect(BR.BT(`51000001.00`)).toBe(`ห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`)
    expect(BR.BT(`317.10`)).toBe(`สามร้อยสิบเจ็ดบาทสิบสตางค์`)
    expect(BR.BT(`422.26`)).toBe(`สี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`)
    expect(BR.BT(`11.11`)).toBe(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)
    expect(BR.BT(`191415.11`)).toBe(`หนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`)
    expect(BR.BT(`1.01`)).toBe(`หนึ่งบาทหนึ่งสตางค์`)
    expect(BR.BT(`5678.46`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`)
    expect(BR.BT(`0.67`)).toBe(`หกสิบเจ็ดสตางค์`)
    expect(BR.BT(`768,601,800,000,000`)).toBe(`เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`)
    expect(BR.BT(`768_601_800_000_000`)).toBe(`เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`)
    expect(BR.BT(`777777777777777777777777777777777777777777`)).toBe(
      `เจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดบาทถ้วน`
    );
});

test("ABT", () => {
  expect(BR.ABT(`lol`)).toBe(undefined);
  expect(BR.ABT(37)).toBe(`สามสิบเจ็ดบาทถ้วน`);
  expect(BR.ABT(`2000000000000.00`)).toBe(`สองล้านล้านบาทถ้วน`);
  expect(BR.ABT(`123`)).toBe(`หนึ่งร้อยยี่สิบสามบาทถ้วน`);
  expect(BR.ABT(`8.00`)).toBe(`แปดบาทถ้วน`);
  expect(BR.ABT(`5678.00`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`);
  expect(BR.ABT(`63147.89`)).toBe(
    `หกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
  );
  expect(BR.ABT(`51000001.00`)).toBe(`ห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`);
  expect(BR.ABT(`317.10`)).toBe(`สามร้อยสิบเจ็ดบาทสิบสตางค์`);
  expect(BR.ABT(`422.26`)).toBe(`สี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`);
  expect(BR.ABT(`11.11`)).toBe(`สิบเอ็ดบาทสิบเอ็ดสตางค์`);
  expect(BR.ABT(`191415.11`)).toBe(
    `หนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
  );
  expect(BR.ABT(`1.01`)).toBe(`หนึ่งบาทหนึ่งสตางค์`);
  expect(BR.ABT(`5678.46`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`);
  expect(BR.ABT(`0.67`)).toBe(`หกสิบเจ็ดสตางค์`);
  expect(BR.ABT(`768,601,800,000,000`)).toBe(
    `เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );
});

test('PrintSatangs', () =>{
    expect(BR.PrintSatangs(`67`)).toBe(`หกสิบเจ็ดสตางค์`)
    expect(BR.PrintSatangs(`37`)).toBe(`สามสิบเจ็ดสตางค์`)
    expect(BR.PrintSatangs(`31`)).toBe(`สามสิบเอ็ดสตางค์`)
    expect(BR.PrintSatangs(`21`)).toBe(`ยี่สิบเอ็ดสตางค์`)
    expect(BR.PrintSatangs(`01`)).toBe(`หนึ่งสตางค์`)
    expect(BR.PrintSatangs(`1`)).toBe(`สิบสตางค์`)
    expect(BR.PrintSatangs(``)).toBe(`ถ้วน`)
    expect(BR.PrintSatangs(`0`)).toBe(`ถ้วน`)
    expect(BR.PrintSatangs(`00`)).toBe(`ถ้วน`)
    expect(BR.PrintSatangs(`0000`)).toBe(`ถ้วน`)
    expect(BR.PrintSatangs(`dd`)).toBe(undefined)
    expect(BR.PrintSatangs(`999`)).toBe(undefined);
})

test(`BulkBahtText`, () =>{
    expect(BR.BulkBahtText(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`)).toBe(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`)
    expect(
      BR.BulkBahtText(`30฿รักษาทุกโรค`, /(\d+)(\.\d{0,2}0*)?\฿/g).replace(
        BR.FULLBAHT,
        ``
      )
    ).toBe(`สามสิบบาทรักษาทุกโรค`);
    expect(
      BR.BulkBahtText(`เงินดิจิมอน 10000฿ ใช้ยังไง ได้วันไหน ใครได้บ้าง`)
        .replace(BR.FULLBAHT, ``)
        .replace(RegExp(`฿`,`g`), ``)
    ).toBe(`เงินดิจิมอน หนึ่งหมื่นบาท ใช้ยังไง ได้วันไหน ใครได้บ้าง`);
    expect(BR.BulkBahtText(`"900 ถูกมาก" ตุยไปละ`).replace(BR.FULLBAHT, ``)).toBe(
      `"เก้าร้อยบาท ถูกมาก" ตุยไปละ`
    );
    expect(
      BR.BulkBahtText(`ค่าโง่จำนำข้าว 200000000000`).replace(BR.FULLBAHT, ``)
    ).toBe(`ค่าโง่จำนำข้าว สองแสนล้านบาท`);
    expect(
      BR.BulkBahtText(
        `กู้ 2000000000000 ดอก 3000000000000 กู้ชาตินี้........ใช้หนี้ชาติหน้า`
      ).replace(RegExp(`${BR.BAHT}${BR.FULLBAHT}`,`g`), ``)
    ).toBe(`กู้ สองล้านล้าน ดอก สามล้านล้าน กู้ชาตินี้........ใช้หนี้ชาติหน้า`);
})

test('SatangNum', () => {
    expect(BR.SatangNum("ถ้วน")).toBe("00")
    expect(BR.SatangNum("หนึ่ง")).toBe("01")
    expect(BR.SatangNum("สอง")).toBe("02")
    expect(BR.SatangNum("สาม")).toBe("03")
    expect(BR.SatangNum("สี่")).toBe("04")
    expect(BR.SatangNum("ห้า")).toBe("05")
    expect(BR.SatangNum("หก")).toBe("06")
    expect(BR.SatangNum("เจ็ด")).toBe("07")
    expect(BR.SatangNum("แปด")).toBe("08")
    expect(BR.SatangNum("เก้า")).toBe("09")
    expect(BR.SatangNum("สิบ")).toBe("10")
    expect(BR.SatangNum("สิบเอ็ด")).toBe("11")
    expect(BR.SatangNum("สิบสอง")).toBe("12")
    expect(BR.SatangNum("สิบสาม")).toBe("13")
    expect(BR.SatangNum("สิบสี่")).toBe("14")
    expect(BR.SatangNum("สิบห้า")).toBe("15")
    expect(BR.SatangNum("สิบหก")).toBe("16")
    expect(BR.SatangNum("สิบเจ็ด")).toBe("17")
    expect(BR.SatangNum("สิบแปด")).toBe("18")
    expect(BR.SatangNum("สิบเก้า")).toBe("19")
    expect(BR.SatangNum("ยี่สิบ")).toBe("20")
    expect(BR.SatangNum("ยี่สิบเอ็ด")).toBe("21")
    expect(BR.SatangNum("ยี่สิบสอง")).toBe("22")
    expect(BR.SatangNum("ยี่สิบสาม")).toBe("23")
    expect(BR.SatangNum("ยี่สิบสี่")).toBe("24")
    expect(BR.SatangNum("ยี่สิบห้า")).toBe("25")
    expect(BR.SatangNum("ยี่สิบหก")).toBe("26")
    expect(BR.SatangNum("ยี่สิบเจ็ด")).toBe("27")
    expect(BR.SatangNum("ยี่สิบแปด")).toBe("28")
    expect(BR.SatangNum("ยี่สิบเก้า")).toBe("29")
    expect(BR.SatangNum("สามสิบ")).toBe("30")
    expect(BR.SatangNum("สามสิบเอ็ด")).toBe("31")
    expect(BR.SatangNum("สามสิบสอง")).toBe("32")
    expect(BR.SatangNum("สามสิบสาม")).toBe("33")
    expect(BR.SatangNum("สามสิบสี่")).toBe("34")
    expect(BR.SatangNum("สามสิบห้า")).toBe("35")
    expect(BR.SatangNum("สามสิบหก")).toBe("36")
    expect(BR.SatangNum("สามสิบเจ็ด")).toBe("37")
    expect(BR.SatangNum("สามสิบแปด")).toBe("38")
    expect(BR.SatangNum("สามสิบเก้า")).toBe("39")
    expect(BR.SatangNum("สี่สิบ")).toBe("40")
    expect(BR.SatangNum("สี่สิบเอ็ด")).toBe("41")
    expect(BR.SatangNum("สี่สิบสอง")).toBe("42")
    expect(BR.SatangNum("สี่สิบสาม")).toBe("43")
    expect(BR.SatangNum("สี่สิบสี่")).toBe("44")
    expect(BR.SatangNum("สี่สิบห้า")).toBe("45")
    expect(BR.SatangNum("สี่สิบหก")).toBe("46")
    expect(BR.SatangNum("สี่สิบเจ็ด")).toBe("47")
    expect(BR.SatangNum("สี่สิบแปด")).toBe("48")
    expect(BR.SatangNum("สี่สิบเก้า")).toBe("49")
    expect(BR.SatangNum("ห้าสิบ")).toBe("50")
    expect(BR.SatangNum("ห้าสิบเอ็ด")).toBe("51")
    expect(BR.SatangNum("ห้าสิบสอง")).toBe("52")
    expect(BR.SatangNum("ห้าสิบสาม")).toBe("53")
    expect(BR.SatangNum("ห้าสิบสี่")).toBe("54")
    expect(BR.SatangNum("ห้าสิบห้า")).toBe("55")
    expect(BR.SatangNum("ห้าสิบหก")).toBe("56")
    expect(BR.SatangNum("ห้าสิบเจ็ด")).toBe("57")
    expect(BR.SatangNum("ห้าสิบแปด")).toBe("58")
    expect(BR.SatangNum("ห้าสิบเก้า")).toBe("59")
    expect(BR.SatangNum("หกสิบ")).toBe("60")
    expect(BR.SatangNum("หกสิบเอ็ด")).toBe("61")
    expect(BR.SatangNum("หกสิบสอง")).toBe("62")
    expect(BR.SatangNum("หกสิบสาม")).toBe("63")
    expect(BR.SatangNum("หกสิบสี่")).toBe("64")
    expect(BR.SatangNum("หกสิบห้า")).toBe("65")
    expect(BR.SatangNum("หกสิบหก")).toBe("66")
    expect(BR.SatangNum("หกสิบเจ็ด")).toBe("67")
    expect(BR.SatangNum("หกสิบแปด")).toBe("68")
    expect(BR.SatangNum("หกสิบเก้า")).toBe("69")
    expect(BR.SatangNum("เจ็ดสิบ")).toBe("70")
    expect(BR.SatangNum("เจ็ดสิบเอ็ด")).toBe("71")
    expect(BR.SatangNum("เจ็ดสิบสอง")).toBe("72")
    expect(BR.SatangNum("เจ็ดสิบสาม")).toBe("73")
    expect(BR.SatangNum("เจ็ดสิบสี่")).toBe("74")
    expect(BR.SatangNum("เจ็ดสิบห้า")).toBe("75")
    expect(BR.SatangNum("เจ็ดสิบหก")).toBe("76")
    expect(BR.SatangNum("เจ็ดสิบเจ็ด")).toBe("77")
    expect(BR.SatangNum("เจ็ดสิบแปด")).toBe("78")
    expect(BR.SatangNum("เจ็ดสิบเก้า")).toBe("79")
    expect(BR.SatangNum("แปดสิบ")).toBe("80")
    expect(BR.SatangNum("แปดสิบเอ็ด")).toBe("81")
    expect(BR.SatangNum("แปดสิบสอง")).toBe("82")
    expect(BR.SatangNum("แปดสิบสาม")).toBe("83")
    expect(BR.SatangNum("แปดสิบสี่")).toBe("84")
    expect(BR.SatangNum("แปดสิบห้า")).toBe("85")
    expect(BR.SatangNum("แปดสิบหก")).toBe("86")
    expect(BR.SatangNum("แปดสิบเจ็ด")).toBe("87")
    expect(BR.SatangNum("แปดสิบแปด")).toBe("88")
    expect(BR.SatangNum("แปดสิบเก้า")).toBe("89")
    expect(BR.SatangNum("เก้าสิบ")).toBe("90")
    expect(BR.SatangNum("เก้าสิบเอ็ด")).toBe("91")
    expect(BR.SatangNum("เก้าสิบสอง")).toBe("92")
    expect(BR.SatangNum("เก้าสิบสาม")).toBe("93")
    expect(BR.SatangNum("เก้าสิบสี่")).toBe("94")
    expect(BR.SatangNum("เก้าสิบห้า")).toBe("95")
    expect(BR.SatangNum("เก้าสิบหก")).toBe("96")
    expect(BR.SatangNum("เก้าสิบเจ็ด")).toBe("97")
    expect(BR.SatangNum("เก้าสิบแปด")).toBe("98")
    expect(BR.SatangNum("เก้าสิบเก้า")).toBe("99")
    expect(BR.SatangNum("ร้อย")).toBe(undefined)
})

test(`TB`, () => {
    expect(BR.TB(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)).toBe(`11.11`);
    expect(BR.TB(`สามสิบสามแสนบาทถ้วน`)).toBe(`Invalid String`);
    expect(BR.TB(`สองล้านล้านบาทถ้วน`)).toBe(`2000000000000.00`);
    expect(BR.TB(`สองล้านล้านยี่สิบบาทถ้วน`)).toBe(`2000000000020.00`);
    expect(BR.TB(`หนึ่งล้านสามแสนบาทถ้วน`)).toBe(`1300000.00`);
    expect(BR.TB(`สามแสนล้านบาทถ้วน`)).toBe(`300000000000.00`);
    expect(BR.TB(`สามแสนสามสิบบาทถ้วน`)).toBe(`300030.00`);
    expect(BR.TB(`สามแสนสิบบาทถ้วน`)).toBe(`300010.00`);
    expect(BR.TB(`สิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
    expect(BR.TB(`สองสิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
    expect(BR.TB(`สี่บาท`)).toBe(`4.00`);
    expect(BR.TB(`สี่บาทถ้วน`)).toBe(`4.00`);
    expect(BR.TB(`สี่บาทหก`)).toBe(`Invalid String`);
    expect(BR.TB(`สี่บาทหกสิบ`)).toBe(`Invalid String`);
    expect(BR.TB(`สี่บาทหกสิบสตางค์`)).toBe(`4.60`);
    expect(BR.TB(`สี่บาทหกสตางค์`)).toBe(`4.06`);
})

test('Reverse BahtText', () => {
    expect(BR.TB(BR.BT(`123`))).toBe(`123.00`);
    expect(BR.TB(BR.BT(`72`))).toBe(`72.00`);
    expect(BR.TB(BR.BT(`50000072.00`))).toBe(`50000072.00`);
    expect(BR.TB(BR.BT(`8.00`))).toBe(`8.00`);
    expect(BR.TB(BR.BT(`5678.00`))).toBe(`5678.00`);
    expect(BR.TB(BR.BT(`63147.89`))).toBe(`63147.89`);
    expect(BR.TB(BR.BT(`51000001.00`))).toBe(`51000001.00`);
    expect(BR.TB(BR.BT(`422.26`))).toBe(`422.26`);
    expect(BR.TB(BR.BT(`191415.11`))).toBe(`191415.11`);
    expect(BR.TB(BR.BT(`1.01`))).toBe(`1.01`);
    expect(BR.TB(BR.BT(`5678.46`))).toBe(`5678.46`);
    expect(BR.TB(BR.BT(`0.67`))).toBe(`0.67`);
    expect(BR.TB(BR.BT(`317.10`))).toBe(`317.10`);
    expect(BR.TB(BR.BT(`11.11`))).toBe(`11.11`);
    expect(BR.TB(BR.BT(`230000.00`))).toBe(`230000.00`);
    expect(BR.TB(BR.BT(`84000.00`))).toBe(`84000.00`);
});

test('repeat',() => {
  expect(BR.repeat(`ค`,[3])).toBe(`คคค`);
  expect(`ปิดสวิตซ์ ${BR.repeat(`ป`, [3])} ป่าหี่`).toBe(
    `ปิดสวิตซ์ ปปป ป่าหี่`
  );
})

test(`sum bt`, ()=> {
  expect(BR.BT(op.sum(`12`, `25`))).toBe(`สามสิบเจ็ดบาทถ้วน`);
  expect(BR.BT(op.sum(`12`, `12`))).toBe(`ยี่สิบสี่บาทถ้วน`);
})
test(`minus bt`, ()=> {
  expect(BR.BT(op.minus(`12`, `12`))).toBe(`ศูนย์บาทถ้วน`);
})

test(`OB`, () => {
  expect(BR.OB(`33`)).toEqual({
    err: false,
    txt: "สามสิบสามบาทถ้วน",
    typ: "string",
    val: "33",
  });
  expect(BR.OB(`๑๕๕`)).toEqual({
    err: false,
    txt: "หนึ่งร้อยห้าสิบห้าบาทถ้วน",
    typ: "string",
    val: "๑๕๕",
  });
  expect(BR.OB(`2000000000000.00`)).toEqual({
    err: false,
    txt: "สองล้านล้านบาทถ้วน",
    typ: "string",
    val: "2000000000000.00",
  });
  expect(BR.OB(`s6d7f6d7f6`)).toEqual({
    err: true,
    txt: undefined,
    typ: "string",
    val: "s6d7f6d7f6",
  });
})

test(`IsValidText`, () => {
  expect(BR.IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านสองสิบล้านหนึ่ง")).toBe(false);
  expect(BR.IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่ง")).toBe(true);
  expect(BR.IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน")).toBe(true);
  expect(BR.IsValidText("สามแสนสองหมื่นห้าสิบเอ็ด@ล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน")).toBe(false);
  expect(BR.IsValidText("สองล้าน")).toBe(true);
  expect(BR.IsValidText("ล้าน")).toBe(false);
  expect(BR.IsValidText("ล้านล้าน")).toBe(false);
  expect(BR.IsValidText("ล้านล้านล้าน")).toBe(false);
  expect(BR.IsValidText("asdf")).toBe(false);
  expect(BR.IsValidText("123")).toBe(false);
  expect(BR.IsValidText("")).toBe(false);
  expect(BR.IsValidText(undefined)).toBe(false);
  expect(BR.IsValidText(null)).toBe(false);
  expect(BR.IsValidText(0)).toBe(false);
  expect(BR.IsValidText(123)).toBe(false);
});


test(`IsValidText`, () => {
  expect(true).toBe(true)
  expect(false).toBe(!true)
  expect(false).toBe(true)
})