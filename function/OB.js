const ABT = require(`./ABT`)
module.exports = OB = (money) => {
  return {
    val: money,
    typ: typeof money,
    err: typeof ABT(money) === "undefined",
    txt: ABT(money),
  };
};