import { MILLION } from "../const";
import splitIntFrac from "../snippet/splitIntFrac";
import BT from "./BTv2";
import IsMoneyValidate from "./IsMoneyValidate";
import MoneyLaundering from "./MoneyLaundering";

export default function CompactScaleText(value, config) {
    const cleaned = MoneyLaundering(`${value ?? ""}`);
    if (!IsMoneyValidate(cleaned) || cleaned === ".") return undefined;

    const [, integerPart] = splitIntFrac(cleaned);
    const digits = integerPart.replace(/^0+/, "") || "0";
    const prefix = cleaned.startsWith("-") && digits !== "0" ? "ลบ" : "";

    if (digits.length <= 6) {
        const text = BT(digits, config);
        return text ? `${prefix}${text.replace(/บาท.+$/g, "")}` : undefined;
    }

    const significant = digits.replace(/^0+/, "") || "0";
    const head = significant.slice(0, 5).padEnd(5, "0");
    const mantissa = Number.parseFloat(`${head[0]}.${head.slice(1)}`);
    const mantissaText = mantissa.toFixed(3);
    const scaleCount = Math.max(1, Math.ceil((significant.length - 1) / 6));

    return `${prefix}${mantissaText} ตามด้วยคำว่า "${MILLION}" ${scaleCount} ครั้ง`;
}
