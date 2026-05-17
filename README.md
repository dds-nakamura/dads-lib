# dads-lib

**デジタル庁デザインシステム (DADS) Vue 3 コンポーネントライブラリ** の monorepo。

DADS の公式参照資産（仕様 MD / HTML サンプル / design-tokens / tailwind-theme-plugin）と、それを Vue 3 SFC として実装した `@dads/vue` パッケージを 1 つのリポジトリで管理する。

> Status: **DADS 公式 46 件完全カバー + 独自 6 件 = 計 52 コンポーネント** — Spec 1〜3 (Form-Inputs / Navigation-Menus / Display-Misc) + Figma 準拠化 + 命名整合 + 全件ギャップ解消 (High 9 / Medium 17 / Low 13) 完了 (〜2026-05-17) / **2098 テスト pass (52 ファイル)** / VitePress カタログに 52 件すべてのフルデモ掲載

公式: <https://design.digital.go.jp/dads/>

---

## パッケージ一覧

| パッケージ                                            | 役割                                                                                                                                   | 公開    |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| [`@dads/vue`](./packages/vue)                         | 52 個の Vue 3 コンポーネント実装 (公式 46 + 独自 6: Chip alias / CheckboxGroup / RadioGroup / ColorPicker / TableOfContents / Tooltip) | private |
| [`@dads/tokens`](./packages/tokens)                   | `@digital-go-jp/design-tokens` の再 export                                                                                             | private |
| [`@dads/tailwind-plugin`](./packages/tailwind-plugin) | Tailwind v3 用プラグインラッパ                                                                                                         | private |
| [`@dads/docs`](./apps/docs)                           | VitePress カタログ (デモ + API doc)                                                                                                    | private |

`private: true` でロックされており、npm 公開は無効化されている。初期リリースは workspace 内利用と `file:` / GitHub Packages 経由を想定。

---

## クイックスタート

### 必要バージョン

- Node.js **24** (`.nvmrc` で固定)
- pnpm **11** (`packageManager` フィールドで固定)

### セットアップ

```bash
pnpm install
```

### 一括スクリプト (ルートから)

| コマンド            | 内容                                                     |
| ------------------- | -------------------------------------------------------- |
| `pnpm build`        | `pnpm -r run build` — 全パッケージビルド                 |
| `pnpm test`         | `@dads/vue` の Vitest を実行 (52 ファイル / 2098 テスト) |
| `pnpm typecheck`    | 全パッケージで `tsc --noEmit` / `vue-tsc --noEmit`       |
| `pnpm lint`         | `eslint .` (ESLint 9 flat config / L3 strictness)        |
| `pnpm format`       | `prettier --write .`                                     |
| `pnpm format:check` | `prettier --check .`                                     |
| `pnpm changeset`    | リリース用の changeset を対話的に追加                    |

### ワークスペース個別実行

```bash
pnpm --filter @dads/vue test          # vue 単体テスト
pnpm --filter @dads/vue build         # library mode build (dist/{index.js,index.css,index.d.ts})
pnpm --filter @dads/docs dev          # VitePress dev server
pnpm --filter @dads/docs build        # VitePress static build
```

---

## 利用例 (アプリ側)

```ts
// main.ts
import { createApp } from 'vue'
import '@dads/tokens/css' // CSS 変数を :root に注入
import '@dads/vue/styles' // 52 コンポーネントの CSS
import App from './App.vue'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
// 命名整合 (2026-05-17 spec): DadsTextField → DadsInputText、
// DadsModal → DadsDialog、DadsHeader → DadsHeaderContainer は公式 slug
// に合わせて改名。旧名は @deprecated alias として一定期間併存します。
import { DadsButton, DadsInputText, DadsDialog } from '@dads/vue'
import { ref } from 'vue'

const open = ref(false)
const name = ref('')
</script>

<template>
  <DadsInputText v-model="name" label="名前" required />
  <DadsButton @click="open = true">送信</DadsButton>
  <DadsDialog v-model="open" title="確認">送信してよろしいですか？</DadsDialog>
</template>
```

