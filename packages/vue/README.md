# @dads/vue

DADS (デジタル庁デザインシステム) の Vue 3 コンポーネントライブラリ。

> Status: **DADS 公式 46 件完全カバー + 独自 6 件 = 計 52 コンポーネント** — Spec 1〜3 (Form-Inputs / Navigation-Menus / Display-Misc) + Figma 準拠化 + 命名整合 + 全件ギャップ解消 (High 9 / Medium 17 / Low 13) 完了 (〜2026-05-17) / **2098 tests pass (52 ファイル)** / **全 52 コンポーネントが vitest-axe a11y テスト済 (100% カバレッジ)**

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

**全 52 コンポーネントが `vitest-axe` で WCAG 違反を自動検出するテスト済 (100% カバレッジ, 約 250 ケース)**。各コンポーネントの主要状態 (label / hint / required / error / disabled / 主要バリアント) を網羅。

### Form (13 件)

| コンポーネント | ケース数 | カバー範囲                                                                          |
| -------------- | -------- | ----------------------------------------------------------------------------------- |
| Button         | 5        | text-label / icon-only+aria-label / disabled / loading / anchor                     |
| InputText      | 6        | label / hint / required / error / disabled / aria-label fallback                    |
| Textarea       | 6        | label / hint / required / error / disabled / counter                                |
| Select         | 7        | label / hint / required / error / disabled / 単一選択 / multiple+chips              |
| Checkbox       | 7        | label / hint / required / error / disabled / checked / indeterminate                |
| CheckboxGroup  | 6        | legend / hint / required / error / disabled / 一部選択                              |
| Radio          | 7        | label / hint / description / required / error / disabled / checked                  |
| RadioGroup     | 7        | legend / hint / required / error / disabled / visually-hidden legend / descriptions |
| FileUpload     | 6        | label / hint / required / error / disabled / プレビュー                             |
| Combobox       | 6        | label / hint / required / error / disabled / multiple+chips                         |
| ColorPicker    | 3        | label / swatches / disabled                                                         |
| DatePicker     | 4        | 主要状態 (label / required / error / disabled)                                      |
| SearchBox      | 5        | label / suggestions / clearable / category 並置 / 必須                              |

### Navigation (17 件)

| コンポーネント      | ケース数 | カバー範囲                                                                               |
| ------------------- | -------- | ---------------------------------------------------------------------------------------- |
| HeaderContainer     | 7        | logoLabel / anchor logo / no menu toggle / 4 variants                                    |
| Drawer              | 6        | flat / title / nested / placement=right / placement=full / disabled item                 |
| Breadcrumb          | 4        | default / custom separator / aria-label / disabled item                                  |
| StepNavigation      | 4        | horizontal / vertical / non-clickable / 4 statuses                                       |
| Tab                 | 5        | horizontal / vertical / icons / disabled tab / keepAlive                                 |
| LanguageSelector    | 5        | closed / open / colorScheme / cornerShape / disabled                                     |
| MenuList            | 4        | flat / size=small / section dividers / accordion                                         |
| MenuListBox         | 6        | standalone / description+icon / active / disabled / opener 開閉                          |
| HamburgerMenuButton | 3        | default / icon-only / mobile-conditional バリアント                                      |
| UtilityLink         | 4        | single / icon+external / list / mixed external                                           |
| ScrollTopButton     | 2        | 表示 / 非表示状態                                                                        |
| GlobalMenu          | 4        | flat / active item / disabled / parent + children                                        |
| MegaMenu            | 4        | closed / open / aria-label / single-column                                               |
| PageNavigation      | 5        | first page / middle ellipses / first-last buttons / disabled / single page               |
| TableOfContents     | 4        | flat / nested / active / custom aria-label                                               |
| BottomNavigation 🚫 | 4        | button items / anchor items / aria-label / disabled item                                 |
| MobileMenu          | 6        | accordion 平坦 / utility / aria-label / close 非表示 / slide+nested / slide サブメニュー |

### Feedback (5 件)

| コンポーネント     | ケース数 | カバー範囲                                                             |
| ------------------ | -------- | ---------------------------------------------------------------------- |
| NotificationBanner | 9        | デフォルト + 5 色 / closable=false / color-chip / timestamp            |
| Dialog             | 5        | title+labelledby / header-slot fallback / persistent / footer / 4 size |
| Tooltip            | 7        | closed / open / 4 positions / disabled                                 |
| ProgressIndicator  | 4        | determinate linear / indeterminate / circular+label / boundaries       |
| EmergencyBanner    | 5        | message only / title+message / CTA / closable / external link          |

### Display (17 件)

| コンポーネント  | ケース数 | カバー範囲                                                                   |
| --------------- | -------- | ---------------------------------------------------------------------------- |
| Card            | 4        | outlined / header+footer / elevated / clickable                              |
| Heading         | 8        | h1〜h6 各 1 / shoulder+subtitle / icon                                       |
| Divider         | 4        | horizontal / vertical / label slot / aria-label                              |
| Table           | 5        | basic / caption / sticky / compact+bordered+striped / loading                |
| Accordion       | 5        | 全閉 / 単一展開 / multiple 複数展開 / disabled item / return link            |
| ChipLabel       | 2        | プレーン / 必須拡張                                                          |
| ChipTag         | 4        | plain / clickable / closable / outlined                                      |
| Chip            | 4        | plain / clickable / closable / disabled (clickable+closable は anti-pattern) |
| Disclosure      | 4        | collapsed / open / controlled / disabled                                     |
| DescriptionList | 4        | horizontal / vertical / bullet / bordered                                    |
| Image           | 3        | descriptive alt / decorative alt / caption (figure)                          |
| ImageSlider     | 4        | default / arrows+indicators / show-all link / no heading + aria-label        |
| Carousel        | 4        | single mode / aria-label / container+heading / multi mode                    |
| List            | 4        | flat unordered / nested / ordered / spacing                                  |
| Blockquote      | 3        | quote / cite / citeUrl                                                       |
| ResourceList    | 4        | basic / linked / style=list / thumbnails                                     |
| TableControl    | 2        | フィルタ / ソート連動                                                        |

## アイコン

`prependIcon` / `appendIcon` は Material Design Icons のクラス名を受け取る (例: `mdi-download`)。
利用側で別途 `@mdi/font` を入れる前提 (本パッケージにはフォントを含めない / R-2)。

## 依存

- `vue` (peer): `^3.4.0`
- それ以外の runtime dependency なし
