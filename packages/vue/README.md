# @dads/vue

DADS (デジタル庁デザインシステム) の Vue 3 コンポーネントライブラリ。

> Status: **DADS 公式 46 件完全カバー + 独自 6 件 = 計 52 コンポーネント** — Spec 1〜3 (Form-Inputs / Navigation-Menus / Display-Misc) + Figma 準拠化 + 命名整合 + 全件ギャップ解消 (High 9 / Medium 17 / Low 13) 完了 (〜2026-05-17) / **1881 tests pass (52 ファイル)** / 9 コンポーネントが vitest-axe a11y テスト済

## 特徴

- **Vue 3 のみに依存**: Vuetify / Pinia / Vue Router / Vue I18n などへの依存なし
- **WCAG 2.1 AA 準拠**: `aria-*` 属性・focus 制御・色コントラストを DADS 仕様どおり実装
- **CSS 変数フォールバック**: `@dads/tokens` の CSS が読み込まれていなくても基本的な見た目で動作 (`var(--color-..., #fallback)` 形式)
- **Tree-shake 対応**: 個別 import 可 / ESM 出力 / `sideEffects: ["**/*.css", "**/*.scss"]`

## 収録コンポーネント (52 個 = DADS 公式 46 + 独自 6)

VitePress カタログの sidebar 分類 (4 カテゴリ) に揃えます。

| カテゴリ   | 件数 | コンポーネント                                                                                                                                                                                                                                    |
| ---------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form       | 13   | Button, InputText, Textarea, Select, Checkbox, CheckboxGroup\*, Radio, RadioGroup\*, FileUpload, Combobox, ColorPicker\*, DatePicker, SearchBox                                                                                                   |
| Navigation | 17   | HeaderContainer, Drawer, Breadcrumb, StepNavigation, Tab, LanguageSelector, MenuList, MenuListBox, HamburgerMenuButton, UtilityLink, ScrollTopButton 🚫, GlobalMenu, MegaMenu, PageNavigation, TableOfContents\*, BottomNavigation 🚫, MobileMenu |
| Feedback   | 5    | NotificationBanner, Dialog, Tooltip\*, ProgressIndicator, EmergencyBanner                                                                                                                                                                         |
| Display    | 17   | Card, Heading, Divider, Table, Accordion, ChipLabel, ChipTag, Chip\* (deprecated alias), Disclosure, DescriptionList, Image, ImageSlider, Carousel, List, Blockquote, ResourceList, TableControl                                                  |

\* CheckboxGroup / RadioGroup / ColorPicker / Tooltip / Chip (legacy alias) / TableOfContents は DADS 公式仕様にはない独自拡張または互換 alias (6 件)。
🚫 ScrollTopButton / BottomNavigation は公式 DADS で非推奨指定。新規実装での採用は避けてください (代替案は各コンポーネントの docs ページを参照)。

### 命名整合 (2026-05-17 spec 適用)

公式 DADS の slug に合わせて以下のコンポーネントを改名しました。旧名は `@deprecated` alias として一定期間併存します。

| 公式 slug          | 旧名 (deprecated) | 新名                                   |
| ------------------ | ----------------- | -------------------------------------- |
| `dialog`           | `DadsModal`       | `DadsDialog`                           |
| `header-container` | `DadsHeader`      | `DadsHeaderContainer`                  |
| `input-text`       | `DadsTextField`   | `DadsInputText`                        |
| `chip-label/tag`   | `DadsChip` (兼用) | `DadsChipLabel` + `DadsChipTag` (分離) |

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
import { DadsButton, DadsInputText } from '@dads/vue'
</script>

<template>
  <DadsInputText v-model="name" label="名前" />
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

## a11y テスト (vitest-axe)

`vitest-axe` で WCAG 違反を自動検出するテストを 9 コンポーネント (34 ケース) に追加済:

| コンポーネント      | ケース数 | カバー範囲                                                                        |
| ------------------- | -------- | --------------------------------------------------------------------------------- |
| Button              | 5        | text-label / icon-only+aria-label / disabled / loading / anchor                   |
| InputText           | 6        | label / hint / required / error / disabled / aria-label fallback                  |
| Dialog              | 5        | title+labelledby / header-slot fallback / persistent / footer / 4 size プリセット |
| DatePicker          | 4        | 主要状態 (label / required / error / disabled)                                    |
| SearchBox           | 5        | label / suggestions / clearable / category 並置 / 必須                            |
| HamburgerMenuButton | 3        | default / icon-only / mobile-conditional バリアント                               |
| ChipLabel           | 2        | プレーン / 必須拡張                                                               |
| ScrollTopButton     | 2        | 表示 / 非表示状態                                                                 |
| TableControl        | 2        | フィルタ / ソート連動                                                             |

**TODO**: 残り 43 コンポーネントの a11y テスト追加。優先順位は Form / Navigation 系 (Radio・Checkbox・RadioGroup・CheckboxGroup・Select・Textarea・Combobox・FileUpload・Drawer・MobileMenu・NotificationBanner・Heading・Accordion・MenuListBox 等) を高位とする。

## アイコン

`prependIcon` / `appendIcon` は Material Design Icons のクラス名を受け取る (例: `mdi-download`)。
利用側で別途 `@mdi/font` を入れる前提 (本パッケージにはフォントを含めない / R-2)。

## 依存

- `vue` (peer): `^3.4.0`
- それ以外の runtime dependency なし
