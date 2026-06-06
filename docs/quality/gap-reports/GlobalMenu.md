# Gap Report: `DadsGlobalMenu`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/GlobalMenu/DadsGlobalMenu.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/global-menu/global-menu.css` / `dads-document-md/dads/components/global-menu/index.md` |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 4 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)` / `font-size:16/16rem` / `font-weight:bold` / `line-height:1.3` / `letter-spacing:0`。item-inner `font:inherit` | `font-family: var(--font-family-sans)` を root に。`.dads-global-menu` `font-weight:bold`/`1rem`(=16px)/`1.3`/`letter-spacing:0`。item-inner `font:inherit` | ✅ | 完全一致 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | menu text `var(--color-neutral-solid-gray-900)`。bottom border `var(--color-neutral-solid-gray-420)`。hover bg `var(--color-neutral-solid-gray-50)` + `border-bottom 2px var(--color-neutral-black)`。current bg `var(--color-neutral-white)` / text `var(--color-primitive-blue-1000)` / underline `4px var(--color-primitive-blue-900)`。current hover text `blue-900` | 全て同一トークンを使用 (solid-gray-900/420/50, neutral-black/white, primitive-blue-1000/900) | ✅ | 公式トークンに完全一致。全 var() 上流存在を確認済 |
| 角丸 (`--border-radius-*`) | item-inner 自体に border-radius なし。focus-visible のみ `4/16rem`(=4px) | item-inner に border-radius なし。focus-visible は共有 mixin で `outline-offset:0`、border-radius 付与なし | ⚠️ | 公式 focus-visible は `border-radius:4/16rem` を付与 (黄背景の角丸)。Vue 共有 mixin にはこの border-radius が無い |
| スペーシング (padding / gap / margin: `--spacing-*`) | item-inner padding `16/16rem 20/16rem`(=1rem 1.25rem) / gap `4/16rem`。min-height `64/16rem`(=4rem)。front-icon `24/16rem`。chevron `16/16rem` + `margin-top 4/16rem` | item-inner padding `1rem 1.25rem` / gap `0.25rem`。min-height `4rem`。front-icon `1.5rem`(=24px)。chevron `1rem` + `margin-top:.25rem` | ✅ | 全数値一致。直値だが公式 example も calc 直値 (`--spacing-*` トークンは上流非存在) のため準拠 |
| エレベーション / 影 (`--elevation-*`) | なし (box-shadow は focus-visible のみ) | なし (box-shadow は focus mixin のみ) | ✅ | 該当なし。一致 |
| ボーダー (太さ / 色 / 有無) | menu `border-bottom:1px solid solid-gray-420`。hover `::after border-bottom:2px black`。current `::after border-bottom:4px blue-900`。item-inner `border:0` | menu `border-bottom:1px solid solid-gray-420`。hover `::after 2px black`。current `::after 4px blue-900`。item-inner `border:0` | ✅ | 完全一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: bg gray-50 + 2px black underbar。current: `[aria-current]` (値問わず) bg white/text blue-1000/4px blue-900 underbar。current focus-visible: bg white に戻す。expanded: chevron rotate180。**disabled の規定なし** | hover: `:not([aria-disabled]):not(:disabled):hover` で bg gray-50 + underbar。current: `[aria-current='page']` 限定。expanded: rotate180。**disabled を独自実装** (`opacity:.5; cursor:not-allowed; pointer-events:none`)。current focus-visible の bg white 戻し処理なし | ⚠️ | (1) current セレクタが公式 `[aria-current]` に対し Vue は `[aria-current='page']` 限定 (公式は値非依存)。(2) 公式の `[aria-current]:focus-visible { background-color: white }` 上書きが Vue に無い (focus 時に current 背景が黄で潰れる)。(3) disabled は公式非規定 → Vue 独自拡張 (許容)。(4) hover が disabled 除外条件付き |
| サイズバリアント (sm/md/lg 等) | 該当なし | 該当なし | ✅ | 一致 |
| forced-colors / ハイコントラスト | 公式 global-menu.css に forced-colors 指定 **なし** | `dads-forced-colors` mixin で `border-bottom:CanvasText`、current `color:Highlight`+underbar Highlight、disabled `GrayText` を独自付与 | ✅ | 公式に無いが Vue が a11y 強化。望ましい方向の独自対応で許容 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | プレーン CSS。`item-inner` を `<a>`/`<button>` 両方に適用。共有 button 部品は使わず自己完結 | 同構造を Vue で再現 (`isAnchor`/`hasChildren` ロジックで a/button 切替)。`reset-button`/`focus-ring` mixin のみ内部流用。クラス名・セレクタ構造とも example と一致 | ✅ | 構造ドリフトなし。example の HTML 構造・クラス名を忠実に保持 |

## 検出した差異 (修正対象)

1. **[low]** 状態(current セレクタ): 公式は `[aria-current]` (属性値問わず) でカレント装飾。Vue は `[aria-current='page']` 限定。`step`/`true` 等の aria-current 値ではカレント装飾が当たらない。
   - 該当行: `DadsGlobalMenu.vue:178` (`&__item-inner[aria-current='page']`)
2. **[low]** 状態(current + focus-visible): 公式は `[aria-current]:focus-visible { background-color: var(--color-neutral-white) }` で current の白背景を維持。Vue にこの上書きが無く、focus 時に黄 (focus-ring) 背景が current 背景を潰す。
   - 該当行: `DadsGlobalMenu.vue:178-199` (current ブロックに focus-visible 上書きなし)
3. **[low]** 角丸(focus-visible): 公式 focus-visible は `border-radius: 4/16rem` を付与。Vue 共有 mixin は border-radius を付けない (角丸なし矩形のフォーカス背景)。
   - 該当行: `DadsGlobalMenu.vue:109` (`@include ring.dads-focus-ring`) / 大本 `packages/vue/src/styles/_focus-ring.scss`
4. **[low]** 状態(focus-visible 全般): 公式 `outline:4px solid black; outline-offset:2px; box-shadow:2px yellow-300` に対し Vue 共有 mixin は `outline:2px; offset:0; box-shadow:4px` (太さが逆)。全コンポ横断課題。
   - 該当行: `_focus-ring.scss:11-14`

## ハードコード / 誤トークンの洗い出し

- 直書きカラーなし。全 var() フォールバックは正規トークン値の二重指定 (例: `var(--color-primitive-blue-1000, #001a59)`) で許容範囲。
- 角丸・スペーシングは直値だが公式 example も calc 直値で記述しており (`--spacing-*` 系は上流非存在)、example 準拠。
- 全 var() は上流 tokens.css に定義済 (solid-gray-50/420/900, neutral-black/white, primitive-blue-900/1000, primitive-yellow-300, font-family-sans すべて検証済)。誤トークンなし。

## 結論

- **修正要否: 任意 (low)**。タイポ・カラー・スペーシング・ボーダー・構造は公式に完全一致。example の HTML 構造を忠実に再現しドリフトなし。
- **優先度: 低**。current セレクタ (#1) と current-focus 背景維持 (#2) は実害が出るケースが限定的 (aria-current='page' 運用が大半 / focus 時のみ)。focus-ring 系 (#3,#4) は横断課題。
- **想定 changeset レベル: patch**。current セレクタを `[aria-current]` 化 + current focus-visible 上書き追加は CSS のみで API・aria 不変。
- **API / aria 不変: 保てる**。修正は全て CSS。props (`items`/`ariaLabel`) と aria 出力 (aria-current/aria-haspopup/aria-expanded) は変更不要。
