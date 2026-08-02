import THAINUMBERWORDS from "../const/array/THAINUMBERWORDS";
import InvalidType from "../const/error/InvalidType";

export default (str) => {
  if (typeof str !== "string") return InvalidType;

  return Object.entries(THAINUMBERWORDS).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(key, `g`), value),
    str
  );
};
