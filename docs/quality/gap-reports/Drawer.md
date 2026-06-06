# Gap Report: `DadsDrawer`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Drawer/DadsDrawer.vue` + `DadsDrawerItem.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/drawer/drawer.css` / `playground.html` / `drawer.mdx` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 9 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`, `font-size: calc(16/16*1rem)` (=1rem), `font-weight: normal`, `line-height: 1.7`, `letter-spacing: 0.02em` | panel: `font-family: var(--font-family-sans …)`, `color: …`。`__title` `font-size: var(--font-size-18,1.125rem)` `font-weight:700`。`__item-button` `font-size: var(--font-size-16,1rem)` `line-height: var(--line-height-150,1.5)` | ❌ | **line-height が不一致**: 公式 drawer は `1.7` (=`--line-height-170`)、Vue は `1.5`。公式は `letter-spacing: 0.02em` を持つが Vue に無し。公式は本文 16px/weight normal、Vue の `__title` は独自に 18px/700 (公式 drawer 本体にタイトル text スタイル定義なし) |
| カラー (背景 / 文字 / ボーダー: トークン参照) | panel bg `var(--color-neutral-white)`、text `var(--color-neutral-solid-gray-800)`、backdrop `var(--color-neutral-opacity-gray-100)` (いずれも実在トークン) | overlay `background-color: rgba(0,0,0,0.5)` (直書き!)、panel bg `var(--color-bg-primary, #fff)`、text `var(--color-text-primary, #1a1a1a)`、hover `var(--color-bg-subtle, #f5f5f5)`、border `var(--color-border-divider, #e5e5e5)` | ❌ | **全カラーが非実在トークン or 直書き**。公式は `--color-neutral-white` / `--color-neutral-solid-gray-800` / `--color-neutral-opacity-gray-100` を使うが、Vue は `--color-bg-primary`/`--color-text-primary`/`--color-bg-subtle`/`--color-border-divider` (すべて**非実在**) とフォールバック直値、overlay は `rgba(0,0,0,0.5)` 完全直書き (公式 backdrop は opacity-gray-100 = rgba(0,0,0,0.1)) |
| 角丸 (`--border-radius-*`) | 公式 drawer に角丸指定なし (パネルは直角) | `__close` に `border-radius: var(--border-radius-4, 0.25rem)` (実在トークン) | ⚠️ | 公式 drawer パネル/閉じるボタン (hamburger-menu-button) に角丸定義なし。Vue は close ボタンに 4px 角丸を独自付与。`--border-radius-4` は実在トークンで値は妥当だが公式に無い装飾 |
| スペーシング (padding / gap / margin: `--spacing-*`) | header `padding: calc(20/16*1rem) calc(16/16*1rem)` (=20px 16px)。body padding は利用側 (playground は 1rem) | header `padding: var(--spacing-16,1rem)` (=16px 全方向)、item-button `padding: var(--spacing-12,.75rem) var(--spacing-16,1rem)`、nav `padding: var(--spacing-8,.5rem) 0` | ❌ | **header padding 不一致**: 公式は縦 20px 横 16px、Vue は全方向 16px。`--spacing-*` は全て**非実在トークン**でフォールバックに落ちる。item/nav padding は公式に対応構造が無い (公式は item リストを持たない) |
| エレベーション / 影 (`--elevation-*`) | panel `box-shadow: var(--elevation-2)` (= `0 2px 12px 2px rgba(0,0,0,0.1), 0 1px 6px 0 rgba(0,0,0,0.3)`、実在トークン) | panel `box-shadow: 0 0 16px rgba(0,0,0,0.2)` (完全直書き) | ❌ | **影が公式と全く別物**。公式は 2 層の `--elevation-2` トークン、Vue は単層 `0 0 16px rgba(0,0,0,0.2)` の直書き。`var(--elevation-2)` に置換すべき |
| ボーダー (太さ / 色 / 有無) | `border: 0`。placement 別に `border-left/right: 1px solid transparent` (レイアウト用透明境界) | panel ボーダーなし、`__header` に `border-bottom: 1px solid var(--color-border-divider, #e5e5e5)` | ⚠️ | 公式 panel に header 下線は無い。Vue は独自に header bottom border を追加。border 色トークンも非実在 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 公式 drawer.css に hover/focus 定義なし (開閉は hamburger-menu-button 側、focus は dialog のブラウザ既定 + global) | close/item-button に `dads-focus-ring` mixin、hover `background-color: var(--color-bg-subtle …)`、disabled `opacity:.5; cursor:not-allowed`、details[open] chevron `rotate(180deg)` | ⚠️ | Vue 独自の item リスト機能に伴う状態スタイル。公式 drawer はコンテナのみで item ナビ機能を持たないため直接比較不可。focus-ring の値差は他コンポーネントと同様 (mixin は outline 2px/shadow 4px) |
| サイズバリアント (sm/md/lg 等) | 幅 `calc(288/16*1rem)` (=288px) 固定。`data-placement: left / right` の 2 種 (MD はフル含む 3 種記載だが example CSS は left/right のみ) | panel `width: min(20rem, 80vw)` (=320px 上限)。placement `left / right / full` の 3 種 | ❌ | **幅が不一致**: 公式 288px 固定、Vue 320px (20rem) 上限 + 80vw。`full` は MD に記載あるが example CSS 未実装 (Vue は独自実装)。height は公式 `100dvh`、Vue `100%` |
| forced-colors / ハイコントラスト | `@media (forced-colors: active){ .dads-drawer::backdrop{ background-color:#000b } }` | `dads-forced-colors { __panel{ border:1px solid CanvasText } __item-button{ border:1px solid transparent } }` | ⚠️ | 公式は backdrop を `#000b` (約 73% 黒) に。Vue は backdrop の forced-colors 対応なし、代わりに panel/item に border を付与。観点が異なり公式の backdrop 対応が欠落 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `<dialog class="dads-drawer">` (ネイティブ dialog + `showModal()` + Invoker Commands API)。閉じるは `hamburger-menu-button` 共有部品。body は単純コンテナ | `<Teleport>` + `<div role=dialog aria-modal>` + 独自 overlay + 独自フォーカストラップ + `DadsDrawerItem` 再帰ナビ + mdi アイコン | ❌ | **最重要ドリフト**: 公式は `<dialog>` ネイティブ要素 (::backdrop / showModal / inert を OS 任せ)、Vue は `<div role=dialog>` + 手書きフォーカストラップ + 手書き overlay。さらに公式に存在しない **item ナビ機能 (DadsDrawerItem) を全面独自実装**。閉じるボタンも公式の `hamburger-menu-button` 共有部品ではなく mdi-close アイコンを独自使用 |

