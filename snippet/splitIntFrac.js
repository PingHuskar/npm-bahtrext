export default (money) => {
  const match = money.match(/(\d*)(\.\d+)?/);
  if (!match) return [money, "", ""]; // Handle case where match fails

  const [moneyFull, moneyInt, moneyFrac] = match;
  const nmoneyFrac = moneyFrac ? moneyFrac.replace(/^\./, "") : "";

  return [moneyFull, moneyInt, nmoneyFrac];
};
