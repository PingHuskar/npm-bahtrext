import octalRegex1 from "../const/regex/octalRegex1.mjs";
import octalRegex2 from "../const/regex/octalRegex2.mjs";

const isOctal = (money) => {
  if (typeof money !== `string`) return undefined;
  return octalRegex1.test(money) || octalRegex2.test(money);
};
export default isOctal;