# Design — DADS Vue コンポーネントライブラリ初期化

- Spec ID: `2026-05-12-dads-vue-library-init`
- Depends on: `./requirements.md`
- Status: Draft（承認待ち）
- Last Updated: 2026-05-12

---

## 1. 目的

requirements.md の機能要件 F1〜F10 と確定事項 D-1〜D-5 を実装するための **技術設計** を確定する。Phase の具体タスク分解は `tasklist.md` に委譲し、本ドキュメントは **「どう作るか / なぜそう作るか」** に集中する。

---

## 2. 全体アーキテクチャ

### 2.1 リポジトリ最終形（Phase 1 完了時）

```
dads-lib/
├── .changeset/                       # Changesets 設定
│   └── config.json
├── .github/
│   └── workflows/
│       └── ci.yml                    # typecheck / lint / test / build / a11y
├── .nvmrc                            # 24
├── .gitignore
├── .prettierrc.json
├── .prettierignore
├── CLAUDE.md                         # 既存（更新する）
├── eslint.config.js                  # ルート ESLint flat config (全パッケージ共有)
├── package.json                      # private:true, scripts は recursive
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.base.json                # 全 TS 設定の共通親
│
├── packages/
│   ├── tokens/                       # @dads/tokens
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── src/
│   │   │   └── index.ts              # @digital-go-jp/design-tokens を再 export
│   │   └── tsconfig.json
│   │
│   ├── tailwind-plugin/              # @dads/tailwind-plugin
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── src/
│   │   │   ├── index.ts              # tailwind v3 用 (CJS)
│   │   │   └── v4.ts                 # tailwind v4 用 (CSS export)
│   │   └── tsconfig.json
│   │
│   └── vue/                          # @dads/vue ★ 本丸
│       ├── package.json
│       ├── README.md
│       ├── vite.config.ts
│       ├── vitest.config.ts
│       ├── tsconfig.json
│       ├── tsconfig.build.json       # d.ts 出力専用
│       ├── src/
│       │   ├── index.ts              # 公開エントリ（移行元 index.ts を踏襲）
│       │   ├── types/
│       │   │   └── common.ts
│       │   ├── styles/
│       │   │   ├── _base.scss
│       │   │   ├── _focus-ring.scss
│       │   │   └── index.scss        # 全 style の barrel
│       │   └── components/
│       │       ├── Button/
│       │       │   ├── DadsButton.vue
│       │       │   ├── DadsButton.types.ts
│       │       │   ├── __tests__/
│       │       │   │   └── DadsButton.test.ts
│       │       │   └── index.ts
│       │       ├── TextField/
│       │       │   └── ... (同形式)
│       │       └── ... (合計 26 フォルダ / 27 .vue)
│       └── test/
│           ├── setup.ts              # vitest セットアップ (axe register など)
│           └── a11y/                 # 共通 a11y ヘルパ
│
├── apps/
│   └── docs/                         # VitePress カタログ（private）
│       ├── package.json
│       ├── .vitepress/
│       │   ├── config.ts
│       │   └── theme/
│       │       └── index.ts          # @dads/vue + tokens.css をロード
│       ├── index.md
│       └── components/
│           └── button.md             # Phase 5 で 26 個分用意
│
├── dads-document-md/                 # 既存（変更なし）
├── dads-document-html/               # 既存（変更なし）
├── design-system-example-components-html/  # 既存（変更なし）
├── design-tokens/                    # 既存（変更なし。参照資産として残す）
└── tailwind-theme-plugin/            # 既存（変更なし。参照資産として残す）
```

### 2.2 パッケージ境界と依存グラフ

