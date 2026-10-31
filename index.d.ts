export type Rounding = "c" | "f" | "";

export interface ConversionConfig {
  ed?: boolean;
  OL?: boolean;
  rounding?: Rounding;
}

export declare const VERSION: string;
export declare const THAI2ARABICNumerals: Array<{ th: string; a: string }>;
export declare const large_numbers: { name: string; powof10: number }[];

export declare function MoneyLaundering(num: string): string;
export declare function removeLeadingZeros(num: string): string;
export declare function IsMoneyValidate(
  num: string | number,
  rounding?: Rounding
): boolean;
export declare function PrintBaht(num: string, ed?: boolean): string;
export declare function PrintSatangs(
  num: string | number,
  rounding?: Rounding
): { word: string | undefined; carry: "0" | "1" };
export declare function PrintDotMRR(num: string): string;
export declare function BahtText(
  num: string,
  ed?: boolean,
  rounding?: Rounding,
  currencyformat?: Intl.NumberFormat,
  ClErr?: (money?: unknown) => unknown,
  arrow?: string
): string;
export declare function BT(
  num: string,
  ed?: boolean,
  OL?: boolean,
  rounding?: Rounding
): string | undefined;
export declare function B2(num: string, config?: ConversionConfig): string;
export declare function BulkBahtText(
  text: string,
  options?: { pat?: RegExp; ed?: boolean }
): string;
export declare function NumText(num: string): string;
export declare function SatangNum(text: string): string | undefined;
export declare function TB<E = unknown>(text: string, error?: E): string | E;
export declare function IsValidTB(text: string): boolean;
export declare function BF(
  num: string,
  options?: { ed?: boolean; OL?: boolean }
): string | undefined;
export declare function ABT(
  num: string | number | bigint,
  config?: { ed?: boolean; allowNeg?: boolean }
): string | undefined;
export declare function LNBT(
  nameOrPower: string | number,
  multiplier?: number
): string | undefined;
export declare function LeadingSpecialOneToOne(num: string): string;
export declare function OB(money: unknown): {
  val: unknown;
  typ: string;
  err: boolean;
  txt: string | undefined;
};
export declare function IsValidText(text: string): boolean;
export declare function ISINFSTR(value: unknown): boolean;
export declare function repeat(str: string, counts: number[]): string;
export declare function SEP(
  num: string | number | bigint,
  separator?: string
): string;
export declare function NEG(num: string, ed?: boolean): string;
export declare function MillionScaleText(
  num: string | number,
  config?: ConversionConfig
): string | undefined;
export declare function CompactScaleText(
  num: string | number,
  config?: ConversionConfig
): string | undefined;

export declare function SortNumText(
  arr: string[],
  options?: { desc?: boolean; removeInvalid?: boolean }
): string[];

declare class BR {
  constructor(num?: string | number | bigint);

  set(num: string | number): this;
  toggleed(): this;
  sum(num: string | number): this;
  minus(num: string | number): this;
  pow(num: string | number): this;

  get version(): string;
  get log(): Array<string | number | bigint | undefined>;
  get auto(): string | undefined;
  get text(): string;
  get num(): unknown;
  get flex(): string | undefined;
  get neg(): string;
  get sep(): string;
  get bahttext(): string;
  get bathtext(): `You spelled it wrong.`;
  get clean(): string;
  get currency(): string;
  get printBaht(): string;
  get printMRR(): string;
  get printSatang(): string;
  get printBath(): `You spelled it wrong.`;
  get trim(): string;
  get isValid(): boolean;
  get isInfinity(): boolean;
}

export default BR;
