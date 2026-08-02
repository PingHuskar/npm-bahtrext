export default Array.from({ length: 10 }, (_, i) => ({
  th: String.fromCodePoint(3664 + i),
  a: String.fromCodePoint(48 + i),
}));
