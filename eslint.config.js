// ESLint flat config — design.md §5.1
//
// L3 strictness:
//   - typescript-eslint recommended (構文ベース) を全 TS に適用
//   - packages/vue/src のみ 型認識ルール 4 つを上乗せ (D-4)
//   - vue SFC は eslint-plugin-vue の flat/recommended
//   - テストファイルは型認識ルールを緩める
//   - prettier との衝突回避を最後に置く

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default tseslint.config(
  // 0) Ignore patterns
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/.vitepress/cache/**',
      '**/.vitepress/dist/**',

      // Vendored upstream sources (managed by their own tooling)
      'design-tokens/**',
      'tailwind-theme-plugin/**',
      'design-system-example-components-html/**',

      // Read-only reference content
      'dads-document-md/**',
      'dads-document-html/**',

      // Package-internal scripts use plain Node (no project type info)
      '**/scripts/**',
    ],
  },

  // 1) Base — ESLint recommended (JS)
  js.configs.recommended,

  // 2) TypeScript recommended (構文ベース) — 全 .ts / .vue に適用
  ...tseslint.configs.recommended,

  // 3) ESLint core 側の新ルールで design.md §5.1 の L3 にない (= 上乗せ不要) ものを抑止。
  //    `no-useless-assignment` は switch 文での意図的な初期化を誤検知する。
  //    DadsTab.vue の `let nextIdx: number | null = null` パターンは TS の definite
  //    assignment analysis で代替できないため、ルール側を off にして移植忠実度 (NFR-1) を維持。
  {
    rules: {
      'no-useless-assignment': 'off',
    },
  },

  // 4) 型認識ルール — packages/vue/src のみ (テストは exclude)
  {
    files: ['packages/vue/src/**/*.{ts,vue}'],
    ignores: ['packages/vue/src/**/__tests__/**', 'packages/vue/src/**/*.test.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        project: ['./packages/vue/tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
      },
      globals: { ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'warn',
    },
  },

  // 5) Vue plugin (flat/recommended)
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
      },
      globals: { ...globals.browser },
    },
    rules: {
      // DadsButton 等は 2 単語連結 (Pascal) なので unblock
      'vue/multi-word-component-names': 'off',
    },
  },

  // 6) 設定ファイル類 (project 解析を要求しない / Node 環境)
  {
    files: ['**/*.config.{js,ts,mjs,cjs}', '*.config.{js,ts,mjs,cjs}'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },

  // 7) テストファイルは緩める (型認識ルールは block 4 で既に exclude 済み)
  {
    files: ['**/__tests__/**/*.{ts,vue}', '**/*.test.{ts,vue}', 'packages/vue/test/**/*.ts'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // 8) Prettier 衝突回避 — 必ず最後
  prettierConfig,
)
