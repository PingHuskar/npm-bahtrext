const THAINUMBERWORDS = require(`../const/array/THAINUMBERWORDS`);
module.exports = NumText = (str, arr = THAINUMBERWORDS, flag = `g`) => {
  if (!str) return undefined;
  if (typeof str !== "string") return `Invalid Type`;
  for (const i in arr) {
    str = str.replace(new RegExp(i, flag), arr[i]);
  }
  return str;
};