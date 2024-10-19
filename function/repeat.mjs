const repeat = (str, x) => {
  for (const i of x) {
    str = `${str}`.repeat(i);
  }
  return str;
};
export default repeat;