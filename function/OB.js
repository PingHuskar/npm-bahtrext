import ABT from "./ABT";

export default (money) => {
  return {
    val: money,
    typ: typeof money,
    err: typeof ABT(money) === "undefined",
    txt: ABT(money),
  };
};
