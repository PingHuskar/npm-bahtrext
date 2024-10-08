const BulkBahtText = require(`../function/BulkBahtText`);

test(`BulkBahtText`, () => {
  expect(
    BulkBahtText(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`)
  ).toBe(`อย่าลืมใช้โค้ด 9arm นะครับ ใช้เถอะ เค้าจะได้จ้างผมต่อ`);
  expect(
    BulkBahtText(`30฿รักษาทุกโรค`, /(\d+)(\.\d{0,2}0*)?\฿/g).replace(
      FULLBAHT,
      ``
    )
  ).toBe(`สามสิบบาทรักษาทุกโรค`);
  expect(
    BulkBahtText(`เงินดิจิมอน 10000฿ ใช้ยังไง ได้วันไหน ใครได้บ้าง`)
      .replace(FULLBAHT, ``)
      .replace(RegExp(`฿`, `g`), ``)
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
    ).replace(RegExp(`${BAHT}${FULLBAHT}`, `g`), ``)
  ).toBe(`กู้ สองล้านล้าน ดอก สามล้านล้าน กู้ชาตินี้........ใช้หนี้ชาติหน้า`);
});
