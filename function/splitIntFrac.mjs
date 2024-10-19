const splitIntFrac = (money) => {
  const match = money.match(/(\d*)(\.\d+)?/);
  let [moneyFull, moneyInt, moneyFrac] = match;
  moneyFrac === undefined
    ? (moneyFrac = "")
    : (moneyFrac = moneyFrac.replace(/^\./, ""));
  return [moneyFull, moneyInt, moneyFrac];
};
export default splitIntFrac;