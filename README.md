# hello-ts

TypeScript で書いたモジュールを npmjs で公開する練習。

TypeScript から

- Node.js の CommonJS
- Node.js の ECMAScript (ES Module)
- ブラウザ
- TypeScript

用のコードが生成されるはず。

## 使い方

```bash
npm i @heiwa4126/hello-ts
```

して、TypesScript または ESM:

```typescript
import { hello } from "@heiwa4126/hello-ts";
console.log(hello());
```

または CommonJS:

```javascript
const { hello } = require("@heiwa4126/hello");
console.log(hello());
```

## 1 から作った手順メモ

```bash
mkdir hello-ts
cd hello-ts
npm init
npm i -D typescript jest @types/jest
tsc --init
## package.json を修正
## tsconfig.json を修正
## jest.config.js を作って修正
curl https://www.toptal.com/developers/gitignore/api/node,vim,emacs,visualstudiocode -LO .gitignore
mkdir src test examples
## src/hello.ts 書く
## examples/hello.ts 書く
## test/hello.test.ts 書く
npm run build  # distの下に上3つのファイルがコンパイルされる
npm run test   # jestでテスト実行
npm run example:hello  # サンプルコード実行
```

(このへんまでを作ってくれるテンプレートがほしい)

ここまででモジュール出来上がり。GitHub などに上げておく

```bash
git init
git commit -am 'initial'
git push
git tag v1.0.0  # package.jsonのバージョンと合わせる
git push --tags
```

npmjs に上げる。

```bash
npm login   # 最初の1回だけ。
npm publish --access=public  # オプションが要るのは最初の1回だけ
```

あとは

```bash
npm run watch
```

で `tsc -w` を起動して、ソースを書き換えていく。

## メモ

### 元の TypeScript で import を使っている場合

ECMAScript 向けに tsc でトランスパイルした場合、import で拡張子がつかないので、".mjs" を付加する必要がある。

## 参考

- [デュアルパッケージ開発者のための tsconfig \(Dual Package\) \| TypeScript 入門『サバイバル TypeScript』](https://typescriptbook.jp/reference/advanced-topics/tsconfig-for-dual-package-developers)
