import { removeLeadingZeros, BulkReplace } from "../snippet";

const MoneyLaundering = (input) =>
  removeLeadingZeros(BulkReplace(input, "", /[,\s_]/g));

export default MoneyLaundering;
