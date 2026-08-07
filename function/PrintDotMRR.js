import { THAINUMBERWORDS, DOT } from "../const";
import TBF from "./TBF";

const PrintDotMRR = (input) => {
  let result = DOT;
  let mrr = input.substring(0, 4).replace(/0*$/, "");
  if (!mrr) return "";

  mrr = TBF(mrr);
  if (!/^\d{0,4}$/.test(mrr)) return "";

  for (const digit of mrr) {
    result += THAINUMBERWORDS[Number(digit)];
  }
  return result;
};

export default PrintDotMRR;
