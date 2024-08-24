const {
  FULLBAHT,
  BAHT
} = require("./consts")
const {
  NumText,
  BT,
  ABT,
  PrintSatangs,
  BulkBahtText,
  SatangNum,
  TB,
  repeat,
  IsValidTB,
  IsValidText,
  OB,
  LNBT,
  SEP
} = require("./index");
const op = require('operation-strint');

test('NumText', () => {
    expect(NumText(`ไม่เอา123`)).toBe(`ไม่เอาหนึ่งสองสาม`);
    expect(NumText(84000)).toBe(`Invalid Type`);
});

test(`BT CEIL`,() => {
  expect(BT(`4.990001`, false, false, `c`)).toBe(`ห้าบาทถ้วน`);
})

test('BT OL', () => {
  expect(BT(`077`)).toBe(`เจ็ดสิบเจ็ดบาทถ้วน`);
  expect(BT(`077`, false, true)).toBe(`หกสิบสามบาทถ้วน`);
  expect(BT(`0o71`, false, true)).toBe(`ห้าสิบเจ็ดบาทถ้วน`);
  expect(BT(`0o71`)).toBe(undefined);
  expect(BT(`0o17`, false, true)).toBe(`สิบห้าบาทถ้วน`);
})

test('BT', () => {
    expect(BT(`lol`)).toBe(undefined);
    expect(BT(`2000000000000.9`,false,false,`c`)).toBe(`สองล้านล้านบาทเก้าสิบสตางค์`)
    expect(BT(`2000000000000.990003`,false,false,`c`)).toBe(`สองล้านล้านหนึ่งบาทถ้วน`)
    expect(BT(`2000000000000.99`,false,false,`f`)).toBe(`สองล้านล้านบาทเก้าสิบเก้าสตางค์`);
    expect(BT(`2000000000000.990003`,false,false,`f`)).toBe(`สองล้านล้านบาทเก้าสิบเก้าสตางค์`);
    expect(BT(`2000000000000.00`)).toBe(`สองล้านล้านบาทถ้วน`)
    expect(BT(`1000001000001`)).toBe(`หนึ่งล้านหนึ่งล้านหนึ่งบาทถ้วน`);
    expect(BT(`1000001000001`, true)).toBe(`หนึ่งล้านเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(BT(`1000011000001`, true)).toBe(`หนึ่งล้านสิบเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(BT(`101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
    expect(BT(`101`, true)).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(BT(`123`)).toBe(`หนึ่งร้อยยี่สิบสามบาทถ้วน`);
    expect(BT(`8.00`)).toBe(`แปดบาทถ้วน`)
    expect(BT(`5678.00`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`)
    expect(BT(`63147.89`)).toBe(`หกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`)
    expect(BT(`51000001.00`, true)).toBe(`ห้าสิบเอ็ดล้านเอ็ดบาทถ้วน`)
    expect(BT(`51000001.00`)).toBe(`ห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`)
    expect(BT(`317.10`)).toBe(`สามร้อยสิบเจ็ดบาทสิบสตางค์`)
    expect(BT(`422.26`)).toBe(`สี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`)
    expect(BT(`11.11`)).toBe(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)
    expect(BT(`191415.11`)).toBe(`หนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`)
    expect(BT(`1.01`)).toBe(`หนึ่งบาทหนึ่งสตางค์`)
    expect(BT(`5678.46`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`)
    expect(BT(`0.67`)).toBe(`หกสิบเจ็ดสตางค์`)
    expect(BT(`768,601,800,000,000`)).toBe(`เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`)
    expect(BT(`768_601_800_000_000`)).toBe(`เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`)
    expect(BT(`777777777777777777777777777777777777777777`)).toBe(
      `เจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดบาทถ้วน`
    );
});

test("ABT", () => {
  expect(ABT(`lol`)).toBe(undefined);
  expect(ABT(37)).toBe(`สามสิบเจ็ดบาทถ้วน`);
  expect(ABT(`2000000000000.00`)).toBe(`สองล้านล้านบาทถ้วน`);
  expect(ABT(`123`)).toBe(`หนึ่งร้อยยี่สิบสามบาทถ้วน`);
  expect(ABT(`8.00`)).toBe(`แปดบาทถ้วน`);
  expect(ABT(`5678.00`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`);
  expect(ABT(`63147.89`)).toBe(
    `หกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
  );
  expect(ABT(`51000001.00`)).toBe(`ห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`);
  expect(ABT(`317.10`)).toBe(`สามร้อยสิบเจ็ดบาทสิบสตางค์`);
  expect(ABT(`422.26`)).toBe(`สี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`);
  expect(ABT(`11.11`)).toBe(`สิบเอ็ดบาทสิบเอ็ดสตางค์`);
  expect(ABT(`191415.11`)).toBe(
    `หนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
  );
  expect(ABT(`1.01`)).toBe(`หนึ่งบาทหนึ่งสตางค์`);
  expect(ABT(`5678.46`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`);
  expect(ABT(`0.67`)).toBe(`หกสิบเจ็ดสตางค์`);
  expect(ABT(`768,601,800,000,000`)).toBe(
    `เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );
  expect(ABT([123])).toBe(
    undefined
  )
  expect(ABT(9007199254740992)).toBe(
    `เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบสองบาทถ้วน`
  );
  expect(ABT(`-0.67`)).toBe(undefined);
});

test("ABT Negative", () => {
  expect(ABT(`-0.67`, false, true)).toBe(`ลบหกสิบเจ็ดสตางค์`);
  expect(ABT(`--0.67`, false, true)).toBe(undefined);
  expect(ABT(`-2000000000000.00`, false, true)).toBe(`ลบสองล้านล้านบาทถ้วน`);
  expect(ABT(`-123`, false, true)).toBe(`ลบหนึ่งร้อยยี่สิบสามบาทถ้วน`);
  expect(ABT(`-8.00`, false, true)).toBe(`ลบแปดบาทถ้วน`);
  expect(ABT(`-5678.00`, false, true)).toBe(`ลบห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`);
  expect(ABT(`-63147.89`, false, true)).toBe(
    `ลบหกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
  );
  expect(ABT(`-51000001.00`, false, true)).toBe(`ลบห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`);
  expect(ABT(`-317.10`, false, true)).toBe(`ลบสามร้อยสิบเจ็ดบาทสิบสตางค์`);
  expect(ABT(`-422.26`, false, true)).toBe(`ลบสี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`);
  expect(ABT(`-11.11`, false, true)).toBe(`ลบสิบเอ็ดบาทสิบเอ็ดสตางค์`);
  expect(ABT(`-191415.11`, false, true)).toBe(
    `ลบหนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
  );
  expect(ABT(`-1.01`, false, true)).toBe(`ลบหนึ่งบาทหนึ่งสตางค์`);
  expect(ABT(`-๑.0๑`, false, true)).toBe(`ลบหนึ่งบาทหนึ่งสตางค์`);
  expect(ABT(`-5678.46`, false, true)).toBe(`ลบห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`);
  expect(ABT(`-768,601,800,000,000`, false, true)).toBe(
    `ลบเจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );
})

test('PrintSatangs', () =>{
    expect(PrintSatangs(`67`)[0]).toBe(`หกสิบเจ็ดสตางค์`)
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
})

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

test(`BulkBahtText`, () =>{
    expect(BulkBahtText(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`)).toBe(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`)
    expect(
      BulkBahtText(`30฿รักษาทุกโรค`, /(\d+)(\.\d{0,2}0*)?\฿/g).replace(
        FULLBAHT,
        ``
      )
    ).toBe(`สามสิบบาทรักษาทุกโรค`);
    expect(
      BulkBahtText(`เงินดิจิมอน 10000฿ ใช้ยังไง ได้วันไหน ใครได้บ้าง`)
        .replace(FULLBAHT, ``)
        .replace(RegExp(`฿`,`g`), ``)
    ).toBe(`เงินดิจิมอน หนึ่งหมื่นบาท ใช้ยังไง ได้วันไหน ใครได้บ้าง`);
    expect(BulkBahtText(`"900 ถูกมาก" ตุยไปละ`).replace(FULLBAHT, ``)).toBe(
      `"เก้าร้อยบาท ถูกมาก" ตุยไปละ`
    );
    expect(
      BulkBahtText(`ค่าโง่จำนำข้าว 200000000000`).replace(FULLBAHT, ``)
    ).toBe(`ค่าโง่จำนำข้าว สองแสนล้านบาท`);
    expect(
      BulkBahtText(
        `กู้ 2000000000000 ดอก 3000000000000 กู้ชาตินี้........ใช้หนี้ชาติหน้า`
      ).replace(RegExp(`${BAHT}${FULLBAHT}`,`g`), ``)
    ).toBe(`กู้ สองล้านล้าน ดอก สามล้านล้าน กู้ชาตินี้........ใช้หนี้ชาติหน้า`);
})

test('SatangNum', () => {
    expect(SatangNum("ถ้วน")).toBe("00")
    expect(SatangNum("หนึ่ง")).toBe("01")
    expect(SatangNum("สอง")).toBe("02")
    expect(SatangNum("สาม")).toBe("03")
    expect(SatangNum("สี่")).toBe("04")
    expect(SatangNum("ห้า")).toBe("05")
    expect(SatangNum("หก")).toBe("06")
    expect(SatangNum("เจ็ด")).toBe("07")
    expect(SatangNum("แปด")).toBe("08")
    expect(SatangNum("เก้า")).toBe("09")
    expect(SatangNum("สิบ")).toBe("10")
    expect(SatangNum("สิบเอ็ด")).toBe("11")
    expect(SatangNum("สิบสอง")).toBe("12")
    expect(SatangNum("สิบสาม")).toBe("13")
    expect(SatangNum("สิบสี่")).toBe("14")
    expect(SatangNum("สิบห้า")).toBe("15")
    expect(SatangNum("สิบหก")).toBe("16")
    expect(SatangNum("สิบเจ็ด")).toBe("17")
    expect(SatangNum("สิบแปด")).toBe("18")
    expect(SatangNum("สิบเก้า")).toBe("19")
    expect(SatangNum("ยี่สิบ")).toBe("20")
    expect(SatangNum("ยี่สิบเอ็ด")).toBe("21")
    expect(SatangNum("ยี่สิบสอง")).toBe("22")
    expect(SatangNum("ยี่สิบสาม")).toBe("23")
    expect(SatangNum("ยี่สิบสี่")).toBe("24")
    expect(SatangNum("ยี่สิบห้า")).toBe("25")
    expect(SatangNum("ยี่สิบหก")).toBe("26")
    expect(SatangNum("ยี่สิบเจ็ด")).toBe("27")
    expect(SatangNum("ยี่สิบแปด")).toBe("28")
    expect(SatangNum("ยี่สิบเก้า")).toBe("29")
    expect(SatangNum("สามสิบ")).toBe("30")
    expect(SatangNum("สามสิบเอ็ด")).toBe("31")
    expect(SatangNum("สามสิบสอง")).toBe("32")
    expect(SatangNum("สามสิบสาม")).toBe("33")
    expect(SatangNum("สามสิบสี่")).toBe("34")
    expect(SatangNum("สามสิบห้า")).toBe("35")
    expect(SatangNum("สามสิบหก")).toBe("36")
    expect(SatangNum("สามสิบเจ็ด")).toBe("37")
    expect(SatangNum("สามสิบแปด")).toBe("38")
    expect(SatangNum("สามสิบเก้า")).toBe("39")
    expect(SatangNum("สี่สิบ")).toBe("40")
    expect(SatangNum("สี่สิบเอ็ด")).toBe("41")
    expect(SatangNum("สี่สิบสอง")).toBe("42")
    expect(SatangNum("สี่สิบสาม")).toBe("43")
    expect(SatangNum("สี่สิบสี่")).toBe("44")
    expect(SatangNum("สี่สิบห้า")).toBe("45")
    expect(SatangNum("สี่สิบหก")).toBe("46")
    expect(SatangNum("สี่สิบเจ็ด")).toBe("47")
    expect(SatangNum("สี่สิบแปด")).toBe("48")
    expect(SatangNum("สี่สิบเก้า")).toBe("49")
    expect(SatangNum("ห้าสิบ")).toBe("50")
    expect(SatangNum("ห้าสิบเอ็ด")).toBe("51")
    expect(SatangNum("ห้าสิบสอง")).toBe("52")
    expect(SatangNum("ห้าสิบสาม")).toBe("53")
    expect(SatangNum("ห้าสิบสี่")).toBe("54")
    expect(SatangNum("ห้าสิบห้า")).toBe("55")
    expect(SatangNum("ห้าสิบหก")).toBe("56")
    expect(SatangNum("ห้าสิบเจ็ด")).toBe("57")
    expect(SatangNum("ห้าสิบแปด")).toBe("58")
    expect(SatangNum("ห้าสิบเก้า")).toBe("59")
    expect(SatangNum("หกสิบ")).toBe("60")
    expect(SatangNum("หกสิบเอ็ด")).toBe("61")
    expect(SatangNum("หกสิบสอง")).toBe("62")
    expect(SatangNum("หกสิบสาม")).toBe("63")
    expect(SatangNum("หกสิบสี่")).toBe("64")
    expect(SatangNum("หกสิบห้า")).toBe("65")
    expect(SatangNum("หกสิบหก")).toBe("66")
    expect(SatangNum("หกสิบเจ็ด")).toBe("67")
    expect(SatangNum("หกสิบแปด")).toBe("68")
    expect(SatangNum("หกสิบเก้า")).toBe("69")
    expect(SatangNum("เจ็ดสิบ")).toBe("70")
    expect(SatangNum("เจ็ดสิบเอ็ด")).toBe("71")
    expect(SatangNum("เจ็ดสิบสอง")).toBe("72")
    expect(SatangNum("เจ็ดสิบสาม")).toBe("73")
    expect(SatangNum("เจ็ดสิบสี่")).toBe("74")
    expect(SatangNum("เจ็ดสิบห้า")).toBe("75")
    expect(SatangNum("เจ็ดสิบหก")).toBe("76")
    expect(SatangNum("เจ็ดสิบเจ็ด")).toBe("77")
    expect(SatangNum("เจ็ดสิบแปด")).toBe("78")
    expect(SatangNum("เจ็ดสิบเก้า")).toBe("79")
    expect(SatangNum("แปดสิบ")).toBe("80")
    expect(SatangNum("แปดสิบเอ็ด")).toBe("81")
    expect(SatangNum("แปดสิบสอง")).toBe("82")
    expect(SatangNum("แปดสิบสาม")).toBe("83")
    expect(SatangNum("แปดสิบสี่")).toBe("84")
    expect(SatangNum("แปดสิบห้า")).toBe("85")
    expect(SatangNum("แปดสิบหก")).toBe("86")
    expect(SatangNum("แปดสิบเจ็ด")).toBe("87")
    expect(SatangNum("แปดสิบแปด")).toBe("88")
    expect(SatangNum("แปดสิบเก้า")).toBe("89")
    expect(SatangNum("เก้าสิบ")).toBe("90")
    expect(SatangNum("เก้าสิบเอ็ด")).toBe("91")
    expect(SatangNum("เก้าสิบสอง")).toBe("92")
    expect(SatangNum("เก้าสิบสาม")).toBe("93")
    expect(SatangNum("เก้าสิบสี่")).toBe("94")
    expect(SatangNum("เก้าสิบห้า")).toBe("95")
    expect(SatangNum("เก้าสิบหก")).toBe("96")
    expect(SatangNum("เก้าสิบเจ็ด")).toBe("97")
    expect(SatangNum("เก้าสิบแปด")).toBe("98")
    expect(SatangNum("เก้าสิบเก้า")).toBe("99")
    expect(SatangNum("ร้อย")).toBe(undefined)
})

test(`TB`, () => {
    expect(TB(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)).toBe(`11.11`);
    expect(TB(`สามสิบสามแสนบาทถ้วน`)).toBe(`Invalid String`);
    expect(TB(`สองล้านล้านบาทถ้วน`)).toBe(`2000000000000.00`);
    expect(TB(`สองล้านล้านยี่สิบบาทถ้วน`)).toBe(`2000000000020.00`);
    expect(TB(`หนึ่งล้านสามแสนบาทถ้วน`)).toBe(`1300000.00`);
    expect(TB(`สามแสนล้านบาทถ้วน`)).toBe(`300000000000.00`);
    expect(TB(`สามแสนสามสิบบาทถ้วน`)).toBe(`300030.00`);
    expect(TB(`สามแสนสิบบาทถ้วน`)).toBe(`300010.00`);
    expect(TB(`สิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
    expect(TB(`สองสิบหนึ่งบาทถ้วน`)).toBe(`Invalid String`);
    expect(TB(`สี่บาท`)).toBe(`4.00`);
    expect(TB(`สี่บาทถ้วน`)).toBe(`4.00`);
    expect(TB(`สี่บาทหก`)).toBe(`Invalid String`);
    expect(TB(`สี่บาทหกสิบ`)).toBe(`Invalid String`);
    expect(TB(`สี่บาทหกสิบสตางค์`)).toBe(`4.60`);
    expect(TB(`สี่บาทหกสตางค์`)).toBe(`4.06`);
})

test('Reverse BahtText', () => {
    expect(TB(BT(`123`))).toBe(`123.00`);
    expect(TB(BT(`72`))).toBe(`72.00`);
    expect(TB(BT(`50000072.00`))).toBe(`50000072.00`);
    expect(TB(BT(`8.00`))).toBe(`8.00`);
    expect(TB(BT(`5678.00`))).toBe(`5678.00`);
    expect(TB(BT(`63147.89`))).toBe(`63147.89`);
    expect(TB(BT(`51000001.00`))).toBe(`51000001.00`);
    expect(TB(BT(`422.26`))).toBe(`422.26`);
    expect(TB(BT(`191415.11`))).toBe(`191415.11`);
    expect(TB(BT(`1.01`))).toBe(`1.01`);
    expect(TB(BT(`5678.46`))).toBe(`5678.46`);
    expect(TB(BT(`0.67`))).toBe(`0.67`);
    expect(TB(BT(`317.10`))).toBe(`317.10`);
    expect(TB(BT(`11.11`))).toBe(`11.11`);
    expect(TB(BT(`230000.00`))).toBe(`230000.00`);
    expect(TB(BT(`84000.00`))).toBe(`84000.00`);
});

test('repeat',() => {
  expect(repeat(`ค`,[3])).toBe(`คคค`);
  expect(`ปิดสวิตซ์ ${repeat(`ป`, [3])} ป่าหี่`).toBe(
    `ปิดสวิตซ์ ปปป ป่าหี่`
  );
})

test(`sum bt`, ()=> {
  expect(BT(op.sum(`12`, `25`))).toBe(`สามสิบเจ็ดบาทถ้วน`);
  expect(BT(op.sum(`12`, `12`))).toBe(`ยี่สิบสี่บาทถ้วน`);
})
test(`minus bt`, ()=> {
  expect(BT(op.minus(`12`, `12`))).toBe(`ศูนย์บาทถ้วน`);
})

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
})

test(`IsValidText`, () => {
  expect(IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านสองสิบล้านหนึ่ง")).toBe(false);
  expect(IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่ง")).toBe(true);
  expect(IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน")).toBe(true);
  expect(IsValidText("สามแสนสองหมื่นห้าสิบเอ็ด@ล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน")).toBe(false);
  expect(IsValidText("สองล้าน")).toBe(true);
  expect(IsValidText("ล้าน")).toBe(false);
  expect(IsValidText("ล้านล้าน")).toBe(false);
  expect(IsValidText("ล้านล้านล้าน")).toBe(false);
  expect(IsValidText("asdf")).toBe(false);
  expect(IsValidText("123")).toBe(false);
  expect(IsValidText("")).toBe(false);
  expect(IsValidText(undefined)).toBe(false);
  expect(IsValidText(null)).toBe(false);
  expect(IsValidText(0)).toBe(false);
  expect(IsValidText(123)).toBe(false);
  expect(IsValidText(`แสนแสน`)).toBe(false);
  expect(IsValidText(`ยี่สิบ`)).toBe(true);
  expect(IsValidText(`สองสิบ`)).toBe(false);
});

test(`Bool Test`, () => {
  expect(true).toBe(true)
  expect(true).toBe(!false)
  expect(false).toBe(false);
  expect(false).toBe(!true)
})

test(`IsValidTB`, () => {
    expect(IsValidTB(`แปดสิบแปดบาท`)).toBe(true);
});

test(`LNBT`, () => {
    expect(LNBT(`Googolplex`)).toBe(`Don't Try This`);
    expect(LNBT(`Septillion`)).toBe(`หนึ่งล้านล้านล้านล้านบาทถ้วน`);
    expect(LNBT(`JumNumKaoEpu`)).toBe(undefined);
    expect(LNBT(1, 0)).toBe(`ศูนย์บาทถ้วน`);
    expect(LNBT([`asdf`])).toBe(undefined);
});

test(`sep`, () => {
  expect(SEP(`11`, `;;;`)).toBe(`สิบ;;;เอ็ด`);
  expect(SEP(`11`)).toBe(`สิบ-เอ็ด`)
  expect(SEP(`21`)).toBe(`ยี่-สิบ-เอ็ด`)
  expect(SEP(`101`)).toBe(`หนึ่ง-ร้อย-เอ็ด`);
  expect(SEP(`1001`)).toBe(`หนึ่ง-พัน-เอ็ด`);
  expect(SEP(`2501`)).toBe(`สอง-พัน-ห้า-ร้อย-เอ็ด`);
  expect(SEP(`501741221`)).toBe(`ห้า-ร้อย-เอ็ด-ล้าน-เจ็ด-แสน-สี่-หมื่น-หนึ่ง-พัน-สอง-ร้อย-ยี่-สิบ-เอ็ด`);
  // https://web.facebook.com/kumthai.th/posts/920804870082544
  expect(SEP(`2501.33`)).toBe(`สอง-พัน-ห้า-ร้อย-เอ็ด-บาท-สาม-สิบ-สาม-สตางค์`);
  expect(SEP(`1234.56`)).toBe(`หนึ่ง-พัน-สอง-ร้อย-สาม-สิบ-สี่-บาท-ห้า-สิบ-หก-สตางค์`);
})

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