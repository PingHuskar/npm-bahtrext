import { THAI2ARABICNumerals } from "../const";
import { BulkReplace } from "../snippet";

export default (flexmoney) => {
  return THAI2ARABICNumerals.reduce(
    (acc, { th, a }) => BulkReplace(acc, a, new RegExp(th, `g`)),
    flexmoney
  );
};
