import ONE from "../const/primitive/ONE.mjs"
const LeadingSpecialOneToOne = (money) => money.replace(/^เอ็ด(?=(ล้าน)+)/, ONE);
export default LeadingSpecialOneToOne