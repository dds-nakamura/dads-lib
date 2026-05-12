# @dads/vue

DADS (デジタル庁デザインシステム) の Vue 3 コンポーネントライブラリ。

> Status: Phase 2 (scaffold) — Phase 3 で 26 コンポーネントを移植予定

## 特徴

- **Vue 3 のみに依存**: Vuetify / Pinia / Vue Router / Vue I18n などへの依存なし
- **WCAG 2.1 AA 準拠**: `aria-*` 属性・focus 制御・色コントラストを DADS 仕様どおり実装
- **CSS 変数フォールバック**: `@dads/tokens` の CSS が読み込まれていなくても基本的な見た目で動作 (`var(--color-..., #fallback)` 形式)

## インストール

```bash
pnpm add @dads/vue vue
# CSS 変数を使う場合 (推奨)
pnpm add @dads/tokens
```

## 使い方

```ts
// main.ts
import { createApp } from 'vue'
import '@dads/tokens/css' // CSS 変数を読み込む
import '@dads/vue/styles' // DADS コンポーネントの CSS
import App from './App.vue'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { DadsButton, DadsTextField } from '@dads/vue'
</script>

<template>
  <DadsTextField v-model="name" label="名前" />
  <DadsButton variant="solid-fill" color="primary">送信</DadsButton>
</template>
```

## SCSS カスタマイズ

未コンパイルの SCSS も配布しているため、利用先で変数オーバーライド可能:

```scss
// app.scss
@use '@dads/vue/styles/scss/base' as *;
@use '@dads/vue/styles/scss/focus-ring' as *;
```

## スクリプト

| コマンド                             | 用途                               |
| ------------------------------------ | ---------------------------------- |
| `pnpm --filter @dads/vue build`      | Vite library build + d.ts 出力     |
| `pnpm --filter @dads/vue test`       | Vitest 1 回実行                    |
| `pnpm --filter @dads/vue test:watch` | Vitest watch モード                |
| `pnpm --filter @dads/vue typecheck`  | vue-tsc による型チェック (no emit) |

## 依存

- `vue` (peer): `^3.4.0`
- それ以外の runtime dependency なし
