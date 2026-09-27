export interface BahtTextOptions {
  ed?: boolean;
  rounding?: string;
  ClErr?: (money?: unknown) => unknown;
}

export declare const VERSION: string;
export declare const THAI2ARABICNumerals: Array<{ th: string; a: string }>;
export declare const large_numbers: { name: string; powof10: number }[];
export declare const BAHT: `บาท`;
export declare const THB: Intl.NumberFormat;

export declare function MoneyLaundering(num: string): string;
export declare function removeLeadingZeros(num: string): string;
export declare function IsMoneyValidate(num: string | number): boolean;
export declare function PrintBaht(num: string, ed?: boolean): string;
export declare function PrintSatangs(
  num: string | number,
  rounding?: "c" | "f" | ""
): { word: string | undefined; carry: "0" | "1" };
export declare function BahtText(num: string | number): string;
export declare function BahtTextv2(
  num: string | number,
  options?: BahtTextOptions
): string;
export declare function BT(
  num: string | number,
  ed?: boolean,
  OL?: boolean,
  rounding?: "c" | ""
): string | undefined;
export declare function B2(
  num: string | number,
  ed?: boolean,
  OL?: boolean,
  rounding?: "c" | ""
): string | undefined;
export declare function BulkBahtText(
  nums: Array<string | number>
): string | undefined;
export declare function NumText(num: string | number): string | undefined;
export declare function SatangNum(text: string): string | undefined;
export declare function TB(num: string | number, error?: Error): string | Error;
export declare function IsValidTB(num: string | number): boolean;
export declare function BF(num: string): string | undefined;
export declare function ABT(
  num: string | number,
  config: { ed?: boolean; neg?: boolean }
): string | undefined;
export declare function LNBT(num: string | number): string | undefined;
export declare function LeadingSpecialOneToOne(num: string): string;
export declare function OB(money: number | string): {
  val: number | string;
  typ: string;
  err: boolean;
  txt: string | undefined;
};
export declare function IsValidText(text: string): boolean;
export declare function repeat(str: string, times: number): string;
export declare function SEP(num: string | number, sep?: string): string;
export declare function NEG(
  num: string,
  options: { ed?: boolean; neg?: boolean }
): string | undefined;
export declare function MillionScaleText(
  num: string | number,
  config?: { ed?: boolean; OL?: boolean; rounding?: "c" | "f" | "" }
): string | undefined;
export declare function CompactScaleText(
  num: string | number,
  config?: { ed?: boolean; OL?: boolean; rounding?: "c" | "f" | "" }
): string | undefined;

export declare function SortNumText(
  arr: string[],
  options?: { desc?: boolean; removeInvalid?: boolean }
): string[];

export declare class BR {
  constructor(num: string | number);

  set(num: string | number): void;
  toggleed(): void;
  sum(num: string): string;
  minus(num: string): string;
  pow(num: string): string;

  get version(): string;
  get log(): Array<string | number>;
  get auto(): string | undefined;
  get text(): string | undefined;
  get b(): string | undefined;
  get num(): string | undefined;
  get flex(): string | undefined;
  get neg(): string | undefined;
  get bahttext(): string;
  get bathtext(): `You spelled it wrong.`;
  get clean(): string;
  get currency(): string;
  get printBaht(): string;
  get printSatang(): string;
  get printBath(): `You spelled it wrong.`;
  get trim(): string;
  get isValid(): boolean;
}

export default BR;
