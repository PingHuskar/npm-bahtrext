import ABT from "./ABT.mjs";
import ONETONINE from "../const/array/ONETONINE.mjs";
import REVERSETHAIDIGITWORDS from "../const/array/REVERSETHAIDIGITWORDS.mjs";
import MILLION from "../const/primitive/MILLION.mjs";
import SPECIALONE from "../const/primitive/SPECIALONE.mjs";
import SPECIALTWO from "../const/primitive/SPECIALTWO.mjs";
import BAHT from "../const/primitive/BAHT.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";

const SEP = (num, separator = `-`) => {
  let ret = ABT(num, true);
  for (let i of ONETONINE) {
    ret = ret.replace(new RegExp(i, `g`), `${i}${separator}`);
  }
  for (let i of REVERSETHAIDIGITWORDS.filter((x) => x !== ``)) {
    ret = ret.replace(new RegExp(i, `g`), `${i}${separator}`);
  }
  ret = ret
    .replace(new RegExp(MILLION, `g`), `${MILLION}${separator}`)
    .replace(new RegExp(SPECIALONE, `g`), `${SPECIALONE}${separator}`)
    .replace(new RegExp(SPECIALTWO, `g`), `${SPECIALTWO}${separator}`)
    .replace(`${BAHT}${FULLBAHT}`, "")
    .replace(BAHT, `${BAHT}${separator}`)
    .replace(new RegExp(`${separator}$`), ``);
  return ret;
};

export default SEP;