## 検出した差異 (修正対象)

1. **[high]** エレベーション: 公式 `box-shadow: var(--elevation-2)` (2 層トークン) → 現状 `box-shadow: 0 0 16px rgba(0,0,0,0.2)` 直書き。`var(--elevation-2)` に置換。
   - 該当行: `DadsDrawer.vue:153`
2. **[high]** カラー(backdrop/overlay): 公式 backdrop `var(--color-neutral-opacity-gray-100)` (=rgba(0,0,0,0.1)) → 現状 overlay `rgba(0,0,0,0.5)` 直書き。色・濃度とも不一致。
   - 該当行: `DadsDrawer.vue:141`
3. **[high]** カラートークン総替え: panel bg → `--color-neutral-white`、text → `--color-neutral-solid-gray-800`。現状 `--color-bg-primary`/`--color-text-primary` は非実在トークン。
   - 該当行: `DadsDrawer.vue:135`, `DadsDrawer.vue:152`, `DadsDrawer.vue:205`, `DadsDrawer.vue:255`
4. **[high]** 構造(ネイティブ dialog): 公式は `<dialog>` + `showModal()` + `::backdrop`。Vue は `<div role=dialog>` + 手書き overlay/focus-trap。`<dialog>` ベースへの寄せでドリフトと a11y リスク (focus-trap 自前実装) を解消すべき。
   - 該当行: `DadsDrawer.vue:84-122`