詳細は [`packages/vue/README.md`](./packages/vue/README.md) と [VitePress カタログ](./apps/docs) を参照。

---

## リポジトリ構成

```
dads-lib/
├── packages/
│   ├── vue/                                ★ Vue 3 コンポーネント本体
│   ├── tokens/                             デザイントークン (@digital-go-jp/design-tokens ラッパ)
│   └── tailwind-plugin/                    Tailwind v3 プラグインラッパ
├── apps/
│   └── docs/                               VitePress カタログ
│
├── dads-document-md/                       ★ 公式仕様 (MD / Claude が第一参照)
├── dads-document-html/                     公式仕様 (HTML / ビジュアル確認用)
├── dads-document-figma/                    Figma PNG スナップショット (gitignore / 各環境で生成)
├── design-system-example-components-html/  公式実装サンプル (vendor)
├── design-tokens/                          公式 design-tokens 上流 (vendor)
├── tailwind-theme-plugin/                  公式 tailwind プラグイン上流 (vendor)
│
├── scripts/                                リポジトリ運用ユーティリティ
│   ├── figma-export.mjs                    Figma REST API 経由のエクスポート
│   ├── figma-login.mjs                     Playwright 用認証取得 (1 回だけ)
│   ├── figma-playwright-export.mjs         Playwright 経由のエクスポート (rate limit 回避)
│   └── README.md                           スクリプト詳細
│
├── .changeset/                             Changesets 設定
├── .github/workflows/ci.yml                CI (typecheck/lint/test/build)
├── .steering/2026-05-12-dads-vue-library-init/  本プロジェクトの仕様 (requirements/design/tasklist)
├── CLAUDE.md                               Claude Code 用プロジェクト指示
├── VENDORED.md                             vendor 取り込みバージョン管理
└── eslint.config.js                        ESLint 9 flat config (ルート集約)
```

`dads-document-md/` / `design-system-example-components-html/` / `design-tokens/` / `tailwind-theme-plugin/` は **公式リポジトリの vendor 取り込み**（上流の `.git/` は除外、ソース実体のみ git 管理）。詳細は [`VENDORED.md`](./VENDORED.md)。

---

## 開発フロー

1. **仕様参照**: `dads-document-md/dads/` を最優先 (HTML 版より約 40 倍コンテキスト効率)
2. **実装サンプル**: `design-system-example-components-html/` の HTML/CSS/JS を一次参照
3. **デザイントークン**: `design-tokens/` を上流ソースとし、`@dads/tokens` 経由で読む
4. **新規コード**: TDD 推奨 — `packages/vue/src/components/*/__tests__/*.test.ts` を先に書く
5. **a11y**: **全 52 コンポーネントが `vitest-axe` テスト済 (100% カバレッジ, ≈250 ケース)**。新規コンポーネント追加時はテスト末尾に `describe('a11y (vitest-axe)', ...)` ブロックを追加し、`expect(await axe(element)).toHaveNoViolations()` で主要状態を網羅する
6. **「準備中」コンポーネントの視覚仕様**: `dads-document-figma/<ページ名>/<ページ名>.png` を `Read` で参照（再取得は [`scripts/README.md`](./scripts/README.md) 参照）

詳細は [`CLAUDE.md`](./CLAUDE.md) を参照。

---

## CI

`.github/workflows/ci.yml` で `push` / `pull_request` 時に以下を実行:

- `typecheck` (4 packages)
- `lint` / `format:check`
- `test` (`@dads/vue` / 2098 tests)
- `build` (`@dads/tokens` → `@dads/vue` → `@dads/docs`)

ローカル CI 相当のフル実行: ~100 秒 (M2 Mac)。

---

## License

このリポジトリのオリジナルコード (`packages/` / `apps/`) は MIT License。
`design-tokens/` / `tailwind-theme-plugin/` / `design-system-example-components-html/` は Digital Agency の MIT License (各ディレクトリ内 LICENSE ファイル参照)。
