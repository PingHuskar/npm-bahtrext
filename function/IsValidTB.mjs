import BT from "./BT.mjs";
import TB from "./TB.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";

const IsValidTB = (str) => {
  const BTTB = BT(TB(str)).replace(/\s/g, "");
  return str === BTTB.replace(FULLBAHT, "");
};

export default IsValidTB;