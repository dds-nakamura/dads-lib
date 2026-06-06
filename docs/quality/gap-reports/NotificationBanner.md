# Gap Report: `DadsNotificationBanner`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/NotificationBanner/DadsNotificationBanner.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/notification-banner/` (`notification-banner.css`, `info-1.html`, `mobile-compact.html`) |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 13 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | body: `font-size: 1rem` / `line-height: 1.7` / `letter-spacing: 0.02em` / `font-family: var(--font-family-sans)`。heading-text: `font-size: 17/16rem`(SP)→`20/16rem`(PC) `font-weight: bold` `line-height: 1.7→1.5` (css:13-19,109-124) | body line-height `var(--line-height-150,1.5)`、letter-spacing なし。title `font-size: var(--font-size-16,1rem)`/`font-weight:700` 固定 (.vue:162-164,180-195) | ❌ | line-height 1.5→1.7、letter-spacing 0.02em 欠落、title が 17/20px へレスポンシブ拡大しない。公式値へ合わせる |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 背景: `--color-neutral-white`。文字: `--color-neutral-solid-gray-800`。アクセント色 `--_base-color`: info-1=`--color-primitive-blue-900`, info-2=`--color-neutral-solid-gray-536`, success=`--color-semantic-success-2`, error=`--color-semantic-error-1`, warning border=`--color-semantic-warning-yellow-2` / chip=`--color-primitive-yellow-400` (css:1-19,49-72) | 背景に存在しないトークン `--color-success-bg`/`--color-info-bg` 等を使用、border-color に `--color-success`/`--color-info` 等。`neutral` という公式に無いタイプを追加 (.vue:132-153,234-237) | ❌ | DADS には `--color-success-bg`/`--color-info`/`--color-brand-*` トークンは無い。公式の `--color-primitive-*` / `--color-semantic-*` / `--color-neutral-*` へ全面置換。背景は white 固定が正、tinted 背景は誤り |
| 角丸 (`--border-radius-*`) | standard: `12/16rem` (=0.75rem)。color-chip: 角丸指定なし(0) (css:23,27-31) | 全タイプ `var(--border-radius-4, 0.25rem)` (.vue:160) | ❌ | standard は 12px (0.75rem) が正。4px は誤り。`--border-radius-12` 相当へ |
| スペーシング (padding / gap / margin: `--spacing-*`) | SP: padding `8/24/16/16`(T/B/L/R 相当) gap `16`。PC(48rem~): padding `24/32/24/24` column-gap `24`。本文 row-gap `8`、actions gap `8`(SP)/`16`(PC) (css:9-13,33-41,197-235) | padding `var(--spacing-12) var(--spacing-16)` gap `var(--spacing-12)` 固定。レスポンシブ無し。本文 margin `--spacing-4` (.vue:158-159,189,198) | ❌ | 公式は上下非対称 padding + 48rem ブレークポイントで拡大。現状は固定で全く異なる |
| エレベーション / 影 (`--elevation-*`) | color-chip の左アクセントを `box-shadow: inset 8/16rem 0 0 0 var(--_color-chip-color)` で表現 (SP 8px / PC 16px)。それ以外影なし (css:30,45) | box-shadow 不使用。color-chip を `border-inline-start: 4px solid` で代用 (.vue:245) | ❌ | 公式は inset box-shadow(8px→16px)。border-left 4px 固定は太さも手法も不一致 |
| ボーダー (太さ / 色 / 有無) | standard: `border-width: 3/16rem`(=3px) solid アクセント色。color-chip: `border-width: 2/16rem`(=2px) (css:7,24,28) | `border: 1px solid transparent` ベース、standard で border-color のみ上書き(太さ 1px のまま)。color-chip は `1px solid --color-border-default` (.vue:161,237,244) | ❌ | standard 3px / chip 2px が正。1px は誤り。`--color-border-default` は公式に無いトークン |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | close: hover `bg --color-neutral-solid-gray-50` + underline。focus-visible `outline 4px solid black` + `offset 2px` + `bg --color-primitive-yellow-300` + `box-shadow 0 0 0 2px yellow-300`。mobile-close 別途あり (css:145-189) | close hover `background-color: rgba(0,0,0,0.06)` (直書き)。focus は共有 `dads-focus-ring`(outline 2px black + box-shadow 4px yellow) (.vue:223-225) | ❌ | hover 背景がハードコード rgba。focus の outline 太さ(2px vs 4px)/offset/yellow 背景塗りが公式と差異。mobile-close 状態未実装 |
| サイズバリアント (sm/md/lg 等) | サイズ prop は無し。レスポンシブ(SP/PC)でアイコン 28px→44px 等が変化 (css:74-92) | size バリアント無し(公式同様)。ただしレスポンシブ拡大も無い (.vue 全般) | ⚠️ | サイズ prop が無い点は一致。ただし 48rem ブレークポイントでの寸法変化が欠落 |
| forced-colors / ハイコントラスト | アイコン `color: currentcolor`(94-98)。close 系 focus-visible は通常通り。明示の border 追加は無し | `@media (forced-colors: active) { border: 1px solid CanvasText }` (.vue:256-258) | ⚠️ | 公式はアイコンを currentcolor 化するのみ。Vue 独自に border 追加。挙動方針が異なる(致命的ではない) |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | DOM は `<h2 class="__heading">`(必須見出し) + icon を heading 内 SVG、本文 `__body`、`__actions` に `.dads-button`(共有部品) を 2 つ。close は inline SVG + visible ラベル span | `<div role>` ルート + `<p __title>`/`<p __message>`/`__timestamp`、icon は mdi フォント `<i>`、action は名前付き slot 任せ、close は `mdi-close` の icon-only ボタン (.vue:89-122) | ❌ | **最重要ドリフト**: 見出しが `<h2>` 必須なのに `<p>` (MD「バナータイトルは必須構成要素」)。共有 `.dads-button` を type 連動トークン(css:241-279)で着色する構造を完全に欠落。mdi 依存で公式 inline SVG と乖離 |

