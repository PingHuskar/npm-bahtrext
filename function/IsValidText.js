module.exports = IsValidText = (text) => {
  if (typeof text !== `string`) return false;
  if (text.replace(/ล้าน/g, "") === "") return false;
  const sixdigitswords = text.split(MILLION);
  for (const sixdigitsword of sixdigitswords) {
    if (/สองสิบ/.test(sixdigitsword)) return false;
    if (/สิบหนึ่ง/.test(sixdigitsword)) return false;
    for (const REVERSETHAIDIGITWORD of REVERSETHAIDIGITWORDS.slice(0, -1)) {
      if (
        (sixdigitsword.match(new RegExp(REVERSETHAIDIGITWORD, "g"))?.length ||
          0) > 1
      )
        return false;
    }
    const iHUNDREDTHOUSAND = sixdigitsword.indexOf(HUNDREDTHOUSAND);
    const iTENTHOUSAND = sixdigitsword.indexOf(TENTHOUSAND);
    const iTHOUSAND = sixdigitsword.indexOf(THOUSAND);
    const iHUNDRED = sixdigitsword.indexOf(HUNDRED);
    const iTEN = sixdigitsword.indexOf(TEN);
    const iiTEN = iTEN == -1 ? 0 : iTEN;
    const iiHUNDRED = iHUNDRED == -1 ? 0 : iHUNDRED;
    const iiTHOUSAND = iTHOUSAND == -1 ? 0 : iTHOUSAND;
    const iiTENTHOUSAND = iTENTHOUSAND == -1 ? 0 : iTENTHOUSAND;
    const iiHUNDREDTHOUSAND = iHUNDREDTHOUSAND == -1 ? 0 : iHUNDREDTHOUSAND;
    if (
      !(
        ((iiTEN >= iiHUNDRED &&
          iiTEN >= iiTHOUSAND &&
          iiTEN >= iiTENTHOUSAND &&
          iiTEN >= iiHUNDREDTHOUSAND) ||
          iiTEN == 0) &&
        ((iiHUNDRED >= iiTHOUSAND &&
          iiHUNDRED >= iiTENTHOUSAND &&
          iiHUNDRED >= iiHUNDREDTHOUSAND) ||
          iiHUNDRED == 0) &&
        ((iiTHOUSAND >= iiTENTHOUSAND && iiTHOUSAND >= iiHUNDREDTHOUSAND) ||
          iiTHOUSAND == 0) &&
        (iiTENTHOUSAND >= iiHUNDREDTHOUSAND || iiTENTHOUSAND == 0)
      )
    ) {
      return false;
    }
    let eachdigits = sixdigitsword.split(/แสน|หมื่น|พัน|ร้อย|สิบ/);
    for (let i = 0; i < eachdigits.length; i++) {
      if (eachdigits.at(i) === "") continue;
      if (ONETONINE.indexOf(eachdigits.at(i)) === -1) {
        if (eachdigits.at(i) === SPECIALONE) {
          // if (sixdigitsword.indexOf(`สิบเอ็ด`) === -1) {
          //   return false;
          // }
          continue;
        } else if (eachdigits.at(i) === SPECIALTWO) {
          // if (sixdigitsword.indexOf(`ยี่สิบ`) === -1) {
          //   return false;
          // }
          continue;
        } else {
          return false;
        }
      }
    }
  }
  return true;
};