5. **[medium]** 幅: 公式 288px 固定 → 現状 `min(20rem,80vw)` (320px)。公式の 288px (=18rem) に合わせる。
   - 該当行: `DadsDrawer.vue:149`
6. **[medium]** line-height / letter-spacing: 公式 `line-height:1.7` (`--line-height-170`) + `letter-spacing:0.02em` → 現状 `--line-height-150` (1.5)、letter-spacing なし。
   - 該当行: `DadsDrawer.vue:192`, `DadsDrawer.vue:258` (line-height-150), panel に letter-spacing 欠落 `DadsDrawer.vue:129-135`
7. **[medium]** header padding: 公式 `20px 16px` → 現状 `var(--spacing-16)` (16px 全方向)。
   - 該当行: `DadsDrawer.vue:184`
8. **[medium]** forced-colors(backdrop): 公式は backdrop を `#000b` に強調。Vue は backdrop の forced-colors 対応が欠落 (overlay は単なる div)。
   - 該当行: `DadsDrawer.vue:294-302` (overlay 未対応)
9. **[low]** 閉じるボタン: 公式は `hamburger-menu-button` 共有部品 (×アイコン SVG)。Vue は `mdi-close` フォントアイコン + 独自スタイル。共有部品流用が望ましい。
   - 該当行: `DadsDrawer.vue:100-107`

## ハードコード / 誤トークンの洗い出し

- `DadsDrawer.vue:141` — `background-color: rgba(0, 0, 0, 0.5)` (overlay 完全直書き。公式 backdrop は opacity-gray-100 = rgba(0,0,0,0.1))
- `DadsDrawer.vue:153` — `box-shadow: 0 0 16px rgba(0, 0, 0, 0.2)` (完全直書き。公式は var(--elevation-2))
- `DadsDrawer.vue:135`,`:152`,`:205`,`:255` — `var(--color-text-primary, #1a1a1a)` / `var(--color-bg-primary, #fff)` (非実在トークン + 直書きフォールバック)
- `DadsDrawer.vue:185`,`:209`,`:261` — `var(--color-border-divider, #e5e5e5)` / `var(--color-bg-subtle, #f5f5f5)` (非実在トークン)
- `DadsDrawer.vue:183`,`:184`,`:216`,`:252`,`:254`,`:290` — `var(--spacing-8/12/16/32 …)` (非実在トークン、全てフォールバックに落ちる)
- `DadsDrawer.vue:149` — `width: min(20rem, 80vw)` (320px 直書き。公式 288px)
- `DadsDrawer.vue:206`,`:273`,`:284` — `font-size: 1.5rem` / `1.25em` (アイコンサイズ直書き)
- `DadsDrawer.vue:204` — `width: 2.5rem; height: 2.5rem` (close ボタンサイズ直書き)
- 注: `var(--font-family-sans …)`・`var(--font-size-16/18 …)`・`var(--line-height-150 …)`・`var(--border-radius-4 …)` は実在トークンで許容

## 結論

- 修正要否: **要修正 (優先度高)**。エレベーション・backdrop・カラートークンが直書き/非実在トークンで公式と乖離し、さらにネイティブ `<dialog>` を使わず手書き focus-trap で再実装している点が a11y/保守の最大リスク。
- 優先度: high。token 直書き 3 件 (elevation/overlay/bg) と幅 288px は patch で是正可能。`<dialog>` ベースへの寄せ・item ナビ機能 (DadsDrawerItem) の扱いは設計判断 (公式 drawer は item 機能を持たない)。
- 想定 changeset レベル: **patch (CSS トークン是正のみ)** 〜 **major (構造を `<dialog>` ベースへ刷新 + item API 見直し)**。最小修正 (token/elevation/幅/backdrop) なら patch で DOM・props 不変を保てる。構造刷新まで踏み込むと major。
- API/aria 不変: **最小修正なら保てる** (CSS のみ)。`<dialog>` 化や DadsDrawerItem の整理に踏み込む場合は props/slot/aria の破壊的変更を伴う。
