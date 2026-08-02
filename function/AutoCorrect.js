import TB from "./TB";
import IsValidText from "./IsValidText";
import {
    BAHT,
    FULLBAHT,
    SATANG,
    THAINUMBERWORDS,
    REVERSETHAIDIGITWORDS,
    SPECIALONE,
    SPECIALTWO,
    negative,
} from "../const";

const TOKENS = [
    ...new Set([
        ...THAINUMBERWORDS.filter(Boolean),
        SPECIALONE,
        SPECIALTWO,
        ...REVERSETHAIDIGITWORDS.filter(Boolean),
        BAHT,
        SATANG,
        FULLBAHT,
        negative,
    ]),
];

const MAX_TOKEN_LENGTH = TOKENS.reduce((max, token) => Math.max(max, token.length), 0);

const levenshteinDistance = (a, b) => {
    const rows = a.length + 1;
    const cols = b.length + 1;
    const dp = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i += 1) dp[i][0] = i;
    for (let j = 0; j < cols; j += 1) dp[0][j] = j;

    for (let i = 1; i < rows; i += 1) {
        for (let j = 1; j < cols; j += 1) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost,
            );
        }
    }

    return dp[rows - 1][cols - 1];
};

const normalizeInput = (text) =>
    text
        .trim()
        .replace(/\s+/g, "")
        .replace(/[.,_\-]/g, "");

const getBestTokenMatch = (fragment) => {
    let bestToken = "";
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const token of TOKENS) {
        const distance = levenshteinDistance(fragment, token);
        if (
            distance < bestDistance ||
            (distance === bestDistance && token.length > bestToken.length)
        ) {
            bestDistance = distance;
            bestToken = token;
        }
    }

    const threshold = Math.max(1, Math.floor(bestToken.length * 0.5));
    if (bestDistance > threshold) {
        return null;
    }

    return { token: bestToken, distance: bestDistance };
};

const segmentWithDP = (text) => {
    const n = text.length;
    const dp = Array.from({ length: n + 1 }, () => null);
    dp[0] = { cost: 0, corrected: "" };

    for (let i = 0; i < n; i += 1) {
        if (!dp[i]) continue;

        const skipCost = dp[i].cost + 2;
        if (!dp[i + 1] || skipCost < dp[i + 1].cost) {
            dp[i + 1] = { cost: skipCost, corrected: dp[i].corrected };
        }

        const maxLen = Math.min(n - i, MAX_TOKEN_LENGTH + 2);
        for (let len = 1; len <= maxLen; len += 1) {
            const fragment = text.slice(i, i + len);
            const match = getBestTokenMatch(fragment);
            if (!match) continue;

            const nextCost = dp[i].cost + match.distance + 0.1;
            const nextIndex = i + len;
            const nextCorrected = `${dp[i].corrected}${match.token}`;

            if (!dp[nextIndex] || nextCost < dp[nextIndex].cost) {
                dp[nextIndex] = { cost: nextCost, corrected: nextCorrected };
            }
        }
    }

    return (dp[n] && dp[n].corrected) || "";
};

const normalizeCorrectedText = (text) => {
    let corrected = text
        .replace(/(บาท)+/g, BAHT)
        .replace(/(สตางค์)+/g, SATANG)
        .replace(/(ถ้วน)+/g, FULLBAHT)
        // Canonical Thai forms used by existing TB parser
        .replace(/สองสิบ/g, "ยี่สิบ")
        .replace(/สิบหนึ่ง/g, "สิบเอ็ด")
        .replace(/ยี่สิบหนึ่ง/g, "ยี่สิบเอ็ด");

    if (corrected.endsWith(BAHT)) {
        corrected = `${corrected}${FULLBAHT}`;
    }

    if (!corrected.endsWith(SATANG) && !corrected.endsWith(FULLBAHT)) {
        if (corrected.includes(BAHT)) {
            corrected = `${corrected}${FULLBAHT}`;
        }
    }

    return corrected;
};

const toMoneyTextForConversion = (text) => {
    if (!text) return text;
    if (text.includes(BAHT)) return text;
    if (IsValidText(text)) return `${text}${BAHT}${FULLBAHT}`;
    return text;
};

export default (input = "") => {
    const source = typeof input === "string" ? input : String(input ?? "");
    const normalized = normalizeInput(source);

    if (!normalized) {
        return {
            input: source,
            autocorrecttext: "",
            autocorrectnumber: "",
        };
    }

    const segmented = segmentWithDP(normalized);
    const autocorrecttext = normalizeCorrectedText(segmented);
    const converted = TB(toMoneyTextForConversion(autocorrecttext));

    return {
        input: source,
        autocorrecttext,
        autocorrectnumber: typeof converted === "string" ? converted : "",
    };
};
