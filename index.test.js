import { FULLBAHT, BAHT, INFINITY, SATANG, MILLION } from "./const";
import { ed } from "./const/defaultConfig";
import BR, {
  NumText,
  BT,
  B2,
  BF,
  ABT,
  PrintSatangs,
  BulkBahtText,
  SatangNum,
  TB,
  repeat,
  IsValidTB,
  IsValidText,
  PrintBaht,
  OB,
  LNBT,
  SEP,
  NEG,
  PrintDotMRR,
  VERSION,
  MillionScaleText,
  CompactScaleText,
  SortNumText,
} from ".";
import op from "operation-strint";
import { InvalidType, InvalidString } from "./const/error";

test(`PrintBaht`, () => {
  expect(PrintBaht("")).toBe("");
  expect(PrintBaht(`239043`)).toBe("สองแสนสามหมื่นเก้าพันสี่สิบสามบาท");
  expect(PrintBaht(`7238974333098402`)).toBe(
    "เจ็ดพันสองร้อยสามสิบแปดล้านเก้าแสนเจ็ดหมื่นสี่พันสามร้อยสามสิบสามล้านเก้าหมื่นแปดพันสี่ร้อยสองบาท"
  );
  expect(PrintBaht(`0`)).toBe("บาท");
});

test("NumText", () => {
  expect(NumText(`ไม่เอา123`)).toBe(`ไม่เอาหนึ่งสองสาม`);
  expect(NumText(84000)).toBe(InvalidType);
});

test("BF", () => {
  expect(BF()).toBeUndefined();
  expect(BF(283)).toBe(InvalidType);
  expect(BF(`๑๒๓๔๕๖๗๘๐๙`)).toBe(
    `หนึ่งพันสองร้อยสามสิบสี่ล้านห้าแสนหกหมื่นเจ็ดพันแปดร้อยเก้าบาทถ้วน`
  );
  expect(BF(`๑๒๓๔๕๖๗๘๐๙๑`)).toBe(
    `หนึ่งหมื่นสองพันสามร้อยสี่สิบห้าล้านหกแสนเจ็ดหมื่นแปดพันเก้าสิบเอ็ดบาทถ้วน`
  );
});

