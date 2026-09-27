# [BahtRext](https://pinghuskar.gitlab.io/npm-bahtrext/)

![Download/month](https://img.shields.io/npm/dm/bahtrext.svg)
![Total Download](https://img.shields.io/npm/dt/bahtrext.svg)
[![npm version](https://img.shields.io/npm/v/bahtrext.svg)](https://www.npmjs.com/package/bahtrext)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=bugs)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=PingHuskar_npm-bahtrext&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=PingHuskar_npm-bahtrext)

> BahtText Stringify — convert money to Thai Baht text (and back), with support for large numbers, negative numbers, and Thai number sorting.

![Alt](https://repobeats.axiom.co/api/embed/0063bf6c1488724103db9a5bbc5c818064e6bd82.svg "Repobeats analytics image")

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [OpenTelemetry](#opentelemetry)
- [Flow](#flow)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [Author](#author)
- [License](#license)

## Background

### Beliefs

1. Money in Thai Baht can be translate to word
2. Default Decimal places is 2 digits; 3+ digits are optional.
3. Support Negative Number as Other Baht JS Library
4. All Synchronous function
5. This Number System not working well with large numbers. Is there a better way to read numbers in Thai?

### Must Read

- **Checkout Test Cases in `index.test.js`**
- **`101`** ควรจะถูกอ่านอย่างไร ?
  - `หนึ่งร้อยหนึ่งบาทถ้วน`
    - [`Google Sheets`](https://sheets.google.com/)
    - `สัญญากู้เงินของธนาคาร`* ลองมากู้ได้เลยครับ ถ้าไม่ใช่บอกผมด้วย
    - [jojoee/bahttext](https://www.npmjs.com/package/bahttext)
    - จะอ่านว่า`เอ็ด`เมื่อหลักสิบมีค่า เช่น `สิบเอ็ด`, `ยี่สิบเอ็ด`
  - `หนึ่งร้อยเอ็ดบาทถ้วน`
    - [`MS Excel`](https://www.microsoft.com/th-th/microsoft-365/excel)
    - [`thai-baht-text`](https://www.npmjs.com/package/thai-baht-text)
    - [earthchie/BAHTTEXT.js](https://gitlab.com/earthchie/BAHTTEXT.js)
  - `หนึ่งร้อยหนึ่งบาทถ้วน` หรือ `หนึ่งร้อยเอ็ดบาทถ้วน` ก็ได้ ให้เข้าใจได้ตรงกัน
    - [**`BahtRext`**](https://pinghuskar.github.io/npm-bahtrext/)
      - [Active Versions](https://www.npmjs.com/package/bahtrext?activeTab=versions)
      - [GitLab Repo](https://gitlab.com/PingHuskar/npm-bahtrext)

## Install

### ES6

```sh
npm install bahtrext@2.5.6
```

### ES5

```sh
npm install bahtrext@1.7.2
```

### Browser (IIFE bundle)

Build a single browser-ready file with [esbuild](https://esbuild.github.io/):

```sh
npm run bundle
```

This runs `npx esbuild index.js --bundle --platform=browser --format=iife --global-name=BahtRext --outfile=out.js`, which:

- bundles `index.js` and all its dependencies into one file, `out.js`
- wraps it as an IIFE, so every export ends up on a global `BahtRext` object
- the default export (class `BR`) is `BahtRext.default`

`out.js` is a build artifact: it's git-ignored and not published to npm.

```html
<script src="out.js"></script>
<script>
  BahtRext.B2("101");
  // => "หนึ่งร้อยหนึ่งบาทถ้วน"

  BahtRext.SortNumText(["สอง", "หก", "หนึ่ง"]);
  // => ["หนึ่ง", "สอง", "หก"]

  new BahtRext.default("1234.5").text;
  // => "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบสตางค์"
</script>
```

## Usage

```js
import BR, { BT, TB, SortNumText } from "bahtrext";

BT("101");
// => "หนึ่งร้อยหนึ่งบาทถ้วน"

TB("สองบาทห้าสิบสตางค์");
// => "2.50"

new BR("1234.5").text;
// => "หนึ่งพันสองร้อยสามสิบสี่บาทห้าสิบสตางค์"

SortNumText(["สอง", "หก", "หนึ่ง"]);
// => ["หนึ่ง", "สอง", "หก"]
```

## API

### `SortNumText(arr, options?)`

Sorts an array of Thai number text by numeric value. Accepts plain number words (`สอง`) or Baht text (`สองบาท`, `สองบาทถ้วน`, `สองบาทห้าสิบสตางค์`). Large numbers are compared without precision loss.

| Option          | Type      | Default | Description                                                                 |
| --------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `desc`          | `boolean` | `false` | Sort from largest to smallest.                                              |
| `removeInvalid` | `boolean` | `false` | Drop invalid entries. When `false`, they are kept at the end in original order. |

```js
import { SortNumText } from "bahtrext";

SortNumText(["สอง", "หก", "หนึ่ง"], { desc: true });
// => ["หก", "สอง", "หนึ่ง"]

SortNumText(["สอง", "abc", "หก"]);
// => ["สอง", "หก", "abc"]

SortNumText(["สอง", "abc", "หก"], { removeInvalid: true });
// => ["สอง", "หก"]
```

> Only canonical text is valid — e.g. `หนึ่งร้อยหนึ่ง` is accepted, `หนึ่งร้อยเอ็ด` and `สิบห้าร้อย` are treated as invalid.

### `MillionScaleText(num, config?)`

```js
import { MillionScaleText } from "bahtrext";

// Source content example: "1 ใน 5,566,857,732,147,160,000,000"
MillionScaleText("5,566,857,732,147,160,000,000");
// => "ห้าพันห้าร้อยหกสิบหกล้านล้านล้าน"
```

### `CompactScaleText(num, config?)`

```js
import { CompactScaleText } from "bahtrext";

CompactScaleText(
  "1035531362097366437658125676806059750189964336484946134542090486895029450514590979495591124336086177139938812952029085090597851627520000000"
);
// => "1.036 ตามด้วยคำว่า \"ล้าน\" 23 ครั้ง"
```

See [`index.d.ts`](./index.d.ts) for the full list of exported functions and types.

### Test Regex

- [ValidSATANGRegex](https://regex101.com/r/yVvsFN/3)

## OpenTelemetry

This project is instrumented with OpenTelemetry. To enable tracing, you will need to configure the OTLP exporter by setting the following environment variables:

- `OTEL_EXPORTER_OTLP_ENDPOINT`
- `OTEL_EXPORTER_OTLP_HEADERS`

For more information, please refer to the OpenTelemetry documentation.

## Flow

```mermaid
flowchart TD
    A(ABT) -->|input type| B{Type}
    B --> |Number| C(iTHBText)
    B --> |String| D{Allow Negative ?}
    D --> |True| E(NEG)
    D --> |False| F(BF)
    E --> F(BF)
    F --> G(BT)
    G --> |Convert Number to Decimal| H(BahtText)
    H --> I(MoneyLaundering)
    I --> J(splitIntFrac)
    J --> |moneyFull| K[/moneyFull/]
    J --> |moneyInt| L[/moneyInt/]
    J --> |moneyFrac| M[/moneyFrac/]
    K --> |moneyFull| N{Match Zero ?}
    N --> |True| P[/Zero/]
    P --> ZZZ(return)
    M --> |moneyFrac| O(PrintSatangs)
    O --> |satang_part| R
    L --> |moneyInt| Q(PrintBaht)
    Q --> |baht_part| R(Concat)
    R --> ZZZ
```

## Contributing

Issues and merge requests are welcome on [GitLab](https://gitlab.com/PingHuskar/npm-bahtrext).

```sh
npm test        # run tests
npm run testcv  # run tests with coverage
npm run bundle  # build browser bundle (out.js)
```

### 😊 Plz Consider

- [Line Sticker](https://store.line.me/stickershop/product/28717665/en)
- [Give A Star](https://gitlab.com/PingHuskar/npm-bahtrext)
- [ProductHunt](https://www.producthunt.com/products/bahtrext)
- Write a Review
- Submit Test Case(s)
- [GitLab Sponsors](https://gitlab.com/sponsors/PingHuskar)

## Changelog

- 2.5.6 - add `SortNumText` for sorting Thai number text with `desc` and `removeInvalid` options
- 2.5.5 - update Thai numeral exports to Unicode representations, enhance internal auto-correction, and improve parameter handling and regex patterns
- 2.5.4 - add `CompactScaleText` helper for compact scale wording
- 2.5.3 - add `MillionScaleText` helper for compact ล้าน-scale wording
- 2.3.4 - Infinity
- 2.2.0 - ES6 [1.7.2]
- 1.7.1 - apply `Rest Parameters` => add function `BulkReplace`, `applyReplacements`
- 1.7.0 - add class `BR`
- 1.6.2 - [Refact.ai] model gpt-4o-mini + human refactor
- 1.6.1 - allow literal separator (,)
- 1.6.0 - add Hexadecimal
- 1.5.0 - add Binary Literal
- 1.4.3 - 1.4.4 - Refactor
- 1.4.2 - add NEG
- 1.3.3 - Update Version Thai Baht Text JS + add SEP
- 1.2.1 - GoogleSheetsCellCharactersLimit
- 1.2.0 - Dynamic `เอ็ด`
- 1.1.7 - remove `Googolplex`
- 1.1.3 - add LNBT
- 1.1.1
  - Fix TB validation
  - BF is main function
  - ABT for dynamic type
- 1.1.0 - TB Ready for Production?!
- 1.0.9 - add TB (reverse BT)
- 1.0.8 - add SatangNum
- 1.0.6 - BT is main function

## Author

[Chadin Chaipornpisuth](https://chadindev.in.th/)

## License

[MIT](https://opensource.org/licenses/MIT) © Chadin Chaipornpisuth