```
┌─────────────────────┐
│   apps/docs         │   private (VitePress)
│   (@dads/docs)      │
└────────┬────────────┘
         │ workspace:*
         ▼
┌─────────────────────┐    peer:vue@^3.4
│   @dads/vue         │ ←──────────────── アプリ (web-label-print)
└────────┬────────────┘
         │ optional dep
         ▼
┌─────────────────────┐
│   @dads/tokens      │ ──→ @digital-go-jp/design-tokens@^1.1.9
└─────────────────────┘

┌─────────────────────┐
│ @dads/tailwind-plug │ ──→ @digital-go-jp/tailwind-theme-plugin@^0.3.4
└─────────────────────┘   peer:tailwindcss@^3 || ^4
```

**重要な原則**

1. `@dads/vue` から `@dads/tokens` への直接依存は **持たせない**（実装は CSS 変数フォールバック前提なので疎結合）。利用側で両方 install するパターン。
2. `@dads/tailwind-plugin` は `@dads/vue` と相互独立（Tailwind 系プロジェクトのみ使う）。
3. `apps/docs` のみ `workspace:*` で `@dads/vue` を参照。

---

## 3. パッケージ詳細設計

### 3.1 `@dads/tokens`

**最小構成。ほぼ再エクスポートのみ。**

#### package.json

```jsonc
{
  "name": "@dads/tokens",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./css": "./node_modules/@digital-go-jp/design-tokens/dist/tokens.css",
    "./css-simple": "./node_modules/@digital-go-jp/design-tokens/dist/tokens-simple.css",
    "./tokens.json": "./node_modules/@digital-go-jp/design-tokens/dist/tokens.json",
  },
  "dependencies": {
    "@digital-go-jp/design-tokens": "^1.1.9",
  },
}
```

#### src/index.ts

```ts
// 公式 npm パッケージの JS module を そのまま再エクスポート
export * from '@digital-go-jp/design-tokens'
```

**利用例**

```ts
// アプリ側
import '@dads/tokens/css' // CSS 変数を読み込む（必須）
import { Color } from '@dads/tokens' // JS から型付きで参照したい場合
```

#### 設計上の判断

- `exports` の `./css` で **`node_modules` パスを直に晒している** のは pnpm hoisting で問題になる可能性があるため、Phase 1 内で `vite` build した方が安全。動作確認時に問題が出たら、`packages/tokens/dist/tokens.css` へ rollup でコピー出力するように修正する（タスクリストの注意事項に明記）。

---

### 3.2 `@dads/tailwind-plugin`

#### package.json

```jsonc
{
  "name": "@dads/tailwind-plugin",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": {
      "require": "./dist/index.cjs.js",
      "import": "./dist/index.es.js",
      "types": "./dist/index.d.ts",
    },
    "./v4": "./dist/v4.css",
  },
  "peerDependencies": {
    "tailwindcss": "^3.4.17 || ^4.0.0",
  },
  "dependencies": {
    "@digital-go-jp/tailwind-theme-plugin": "^0.3.4",
  },
}
```

#### src/index.ts

```ts
// 公式プラグインをそのまま再エクスポート
export { default } from '@digital-go-jp/tailwind-theme-plugin'
```

#### 利用例

```js
// tailwind.config.js (v3)
import dadsPlugin from '@dads/tailwind-plugin'
export default { plugins: [dadsPlugin] }
```

```css
/* v4 */
@import '@dads/tailwind-plugin/v4';
```

---

### 3.3 `@dads/vue` ★ メイン

#### package.json

```jsonc
{
  "name": "@dads/vue",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "sideEffects": ["**/*.css", "**/*.scss"],
  "main": "./dist/index.mjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
    },
    "./styles": "./dist/styles/index.css",
    "./styles/scss": "./src/styles/index.scss",
    "./styles/scss/*": "./src/styles/*.scss",
  },
  "files": ["dist", "src/styles"],
  "scripts": {
    "build": "vite build && vue-tsc -p tsconfig.build.json --emitDeclarationOnly",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "typecheck": "vue-tsc --noEmit",
    "lint": "eslint . --max-warnings 0",
  },
  "peerDependencies": {
    "vue": "^3.4.0",
  },
  "devDependencies": {
    "vue": "^3.5.0",
    "@vitejs/plugin-vue": "^5.x",
    "@vue/test-utils": "^2.4.x",
    "vitest": "^2.x",
    "@vitest/coverage-v8": "^2.x",
    "vitest-axe": "^0.1.x",
    "jsdom": "^25.x",
    "vue-tsc": "^2.x",
    "typescript": "^5.x",
    "vite": "^5.x",
    "sass-embedded": "^1.x",
  },
}
```

