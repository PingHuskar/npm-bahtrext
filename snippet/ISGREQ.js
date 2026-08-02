export default (value, ...comparisons) =>
  comparisons.every((comp) => value >= comp || value === 0);
