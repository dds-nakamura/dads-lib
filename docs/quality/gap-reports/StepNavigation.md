# Gap Report: `DadsStepNavigation`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/StepNavigation/DadsStepNavigation.vue` |
| 真実の源 (一次) | `example` (`design-system-example-components-html/src/components/step-navigation/`) |
| 参照パス | `design-system-example-components-html/src/components/step-navigation/{step-navigation.css,playground-full.html,playground-single.html}` / `dads-document-md/dads/components/step-navigation/index.md` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 13 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 本体 `font-size:1rem; line-height:1.7; letter-spacing:0.02em` (css:3-7); number `font-weight:bold; font-size:20px(normal)/16px(small); line-height:1.5` (css:97-99); title `font-weight:bold; font-size:18px(normal)/16px(small); line-height:1.6` (css:219-231) | indicator `font-size:--font-size-14`(=14px) `font-weight:500`; title `--font-size-14` `line-height:--line-height-150`; current title `font-weight:700` | ❌ | number 公式 20px/bold → 現状 14px/500。title 公式 18px/bold → 現状 14px。`letter-spacing` 欠落。サイズ大幅過小 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 文字 `--color-neutral-solid-gray-800` (css:2); number bg `--color-neutral-white` (css:95); reached bg/border `--color-neutral-solid-gray-800` + 文字 white (css:111-116); completed bg `gray-50` (css:118-121); error `--color-semantic-error-1` (css:123-125) | 文字 `--color-text-primary`; current/done bg `--color-brand-primary, #0017c1`; error `--color-error`; pending text `--color-text-secondary` — **全て DADS 未定義セマンティック + ブランド色独自** | ❌ | 公式は neutral gray ベース(reached=gray-800 塗り)。Vue は **青 `#0017c1` 塗り** で配色思想が根本的に異なる。`--color-brand-primary` は DADS 未定義 |
| 角丸 (`--border-radius-*`) | number は `border-radius:50%`(円) (css:94)。矩形角丸の使用なし | indicator `border-radius:50%`(円); button `--border-radius-4`(focus 用) (vue:120,147) | ⚠️ | 円形は一致。button の 4px 角丸は公式に対応物なし(公式は header に角丸なし) |
| スペーシング (padding / gap / margin: `--spacing-*`) | number `margin:4px(normal)/3px(small)` (css:88,106); horizontal step `padding:0 16px` (css:258); title `margin-top:24px(normal)/16px(small)` (css:330-332 via --_title-margin); description `margin-top:8px/4px` (css:234) | list gap `--spacing-8`; button padding `--spacing-4`; connector top `calc(spacing-4 + 1rem)` | ❌ | 公式の number margin / title-margin(24/16px) / step padding(0 16px) を再現せず。間隔体系が別物 |
| エレベーション / 影 (`--elevation-*`) | 公式に box-shadow なし（aria-current の number に `box-shadow:0 0 0 2px white` リング (css:136) のみ） | current indicator に `box-shadow: 0 0 0 2px white, 0 0 0 3px brand-primary` の二重リング (vue:210-213) | ⚠️ | 公式の current リングは `outline:2px gray-800 + offset2px + shadow:2px white`(css:133-137)。Vue は white+青 二重 shadow で異なる |
| ボーダー (太さ / 色 / 有無) | number `border:2px solid`(normal)/`1px`(small) currentColor (css:93,108); skipped `dashed 1px` (css:127-131) | indicator `border:1px solid --color-border-default` 固定 (vue:148) | ❌ | 公式 normal=2px / small=1px / skipped=dashed。Vue は 1px solid 固定でサイズ・skipped 非対応 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | states: `reached`/`completed`/`error`/`skipped`/`editing` + `aria-current`(css:111-176)。header hover で下線太く(css:70-76); focus-visible は number に `outline:4px black; offset2px; shadow:2px yellow-300` (css:172-176); header 自体は outline:0 (css:78-82) | states: `pending`/`current`/`done`/`error`(vue types)。focus は button に 2px black+4px yellow mixin。hover スタイルなし | ❌ | (1) 状態名/数が公式と非一致(`completed`/`skipped`/`editing`/`reached` 欠落, 独自 `done`/`pending`)。(2) focus ring 幅逆転 + 公式は header でなく number にリング。(3) header hover の下線強調なし |
| サイズバリアント (sm/md/lg 等) | `data-size="normal"/"small"`: number 44px/32px, title 18px/16px, outline 2px/1px (css:11-25) | サイズ variant **なし**（orientation のみ） | ❌ | 公式 normal/small の 2 サイズを完全に欠落。number サイズ等が固定 |
| forced-colors / ハイコントラスト | reached `bg:CanvasText; color:Canvas`; completed/editing/error の state-icon の fill を CanvasText/Canvas で制御 (css:139-170) | indicator `border:CanvasText`; current/done/error `bg:Highlight; color:HighlightText` (vue:238-253) | ⚠️ | 公式は CanvasText/Canvas。Vue は Highlight/HighlightText。state-icon 制御は該当機能なし |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 構造: `> ul > li.__step[data-state][aria-current]` 内に `__header(span/a/button) > __number + __title + state-icon + state-label`、`__description`、connector は `::before/::after` 疑似要素。`data-orientation`/`data-size` 属性駆動 | クラス名を `__list/__item/__button/__indicator/__title/__connector` と**独自命名**(公式 `__step/__header/__number`)。connector を疑似要素でなく `<span>` 要素で実装。state-icon/state-label/description 非実装 | ❌ | **最重要ドリフト**。公式 CSS クラス体系(`__step`/`__header`/`__number`/`__description`/`__state-icon`/`__state-label`)を一切使わず独自命名で再実装。公式 CSS の流用ゼロ |

