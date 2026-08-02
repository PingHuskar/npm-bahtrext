import { MILLION } from "../const";
import splitIntFrac from "../snippet/splitIntFrac";
import BT from "./BTv2";
import IsMoneyValidate from "./IsMoneyValidate";
import MoneyLaundering from "./MoneyLaundering";

export default (money, config) => {
    const cleanedMoney = MoneyLaundering(`${money ?? ""}`);
    if (!IsMoneyValidate(cleanedMoney) || cleanedMoney === ".") return undefined;

    const [, moneyInt] = splitIntFrac(cleanedMoney);
    const normalizedInt = moneyInt.replace(/^0+/, "") || "0";
    const millionScale = Math.floor((normalizedInt.length - 1) / 6);

    if (millionScale <= 0) {
        const baseText = BT(normalizedInt, config);
        return baseText ? baseText.replace(/บาท.+$/g, "") : undefined;
    }

    const headLength = normalizedInt.length - millionScale * 6;
    const headNumber = normalizedInt.slice(0, headLength);
    const headText = BT(headNumber, config);
    if (!headText) return undefined;

    return `${headText.replace(/บาท.+$/g, "")}${MILLION.repeat(millionScale)}`;
};