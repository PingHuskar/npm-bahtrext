const THAI_NUMBERS = `(หนึ่ง|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า|สิบ)`;
const TEENS = `(เอ็ด|สอง|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)`;
const TEN = `(ยี่|สาม|สี่|ห้า|หก|เจ็ด|แปด|เก้า)?(สิบ)`;

const STANGK_REGEX = RegExp(
  `(${TEN}${TEENS}?|${THAI_NUMBERS})สตางค์|(ถ้วน)`,
  "gs"
);

export default STANGK_REGEX;