## 検出した差異 (修正対象)

1. **[high]** 配色思想の相違: 公式 reached/current は **gray-800 塗り**(neutral) → 現状 **青 `#0017c1`(--color-brand-primary)塗り**。DADS 未定義トークン使用。
   - 該当行: `DadsStepNavigation.vue:206-208,221-223`
2. **[high]** クラス体系・構造ドリフト: 公式 `__step/__header/__number/__description` → 独自 `__item/__button/__indicator/__title/__connector`。公式 CSS 流用ゼロ。
   - 該当行: `DadsStepNavigation.vue:34-63` 全般
3. **[high]** サイズ variant 欠落: 公式 `data-size="normal"/"small"`(number 44/32px, title 18/16px) → 現状サイズ概念なし、number 固定 2rem(32px)。
   - 該当行: `DadsStepNavigation.vue:140-158`(固定値), props に size なし
4. **[high]** number タイポ過小: 公式 font-size 20px/bold → 現状 14px/500。title 公式 18px/bold → 現状 14px。
   - 該当行: `DadsStepNavigation.vue:151,161-166`
5. **[high]** 状態モデル非一致: 公式 `reached/completed/error/skipped/editing`+`aria-current` → 現状 `pending/current/done/error`。`completed/skipped/editing/reached` 欠落。
   - 該当行: `DadsStepNavigation.types.ts`, `.vue:22,49-52,198-235`
6. **[medium]** カラートークン誤り: `--color-text-primary/secondary`, `--color-error`, `--color-text-on-primary` は DADS 未定義 → `--color-neutral-*`/`--color-semantic-error-1` へ。
   - 該当行: `DadsStepNavigation.vue:72,148,149,150,201,209,228,233`
7. **[medium]** number border: 公式 normal 2px / small 1px / skipped dashed → 現状 1px solid 固定。
   - 該当行: `DadsStepNavigation.vue:148`
8. **[medium]** focus ring: 公式 number に `outline:4px black+offset2px+shadow:2px yellow` → 現状 button に 2px black+4px yellow(幅逆 + 適用要素違い)。
   - 該当行: `_focus-ring.scss:9-13` 経由 `DadsStepNavigation.vue:116`
9. **[medium]** current リング: 公式 `outline:2px gray-800+offset2px+shadow:2px white` → 現状 `0 0 0 2px white, 0 0 0 3px 青` 二重 shadow。
   - 該当行: `DadsStepNavigation.vue:210-213`
10. **[medium]** state-icon / state-label / description 非実装（公式は完了チェック等を絶対配置 SVG + ラベルで表現）。
    - 該当行: 実装に対応物なし（`.vue` テンプレート）
11. **[low]** connector を疑似要素でなく `<span>` 要素で実装（公式 `::before/::after`）。
    - 該当行: `DadsStepNavigation.vue:56-60,169-188`
12. **[low]** `letter-spacing: 0.02em` / `line-height:1.7` 欠落。
    - 該当行: `DadsStepNavigation.vue:70-72`
