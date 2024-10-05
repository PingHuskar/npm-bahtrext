module.exports = repeat = (str, x) => {
  for (const i of x) {
    str = `${str}`.repeat(i);
  }
  return str;
};