#### Vite library mode 設定 (`vite.config.ts`)

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

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
        // 全コンポーネント CSS を 1 ファイルに集約
        assetFileNames: (info) =>
          info.name === 'style.css' ? 'styles/index.css' : 'assets/[name][extname]',
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // sass-embedded 経由
      },
    },
  },
})
```

**ポイント**

- `formats: ['es']` のみ。CJS は出さない（Vue 3 系は ESM 前提）。
- `external: ['vue']` で peer の vue をバンドルから除外。
- `cssCodeSplit: false` + `assetFileNames` で全 SCSS を `dist/styles/index.css` に集約 → `import '@dads/vue/styles'` で読み込ませる。
- SCSS は **未コンパイル版も** `src/styles/` から `files` で同梱する（`exports['./styles/scss']`）→ 利用側で変数オーバーライド可能。

#### Vitest 設定 (`vitest.config.ts`)

```ts
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./test/setup.ts'],
      css: true, // SCSS をテスト時にも処理させる
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html', 'lcov'],
        include: ['src/components/**/*.vue', 'src/components/**/*.ts'],
        exclude: ['**/__tests__/**', '**/*.types.ts', '**/index.ts'],
      },
    },
  }),
)
```

#### test/setup.ts

```ts
import { expect, afterEach } from 'vitest'
import { cleanup } from '@vue/test-utils'
import * as matchers from 'vitest-axe/matchers'
import 'vitest-axe/extend-expect'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
```

#### TypeScript 設定

**`tsconfig.base.json`（ルート）**

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": false,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": [],
  },
}
```

**`packages/vue/tsconfig.json`**

```jsonc
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "jsx": "preserve",
    "types": ["vitest/globals", "vitest-axe"],
    "paths": {},
  },
  "include": ["src/**/*", "test/**/*", "vite.config.ts", "vitest.config.ts"],
}
```

**`packages/vue/tsconfig.build.json`**

```jsonc
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "emitDeclarationOnly": true,
    "declaration": true,
    "outDir": "./dist",
  },
  "include": ["src/**/*"],
  "exclude": ["**/__tests__/**", "**/*.test.ts"],
}
```

#### SCSS 解決問題と対策

移行元の Button.vue は `@use '../styles/base' as base;` という相対パスを使う。Vite + `@vitejs/plugin-vue` + `sass-embedded` の組み合わせなら、SFC の `<style lang="scss">` 内の相対 import は **そのまま解決される** ので追加設定は不要。

ただし `_base.scss` / `_focus-ring.scss` の **アンダースコア接頭辞** は Sass の partial 規約。`@use '../styles/base'` で `_base.scss` を解決する仕組みは sass-embedded で問題なし。Phase 2 でビルド検証する。

---

### 3.4 `apps/docs`（VitePress カタログ）

#### package.json

```jsonc
{
  "name": "@dads/docs",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vitepress dev",
    "build": "vitepress build",
    "preview": "vitepress preview",
  },
  "dependencies": {
    "@dads/vue": "workspace:*",
    "@dads/tokens": "workspace:*",
  },
  "devDependencies": {
    "vitepress": "^1.5.x",
    "vue": "^3.5.0",
  },
}
```

