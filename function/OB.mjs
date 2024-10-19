import ABT from "./ABT.mjs";
const OB = (money) => {
  return {
    val: money,
    typ: typeof money,
    err: typeof ABT(money) === "undefined",
    txt: ABT(money),
  };
};
export default OB;