13. **[low]** forced-colors: 公式 CanvasText/Canvas → 現状 Highlight/HighlightText。
    - 該当行: `DadsStepNavigation.vue:238-253`

## ハードコード / 誤トークンの洗い出し

- `width: 2rem; height: 2rem`（indicator サイズ直値, 公式は `--_number-size` 44/32px）— `DadsStepNavigation.vue:145-146`
- `box-shadow: 0 0 0 2px ..., 0 0 0 3px ...`（current リング, 直値 px）— `:210-213`
- `font-weight: 500/700`（直値）— `:152,209,215,233`
- `line-height: 1`（直値）— `:153`
- 誤/未定義トークン: `--color-text-primary`, `--color-text-secondary`, `--color-text-on-primary`, `--color-bg-surface`, `--color-border-default`, `--color-brand-primary`(青 #0017c1), `--color-error` — `:72,148,149,150,164,199-201,206-209,220-233`
- `rgba(0,0,0,0.42)`（border フォールバック直値）— `:148,179,187,200`

## 結論

- **修正要 / 優先度 high**。配色（gray→青）・タイポ（20/18px→14px）・サイズ variant 欠落・状態モデル相違・独自クラス体系と、ほぼ全観点でドリフト。公式 CSS の流用が皆無で Select 同様の独自再実装ドリフト事例。
- 想定 changeset レベル: **major**。状態名(`done/pending`→`reached/completed/skipped/editing`)・size prop 追加・クラス名変更は API/DOM 破壊的。CSS のみ是正でも見た目が大きく変わるため最低 minor。
- API / aria 不変は**保てない**: 公式準拠には状態 enum とサイズ prop の追加・クラス名変更が必要で破壊的変更不可避。

## T4 解消 (案X フル / MAJOR 破壊的変更)

Issue #18 / T4 で公式正準構造へ全面再実装し、上記 13 差異を解消した。実装は `design-system-example-components-html/src/components/step-navigation/{step-navigation.css,playground-full.html,playground-single.html}` のマークアップ・クラス・CSS を逐語移植している。

- **クラス体系**: `__item`/`__button`/`__indicator`/`__title`/`__connector(<span>)` → 公式 `__step`/`__header`/`__number`/`__title`/`__description`。ルートも `<nav>` 1 個 + `<ul>`/`<li>` 構造へ。(差異 #2)
- **コネクタ**: `<span>` 要素 → `.dads-step-navigation__step::before`/`::after` 疑似要素。先頭/末尾は `data-first`/`data-last` で抑止。(差異 #11)
- **サイズ**: `size` public prop を追加し公式 `data-size="normal|small"` にマップ (number 44/32px, title 18/16px, outline 2/1px, border 2/1px)。(差異 #3)
- **タイポ**: number 20px/bold、title 18px/bold、本体 16px・line-height 1.7・letter-spacing 0.02em を公式値で再現。(差異 #4, #12)
- **配色**: 独自ブランド青 `#0017c1` を撤廃し公式 neutral gray ベースへ (reached=gray-800 塗り / completed=gray-50 / error=semantic-error-1)。誤トークン (`--color-text-*`, `--color-brand-primary` 等) を `--color-neutral-*`/`--color-semantic-error-1` へ是正。(差異 #1, #6)
- **状態モデル**: enum を `pending`/`current`/`done`/`error` → 公式 `reached`/`completed`/`error`/`skipped`/`editing` (`data-state`) へ置換。現在地は `current` prop で指定し `aria-current="step"` を付与 (旧 `current` 状態を分離)。マイグレーション表は docs に記載。(差異 #5)
- **state-icon / state-label / description**: 公式 SVG (completed=チェック / editing=編集 / error=警告) と視覚/非視覚ラベル、`__description` サブ要素を実装。(差異 #10)
- **focus / current リング**: focus-visible を `__number` に移し公式値 (4px black outline + 2px offset + 2px yellow-300 shadow)、aria-current リングを公式値 (outline gray-800 + offset + white shadow) に修正。(差異 #8, #9)
- **forced-colors**: Highlight/HighlightText → 公式 CanvasText/Canvas + state-icon の fill 制御へ。(差異 #13)
- **border**: number を normal 2px / small 1px / skipped dashed に対応。(差異 #7)

判定: ❌ 要修正 → ✅ 解消 (公式 CSS 逐語移植)。changeset: **major** (status enum・size prop・クラス名/DOM 変更で API/DOM 破壊的)。