#### `.vitepress/config.ts`

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'DADS Vue Components',
  description: 'デジタル庁デザインシステム Vue 3 実装',
  lang: 'ja',
  themeConfig: {
    nav: [{ text: 'Components', link: '/components/button' }],
    sidebar: {
      '/components/': [
        {
          text: 'Form',
          items: [
            { text: 'Button', link: '/components/button' },
            // ... 26 個分は Phase 5 で埋める
          ],
        },
      ],
    },
  },
})
```

#### `.vitepress/theme/index.ts`

```ts
import DefaultTheme from 'vitepress/theme'
import '@dads/tokens/css'
import '@dads/vue/styles'

export default DefaultTheme
```

Markdown 内で `<script setup>` で `@dads/vue` をインポートしてライブデモを書く。VitePress は SFC を扱える。

---

## 4. 移行戦略（web-label-print → dads-lib）

### 4.1 移植元の事実確認（実施済み）

| 項目                               | 結果                         |
| ---------------------------------- | ---------------------------- |
| `.vue` ファイル                    | 27 個（Drawer に 2 個）      |
| `.types.ts`                        | 26 個                        |
| `.test.ts`                         | 26 個                        |
| Vuetify 参照                       | **0 件**                     |
| pinia / vue-router / vue-i18n 参照 | **0 件**                     |
| `@/` aliased import                | **0 件**                     |
| `@digital-go-jp/*` 参照            | **0 件**（CSS 変数で疎結合） |

→ 機械的なファイルコピーで完結する。

### 4.2 移植手順

1. **コピー**: `cp -R web-label-print/frontend/src/components/dads/{Button,...}` → `dads-lib/packages/vue/src/components/`
2. **共有資産の移送**:
   - `dads/types/common.ts` → `packages/vue/src/types/common.ts`
   - `dads/styles/_base.scss` → `packages/vue/src/styles/_base.scss`
   - `dads/styles/_focus-ring.scss` → `packages/vue/src/styles/_focus-ring.scss`
3. **エントリ作成**: `dads/index.ts` → `packages/vue/src/index.ts`（パスは変えない）
4. **検証スクリプト**: 移行後、`grep -rE "(vuetify|pinia|vue-router|vue-i18n|@/)" src/` で **0 件** を再確認
5. **テスト走行**: `pnpm --filter @dads/vue test` で 26 ファイル全 pass を確認

### 4.3 import パス書き換えルール

| Before（参考）                              | After      | 備考                             |
| ------------------------------------------- | ---------- | -------------------------------- |
| `from '../types/common'`                    | そのまま   | 変更不要                         |
| `from '../styles/base'` (`@use` 内)         | そのまま   | 変更不要                         |
| `from '@/components/dads'` (アプリ側コード) | （対象外） | アプリ側の置換は本スペック対象外 |

実質、書き換え 0 件で済む見込み。

### 4.4 移植元（web-label-print 側）の取り扱い

- **削除しない**（本スペックの対象外）
- 別途、アプリ側で `@dads/vue` を依存に追加して移行が完了した後に、別タスクで削除する

---

## 5. Lint / Format / Type 設計

### 5.1 ESLint flat config（ルートに 1 本、`eslint.config.js`）

```js
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // 1) Base
  js.configs.recommended,

  // 2) TypeScript recommended (no type-check, syntactic only) — 全 *.ts に
  ...tseslint.configs.recommended,

  // 3) 選抜 type-checked rules — packages/vue/src のみで有効化
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

  // 4) Vue
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, sourceType: 'module' },
    },
    rules: {
      'vue/multi-word-component-names': 'off', // DadsButton 単語が連結なので
    },
  },

  // 5) Tests を緩める
  {
    files: ['**/__tests__/**', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  // 6) Prettier 衝突回避（最後に置く）
  prettierConfig,
)
```

### 5.2 Prettier（`.prettierrc.json`）

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "arrowParens": "always"
}
```

移行元コードと完全に揃える（Button.vue のスタイルから推測）。

### 5.3 TypeScript project references

ルート `tsconfig.json` を **solution-style** に:

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

→ `pnpm typecheck` がルートから `tsc -b` で全パッケージを並列チェック。

---

## 6. テスト・a11y 設計

### 6.1 単体テスト（既存）

- Vitest + `@vue/test-utils` + jsdom
- 既存 26 テストファイルを **変更なしで** 走らせる
- SCSS は Vitest 側で `css: true` で処理（テストでクラス名だけ見ているなら CSS 解釈は不要、念のため有効化）

### 6.2 a11y テスト（新規・D-5）

#### Phase 1: コンポーネント単位（vitest-axe）

各コンポーネントの `__tests__/` に a11y describe ブロックを **段階的に** 追加する。Phase 1 内では **最低 3 コンポーネント（Button / TextField / Modal）** に追加してパターンを確立。

例 (`DadsButton.test.ts` への追加):

```ts
import { axe } from 'vitest-axe'

describe('DadsButton a11y', () => {
  it('has no axe violations', async () => {
    const wrapper = createWrapper({ ariaLabel: 'Save' })
    expect(await axe(wrapper.element)).toHaveNoViolations()
  })
})
```

CI ではこれが test 全体の一部として走る。

#### Phase 5+（後段）: VitePress カタログのスモーク

`apps/docs` をビルドして preview server を起動し、Playwright + `@axe-core/playwright` で全コンポーネントページを巡回。本スペック後段の独立タスク。

### 6.3 カバレッジ

- `@vitest/coverage-v8` で計測
- 閾値は Phase 1 では設定しない（既存テストの実態を見て Phase 2 以降で 70% など現実的に設定）

---

## 7. CI 設計

`.github/workflows/ci.yml`（1 ファイル）

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
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm --filter @dads/vue test # vitest-axe 込み
      - run: pnpm --filter @dads/vue build
      - run: pnpm --filter @dads/docs build
```

**意図**: matrix 化せず最小 1 ジョブ。所要 5〜8 分目標。

---

## 8. リリース管理（Changesets）

### 8.1 初期化

```bash
pnpm dlx @changesets/cli init
```

### 8.2 設定

`.changeset/config.json`

```jsonc
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
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

**意図**

- `linked: @dads/*` で 3 パッケージのバージョンを揃える
- `access: restricted` で npm 公開を抑止（`private: true` と二重ガード）
- `ignore: @dads/docs` でカタログはバージョニング対象外

### 8.3 リリースフロー（参考、本スペック外）

将来公開する際は:

1. `pnpm changeset` で変更概要を記録
2. `pnpm changeset version` で `package.json` 更新 + CHANGELOG 生成
3. CI で `pnpm changeset publish`

---

## 9. リポジトリ初期化（D-6 確定）

`dads-lib` は現状 git 管理外。Phase 0 で `git init` する。

### 9.1 既存サブ clone の取り扱い — Vendor 方式（D-6）

以下 3 ディレクトリは **vendor (ソース取り込み)** とする。各上流の `.git/` は `.gitignore` で除外し、ソース実体のみ dads-lib の git 履歴に取り込む。

| ディレクトリ                                | 上流                                                                            | バージョン      |
| ------------------------------------------ | ------------------------------------------------------------------------------- | --------------- |
| `design-tokens/`                           | digital-go-jp/design-tokens                                                     | v1.1.9          |
| `tailwind-theme-plugin/`                   | digital-go-jp/tailwind-theme-plugin                                             | v0.3.4          |
| `design-system-example-components-html/`   | digital-go-jp/design-system-example-components-html                             | main HEAD       |

- ソース実体（合計約 5MB）は dads-lib の git 履歴に含める
- 各 clone の内部 `.git/` / `node_modules/` / `dist/` を `.gitignore` で除外
- 上流追随は半年〜1 年に 1 回、明示コミット (`chore: bump vendored design-tokens to vX.Y.Z`) で行う
- pin 情報はルート `VENDORED.md` に集約管理（commit hash / 取り込み日）

注: `dads-document-md/` と `dads-document-html/` は公式サイトからの抽出物で git 履歴を持たないため、vendor 対象外（通常のディレクトリとして取り込む）。

#### 採用理由

1. CLAUDE.md が前提とする「Claude Code が `grep` / `Read` で参照する第一資産」を常時利用可能に保つ
2. dads-lib commit と参照資産バージョンが完全に紐付く（reproducibility）
3. submodule の UX 問題（`--recurse-submodules` 忘れ）を回避
4. 両 repo とも MIT ライセンスで再配布可能、LICENSE ファイルが各 dir 内に残るため帰属表示も自動維持

### 9.2 ルート `.gitignore`（Phase 0 で作成済み）

実装済みの内容はリポジトリの `.gitignore` を参照。要点:

- `node_modules/` / `dist/` / `coverage/` / `.vitepress/cache` / `.vitepress/dist` を除外
- macOS / IDE 残骸を除外
- MCP / agent 残骸 (`.playwright-mcp/`, `.claude/`) を除外
- 3 つの vendor clone それぞれの `.git/` / `node_modules/` / `dist/` を個別に除外

---

## 10. ロールバック・リスク対策

| リスク                                                                 | 検知方法                   | 対策                                                                                |
| ---------------------------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| SCSS の `@use` パスがビルドで解決できない                              | Phase 2 ビルド時にエラー   | sass-embedded の `loadPaths` を vite config に追加                                  |
| `exports['./css']` の node_modules パス露出が pnpm hoisting で壊れる   | `apps/docs` でロード時 404 | `@dads/tokens` 側で rollup build を入れて `dist/tokens.css` にコピー                |
| vue-tsc の d.ts 生成が遅い (全 27 SFC)                                 | ローカル / CI で 30 秒超   | `vue-tsc --incremental` を有効化                                                    |
| vitest-axe のバージョン依存                                            | install エラー             | 動かない場合は `jest-axe` + 軽い adapter にフォールバック                           |
| 移行元コンポーネントの SCSS が `_tokens.scss` を `@use` で参照していた | コンパイルエラー           | grep で事前確認（Button では使われていないが、TextField 等を Phase 2 開始時に検証） |

---

## 11. 既存資産との関係（明確化）

| 既存パス                                          | 役割                          | 本スペックでの扱い                                      |
| ------------------------------------------------- | ----------------------------- | ------------------------------------------------------- |
| `dads-lib/dads-document-md/`                      | 仕様 MD                       | 変更なし。Claude Code の参照用                          |
| `dads-lib/dads-document-html/`                    | HTML レンダー版               | 変更なし                                                |
| `dads-lib/design-system-example-components-html/` | HTML/CSS 正準サンプル         | 変更なし。実装迷ったときの参照                          |
| `dads-lib/design-tokens/`                         | 公式 design-tokens の clone   | 変更なし。`@dads/tokens` は npm 経由の参照に統一（D-1） |
| `dads-lib/tailwind-theme-plugin/`                 | 公式 tailwind-plugin の clone | 変更なし                                                |
| `dads-lib/CLAUDE.md`                              | プロジェクト指示              | **更新する**（新規 monorepo 構造を反映）                |

---

## 12. Phase 完了の判定（受入基準との対応）

requirements.md の AC-1〜AC-10 が、design.md のどの章で実装されるか:

| AC                       | 関連設計章           |
| ------------------------ | -------------------- |
| AC-1 pnpm-workspace 構造 | §2.1                 |
| AC-2 install 成功        | §3 (全パッケージ)    |
| AC-3 @dads/vue build     | §3.3                 |
| AC-4 既存テスト pass     | §6.1 + §4            |
| AC-5 typecheck/lint      | §5                   |
| AC-6 docs 起動           | §3.4                 |
| AC-7 禁忌 import 0 件    | §4.2                 |
| AC-8 Changesets          | §8                   |
| AC-9 CI green            | §7                   |
| AC-10 private:true       | §3 (各 package.json) |

---

## 13. 次フェーズ

本ドキュメントが Approved になったら `tasklist.md` を作る（既に同時起案）。
