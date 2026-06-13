# @dads/vue

DADS (デジタル庁デザインシステム) の Vue 3 コンポーネントライブラリ。

> Status: **DADS 公式 44 件カバー + 独自 5 件 = 計 49 コンポーネント** (公式 46 中 ScrollTopButton / BottomNavigation は DADS が非推奨指定のため未収録) — Spec 1〜3 (Form-Inputs / Navigation-Menus / Display-Misc) + Figma 準拠化 + 命名整合 + 全件ギャップ解消 (High 9 / Medium 17 / Low 13) 完了 (〜2026-05-17) / 全コンポーネントが vitest-axe a11y テスト済 (100% カバレッジ)

## 特徴

- **Vue 3 のみに依存**: Vuetify / Pinia / Vue Router / Vue I18n などへの依存なし
- **WCAG 2.1 AA 準拠**: `aria-*` 属性・focus 制御・色コントラストを DADS 仕様どおり実装
- **CSS 変数フォールバック**: `@digital-go-jp/design-tokens` の CSS が読み込まれていなくても基本的な見た目で動作 (`var(--color-..., #fallback)` 形式)
- **Tree-shake 対応**: 個別 import 可 / ESM 出力 / `sideEffects: ["**/*.css", "**/*.scss"]`

## 収録コンポーネント (49 個 = DADS 公式 44 + 独自 5)

VitePress カタログの sidebar 分類 (4 カテゴリ) に揃えます。公式 46 中、ScrollTopButton / BottomNavigation は DADS が非推奨指定のため未収録。

| カテゴリ   | 件数 | コンポーネント                                                                                                                                                                                           |
| ---------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Form       | 13   | Button, InputText, Textarea, Select, Checkbox, CheckboxGroup\*, Radio, RadioGroup\*, FileUpload, Combobox, ColorPicker\*, DatePicker, SearchBox                                                          |
| Navigation | 15   | HeaderContainer, Drawer, Breadcrumb, StepNavigation, Tab, LanguageSelector, MenuList, MenuListBox, HamburgerMenuButton, UtilityLink, GlobalMenu, MegaMenu, PageNavigation, TableOfContents\*, MobileMenu |
| Feedback   | 5    | NotificationBanner, Dialog, Tooltip\*, ProgressIndicator, EmergencyBanner                                                                                                                                |
| Display    | 16   | Card, Heading, Divider, Table, Accordion, ChipLabel, ChipTag, Disclosure, DescriptionList, Image, ImageSlider, Carousel, List, Blockquote, ResourceList, TableControl                                    |

\* CheckboxGroup / RadioGroup / ColorPicker / Tooltip / TableOfContents は DADS 公式仕様にはない独自拡張 (5 件)。

## インストール

本パッケージは npm レジストリには公開されていません。**配布用 orphan ブランチ `vue-pkg` に push された tag を Git 経由で参照する形でインストール** します（npm / pnpm / yarn いずれも対応）。配布先は **GitHub** と **Backlog Git** の双方に同一 tag が push されます。

```bash
# Vue 3 本体 (peer)
npm install vue

# CSS 変数 (推奨) — 公式 npm から
npm install @digital-go-jp/design-tokens
```

### GitHub からインストール (パブリック)

```bash
# HTTPS 経由
npm install "git+https://github.com/dds-nakamura/dads-lib.git#vue-v0.1.0"

# SSH 経由 (~/.ssh/config に GitHub の鍵を登録済みの場合)
npm install "git+ssh://git@github.com:dds-nakamura/dads-lib.git#vue-v0.1.0"
```

### Backlog Git からインストール (社内利用)

```bash
npm install "git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git#vue-v0.1.0"
```

### 補足

- `#vue-v0.1.0` は配布用 tag（`vue-v<semver>` 命名規則）。利用側はブランチ名を意識する必要なし。
- 配布用 tag は `vue-pkg` ブランチ（main とは履歴を切り離した orphan ブランチ）に打たれる。詳細は下の「リリース手順」参照。
- GitHub / Backlog どちらの remote にも同じコミット ID で push されているため、tag の SHA は同一。
- Backlog SSH 認証用に `~/.ssh/config` を整備しておく（CI は Deploy Key を推奨）。
- 利用側の `package.json` には以下のように記録される（GitHub の場合）:
  ```jsonc
  {
    "dependencies": {
      "@dads/vue": "git+https://github.com/dds-nakamura/dads-lib.git#vue-v0.1.0",
      "@digital-go-jp/design-tokens": "^1.1.0",
    },
  }
  ```
  バージョンアップは tag 部分を書き換えて `npm install` するだけ。

