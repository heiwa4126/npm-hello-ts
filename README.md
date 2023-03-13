# hello-ts

TypeScript で書いたモジュールを npmjs で公開する練習。

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
