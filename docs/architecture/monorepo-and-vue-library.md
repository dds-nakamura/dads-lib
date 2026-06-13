# Monorepo & @dads/vue ライブラリ設計

## 概要 / 目的

`dads-lib` は、デジタル庁デザインシステム（DADS）の参照資産（仕様 MD / HTML サンプル / design-tokens / tailwind-theme-plugin）を集約した読み取り専用の引き出しとして始まった。本ドキュメントは、これを **pnpm workspaces monorepo に昇格させ、26 個の DADS 準拠 Vue 3 コンポーネントを `@dads/vue` パッケージとして再配布可能な形に整える** ための設計をまとめる。

### ゴール

- `dads-lib` を pnpm workspaces monorepo として運用
- 既存の `design-tokens/` と `tailwind-theme-plugin/`（公式リポジトリのクローン）を薄くラップした `@dads/tokens` / `@dads/tailwind-plugin` を提供
- 新規 `@dads/vue` パッケージで 26 コンポーネント（Vue ファイル 27 個）を配布
- VitePress カタログを `apps/docs/` に置く
- 初期リリースでは npm 公開しない（`private: true` で組織内利用先行）

### 移植元

`web-label-print/frontend/src/components/dads/` 配下の Vue 3 コンポーネント群（Vuetify-free / Vue 3 のみ依存 / WCAG 2.1 AA 準拠 / ja-en 二言語対応 / レスポンシブ検証済み）を **挙動を変えずに** dads-lib に移送する。

### スコープ外（後回し）

- npm publish
- `web-label-print` 側の置き換え
- Playwright + axe による a11y E2E
- Visual regression（Chromatic / Loki 等）
- 公式 DADS パッケージへの貢献（fork / PR 送出）

---

## アーキテクチャ

### パッケージ構成

```
dads-lib/
├── .changeset/                       # Changesets 設定
├── .github/workflows/ci.yml          # typecheck / lint / test / build / a11y
├── .nvmrc                            # 24
├── eslint.config.js                  # ルート ESLint flat config（全パッケージ共有）
├── package.json                      # private:true, recursive scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json                # 全 TS 設定の共通親
├── tsconfig.json                     # solution-style references
│
├── packages/
│   ├── tokens/                       # @dads/tokens
│   ├── tailwind-plugin/              # @dads/tailwind-plugin
│   └── vue/                          # @dads/vue（本丸）
│       ├── src/
│       │   ├── index.ts              # 公開エントリ
│       │   ├── types/common.ts       # 共有型
│       │   ├── styles/               # _base.scss / _focus-ring.scss / index.scss
│       │   └── components/           # 26 フォルダ / 27 .vue
│       │       └── Button/
│       │           ├── DadsButton.vue
│       │           ├── DadsButton.types.ts
│       │           ├── __tests__/
│       │           └── index.ts
│       └── test/setup.ts             # vitest-axe matcher 登録
│
├── apps/
│   └── docs/                         # @dads/docs（VitePress カタログ / private）
│
├── dads-document-md/                 # 既存・変更なし（仕様参照の第一候補）
├── dads-document-html/               # 既存・変更なし
├── design-system-example-components-html/  # vendor
├── design-tokens/                    # vendor（読み物として保持）
└── tailwind-theme-plugin/            # vendor（読み物として保持）
```

### 依存関係

```
apps/docs (@dads/docs)
    │ workspace:*
    ▼
@dads/vue ◀────── peer:vue@^3.4 ────── 利用側アプリ
    │ (optional dep)
    ▼
@dads/tokens ──→ @digital-go-jp/design-tokens@^2.0.1

@dads/tailwind-plugin ──→ @digital-go-jp/tailwind-theme-plugin@^1.0.0
                          peer: tailwindcss ^3 || ^4
```

### 原則

1. `@dads/vue` から `@dads/tokens` への **直接依存は持たせない**。実装は CSS 変数フォールバック前提で疎結合に保ち、利用側で両方インストールする。
2. `@dads/tailwind-plugin` は `@dads/vue` と独立。Tailwind 系プロジェクトのみが利用する。
3. `apps/docs` のみ `workspace:*` で `@dads/vue` を参照する。

