import ABT from "./ABT";
import applyReplacements from "../snippet/applyReplacements";
import {
  ONETONINE,
  REVERSETHAIDIGITWORDS,
  MILLION,
  SPECIALONE,
  SPECIALTWO,
  BAHT,
  FULLBAHT,
} from "../const";
import defaultSeparator from "../const/defaultConfig/separator";

export default (num, separator = defaultSeparator) => {
  let ret = ABT(num, { ed: true });

  const replaceWithSeparator = (arr) => {
    arr.forEach((i) => {
      ret = ret.replace(new RegExp(i, `g`), `${i}${separator}`);
    });
  };

  replaceWithSeparator(ONETONINE);
  replaceWithSeparator(REVERSETHAIDIGITWORDS.filter((x) => x !== ""));

  ret = applyReplacements(ret, [MILLION, SPECIALONE, SPECIALTWO], separator)
    .replace(`${BAHT}${FULLBAHT}`, "")
    .replace(BAHT, `${BAHT}${separator}`)
    .replace(new RegExp(`${separator}$`), "");

  return ret;
};
