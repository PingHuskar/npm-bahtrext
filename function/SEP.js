const ABT = require(`./ABT`)
const ONETONINE = require(`../const/array/ONETONINE`);
const REVERSETHAIDIGITWORDS = require(`../const/array/REVERSETHAIDIGITWORDS`);
const MILLION = require(`../const/primitive/MILLION`);
const SPECIALONE = require(`../const/primitive/SPECIALONE`);
const SPECIALTWO = require(`../const/primitive/SPECIALTWO`);
const BAHT = require(`../const/primitive/BAHT`);
const FULLBAHT = require(`../const/primitive/FULLBAHT`);

module.exports = SEP = (num, separator = `-`) => {
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