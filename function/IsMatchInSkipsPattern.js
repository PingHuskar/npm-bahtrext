module.exports = IsMatchInSkipsPattern = (match, skips) => {
  for (const skip of skips) {
    if (skip.test(match)) return true;
  }
  return false;
};