## 使い方

```ts
// main.ts
import { createApp } from 'vue'
import '@digital-go-jp/design-tokens/dist/tokens.css' // CSS 変数を読み込む (推奨)
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

**全 49 コンポーネントが `vitest-axe` で WCAG 違反を自動検出するテスト済 (100% カバレッジ)**。各コンポーネントの主要状態 (label / hint / required / error / disabled / 主要バリアント) を網羅。

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

アイコンは **inline SVG の `DadsIcon`**（Google Material Symbols, outlined / weight 400）で描画する。
webfont は読み込まず、**使用アイコンのみ同梱**する（`@mdi/font` 依存は撤廃 / R-2 改訂）。

```vue
<DadsIcon name="search" :size="20" />
<DadsIcon name="open_in_new" :size="16" label="新しいタブで開く" />
```

- `prependIcon` / `appendIcon` / `iconName` / `triggerIcon` 等の icon 系 props は **Material Symbols 名**を受け取る (例: `search`, `keyboard_arrow_down`)。旧 `mdi-*` クラス名からの移行表は [`docs/quality/icon-mapping.md`](../../docs/quality/icon-mapping.md) を参照。
- 利用可能なアイコンはレジストリ (`src/components/Icon/icon-registry.ts`) に同梱されたもの。追加は `scripts/generate-icon-registry.mjs` で再生成する。
- 利用側でのフォント読み込みは不要。

## 依存

- `vue` (peer, 必須): `^3.4.0`
- `@digital-go-jp/design-tokens` (peer, optional): `^1.1.0` — CSS 変数を使う場合のみ
- それ以外の runtime dependency なし

## リリース手順 (メンテナ向け)

**main ブランチには dist を一切コミットしません**（差分ノイズ回避）。代わりに `vue-pkg` という **orphan ブランチ** に「`packages/vue/` の中身をルート直下に展開した状態」のスナップショットを置き、そこに `vue-v<semver>` の tag を打つ運用です。

### ブランチ構造

```
main         ← 開発履歴 (dist なし、現状の monorepo そのまま)
vue-pkg      ← orphan ブランチ (main とは履歴が独立)
              ├── package.json  (= packages/vue/package.json)
              ├── dist/         (ビルド成果物)
              ├── src/styles/   (SCSS 配布用)
              ├── README.md
              └── LICENSE
              tag: vue-v0.1.0, vue-v0.1.1, ...
```

利用側は **tag のみを参照** する（ブランチ名は知る必要なし）。

### リリースコマンド

```bash
# リポジトリルートで実行
# (a) origin (GitHub) のみに配布
./scripts/release-vue.sh 0.1.0

# (b) GitHub + Backlog の両 remote に同一 tag を配布
./scripts/release-vue.sh 0.1.0 origin,backlog
```

スクリプトが行うこと:

1. `pnpm --filter @dads/vue build` でビルド
2. `packages/vue/` の配布対象ファイル（dist / src/styles / package.json / README.md / LICENSE）を一時ディレクトリにステージング
3. リポジトリを temp dir に clone し、そこで `vue-pkg` ブランチをチェックアウト（無ければ orphan ブランチとして新規作成）
4. ステージング内容を `vue-pkg` ブランチに全置換 → commit
5. `vue-v<version>` tag を打って指定された全 remote に push
6. main ブランチ側にも tag を fetch して可視化

### 既存 tag を別 remote に後追い配布する

最初に GitHub だけにリリースしておき、後から Backlog を追加した場合は、ローカルに同期した tag を手動 push します（再ビルド不要）。

```bash
git remote add backlog git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git
git fetch backlog
git push backlog vue-pkg vue-v0.1.0
```

メリット:

- ✅ main の `git log` / `git diff` に dist 由来の差分が出ない
- ✅ GitHub / Backlog Git どちらの remote でも同じ tag を使える
- ✅ npm / pnpm / yarn どれでも利用側から install 可能
- ✅ tag rollback は `git push --delete <remote> vue-v0.1.0` で完結
