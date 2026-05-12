# @dads/tailwind-plugin

DADS (デジタル庁デザインシステム) の Tailwind CSS プラグイン参照ラッパ。

公式パッケージ `@digital-go-jp/tailwind-theme-plugin` を内部依存とし、Tailwind v3 で利用する。

## ステータス

- **Tailwind v3**: ✅ 対応 (上流の JS プラグインをそのまま再エクスポート)
- **Tailwind v4**: ⚠️ 未対応 — 上流 npm パッケージ v0.3.4 の `dist/` に `v4.css` が含まれておらず、`exports` フィールドにも `./v4` が無いため。上流が修正するか、ローカルで `tailwind-theme-plugin/scripts/generate-v4-theme.ts` をビルドして取り込む対応が必要 (後続 Phase で検討)。

## インストール

monorepo 内では `workspace:*` で参照する。

```jsonc
{
  "dependencies": {
    "@dads/tailwind-plugin": "workspace:*",
  },
  "peerDependencies": {
    "tailwindcss": "^3.4.17",
  },
}
```

## 使い方 (Tailwind v3)

```ts
// tailwind.config.ts
import dadsPlugin from '@dads/tailwind-plugin'

export default {
  content: ['./src/**/*.{vue,ts}'],
  plugins: [dadsPlugin],
}
```

## 既知の上流問題

- v0.3.4 の `package.json#exports` に `types` condition が無いため、`moduleResolution: Bundler` 配下で d.ts を解決できない。`src/shims.d.ts` でモジュール宣言を補完している。上流が `exports['.'].types` を追加した時点で `shims.d.ts` は削除可能。

## 上流バージョン

現在 pin している上流バージョン: `@digital-go-jp/tailwind-theme-plugin@^0.3.4`

詳細はリポジトリルートの `VENDORED.md` を参照。
