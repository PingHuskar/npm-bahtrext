import removeLeadingZeros from "../snippet/removeLeadingZeros.mjs";

const MoneyLaundering = (money) => {
  const removeComma = money.replace(/,/g, "");
  const removeCommaAndUnderScore = removeComma.replace(/_/g, "");
  const removeCommaAndUnderScoreAndLeadingZeros = removeLeadingZeros(
    removeCommaAndUnderScore
  );
  return removeCommaAndUnderScoreAndLeadingZeros;
};
export default MoneyLaundering;