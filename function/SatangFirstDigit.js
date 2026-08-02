import { TEN, SPECIALTWO, THAINUMBERWORDS } from "../const";

export default (digit) => {
  switch (digit) {
    case "0":
      return "";
    case "1":
      return `${TEN}`;
    case "2":
      return `${SPECIALTWO}${TEN}`;
    default:
      return `${THAINUMBERWORDS[parseInt(digit)]}${TEN}`;
  }
};
