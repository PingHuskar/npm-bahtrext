export default (str, replaceWith = "", ...replaces) => {
  for (const regex of replaces) {
    str = str.replace(regex, replaceWith);
  }
  return str;
};
