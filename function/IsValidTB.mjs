import BT from "./BT.mjs";
import TB from "./TB.mjs";
import FULLBAHT from "../const/primitive/FULLBAHT.mjs";

const IsValidTB = (str) => {
  try {
    if (!str) return undefined
    if (typeof str !== `string`) return false
    const BTTB = BT(TB(str)).replace(/\s/g, "");
    return str === BTTB.replace(FULLBAHT, "");
  }
  catch {
    return false
  }
}

export default IsValidTB;