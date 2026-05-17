# Design — DADS Vue Figma 準拠化

- Spec ID: `2026-05-17-dads-vue-figma-compliance`
- Depends on: `./requirements.md`
- Status: **Done (2026-05-17)**

---

## 1. 全体アプローチ

3 Wave で完結:

| Wave | 優先度 | スコープ                                                   |
| ---- | ------ | ---------------------------------------------------------- |
| 1    | High   | DadsPageNavigation rename + 新 pagination 実装 + docs      |
| 2    | Medium | DadsTab.orientation + DadsChip.leading slot                |
| 3    | Low    | DadsImage.loading skeleton + DadsTableControl.preset/reset |

各 Wave 後に **`pnpm typecheck && pnpm lint && pnpm test && pnpm build`** を実行。

---

## 2. Wave 1: PageNavigation の再構成

### 2.1 リネーム手順

```bash
# 1. ディレクトリ移動 (git mv で履歴保持)
git mv packages/vue/src/components/PageNavigation packages/vue/src/components/TableOfContents

# 2. ファイル名変更
cd packages/vue/src/components/TableOfContents
git mv DadsPageNavigation.vue DadsTableOfContents.vue
git mv DadsPageNavigation.types.ts DadsTableOfContents.types.ts
git mv __tests__/DadsPageNavigation.test.ts __tests__/DadsTableOfContents.test.ts
```

ファイル内容の置換:

- `DadsPageNavigation` (型/コンポーネント名) → `DadsTableOfContents`
- `dads-page-navigation` (CSS class) → `dads-table-of-contents`
- `pageNavigation` (camelCase) → `tableOfContents`
- import path 内の `./DadsPageNavigation.types` → `./DadsTableOfContents.types`

### 2.2 新 DadsPageNavigation (pagination)

```
packages/vue/src/components/PageNavigation/
├── DadsPageNavigation.vue
├── DadsPageNavigation.types.ts
├── __tests__/DadsPageNavigation.test.ts
└── index.ts
```

#### DOM 構造

```html
<nav aria-label="ページ送り" class="dads-page-navigation">
  <ul class="dads-page-navigation__list">
    <li>
      <button
        class="dads-page-navigation__btn dads-page-navigation__btn--prev"
        aria-label="前のページ"
        :disabled="modelValue === 1"
      >
        <i class="mdi mdi-chevron-left" /> 前のページ
      </button>
    </li>
    <li v-for="p in pages">
      <button
        class="dads-page-navigation__btn dads-page-navigation__btn--page"
        :aria-current="p === modelValue ? 'page' : undefined"
        :class="{ 'is-active': p === modelValue }"
      >
        {{ p }}
      </button>
      <!-- 省略表示の場合 -->
      <span class="dads-page-navigation__ellipsis" aria-hidden="true">…</span>
    </li>
    <li>
      <button
        class="dads-page-navigation__btn dads-page-navigation__btn--next"
        aria-label="次のページ"
        :disabled="modelValue === totalPages"
      >
        次のページ <i class="mdi mdi-chevron-right" />
      </button>
    </li>
  </ul>
</nav>
```

#### Page number truncation algorithm

`maxPageButtons` 個まで表示。両端 + 現在ページ前後を残す。

```text
totalPages=10, maxPageButtons=7, current=1: [1] 2 3 4 5 … 10
totalPages=10, maxPageButtons=7, current=5: 1 … 4 [5] 6 … 10
totalPages=10, maxPageButtons=7, current=10: 1 … 6 7 8 9 [10]
totalPages=3, maxPageButtons=7: [1] 2 3 (省略なし)
totalPages=1: [1] (Prev/Next disabled)
```

実装は `computed` で `(number | 'ellipsis')[]` を返す helper を作る:

```ts
function computePages(current: number, total: number, max: number): Array<number | 'ellipsis'> {
  // max=0 → ページ番号非表示
  if (max <= 0) return []
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1)
  // ...
}
```

#### SCSS

design-tokens 経由で色・spacing を取得:

- 通常: `--color-neutral-white` 背景 / `--color-primitive-blue-900` テキスト
- アクティブ: `--color-primitive-blue-900` 背景 / 白テキスト
- hover: `--color-neutral-solid-gray-50` 背景
- focus: `dads-focus-ring` mixin (既存)

### 2.3 テスト設計 (新 DadsPageNavigation)

- 単一ページ (totalPages=1) で Prev/Next が disabled
- 1 から N まで全ボタンが描画される (totalPages ≤ maxPageButtons)
- 省略 (…) が正しい位置に挿入される (totalPages > maxPageButtons, current=middle)
- 端での省略 (current=1 / current=total)
- クリックで `update:modelValue` / `change` が emit される
- Prev クリックで current-1、Next クリックで current+1
- `disabled` prop で全ボタン inert
- `aria-current="page"` が現在ページのみに付く
- `showFirstLast=true` で << / >> ボタン追加
- `maxPageButtons=0` でページ番号非表示 (Prev/Next のみ)
- ariaLabel カスタム
- a11y axe (オプション)

### 2.4 export / docs

#### `packages/vue/src/index.ts`