---

## 技術選定

### ランタイム / ツール

- **Node**: 24（`.nvmrc` / `engines` で固定）
- **パッケージマネージャ**: pnpm 11（`packageManager` フィールドで固定）
- **TypeScript**: 5.x / `moduleResolution: "Bundler"` / `strict: true`
- **ビルド**: Vite 7 library mode（ESM のみ） + `vue-tsc --emitDeclarationOnly`
- **SFC コンパイラ**: `@vitejs/plugin-vue` 6
- **CSS プリプロセッサ**: `sass`（`sass-embedded` は vitest 並列実行で `[sass] Tried writing to closed dispatcher` が発生するため不採用）
- **テスト**: Vitest 3 + `@vue/test-utils` 2 + **happy-dom**（jsdom 26 は `getComputedStyle().lineHeight` の挙動差により Textarea auto-resize テストが落ちる）
- **a11y**: `vitest-axe`（jsdom 互換 / happy-dom でも動作）
- **Lint**: ESLint 9 flat config + `@vue/eslint-config-typescript` + `eslint-plugin-vue`
- **Format**: Prettier（デフォルト + Vue / SCSS）。BiomeJS は Vue SFC 対応が未成熟なため不採用
- **リリース管理**: Changesets
- **CI**: GitHub Actions（matrix 化なし / 単一ジョブ）

### カタログツール

- **VitePress 1.x** を採用。SFC を扱える / 軽量 / DADS の用途に十分。Storybook 9 は a11y addon が魅力的だが stable 度と保守コストで VitePress を優先。

---

## 公開 API 設計

### `@dads/vue` の `package.json#exports`

```jsonc
{
  "type": "module",
  "sideEffects": ["**/*.css", "**/*.scss"],
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
    },
    "./styles": "./dist/index.css",
    "./styles/scss": "./src/styles/index.scss",
    "./styles/scss/*": "./src/styles/*.scss",
  },
  "files": ["dist", "src/styles"],
  "peerDependencies": { "vue": "^3.4.0" },
}
```

### export 規約

`src/index.ts` は以下を named export で提供する。

- コンポーネント: `DadsButton`, `DadsInputText`, ... （49 種類）
- 型: `DadsButtonProps`, `DadsButtonEmits`, ... （各コンポーネント対応）
- プリミティブ型: `DadsSize`, `DadsSemanticColor`

### 利用側コード（最短手順）

```ts
// main.ts
import '@dads/tokens/css' // CSS 変数を :root に注入
import '@dads/vue/styles' // 全コンポーネントの CSS
```

```vue
<script setup lang="ts">
import { DadsButton, DadsInputText } from '@dads/vue'
</script>
```

### `@dads/tokens` の export

```jsonc
{
  "exports": {
    ".": "./src/index.ts",
    "./css": "./dist/tokens.css",
    "./css-simple": "./dist/tokens-simple.css",
    "./tokens.json": "./dist/tokens.json",
  },
  "dependencies": { "@digital-go-jp/design-tokens": "^2.0.1" },
}
```

`scripts/copy-css.mjs` で `node_modules/@digital-go-jp/design-tokens/dist/*.css` をローカル `dist/` にコピーする（pnpm hoisting で `exports` から `node_modules` パスを直接晒すと壊れるため）。

### `@dads/tailwind-plugin` の export

```jsonc
{
  "exports": {
    ".": {
      "require": "./dist/index.cjs.js",
      "import": "./dist/index.es.js",
      "types": "./dist/index.d.ts",
    },
  },
  "peerDependencies": { "tailwindcss": "^3.4.17 || ^4.0.0" },
  "dependencies": { "@digital-go-jp/tailwind-theme-plugin": "^1.0.0" },
}
```

`./v4` エクスポートは現状 **撤回のまま**（v0.3.4 時点で `dist/v4.css` 不在のため一旦撤回した経緯）。ただし上流 **v1.0.0 で Tailwind CSS v4 サポートが追加**された（DADS v2.14.0 追随で bump 済み）ため、`./v4` 再導入は再評価可能（本ラッパは現状 v3 構成のまま据え置き。対応は後段で判断）。

