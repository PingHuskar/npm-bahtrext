export default (match, skips) => skips.some((skip) => skip.test(match));
