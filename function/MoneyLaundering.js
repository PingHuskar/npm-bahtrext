const removeLeadingingZeros = require(`../snippet/removeLeadingingZeros`)
module.exports = MoneyLaundering = (money) => {
  const removeComma = money.replace(/,/g, "");
  const removeCommaAndUnderScore = removeComma.replace(/_/g, "");
  const removeCommaAndUnderScoreAndLeadingingZeros = removeLeadingingZeros(
    removeCommaAndUnderScore
  );
  return removeCommaAndUnderScoreAndLeadingingZeros;
};