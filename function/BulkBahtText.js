import BF from "./BF";
import defaultBulkBahtTextPat from "../const/defaultConfig/BulkBahtTextPat";
import InvalidType from "../const/error/InvalidType";
import ed from "../const/defaultConfig/ed";

export default (
  str,
  options = {}
) => {
  if (typeof str !== "string") return InvalidType;
  if (!str) return "";

  const { pat = defaultBulkBahtTextPat, ed: edParam = ed } = options;

  let result = str;
  let regex =
    pat instanceof RegExp && !pat.global
      ? new RegExp(pat.source, pat.flags + "g")
      : pat;
  let match;
  while ((match = regex.exec(str)) !== null) {
    let number = match[0];
    const numMatch = number.match(/[\d,]+(\.\d+)?/);
    if (numMatch) number = numMatch[0];
    result = result.replace(match[0], BF(number, { ed: edParam }));
  }

  return result;
};
