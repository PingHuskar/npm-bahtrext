module.exports = padWithLeadingZeros = (num, totalLength) => {
  // https://bobbyhadz.com/blog/javascript-add-leading-zeros-to-number
  return String(num).padStart(totalLength, "0");
};