describe.each([
  ["BT", BT],
  // ['B2', B2],
])("%s Tests", (name, func) => {
  test(`${name} CEIL`, () => {
    expect(func(`4.990001`, false, false, `c`)).toBe(`ห้าบาทถ้วน`);
  });
  test(`${name} FLOOR`, () => {
    expect(func(`4.990001`, false, false, `f`)).toBe(`สี่บาทเก้าสิบเก้าสตางค์`);
  });
  test(`${name} General`, () => {
    expect(func(`lol`)).toBeUndefined();
    expect(func(`2000000000000.9`, false, false, `c`)).toBe(
      `สองล้านล้านบาทเก้าสิบสตางค์`
    );
    expect(func(`2000000000000.990003`, false, false, `c`)).toBe(
      `สองล้านล้านหนึ่งบาทถ้วน`
    );
    expect(func(`2000000000000.99`, false, false, `f`)).toBe(
      `สองล้านล้านบาทเก้าสิบเก้าสตางค์`
    );
    expect(func(`2000000000000.990003`, false, false, `f`)).toBe(
      `สองล้านล้านบาทเก้าสิบเก้าสตางค์`
    );
    expect(func(`2000000000000.00`)).toBe(`สองล้านล้านบาทถ้วน`);
    expect(func(`1000001000001`)).toBe(`หนึ่งล้านหนึ่งล้านหนึ่งบาทถ้วน`);
    expect(func(`1000001000001`, true)).toBe(`หนึ่งล้านเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(func(`1000011000001`, true)).toBe(`หนึ่งล้านสิบเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(func(`101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
    expect(func(`000101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
    expect(func(`000000000000000101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
    expect(func(`000000000000000101n`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
    expect(func(`101`, true)).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(func(`123`)).toBe(`หนึ่งร้อยยี่สิบสามบาทถ้วน`);
    expect(func(`8.00`)).toBe(`แปดบาทถ้วน`);
    expect(func(`5678.00`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`);
    expect(func(`63147.89`)).toBe(
      `หกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
    );
    expect(func(`51000001.00`, true)).toBe(`ห้าสิบเอ็ดล้านเอ็ดบาทถ้วน`);
    expect(func(`51000001.00`)).toBe(`ห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`);
    expect(func(`317.10`)).toBe(`สามร้อยสิบเจ็ดบาทสิบสตางค์`);
    expect(func(`422.26`)).toBe(`สี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`);
    expect(func(`11.11`)).toBe(`สิบเอ็ดบาทสิบเอ็ดสตางค์`);
    expect(func(`191415.11`)).toBe(
      `หนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
    );
    expect(func(`1.01`)).toBe(`หนึ่งบาทหนึ่งสตางค์`);
    expect(func(`5678.46`)).toBe(`ห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`);
    expect(func(`0.67`)).toBe(`หกสิบเจ็ดสตางค์`);
    expect(func(`768,601,800,000,000`)).toBe(
      `เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
    );
    expect(func(`768_601_800_000_000`)).toBe(
      `เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
    );
    expect(func(`777777777777777777777777777777777777777777`)).toBe(
      `เจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดล้านเจ็ดแสนเจ็ดหมื่นเจ็ดพันเจ็ดร้อยเจ็ดสิบเจ็ดบาทถ้วน`
    );
  });

  test(`${name} OL`, () => {
    expect(func(`0x77`)).toBe(`หนึ่งร้อยสิบเก้าบาทถ้วน`);
    expect(func(`077`)).toBe(`เจ็ดสิบเจ็ดบาทถ้วน`);
    expect(func(`077`, false, true)).toBe(`หกสิบสามบาทถ้วน`);
    expect(func(`0o71`, false, true)).toBe(`ห้าสิบเจ็ดบาทถ้วน`);
    expect(func(`0o71`)).toBeUndefined();
    expect(func(`0o17`, false, true)).toBe(`สิบห้าบาทถ้วน`);
  });

  test(`${name} BL`, () => {
    expect(func(`0B77`)).toBeUndefined();
    expect(func(`0B11`)).toBe(`สามบาทถ้วน`);
    expect(
      func(`0b00101010101001010101011001010010010100100001010010001001`)
    ).toBe(
      `หนึ่งหมื่นสองพันสามล้านเจ็ดแสนสามหมื่นเก้าพันหนึ่งร้อยแปดสิบแปดล้านเจ็ดแสนสองหมื่นแปดพันเก้าร้อยหกสิบเก้าบาทถ้วน`
    );
  });
});

test("ABT", () => {
  expect(ABT("")).toBeUndefined();
  expect(ABT("0")).toBe("ศูนย์บาทถ้วน");
  expect(ABT(0)).toBe("ศูนย์บาทถ้วน");
  expect(ABT(Number.MAX_VALUE)).toBe(INFINITY);
  expect(ABT(-Number.MAX_VALUE)).toBe(`ลบ${INFINITY}`);
  expect(ABT(`${Number.MAX_VALUE}`)).toBe(INFINITY);
  expect(ABT(`-${Number.MAX_VALUE}`, { ed, allowNeg: true })).toBe(
    `ลบ${INFINITY}`
  );
  expect(ABT(`lol`)).toBe("");
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
  expect(ABT(`768,601,800,000,000n`)).toBe(
    `เจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );
  expect(ABT([123])).toBe(undefined);
  expect(ABT(9007199254740992)).toBe(
    `เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบสองบาทถ้วน`
  );
  expect(ABT(9007199254740992n)).toBe(
    `เก้าพันเจ็ดล้านหนึ่งแสนเก้าหมื่นเก้าพันสองร้อยห้าสิบสี่ล้านเจ็ดแสนสี่หมื่นเก้าร้อยเก้าสิบสองบาทถ้วน`
  );
  expect(ABT(`-0.67`)).toBe("");
});

test("ABT Negative", () => {
  expect(ABT(`-0.67`, { ed: false, allowNeg: true })).toBe(`ลบหกสิบเจ็ดสตางค์`);
  expect(ABT(`--0.67`, { ed: false, allowNeg: true })).toBe("");
  expect(ABT(`-2000000000000.00`, { ed: false, allowNeg: true })).toBe(
    `ลบสองล้านล้านบาทถ้วน`
  );
  expect(ABT(`-123`, { ed: false, allowNeg: true })).toBe(
    `ลบหนึ่งร้อยยี่สิบสามบาทถ้วน`
  );
  expect(ABT(`-123n`, { ed: false, allowNeg: true })).toBe(
    `ลบหนึ่งร้อยยี่สิบสามบาทถ้วน`
  );
  expect(ABT(`-8.00`, { ed: false, allowNeg: true })).toBe(`ลบแปดบาทถ้วน`);
  expect(ABT(`-5678.00`, { ed: false, allowNeg: true })).toBe(
    `ลบห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`
  );
  expect(ABT(`-63147.89`, { ed: false, allowNeg: true })).toBe(
    `ลบหกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
  );
  expect(ABT(`-51000001.00`, { ed: false, allowNeg: true })).toBe(
    `ลบห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`
  );
  expect(ABT(`-317.10`, { ed: false, allowNeg: true })).toBe(
    `ลบสามร้อยสิบเจ็ดบาทสิบสตางค์`
  );
  expect(ABT(`-422.26`, { ed: false, allowNeg: true })).toBe(
    `ลบสี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`
  );
  expect(ABT(`-11.11`, { ed: false, allowNeg: true })).toBe(
    `ลบสิบเอ็ดบาทสิบเอ็ดสตางค์`
  );
  expect(ABT(`-191415.11`, { ed: false, allowNeg: true })).toBe(
    `ลบหนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
  );
  expect(ABT(`-1.01`, { ed: false, allowNeg: true })).toBe(
    `ลบหนึ่งบาทหนึ่งสตางค์`
  );
  expect(ABT(`-๑.0๑`, { ed: false, allowNeg: true })).toBe(
    `ลบหนึ่งบาทหนึ่งสตางค์`
  );
  expect(ABT(`-5678.46`, { ed: false, allowNeg: true })).toBe(
    `ลบห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`
  );
  expect(ABT(`-768,601,800,000,000`, { ed: false, allowNeg: true })).toBe(
    `ลบเจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );
  expect(ABT(`101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
  expect(ABT(`101`, { ed: true })).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
  expect(ABT(`101n`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
  expect(ABT(`101n`, { ed: true })).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
});

test(`NEG`, () => {
  expect(NEG(`-0.67`)).toBe(`ลบหกสิบเจ็ดสตางค์`);
  expect(NEG(`--0.67`)).toBe(``);
  expect(NEG(`-2000000000000.00`)).toBe(`ลบสองล้านล้านบาทถ้วน`);
  expect(NEG(`-123`)).toBe(`ลบหนึ่งร้อยยี่สิบสามบาทถ้วน`);
  expect(NEG(`-8.00`)).toBe(`ลบแปดบาทถ้วน`);
  expect(NEG(`-5678.00`)).toBe(`ลบห้าพันหกร้อยเจ็ดสิบแปดบาทถ้วน`);
  expect(NEG(`-63147.89`)).toBe(
    `ลบหกหมื่นสามพันหนึ่งร้อยสี่สิบเจ็ดบาทแปดสิบเก้าสตางค์`
  );
  expect(NEG(`-51000001.00`)).toBe(`ลบห้าสิบเอ็ดล้านหนึ่งบาทถ้วน`);
  expect(NEG(`-317.10`)).toBe(`ลบสามร้อยสิบเจ็ดบาทสิบสตางค์`);
  expect(NEG(`-422.26`)).toBe(`ลบสี่ร้อยยี่สิบสองบาทยี่สิบหกสตางค์`);
  expect(NEG(`-11.11`)).toBe(`ลบสิบเอ็ดบาทสิบเอ็ดสตางค์`);
  expect(NEG(`-191415.11`)).toBe(
    `ลบหนึ่งแสนเก้าหมื่นหนึ่งพันสี่ร้อยสิบห้าบาทสิบเอ็ดสตางค์`
  );
  expect(NEG(`-1.01`)).toBe(`ลบหนึ่งบาทหนึ่งสตางค์`);
  expect(NEG(`-๑.0๑`)).toBe(`ลบหนึ่งบาทหนึ่งสตางค์`);
  expect(NEG(`-5678.46`)).toBe(`ลบห้าพันหกร้อยเจ็ดสิบแปดบาทสี่สิบหกสตางค์`);
  expect(NEG(`-768,601,800,000,000`)).toBe(
    `ลบเจ็ดร้อยหกสิบแปดล้านหกแสนหนึ่งพันแปดร้อยล้านบาทถ้วน`
  );

  expect(NEG(`101`)).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
  expect(NEG(`101`, true)).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
  expect(NEG(`-101`)).toBe(`ลบหนึ่งร้อยหนึ่งบาทถ้วน`);
  expect(NEG(`-101`, true)).toBe(`ลบหนึ่งร้อยเอ็ดบาทถ้วน`);
});

test("PrintSatangs", () => {
  expect(PrintSatangs(`67`).word).toBe(`หกสิบเจ็ดสตางค์`);
  expect(PrintSatangs(`37`).word).toBe(`สามสิบเจ็ดสตางค์`);
  expect(PrintSatangs(`31`).word).toBe(`สามสิบเอ็ดสตางค์`);
  expect(PrintSatangs(`21`).word).toBe(`ยี่สิบเอ็ดสตางค์`);
  expect(PrintSatangs(`01`).word).toBe(`หนึ่งสตางค์`);
  expect(PrintSatangs(`1`).word).toBe(`สิบสตางค์`);
  expect(PrintSatangs("").word).toBe(FULLBAHT);
  expect(PrintSatangs(`0`).word).toBe(FULLBAHT);
  expect(PrintSatangs(`00`).word).toBe(FULLBAHT);
  expect(PrintSatangs(`0000`).word).toBe(FULLBAHT);
  expect(PrintSatangs(`dd`).word).toBeUndefined();
  expect(PrintSatangs(`999`).word).toBeUndefined();
});

test(`PrintSatangs 2d+`, () => {
  expect(PrintSatangs(``, `c`).word).toBe(FULLBAHT);
  expect(PrintSatangs(`9900000000000000001`, `c`).word).toBe(FULLBAHT);
  expect(PrintSatangs(`99`, `c`).word).toBe(`เก้าสิบเก้าสตางค์`);
  expect(PrintSatangs(`499`, `c`).word).toBe(`ห้าสิบสตางค์`);
  expect(PrintSatangs(`490000000000001`, `c`).word).toBe(`ห้าสิบสตางค์`);
  expect(PrintSatangs(`499`, `c`).word).toBe(`ห้าสิบสตางค์`);
  expect(PrintSatangs(`499`, `f`).word).toBe(`สี่สิบเก้าสตางค์`);
  expect(PrintSatangs(`49239480239`, `f`).word).toBe(`สี่สิบเก้าสตางค์`);
});

test("BulkBahtText: E Pu", () => {
  expect(
    BulkBahtText(
      `หนี้ 10,000 ล้านบาท ชดใช้ทั้งชีวิต ยังไงก็ไม่มีวันหมดค่ะ การทุ่มเททำงาน แบกรับแรงเสียดทานทั้งทางการเมืองและอีกหลายรูปแบบ เพื่อค้ำยันราคาข้าวให้สูงและมีเสถียรภาพ เพื่อพี่น้องชาวนาได้มีชีวิตที่ดีกว่า พลิกผืนนาเป็นพื้นที่แห่งโอกาสของครอบครัว กลับมีบทสรุปที่เจ็บปวดที่สุดสำหรับดิฉัน`,
      { pat: /10,000/ }
    ).replace("บาทถ้วน ", "")
  ).toBe(
    `หนี้ หนึ่งหมื่นล้านบาท ชดใช้ทั้งชีวิต ยังไงก็ไม่มีวันหมดค่ะ การทุ่มเททำงาน แบกรับแรงเสียดทานทั้งทางการเมืองและอีกหลายรูปแบบ เพื่อค้ำยันราคาข้าวให้สูงและมีเสถียรภาพ เพื่อพี่น้องชาวนาได้มีชีวิตที่ดีกว่า พลิกผืนนาเป็นพื้นที่แห่งโอกาสของครอบครัว กลับมีบทสรุปที่เจ็บปวดที่สุดสำหรับดิฉัน`
  );
  expect(
    BulkBahtText(
      `เป็นให้คำสั่งกระทรวงการคลังที่1351/2559 ลงวันที่ 13 ต.ค. 59 ที่สั่งให้น.ส.ยิ่งลักษณ์ ชดใช้ค่าสินไหมทดแทนเป็นเงิน 35,717,273,028.23 บาท... อ่านข่าวต้นฉบับได้ที่ : https://www.khaosod.co.th/breaking-news/news_9770585`,
      { pat: /35,717,273,028.23/ }
    ).replace(new RegExp(`${SATANG}\\s*${BAHT}`, "g"), SATANG)
  ).toBe(
    `เป็นให้คำสั่งกระทรวงการคลังที่1351/2559 ลงวันที่ 13 ต.ค. 59 ที่สั่งให้น.ส.ยิ่งลักษณ์ ชดใช้ค่าสินไหมทดแทนเป็นเงิน สามหมื่นห้าพันเจ็ดร้อยสิบเจ็ดล้านสองแสนเจ็ดหมื่นสามพันยี่สิบแปดบาทยี่สิบสามสตางค์... อ่านข่าวต้นฉบับได้ที่ : https://www.khaosod.co.th/breaking-news/news_9770585`
  );
  expect(
    BulkBahtText(`ค่าโง่จำนำข้าว 200000000000`).replace(FULLBAHT, "")
  ).toBe(`ค่าโง่จำนำข้าว สองแสนล้านบาท`);
});

test(`BulkBahtText`, () => {
  expect(
    BulkBahtText(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`)
  ).toBe(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`);
  expect(
    BulkBahtText(`30฿รักษาทุกโรค`, { pat: /(\d+)(\.\d{0,2}0*)?฿/g }).replace(
      FULLBAHT,
      ``
    )
  ).toBe(`สามสิบบาทรักษาทุกโรค`);
  // expect(
  //   BulkBahtText(`๑๓๓ ล้าน เพื่อศักดิ์ศรี`, {
  //     pat: /([\d๐-๙]+)(\.[\d๐-๙]{0,2}0*)?/g,
  //   })
  //     .replace(`${BAHT}${FULLBAHT} `, `${MILLION}${BAHT}`)
  //     .replace(`${MILLION} `, ` `)
  // ).toBe(`หนึ่งร้อยสามสิบสามล้านบาท เพื่อศักดิ์ศรี`);
  expect(
    BulkBahtText(`เงินดิจิมอน 10000฿ ใช้ยังไง ได้วันไหน ใครได้บ้าง`)
      .replace(FULLBAHT, "")
      .replace(/฿/g, "")
  ).toBe(`เงินดิจิมอน หนึ่งหมื่นบาท ใช้ยังไง ได้วันไหน ใครได้บ้าง`);
  expect(BulkBahtText(`"900 ถูกมาก" ตุยไปละ`).replace(FULLBAHT, "")).toBe(
    `"เก้าร้อยบาท ถูกมาก" ตุยไปละ`
  );
  expect(
    BulkBahtText(
      `กู้ 2000000000000 ดอก 3000000000000 กู้ชาตินี้........ใช้หนี้ชาติหน้า`
    ).replace(RegExp(`${BAHT}${FULLBAHT}`, `g`), "")
  ).toBe(`กู้ สองล้านล้าน ดอก สามล้านล้าน กู้ชาตินี้........ใช้หนี้ชาติหน้า`);
  expect(BulkBahtText(123).name).toBe(InvalidType.name);
  expect(BulkBahtText(0x3).name).toBe(InvalidType.name);
  expect(BulkBahtText("")).toBe("");
});

describe("SatangNum", () => {
  test.each([
    ["ถ้วน", "00"],
    ["หนึ่ง", "01"],
    ["สอง", "02"],
    ["สาม", "03"],
    ["สี่", "04"],
    ["ห้า", "05"],
    ["หก", "06"],
    ["เจ็ด", "07"],
    ["แปด", "08"],
    ["เก้า", "09"],
    ["สิบ", "10"],
    ["สิบเอ็ด", "11"],
    ["สิบสอง", "12"],
    ["สิบสาม", "13"],
    ["สิบสี่", "14"],
    ["สิบห้า", "15"],
    ["สิบหก", "16"],
    ["สิบเจ็ด", "17"],
    ["สิบแปด", "18"],
    ["สิบเก้า", "19"],
    ["ยี่สิบ", "20"],
    ["ยี่สิบเอ็ด", "21"],
    ["ยี่สิบสอง", "22"],
    ["ยี่สิบสาม", "23"],
    ["ยี่สิบสี่", "24"],
    ["ยี่สิบห้า", "25"],
    ["ยี่สิบหก", "26"],
    ["ยี่สิบเจ็ด", "27"],
    ["ยี่สิบแปด", "28"],
    ["ยี่สิบเก้า", "29"],
    ["สามสิบ", "30"],
    ["สามสิบเอ็ด", "31"],
    ["สามสิบสอง", "32"],
    ["สามสิบสาม", "33"],
    ["สามสิบสี่", "34"],
    ["สามสิบห้า", "35"],
    ["สามสิบหก", "36"],
    ["สามสิบเจ็ด", "37"],
    ["สามสิบแปด", "38"],
    ["สามสิบเก้า", "39"],
    ["สี่สิบ", "40"],
    ["สี่สิบเอ็ด", "41"],
    ["สี่สิบสอง", "42"],
    ["สี่สิบสาม", "43"],
    ["สี่สิบสี่", "44"],
    ["สี่สิบห้า", "45"],
    ["สี่สิบหก", "46"],
    ["สี่สิบเจ็ด", "47"],
    ["สี่สิบแปด", "48"],
    ["สี่สิบเก้า", "49"],
    ["ห้าสิบ", "50"],
    ["ห้าสิบเอ็ด", "51"],
    ["ห้าสิบสอง", "52"],
    ["ห้าสิบสาม", "53"],
    ["ห้าสิบสี่", "54"],
    ["ห้าสิบห้า", "55"],
    ["ห้าสิบหก", "56"],
    ["ห้าสิบเจ็ด", "57"],
    ["ห้าสิบแปด", "58"],
    ["ห้าสิบเก้า", "59"],
    ["หกสิบ", "60"],
    ["หกสิบเอ็ด", "61"],
    ["หกสิบสอง", "62"],
    ["หกสิบสาม", "63"],
    ["หกสิบสี่", "64"],
    ["หกสิบห้า", "65"],
    ["หกสิบหก", "66"],
    ["หกสิบเจ็ด", "67"],
    ["หกสิบแปด", "68"],
    ["หกสิบเก้า", "69"],
    ["เจ็ดสิบ", "70"],
    ["เจ็ดสิบเอ็ด", "71"],
    ["เจ็ดสิบสอง", "72"],
    ["เจ็ดสิบสาม", "73"],
    ["เจ็ดสิบสี่", "74"],
    ["เจ็ดสิบห้า", "75"],
    ["เจ็ดสิบหก", "76"],
    ["เจ็ดสิบเจ็ด", "77"],
    ["เจ็ดสิบแปด", "78"],
    ["เจ็ดสิบเก้า", "79"],
    ["แปดสิบ", "80"],
    ["แปดสิบเอ็ด", "81"],
    ["แปดสิบสอง", "82"],
    ["แปดสิบสาม", "83"],
    ["แปดสิบสี่", "84"],
    ["แปดสิบห้า", "85"],
    ["แปดสิบหก", "86"],
    ["แปดสิบเจ็ด", "87"],
    ["แปดสิบแปด", "88"],
    ["แปดสิบเก้า", "89"],
    ["เก้าสิบ", "90"],
    ["เก้าสิบเอ็ด", "91"],
    ["เก้าสิบสอง", "92"],
    ["เก้าสิบสาม", "93"],
    ["เก้าสิบสี่", "94"],
    ["เก้าสิบห้า", "95"],
    ["เก้าสิบหก", "96"],
    ["เก้าสิบเจ็ด", "97"],
    ["เก้าสิบแปด", "98"],
    ["เก้าสิบเก้า", "99"],
    ["ร้อย", undefined],
  ])('should convert "%s" to "%s"', (input, expected) => {
    expect(SatangNum(input)).toBe(expected);
  });
});

test(`TB`, () => {
  expect(TB(`สิบเอ็ดบาทสิบเอ็ดสตางค์`)).toBe(`11.11`);
  expect(TB(`สามสิบสามแสนบาทถ้วน`).name).toBe(InvalidString.name);
  expect(TB(`สองล้านล้านบาทถ้วน`)).toBe(`2000000000000.00`);
  expect(TB(`สองล้านล้านยี่สิบบาทถ้วน`)).toBe(`2000000000020.00`);
  expect(TB(`หนึ่งล้านสามแสนบาทถ้วน`)).toBe(`1300000.00`);
  expect(TB(`สามแสนล้านบาทถ้วน`)).toBe(`300000000000.00`);
  expect(TB(`สามแสนสามสิบบาทถ้วน`)).toBe(`300030.00`);
  expect(TB(`สามแสนสิบบาทถ้วน`)).toBe(`300010.00`);
  expect(TB(`สิบหนึ่งบาทถ้วน`).name).toBe(InvalidString.name);
  expect(TB(`สองสิบหนึ่งบาทถ้วน`).name).toBe(InvalidString.name);
  expect(TB(`สี่บาท`)).toBe(`4.00`);
  expect(TB(`สี่บาทถ้วน`)).toBe(`4.00`);
  expect(TB(`สี่บาทหก`).name).toBe(InvalidString.name);
  expect(TB(`สี่บาทหกสิบ`).name).toBe(InvalidString.name);
  expect(TB(`สี่บาทหกสิบสตางค์`)).toBe(`4.60`);
  expect(TB(`สี่บาทหกสตางค์`)).toBe(`4.06`);
});

test("Reverse BahtText", () => {
  const self = (str) => TB(B2(str));
  expect(self(`123`)).toBe(`123.00`);
  expect(self(`72`)).toBe(`72.00`);
  expect(self(`50000072.00`)).toBe(`50000072.00`);
  expect(self(`8.00`)).toBe(`8.00`);
  expect(self(`5678.00`)).toBe(`5678.00`);
  expect(self(`63147.89`)).toBe(`63147.89`);
  expect(self(`51000001.00`)).toBe(`51000001.00`);
  expect(self(`422.26`)).toBe(`422.26`);
  expect(self(`191415.11`)).toBe(`191415.11`);
  expect(self(`1.01`)).toBe(`1.01`);
  expect(self(`5678.46`)).toBe(`5678.46`);
  expect(self(`0.67`)).toBe(`0.67`);
  expect(self(`317.10`)).toBe(`317.10`);
  expect(self(`11.11`)).toBe(`11.11`);
  expect(self(`230000.00`)).toBe(`230000.00`);
  expect(self(`84000.00`)).toBe(`84000.00`);
});

test("repeat", () => {
  expect(repeat("ค", [3])).toBe(`คคค`);
  expect(`ปิดสวิตซ์ ${repeat("ป", [3])} ป่าหี่`).toBe(`ปิดสวิตซ์ ปปป ป่าหี่`);
});

test(`sum bt`, () => {
  expect(BT(op.sum(`12`, `25`))).toBe(`สามสิบเจ็ดบาทถ้วน`);
  expect(BT(op.sum(`12`, `12`))).toBe(`ยี่สิบสี่บาทถ้วน`);
});

test(`MillionScaleText`, () => {
  const func = MillionScaleText;
  expect(NumText(`1`) + ` ใน ` + func(`5,566,857,732,147,160,000,000`)).toBe(
    `หนึ่ง ใน ` + `ห้าพันห้าร้อยหกสิบหกล้านล้านล้าน`
  );
});

test("CompactScaleText", () => {
  const func = CompactScaleText;
  expect(
    func(
      `1035531362097366437658125676806059750189964336484946134542090486895029450514590979495591124336086177139938812952029085090597851627520000000`
    )
  ).toBe(`1.036` + ` ตามด้วยคำว่า "${MILLION}" ` + `23` + ` ครั้ง`);
});

test("SortNumText", () => {
  const func = SortNumText;
  expect(func(["สอง", "หก", "หนึ่ง"])).toEqual(["หนึ่ง", "สอง", "หก"]);
  expect(func(["สอง", "หก", "หนึ่ง"], { desc: true })).toEqual(["หก", "สอง", "หนึ่ง"]);
  expect(func(["หนึ่งล้านล้าน", "ศูนย์", "สิบเอ็ด", "ห้าสิบสตางค์", "สองบาทห้าสิบสตางค์"])).toEqual([
    "ศูนย์", "ห้าสิบสตางค์", "สองบาทห้าสิบสตางค์", "สิบเอ็ด", "หนึ่งล้านล้าน",
  ]);
  expect(func(["สอง", "abc", "หก", "สองสอง", "หนึ่ง"])).toEqual(["หนึ่ง", "สอง", "หก", "abc", "สองสอง"]);
  expect(func(["สอง", "abc", "หก", 5, "หนึ่ง"], { removeInvalid: true })).toEqual(["หนึ่ง", "สอง", "หก"]);
  expect(func(["สอง", "abc", "หก"], { desc: true, removeInvalid: true })).toEqual(["หก", "สอง"]);
  expect(func("สอง")).toBe(InvalidType);
});

test(`minus bt`, () => {
  expect(BT(op.minus(`12`, `12`))).toBe(`ศูนย์บาทถ้วน`);
});

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
    err: false,
    txt: "",
    typ: "string",
    val: "s6d7f6d7f6",
  });
});

test(`PrintDotMRR`, () => {
  expect(PrintDotMRR("575")).toEqual(`จุดห้าเจ็ดห้า`);
  expect(PrintDotMRR("345")).toEqual(`จุดสามสี่ห้า`);
  expect(PrintDotMRR("545")).toEqual(`จุดห้าสี่ห้า`);
  expect(PrintDotMRR("44")).toEqual(`จุดสี่สี่`);
  expect(PrintDotMRR("๔๔")).toEqual(`จุดสี่สี่`);
  expect(PrintDotMRR("4400")).toEqual(`จุดสี่สี่`);
  expect(PrintDotMRR("๖๖66")).toEqual(`จุดหกหกหกหก`);
  expect(PrintDotMRR("0000")).toEqual(``);
  expect(PrintDotMRR("00009")).toEqual(``);
  expect(PrintDotMRR("ab")).toEqual(``);
  expect(PrintDotMRR("")).toEqual(``);
});

test(`IsValidText`, () => {
  expect(
    IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านสองสิบล้านหนึ่ง")
  ).toBeFalsy();
  expect(
    IsValidText("สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่ง")
  ).toBeTruthy();
  expect(
    IsValidText(
      "สามแสนสองหมื่นห้าสิบเอ็ดล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน"
    )
  ).toBeTruthy();
  expect(
    IsValidText(
      "สามแสนสองหมื่นห้าสิบเอ็ด@ล้านสองหมื่นสิบล้านยี่สิบล้านหนึ่งล้าน"
    )
  ).toBeFalsy();
  expect(IsValidText("สองล้าน")).toBeTruthy();
  expect(IsValidText("ล้านล้าน")).toBeFalsy();
  expect(IsValidText("สองสอง")).toBeFalsy();
  expect(IsValidText("ล้าน")).toBeFalsy();
  expect(IsValidText("ล้านล้าน")).toBeFalsy();
  expect(IsValidText("ล้านล้านล้าน")).toBeFalsy();
  expect(IsValidText("asdf")).toBeFalsy();
  expect(IsValidText("123")).toBeFalsy();
  expect(IsValidText("")).toBeFalsy();
  expect(IsValidText(undefined)).toBeFalsy();
  expect(IsValidText(null)).toBeFalsy();
  expect(IsValidText(0)).toBeFalsy();
  expect(IsValidText(123)).toBeFalsy();
  expect(IsValidText(`แสนแสน`)).toBeFalsy();
  expect(IsValidText(`ยี่สิบ`)).toBeTruthy();
  expect(IsValidText(`ยี่สิบเอ็ด`)).toBeTruthy();
  expect(IsValidText(`เอ็ดสิบ`)).toBeFalsy();
  expect(IsValidText(`ยี่สิบหนึ่ง`)).toBeFalsy();
  expect(IsValidText(`สองสิบ`)).toBeFalsy();
});

test(`IsValidTB`, () => {
  expect(IsValidTB(`แปดสิบแปดบาท`)).toBeTruthy();
});

test(`LNBT`, () => {
  expect(LNBT(`Googolplex`)).toBe(`Don't Try This`);
  expect(LNBT(`Septillion`)).toBe(`หนึ่งล้านล้านล้านล้านบาทถ้วน`);
  expect(LNBT(`JumNumKaoEpu`)).toBeUndefined();
  expect(LNBT(1, 0)).toBe(`ศูนย์บาทถ้วน`);
  expect(LNBT(4, 1)).toBe(`หนึ่งหมื่นบาทถ้วน`);
  expect(LNBT([`asdf`])).toBeUndefined();
  expect(LNBT("undefined", 234)).toBeUndefined();
});

test(`sep`, () => {
  expect(SEP(`11`, `;;;`)).toBe(`สิบ;;;เอ็ด`);
  expect(SEP(`11`)).toBe(`สิบ-เอ็ด`);
  expect(SEP(`21`)).toBe(`ยี่-สิบ-เอ็ด`);
  expect(SEP(`101`)).toBe(`หนึ่ง-ร้อย-เอ็ด`);
  expect(SEP(`1001`)).toBe(`หนึ่ง-พัน-เอ็ด`);
  expect(SEP(`2501`)).toBe(`สอง-พัน-ห้า-ร้อย-เอ็ด`);
  expect(SEP(`501741221`)).toBe(
    `ห้า-ร้อย-เอ็ด-ล้าน-เจ็ด-แสน-สี่-หมื่น-หนึ่ง-พัน-สอง-ร้อย-ยี่-สิบ-เอ็ด`
  );
  // https://web.facebook.com/kumthai.th/posts/920804870082544
  expect(SEP(`2501.33`)).toBe(`สอง-พัน-ห้า-ร้อย-เอ็ด-บาท-สาม-สิบ-สาม-สตางค์`);
  expect(SEP(`1234.56`)).toBe(
    `หนึ่ง-พัน-สอง-ร้อย-สาม-สิบ-สี่-บาท-ห้า-สิบ-หก-สตางค์`
  );
});

test(`data type`, () => {
  const [s, f] = ["string", "function"];
  expect(typeof FULLBAHT).toBe(s);
  expect(typeof BAHT).toBe(s);
  expect(typeof NumText).toBe(f);
  expect(typeof BT).toBe(f);
  expect(typeof ABT).toBe(f);
  expect(typeof PrintSatangs).toBe(f);
  expect(typeof BulkBahtText).toBe(f);
  expect(typeof TB).toBe(f);
  expect(typeof B2).toBe(f);
  expect(typeof repeat).toBe(f);
  expect(typeof IsValidTB).toBe(f);
  expect(typeof IsValidText).toBe(f);
  expect(typeof OB).toBe(f);
  expect(typeof LNBT).toBe(f);
  expect(typeof SEP).toBe(f);
});

describe("BR Class", () => {
  let br;

  beforeEach(() => {
    br = new BR("1000");
  });

  test("should return the correct version", () => {
    expect(br.version).toBe(VERSION);
  });

  test("auto() should return the correct value", () => {
    expect(br.auto).toBe(`หนึ่งพันบาทถ้วน`);
  });

  test("text() should return the correct value", () => {
    expect(br.text).toBe(`หนึ่งพันบาทถ้วน`);
  });

  test("flex() should return the correct value", () => {
    expect(br.flex).toBe(`หนึ่งพันบาทถ้วน`);
  });

  test("neg() should return the correct value", () => {
    expect(br.neg).toBe(`หนึ่งพันบาทถ้วน`);
  });

  test("bahttext() should return the correct value", () => {
    expect(br.bahttext).toBe(`฿1,000.00 อ่านว่า "หนึ่งพันบาทถ้วน"`);
  });

  test("clean() should return the cleaned value", () => {
    expect(br.clean).toBe(`1000`);
  });

  test("sep() should return the expected value", () => {
    expect(br.sep).toBe(`หนึ่ง-พัน`);
  });

  test("currency() should return the formatted currency", () => {
    expect(br.currency).toBe(`฿1,000.00`);
  });

  test("printBaht() should return the correct baht representation", () => {
    expect(br.printBaht).toBe(`หนึ่งพันบาท`);
  });

  test("printSatang() should return the correct Satang representation", () => {
    expect(br.printSatang).toBe(`ถ้วน`);
  });

  test("trim() should remove leading zeros", () => {
    br = new BR("000123");
    expect(br.trim).toBe("123");
  });

  test("isValid() should return true for valid money", () => {
    expect(br.isValid).toBeTruthy(); // Adjust based on IsMoneyValidate function
  });
});

describe("Decimal handling", () => {
  test("floor keeps the satang value and never carries by accident", () => {
    expect(BT(`1.100`, false, false, `f`)).toBe(`หนึ่งบาทสิบสตางค์`);
    expect(BT(`5.100`, false, false, `f`)).toBe(`ห้าบาทสิบสตางค์`);
    expect(BT(`1.0001`, false, false, `f`)).toBe(`หนึ่งบาทถ้วน`);
    expect(BT(`0.001`, false, false, `f`)).toBe(`ศูนย์บาทถ้วน`);
  });

  test("ceiling adds one satang, including after a leading zero", () => {
    expect(BT(`1.001`, false, false, `c`)).toBe(`หนึ่งบาทหนึ่งสตางค์`);
    expect(BT(`0.001`, false, false, `c`)).toBe(`หนึ่งสตางค์`);
    expect(BT(`21.0424`, false, false, `c`)).toBe(`ยี่สิบเอ็ดบาทห้าสตางค์`);
    expect(BT(`36610487.009`, false, false, `c`)).toBe(
      `สามสิบหกล้านหกแสนหนึ่งหมื่นสี่ร้อยแปดสิบเจ็ดบาทหนึ่งสตางค์`
    );
    expect(BT(`0.999`, false, false, `c`)).toBe(`หนึ่งบาทถ้วน`);
  });

  test("zeros after the second decimal place are allowed without rounding", () => {
    expect(BT(`12.340`)).toBe(`สิบสองบาทสามสิบสี่สตางค์`);
    expect(BT(`12.3400`)).toBe(`สิบสองบาทสามสิบสี่สตางค์`);
    expect(BT(`12.345`)).toBeUndefined();
  });

  test("PrintSatangs matches the SQL port", () => {
    expect(PrintSatangs(`100`)).toEqual({ word: `สิบสตางค์`, carry: `0` });
    expect(PrintSatangs(`120`)).toEqual({ word: `สิบสองสตางค์`, carry: `0` });
    expect(PrintSatangs(`100`, `f`)).toEqual({ word: `สิบสตางค์`, carry: `0` });
    expect(PrintSatangs(`001`, `c`)).toEqual({ word: `หนึ่งสตางค์`, carry: `0` });
    expect(PrintSatangs(`001`, `f`)).toEqual({ word: FULLBAHT, carry: `0` });
    expect(PrintSatangs(`019`, `c`)).toEqual({ word: `สองสตางค์`, carry: `0` });
    expect(PrintSatangs(`995`, `c`)).toEqual({ word: FULLBAHT, carry: `1` });
  });

  test("non-numeric input stays invalid when rounding", () => {
    expect(BT(`abc`, false, false, `c`)).toBeUndefined();
    expect(BT(`1.2.3`, false, false, `f`)).toBeUndefined();
    expect(BT(`1.5`, false, false, `c`)).toBe(`หนึ่งบาทห้าสิบสตางค์`);
  });
});

describe("Negative amounts", () => {
  test("invalid amounts return an empty string", () => {
    expect(NEG(`-`)).toBe(``);
    expect(NEG(`-abc`)).toBe(``);
  });

  test("zero is not read as negative", () => {
    expect(NEG(`-0`)).toBe(`ศูนย์บาทถ้วน`);
    expect(NEG(`-0.00`)).toBe(`ศูนย์บาทถ้วน`);
  });
});

describe("ed option", () => {
  test("BR.toggleed changes every reading", () => {
    const br = new BR(`101`).toggleed();
    expect(br.text).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(br.auto).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(br.flex).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(br.neg).toBe(`หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(br.bahttext).toBe(`฿101.00 อ่านว่า "หนึ่งร้อยเอ็ดบาทถ้วน"`);
    expect(br.num).toBe(`101.00`);
    expect(br.toggleed().text).toBe(`หนึ่งร้อยหนึ่งบาทถ้วน`);
  });

  test("BulkBahtText applies ed", () => {
    expect(BulkBahtText(`ราคา 101`, { ed: true })).toBe(`ราคา หนึ่งร้อยเอ็ดบาทถ้วน`);
    expect(BulkBahtText(`ราคา 101`)).toBe(`ราคา หนึ่งร้อยหนึ่งบาทถ้วน`);
  });
});

describe("TB reads every digit", () => {
  test("digits after หมื่น", () => {
    expect(TB(`สองหมื่นห้าบาท`)).toBe(`20005.00`);
    expect(TB(`หนึ่งหมื่นหกสิบหกบาทเก้าสิบสองสตางค์`)).toBe(`10066.92`);
    expect(TB(`สองหมื่นสิบเอ็ดบาท`)).toBe(`20011.00`);
  });

  test("a lone เอ็ด", () => {
    expect(TB(`หนึ่งร้อยเอ็ดบาทถ้วน`)).toBe(`101.00`);
    expect(TB(`หนึ่งล้านเอ็ดบาท`)).toBe(`1000001.00`);
  });

  test("round trips with BT", () => {
    for (const money of [`40002.84`, `80002202286.64`, `3002600060080.00`, `1000001000001.01`]) {
      expect(TB(BT(money))).toBe(money);
      expect(TB(BT(money, true))).toBe(money);
    }
  });
});
