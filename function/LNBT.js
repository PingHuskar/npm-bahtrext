const large_numbers = require(`../const/array/large_numbers`)
const BT = require(`./BT`)
module.exports = LNBT = (nameorpowerof10, d = `1`) => {
  const tnameorpowerof10 = typeof nameorpowerof10;
  switch (tnameorpowerof10) {
    case `string`:
      try {
        if (nameorpowerof10 == `Googolplex`) {
          return `Don't Try This`;
        }
        const v = large_numbers.find((n) => n.name === nameorpowerof10).powof10;
        if (v < 0) return undefined;
        return BT(d + repeat(`0`, [v]));
      } catch (error) {
        return undefined;
      }
    case `number`:
      if (nameorpowerof10 < 0) return undefined;
      return BT(d + `0`.repeat(nameorpowerof10));
    default:
      return undefined;
  }
};