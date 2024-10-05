const BahtText = require(`./BahtText`)
const IsMatchInSkipsPattern = require(`./IsMatchInSkipsPattern`);
const defaultBulkBahtTextPat = require(`../const/regex/defaultBulkBahtTextPat`);
const defaultBulkBahtTextSkips = require(`../const/regex/defaultBulkBahtTextSkips`);

module.exports = BulkBahtText = (
  str,
  pat = defaultBulkBahtTextPat,
  skips = defaultBulkBahtTextSkips,
  ed = false
) => {
  if (typeof str !== "string") return `Invalid Type`;
  if (!str) return null;
  const matches = str.match(pat);
  if (!matches) return str;
  for (const match of matches) {
    if (IsMatchInSkipsPattern(match, skips)) continue;
    str = str.replace(
      match,
      BahtText(match.replace(/[^\d]/g, "")).split('"').at(-2),
      ed
    );
  }
  return str;
};