`src/shims.d.ts` で上流の不完全な `types` condition を補完する。

---

## ビルド & リリースフロー

### `@dads/vue` Vite library mode 設定

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        assetFileNames: (info) =>
          info.name === 'style.css' ? 'styles/index.css' : 'assets/[name][extname]',
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
})
```

### ポイント

- **ESM のみ**（Vue 3 系は ESM 前提 / CJS は出さない）
- **`external: ['vue']`** で peer vue をバンドル除外
- **`cssCodeSplit: false`** で全 SCSS を `dist/index.css` に集約 → `import '@dads/vue/styles'` で一括読み込み
- **未コンパイル SCSS も同梱**（`files: ["src/styles"]` + `exports['./styles/scss']`）で利用側の変数オーバーライド余地を残す
- 出力拡張子は **`.js`**（Vite library mode のデフォルト + `type: module` で ESM 解釈）

### 型生成

`vue-tsc -p tsconfig.build.json --emitDeclarationOnly` で `dist/index.d.ts` と `dist/components/**/*.d.ts` を生成。`tsconfig.build.json` は `__tests__` を exclude する。

### SCSS 解決

- 共有 partial（`_base.scss` / `_focus-ring.scss`）は `src/styles/` に置く
- コンポーネント側からは `@use '../../styles/base'` の相対パスで参照
- `@vitejs/plugin-vue` + `sass` の組合せで SFC `<style lang="scss">` 内の相対 import はそのまま解決される

### リリース管理（Changesets）

```jsonc
// .changeset/config.json
{
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [["@dads/*"]],
  "access": "restricted",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["@dads/docs"],
}
```

- `linked: @dads/*` で 3 パッケージのバージョンを揃える
- `access: restricted` + 各パッケージ `private: true` の二重ガードで npm 公開を抑止
- `ignore: @dads/docs` でカタログはバージョニング対象外

将来公開する際のフロー:

1. `pnpm changeset` で変更概要を記録
2. `pnpm changeset version` で `package.json` 更新 + CHANGELOG 生成
3. CI で `pnpm changeset publish`

---

## CI / 品質ゲート

### `.github/workflows/ci.yml`（単一ジョブ）

```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-test:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 11 }
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm format:check
      - run: pnpm --filter @dads/vue test
      - run: pnpm --filter @dads/vue build
      - run: pnpm --filter @dads/docs build
```

ローカル実行所要時間（参考値）:

| ステップ         | 所要 |
| ---------------- | ---- |
| install (cached) | 1 s  |
| typecheck        | 12 s |
| lint             | 13 s |
| format:check     | 6 s  |
| test (899 tests) | 34 s |
| tokens build     | 1 s  |
| vue build        | 12 s |
| docs build       | 9 s  |
| **TOTAL**        | 88 s |

### ESLint flat config（ルート単一）

ルートの `eslint.config.js` で全パッケージを集約管理。L3 strictness（typescript-eslint recommended + 選抜 type-checked）。

```js
export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // packages/vue/src のみ type-checked
  {
    files: ['packages/vue/src/**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        project: ['./packages/vue/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'warn',
    },
  },

  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, sourceType: 'module' },
    },
    rules: { 'vue/multi-word-component-names': 'off' },
  },

  // テストは緩める
  {
    files: ['**/__tests__/**', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  prettierConfig, // 最後に置く
)
```

### Prettier（`.prettierrc.json`）

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always"
}
```

移行元コードと完全に揃える。

### TypeScript solution-style references

ルート `tsconfig.json` で `tsc -b` を 1 コマンドで全パッケージへ走らせる:

```jsonc
{
  "files": [],
  "references": [
    { "path": "./packages/tokens" },
    { "path": "./packages/tailwind-plugin" },
    { "path": "./packages/vue" },
    { "path": "./apps/docs" },
  ],
}
```

### テスト / a11y

#### 単体テスト（Vitest）

- Vitest 3 + `@vue/test-utils` 2 + **happy-dom**
- 既存 26 テストファイル（883 ケース）を **挙動変更なしで** 移植
- テストでは `css: false` を維持（class/attribute/DOM 構造のみ検証する用途のため SCSS 処理を skip）

#### a11y テスト（vitest-axe）

- `test/setup.ts` で `expect.extend(matchers)` を登録
- axe は DOM ツリー接続を要求するため、`attachTo: document.body` または Teleport の出力先を渡す
- Phase 1 では Button / TextField / Modal の 3 コンポーネントに 16 ケース追加（合計 899 テスト）
- 残りのコンポーネントは段階的に追加していく
- VitePress カタログに対する Playwright + axe スモークテストは後段の独立タスク

#### カバレッジ

`@vitest/coverage-v8` で計測可能。Phase 1 では閾値強制なし。

---

## 非機能要件（要点）

- **移植忠実度**: 外部から見た挙動（props / emits / slot / CSS クラス名 / aria 属性）は移行元と完全一致。リファクタは別スペック扱い。
- **依存最小化**: `@dads/vue` の runtime dependency は最小限。`vue` は peerDependency（`^3.4`）。
- **tree-shake**: ESM 出力 + 個別 import 可能 + `sideEffects: ["**/*.css", "**/*.scss"]` を維持。
- **可搬性**: 利用側は `vue` の peer install のみで動く。
- **DX**: クリーン環境で `pnpm i && pnpm build && pnpm test` が 5 分以内に完走（実測 60s）。

---

## VitePress カタログ（apps/docs）

### 構成

```ts
// apps/docs/.vitepress/config.ts
export default defineConfig({
  title: 'DADS Vue Components',
  description: 'デジタル庁デザインシステム Vue 3 実装',
  lang: 'ja',
  themeConfig: {
    nav: [{ text: 'Components', link: '/components/button' }],
    sidebar: {
      /* Form / Navigation / Feedback / Display の 4 カテゴリ */
    },
  },
})
```

```ts
// apps/docs/.vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import '@dads/tokens/css'
import '@dads/vue/styles'
import './custom.css'

