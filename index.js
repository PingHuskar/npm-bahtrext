import { tryCatch } from "try-catch";
import {
  VERSION,
  THAI2ARABICNumerals,
  large_numbers,
  BAHT,
  THB,
} from "./const";
import { ed } from "./const/defaultConfig";
import {
  MoneyLaundering,
  IsMoneyValidate,
  PrintBaht,
  PrintSatangs,
  BahtText,
  BT,
  B2,
  BF,
  BulkBahtText,
  NumText,
  SatangNum,
  IsValidText,
  TB,
  IsValidTB,
  NEG,
  ABT,
  LNBT,
  OB,
  SEP,
  ISINFSTR,
  LeadingSpecialOneToOne,
  PrintDotMRR,
  MillionScaleText,
  CompactScaleText,
} from "./function";

import { removeLeadingZeros, repeat } from "./snippet";

import { sum, minus, pow } from "operation-strint";

class BR {
  #num;
  #ed;
  #version;
  #log;
  constructor(num) {
    this.#num = num || "";
    this.#ed = ed;
    this.#version = VERSION;
    this.#log = [num];
  }

  set(num) {
    this.#version = VERSION;
    if (typeof num === "object") {
      console.error("Invalid type");
      return this;
    }
    try {
      this.#num = IsMoneyValidate(num) ? num : TB(num);
      this.#log.push(num);
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  toggleed() {
    this.#ed = !this.#ed;
    return this;
  }

  sum(num) {
    this.#num = sum(`${this.#num}`, `${num}`);
    return this;
  }
  minus(num) {
    this.#num = minus(`${this.#num}`, `${num}`);
    return this;
  }
  pow(num) {
    this.#num = pow(`${this.#num}`, `${num}`);
    return this;
  }

  get version() {
    return this.#version;
  }

  get log() {
    return this.#log;
  }

  get auto() {
    return ABT(this.#num, this.#ed);
  }
  get text() {
    const result = B2(this.#num, this.#ed);
    return typeof result === "string" ? result : "";
  }
  get num() {
    return TB(this.auto);
  }
  get flex() {
    return BF(this.#num);
  }
  get neg() {
    return NEG(this.#num);
  }
  get sep() {
    return SEP(this.#num);
  }
  get bahttext() {
    const result = BahtText(this.#num);
    return typeof result === "string" ? result : "";
  }
  get bathtext() {
    return `You spelled it wrong.`;
  }
  get clean() {
    return MoneyLaundering(this.#num);
  }
  get currency() {
    return THB.format(this.clean);
  }

  get printBaht() {
    const [, result] = tryCatch(() => this.auto.replace(/บาท.+/g, BAHT));
    return result || "";
  }
  get printMRR() {
    const [, result] = tryCatch(() => this.auto.replace(/บาท.+/g, BAHT));
    return result || "";
  }

  get printSatang() {
    const [, result] = tryCatch(() => this.auto.replace(/.+?บาท/g, ``));
    return result || "";
  }

  get printBath() {
    return `You spelled it wrong.`;
  }

  get trim() {
    return removeLeadingZeros(this.#num);
  }
  get isValid() {
    return IsMoneyValidate(this.#num);
  }

  get isInfinity() {
    return ISINFSTR(this.#num);
  }
}

export default BR;
export {
  MoneyLaundering,
  removeLeadingZeros,
  IsMoneyValidate,
  PrintBaht,
  PrintSatangs,
  BahtText,
  BT,
  B2,
  BulkBahtText,
  NumText,
  SatangNum,
  TB,
  IsValidTB,
  THAI2ARABICNumerals,
  BF,
  ABT,
  large_numbers,
  LNBT,
  LeadingSpecialOneToOne,
  OB,
  IsValidText,
  repeat,
  SEP,
  NEG,
  ISINFSTR,
  VERSION,
  PrintDotMRR,
  MillionScaleText,
  CompactScaleText,
};