```ts
export * from './components/PageNavigation' // 新 pagination
export * from './components/TableOfContents' // 旧 TOC (リネーム後)
```

#### `apps/docs/.vitepress/config.ts`

sidebar:

```ts
{ text: 'PageNavigation', link: '/components/page-navigation' },       // 既存リンク維持 (中身が pagination に変わる)
{ text: 'TableOfContents', link: '/components/table-of-contents' },    // 新規
```

#### `apps/docs/components/`

- `page-navigation.md` を pagination 仕様に書き換え (1 ページ分のフルデモ)
- `table-of-contents.md` を新規作成 (旧 page-navigation.md からの移植)

---

## 3. Wave 2: DadsTab + DadsChip

### 3.1 DadsTab.orientation

`DadsTab.types.ts`:

```ts
export type DadsTabOrientation = 'horizontal' | 'vertical'

export interface DadsTabItem {
  value: DadsTabValue
  label: string
  icon?: string // mdi class名。Figma の icon-prefixed tab 対応
  disabled?: boolean
}

export interface DadsTabProps {
  modelValue: DadsTabValue
  items: DadsTabItem[]
  orientation?: DadsTabOrientation // default: 'horizontal'
  keepAlive?: boolean
  ariaLabel?: string
}
```

`DadsTab.vue`:

- `<div role="tablist" :aria-orientation="props.orientation">`
- horizontal: `ArrowLeft` / `ArrowRight` で循環
- vertical: `ArrowUp` / `ArrowDown` で循環
- スタイル: `.dads-tab--vertical` で flex-direction: column / 左右 border 配置

### 3.2 DadsChip.leading slot

`DadsChip.vue` template:

```vue
<template>
  <component :is="rootTag" v-bind="rootAttrs" class="dads-chip ...">
    <span v-if="$slots.leading" class="dads-chip__leading">
      <slot name="leading" />
    </span>
    <span class="dads-chip__label"><slot /></span>
    <button v-if="closable" class="dads-chip__close" ...>×</button>
  </component>
</template>
```

SCSS:

- `.dads-chip__leading { display: inline-flex; align-items: center; flex-shrink: 0; }`
- `gap: 0.25rem` (chip 全体)

---

## 4. Wave 3: DadsImage skeleton + DadsTableControl preset/reset

### 4.1 DadsImage skeleton

```ts
export interface DadsImageProps {
  // ... 既存 ...
  showSkeleton?: boolean // default: true
}
```

実装:

- `loaded` ref を `<img @load>` で `true` に
- skeleton は `position: absolute` で `<img>` の上に重ね、`loaded=true` で `opacity: 0` にトランジション
- skeleton 色: `--color-neutral-solid-gray-50`

### 4.2 DadsTableControl preset/reset

```ts
export interface DadsTableControlPreset {
  label: string
  query: string
}

export interface DadsTableControlProps {
  // ... 既存 ...
  presets?: DadsTableControlPreset[]
  showReset?: boolean // default: true
}

export interface DadsTableControlEmits {
  // ... 既存 ...
  (e: 'click:preset', preset: DadsTableControlPreset): void
}
```

UI:

- 検索ボックス横に Reset ボタン (アイコン only, aria-label="検索条件をリセット")
- presets は検索ボックス下にチップ風ボタンで横並び
- preset クリックで `searchQuery` 更新 + `click:preset` emit

---

## 5. 検証

各 Wave 後:

```bash
pnpm -w run typecheck
pnpm -w run lint
pnpm --filter @dads/vue test
pnpm --filter @dads/docs build
```

Wave 1 後の期待:

- test 件数: 1542 → 約 1560 (新 pagination の 15-20 件追加)
- docs HTML: 49 → 50 (TableOfContents 追加)

---

## 6. コミット戦略

| Wave  | コミットメッセージ                                                      |
| ----- | ----------------------------------------------------------------------- |
| **1** | `refactor(@dads/vue): rename DadsPageNavigation to DadsTableOfContents` |
| **1** | `feat(@dads/vue): add DadsPageNavigation (pagination per Figma spec)`   |
| **2** | `feat(@dads/vue): add orientation prop and icon support to DadsTab`     |
| **2** | `feat(@dads/vue): add leading slot to DadsChip`                         |
| **3** | `feat(@dads/vue): add loading skeleton to DadsImage`                    |
| **3** | `feat(@dads/vue): add presets and reset to DadsTableControl`            |

最後に総括:

- `chore: update README/CLAUDE.md component count (49 → 50)`

---

## 7. リスク再評価

| リスク                                     | 兆候                        | 対策                                                       |
| ------------------------------------------ | --------------------------- | ---------------------------------------------------------- |
| リネームで import 残漏れ                   | typecheck error / test 失敗 | リネーム完了直後に `grep -r DadsPageNavigation packages/`  |
| 新 pagination の省略アルゴリズム境界バグ   | テスト失敗                  | 表形式の境界テストを最初に書いて TDD                       |
| DadsTab vertical でフォーカス管理が壊れる  | a11y axe 失敗               | 既存 horizontal テストを vertical でも parametric に再実行 |
| DadsChip leading slot が既存スタイルを壊す | スナップショット差分        | leading なしのケースで既存スナップショット維持             |