export default DefaultTheme
```

### コンテンツ規約

- ホーム（`index.md`）は hero + features の home layout
- Button ページは **フルデモ**: `<script setup>` で `DadsButton` を import + reactivity デモ + variant × size × color × state のマトリックス（22 種類のクラス組合せ） + props / events / a11y 一覧表
- 残り 25 コンポーネントは TODO スタブで生成し、段階的に拡充

### 依存

```jsonc
{
  "dependencies": {
    "@dads/vue": "workspace:*",
    "@dads/tokens": "workspace:*",
  },
  "devDependencies": { "vitepress": "^1.5.x", "vue": "^3.5.0" },
}
```

---

## Vendor 方式（既存サブクローンの取り扱い）

3 つの既存サブクローンは **vendor (ソース取り込み)** とする。各上流の `.git/` / `node_modules/` / `dist/` を `.gitignore` で除外し、ソース実体のみ dads-lib の git 履歴に含める。

| ディレクトリ                             | 上流                                                | バージョン |
| ---------------------------------------- | --------------------------------------------------- | ---------- |
| `design-tokens/`                         | digital-go-jp/design-tokens                         | v2.0.1     |
| `tailwind-theme-plugin/`                 | digital-go-jp/tailwind-theme-plugin                 | v1.0.0     |
| `design-system-example-components-html/` | digital-go-jp/design-system-example-components-html | main HEAD  |

- ソース実体（合計約 5MB）は dads-lib の git 履歴に含める
- 上流追随は半年〜1 年に 1 回、明示コミット（`chore: bump vendored design-tokens to vX.Y.Z`）で行う
- pin 情報はルート `VENDORED.md` に集約管理（commit hash / 取り込み日）

### 採用理由

1. CLAUDE.md が前提とする「Claude Code が `grep` / `Read` で参照する第一資産」を常時利用可能に保てる
2. dads-lib commit と参照資産バージョンが完全に紐付く（reproducibility）
3. submodule の UX 問題（`--recurse-submodules` 忘れ）を回避
4. 両 repo とも MIT ライセンスで再配布可能、LICENSE ファイルが各 dir 内に残るため帰属表示も自動維持

注: `dads-document-md/` と `dads-document-html/` は公式サイトからの抽出物で git 履歴を持たないため vendor 対象外（通常のディレクトリとして取り込む）。

---

## 主要な意思決定の根拠

### D-1: `@dads/tokens` は npm dependency 経由

`@digital-go-jp/design-tokens` を npm dependency として吸い、薄ラッパで再エクスポートする。リポジトリ内の `dads-lib/design-tokens/` clone は読み物として残す。

**理由**: npm 経由のほうがバージョン固定が明示的で、利用側からの参照経路もシンプル。clone は資料として残し、Claude Code が `grep` で参照できる状態を維持する。

### D-2: カタログツールは VitePress 1.x

**理由**: SFC を扱える / 軽量 / DADS のドキュメント用途に十分。Storybook 9 は a11y addon / controls / interactions が魅力的だが、stable 度と保守コストで VitePress を優先。

### D-3: SCSS は未コンパイル + コンパイル済みの両方配布

**理由**: 利用側で SCSS 変数オーバーライドの余地を残しつつ、import 1 行で済む通常用途も満たすため。`exports['./styles']` でコンパイル済み CSS、`exports['./styles/scss']` で未コンパイル SCSS を提供。

### D-4: ESLint flat config の strictness は L3（type-checked 選抜）

**理由**: 型認識ルール（`no-floating-promises` / `no-misused-promises` / `await-thenable` / `require-await`）は Vue コンポーネント実装で実害を防ぐ価値が高い。一方、すべての型認識ルールを有効化すると false positive とパフォーマンスコストが大きいため選抜。テストファイルは緩める。

### D-5: a11y チェックは vitest-axe で jsdom/happy-dom 上にて実施

**理由**: 単体テストと同じランタイムで axe を動かせるため CI 統合コストが低い。Playwright + axe による E2E スモークは後段で別途追加。

### D-6: 既存サブクローン 3 件は vendor 方式

**理由**: Claude Code が常時参照する第一資産であり、submodule の UX 問題を避けつつ reproducibility を担保するため。

### 拡張子 `.js` vs `.mjs`

要件では `.mjs` を指定していたが、Vite library mode のデフォルト + `type: module` で ESM 解釈されることから `.js` を採用。実態は ESM 出力で要件の意図（typed ESM library output）を満たす。

### Vite/Vitest スタックのバージョン更新

当初設計は Vite 5 / Vitest 2 / vue-tsc 2 を想定していたが、移行元の依存に揃えて Vite 7 / Vitest 3 / vue-tsc 3 / `@vitejs/plugin-vue` 6 に更新。Vite 7 で SCSS の `api: 'modern'` オプションが削除されたため `vite.config.ts` から除外。

### テストランタイム `jsdom` → `happy-dom`

移行元が happy-dom 環境で書かれており、jsdom 26 では `getComputedStyle().lineHeight` が空文字を返さなくなり Textarea auto-resize 計算テストが落ちるため切り替え。

### SCSS preprocessor `sass-embedded` → `sass`

`sass-embedded` の async dispatcher が vitest 並列実行で `[sass] Tried writing to closed dispatcher` を起こす既知問題があるため、`sass` を採用。

### 階層調整: `../types` → `../../types` / `../styles` → `../../styles`

移行元では `dads/Button/...types.ts` から `../types/common` を参照していたが、移植先で `src/components/Button/...types.ts` 構造になり 1 階層深くなったため、`.types.ts` (10 ファイル) と `.vue` の `@use` (26 ファイル / 44 occurrence) を一括 sed 修正。

### `noUncheckedIndexedAccess: false`

移行元（@vue/tsconfig）の strictness に合わせるため緩和。NFR-1（挙動忠実度）への適合のため。

### Tailwind v4 サポートの一時撤回（→ 再評価可能）

当初、上流 v0.3.4 の `dist/` に `v4.css` が含まれず `exports` にも `./v4` がないため一時撤回した。**上流 v1.0.0（DADS v2.14.0 追随で bump 済み）で Tailwind CSS v4 サポートが正式に追加された**ため、`./v4` の再導入を再評価できる。現状は本ラッパを v3 構成のまま据え置いており、`./v4` 対応は後段の判断とする（フォローアップ）。

---

## 既存資産との関係

| 既存パス                                 | 役割                          | 本設計での扱い                               |
| ---------------------------------------- | ----------------------------- | -------------------------------------------- |
| `dads-document-md/`                      | 仕様 MD                       | 変更なし。Claude Code の参照用（第一候補）   |
| `dads-document-html/`                    | HTML レンダー版               | 変更なし                                     |
| `design-system-example-components-html/` | HTML/CSS 正準サンプル         | vendor。実装時の参照用                       |
| `design-tokens/`                         | 公式 design-tokens の clone   | vendor。`@dads/tokens` は npm 経由参照に統一 |
| `tailwind-theme-plugin/`                 | 公式 tailwind-plugin の clone | vendor                                       |
| `CLAUDE.md`                              | プロジェクト指示              | monorepo 構造を反映して更新済                |

---

## リスクと対策

| リスク                                                                 | 対策                                                                     |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| SCSS の `@use` パスがビルドで解決できない                              | `vite.config.ts` の `css.preprocessorOptions.scss.loadPaths` に追加      |
| `exports['./css']` の `node_modules` パス露出が pnpm hoisting で壊れる | `scripts/copy-css.mjs` で `dist/` にコピー出力                           |
| vue-tsc の d.ts 生成が遅い（全 27 SFC）                                | `vue-tsc --incremental` を有効化                                         |
| vitest-axe のバージョン依存                                            | 動かない場合は `jest-axe` + 軽い adapter にフォールバック                |
| `mdi-*` クラスを Button 等が参照（Material Design Icons 非配布）       | アプリ側で `@mdi/font` を入れる前提。README に明記。フォントは配布しない |
| `var(--color-...)` 形式の CSS 変数がアプリ側に未注入で見た目崩れ       | `@dads/tokens` の `tokens.css` を import する手順を README に明記        |
| Vue 3.4 未満との互換性問題                                             | `peerDependencies.vue` を `^3.4` に固定 / engines で明示                 |

---

## 受入基準（達成状況）

| AC    | 内容                                                               | 状況 |
| ----- | ------------------------------------------------------------------ | ---- |
| AC-1  | `pnpm-workspace.yaml` が `packages/*` と `apps/*` を含む           | OK   |
| AC-2  | `pnpm install` がルートで成功                                      | OK   |
| AC-3  | `pnpm --filter @dads/vue build` で `dist/index.{js,d.ts}` 生成     | OK   |
| AC-4  | 既存 26 テストファイル全 pass（883 + 16 a11y = 899）               | OK   |
| AC-5  | `pnpm typecheck` / `pnpm lint` / `pnpm format:check` 全 0 件       | OK   |
| AC-6  | `apps/docs` で最低 1 コンポーネント描画                            | OK   |
| AC-7  | Vuetify / pinia / vue-router / vue-i18n / `@/` aliased import 0 件 | OK   |
| AC-8  | Changesets 初期化済（`.changeset/config.json` 存在）               | OK   |
| AC-9  | GitHub Actions CI が pass                                          | 部分 |
| AC-10 | 全パッケージ `private: true` で npm 公開無効化                     | OK   |

### NFR-6 クリーンステート計測

| ステップ                               | 時間                   |
| -------------------------------------- | ---------------------- |
| `pnpm install --frozen-lockfile`       | 1 s                    |
| `pnpm -w run build`（全 4 パッケージ） | 23 s                   |
| `pnpm -w run test`（899 tests）        | 36 s                   |
| **TOTAL**                              | **60 s**（目標 300 s） |

---

## 後続タスク（本スペック外）

- `apps/docs/components/` 配下の残り 25 コンポーネントのデモページ整備
- 残り 23 コンポーネントの vitest-axe a11y テスト追加
- Playwright + axe による VitePress カタログのスモークテスト
- `web-label-print` 側の `frontend/src/components/dads/` 削除と `@dads/vue` への置換
- npm 公開判断 + `private: true` 解除 + 初回 publish
