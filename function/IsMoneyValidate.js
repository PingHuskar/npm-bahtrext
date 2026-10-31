import SPLITPATTERN from "../const/regex/SPLITPATTERN";
import defaultRounding from "../const/defaultConfig/rounding";

export default (money, rounding = defaultRounding) =>
  (typeof money === "string" || typeof money === "number") &&
  (rounding === ""
    ? SPLITPATTERN.test(String(money))
    : /^\d*(\.\d*)?n?$/.test(String(money)));
