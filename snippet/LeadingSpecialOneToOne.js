const ONE = require(`../const/primitive/ONE`)
module.exports = LeadingSpecialOneToOne = (money) => money.replace(/^เอ็ด(?=(ล้าน)+)/, ONE);