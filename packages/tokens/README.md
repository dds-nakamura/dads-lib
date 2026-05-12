# @dads/tokens

DADS (デジタル庁デザインシステム) のデザイントークン参照ラッパ。

公式パッケージ `@digital-go-jp/design-tokens` を内部依存とし、ローカル開発・ドキュメントサイト・利用先アプリから安定した import パスで参照できるようにする薄ラッパ。

## インストール

monorepo 内では `workspace:*` で参照する。

```jsonc
// 利用パッケージの package.json
{
  "dependencies": {
    "@dads/tokens": "workspace:*",
  },
}
```

## 使い方

### CSS 変数を読み込む

アプリの起動エントリで一度だけ import する。これにより `--color-*` `--spacing-*` `--font-*` などの CSS 変数が `:root` に注入される。

```ts
import '@dads/tokens/css'
```

簡易版 (色・フォント・エレベーションのみ) を使う場合:

```ts
import '@dads/tokens/css-simple'
```

### JS から型付きでトークン値を参照

```ts
import { Color, Spacing } from '@dads/tokens'

const primary = Color.Brand.Primary // '#0017c1' などの値
```

エクスポートされる型は上流の `@digital-go-jp/design-tokens` に準拠する。

## ビルド

```bash
pnpm --filter @dads/tokens build
```

`@digital-go-jp/design-tokens` の `dist/tokens.css` / `dist/tokens-simple.css` を本パッケージの `dist/` にコピーする (pnpm の strict isolation で `node_modules` を exports に直書きするのを避けるため)。

## 上流バージョン

現在 pin している上流バージョン: `@digital-go-jp/design-tokens@^1.1.9`

詳細はリポジトリルートの `VENDORED.md` を参照。