## 検出した差異 (修正対象)

1. **[high]** カラー: 公式に存在しないトークン (`--color-success-bg`/`--color-info`/`--color-info-bg`/`--color-text-secondary` 等) を多用。`--color-primitive-*` / `--color-semantic-*` / `--color-neutral-*` へ置換。
   - 該当行: `DadsNotificationBanner.vue:132-153`, `:200`, `:243-244`
2. **[high]** 構造: 見出しが `<p class="__title">`。公式は `<h2 class="__heading">` が必須。MD でも「バナータイトルは必須構成要素」。見出しレベル化必須。
   - 該当行: `DadsNotificationBanner.vue:98-100`
3. **[high]** ボーダー太さ: standard 3px / color-chip 2px が公式値。現状 1px。
   - 該当行: `DadsNotificationBanner.vue:161`, `:237`, `:244`
4. **[high]** 角丸: standard は 12px(0.75rem)。現状 `--border-radius-4`(4px)。
   - 該当行: `DadsNotificationBanner.vue:160`
5. **[high]** color-chip 表現: 公式は `box-shadow: inset 8px(SP)/16px(PC)`。現状 `border-inline-start: 4px solid`。手法・太さとも不一致。
   - 該当行: `DadsNotificationBanner.vue:245`
6. **[high]** 背景: standard を tinted 背景(`var(--color-*-bg)`)にしている。公式は全タイプ白背景 + アクセントは border 色のみ。
   - 該当行: `DadsNotificationBanner.vue:235`
7. **[medium]** スペーシング: 公式は上下非対称 padding(SP 8/24, PC 24/32) + 48rem ブレークポイント。現状固定 `12 16`。
   - 該当行: `DadsNotificationBanner.vue:158-159`
8. **[medium]** タイポ: line-height は公式 1.7。letter-spacing 0.02em 欠落。heading のレスポンシブ(17→20px)欠落。
   - 該当行: `DadsNotificationBanner.vue:162-164`, `:183`
9. **[medium]** close 状態: hover 背景がハードコード `rgba(0,0,0,0.06)`。公式は `--color-neutral-solid-gray-50` + underline。
   - 該当行: `DadsNotificationBanner.vue:223-225`
10. **[medium]** アクションボタン: 公式は共有 `.dads-button` を type 連動 CSS 変数で着色。現状は slot 任せで連動着色なし。
    - 該当行: `DadsNotificationBanner.vue:108-110`
11. **[low]** アイコン: 公式は inline SVG(currentcolor)。現状 mdi フォント依存(`mdi-information` 等)。
    - 該当行: `DadsNotificationBanner.vue:21-27`, `:92-95`
12. **[low]** タイプ名: 公式は info-1/info-2。現状 info/neutral と命名差。`neutral` は公式非定義。
    - 該当行: `DadsNotificationBanner.vue:21-27`, `:149-152`
13. **[low]** forced-colors: 公式はアイコン currentcolor のみ。Vue 独自に border 追加で方針差。
    - 該当行: `DadsNotificationBanner.vue:256-258`

## ハードコード / 誤トークンの洗い出し

- `:163` `color: var(--color-text-primary, #1a1a1a)` — フォールバック許容範囲だが `--color-text-primary` は公式非定義トークン
- `:200` `--color-text-secondary, #4d4d4d` — 公式非定義トークン
- `:220` `--color-text-secondary, #555` — 同上 + フォールバック値不統一(#4d4d4d と #555)
- `:224` `background-color: rgba(0, 0, 0, 0.06)` — **完全直書き**(var() フォールバックですらない)。要トークン化
- `:243` `--color-bg-surface, #fff` — 公式非定義トークン
- `:244` `--color-border-default, rgba(0, 0, 0, 0.1)` — 公式非定義トークン + 直書き rgba フォールバック
- 背景・bg 系トークン `--color-success-bg`/`--color-error-bg`/`--color-warning-bg`/`--color-info-bg`/`--color-bg-subtle` (`:133-152`) — すべて公式非定義

## 結論

- **修正要否**: 要修正(全面)。構造(見出しレベル)・トークン・寸法すべてが公式とドリフトしている、Issue #18 の中でも優先度最高クラス。
- **優先度**: high
- **想定 changeset レベル**: **minor**(CSS だけなら patch だが、見出しを `<p>`→`<h2>`/`__heading` slot 化、info/neutral→info-1/info-2 へのタイプ名変更、アイコン slot の SVG 化など **public API/DOM が変わる**ため minor 相当。破壊回避するなら旧 prop 名のエイリアス維持が必要)。
- **API/aria 不変を保てるか**: 部分的に困難。role/aria-live ロジックは維持可。ただし `color` の許容値(neutral 廃止)と DOM 構造(見出し要素)は変更が望ましく、後方互換のためエイリアス対応を検討。
