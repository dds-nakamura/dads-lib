# Gap Report: `DadsHamburgerMenuButton`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/HamburgerMenuButton/DadsHamburgerMenuButton.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/hamburger-menu-button/` (`hamburger-menu-button.css` / `hamburger-menu-icon-button.css` / `desktop-and-mobile.html`) |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 4 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`、`font-size: calc(16/16*1rem)`=16px、`font-weight: normal`、`line-height: 1`、`letter-spacing: 0.02em` (css L11-16) | `font-family: var(--font-family-sans, ...)`、md=`var(--font-size-16)`、`font-weight: normal`、`line-height: 1`、`letter-spacing: 0.02em` (vue L102-105,121) | ✅ | md サイズは公式と一致。font-size をトークン化している点はむしろ改善 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | text=`var(--color-neutral-solid-gray-800)`、bg=`transparent`、icon=`var(--color-neutral-black)` (css L11,8,40) | text=`var(--color-neutral-solid-gray-800, #333)`、bg=`transparent`、icon=`var(--color-neutral-black, #000)` (vue L101,100,136) | ✅ | 正準トークンを正しく参照。フォールバック直値は許容範囲 |
| 角丸 (`--border-radius-*`) | テキスト版 `border-radius: calc(6/16*1rem)`=6px (css L7)、アイコン版 `calc(4/16*1rem)`=4px (icon css L5) | `border-radius: var(--border-radius-6, 0.375rem)`=6px (vue L99) | ⚠️ | 既定(テキスト)版は 6px で一致。ただし `variant-icon-only` も 6px のまま。公式アイコン版は別部品 `hamburger-menu-icon-button` で 4px。差異①参照 |
| スペーシング (padding / gap / margin: `--spacing-*`) | gap=`calc(4/16*1rem)`=4px、padding=`4px 12px 6px 12px` (上 4 / 右 12 / 下 6 / 左 12、css L9-10) | md: gap=`var(--spacing-4)`=4px、padding=`var(--spacing-4) var(--spacing-12) calc(var(--spacing-4)+0.125rem)`=`4px 12px 6px` (vue L119-120,96) | ✅ | 下 padding を `4px+2px=6px` と calc で再現。公式の非対称 padding (下 6px) を正しく再現 |
| エレベーション / 影 (`--elevation-*`) | 通常状態は影なし。focus-visible のみ `box-shadow: 0 0 0 calc(2/16*1rem) var(--color-primitive-yellow-300)` (css L32) | 通常影なし。focus-ring mixin で `box-shadow: 0 0 0 4px var(--color-primitive-yellow-300)` (focus-ring scss L12) | ⚠️ | 影は focus-ring 観点へ。差異②参照 |
| ボーダー (太さ / 色 / 有無) | `border: 0` (css L6)。forced-colors 指定はアイコン色のみ (css L43-47) | `border: 0` (vue L98)。forced-colors で `border: 1px solid CanvasText` を追加 (vue L201) | ✅ | 通常時 border なし一致。forced-colors の border 追加は a11y 上の妥当な強化 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `bg=gray-50` + `underline` + `text-underline-offset: calc(3/16*1rem)` (css L20-26)。focus-visible: `outline: calc(4/16*1rem) solid black` (=4px) + `outline-offset: calc(2/16*1rem)` (=2px) + `bg=yellow-300` + `box-shadow 2px yellow-300` (css L28-33)。disabled/expanded 指定なし (HTML 側 JS 制御) | hover: `bg=gray-50` + `underline` + `offset 0.1875rem`=3px (vue L184-188)。focus-visible (mixin): `outline: 2px solid black` + `offset 0` + `box-shadow 4px yellow-300`、bg 変化なし (focus-ring L11-13)。disabled: `opacity:0.5` + `not-allowed`。expanded: `aria-expanded` 付与 (vue L51) | ⚠️ | hover 完全一致。focus-visible の outline 太さ/offset/bg が公式と相違。差異②③参照 |
| サイズバリアント (sm/md/lg 等) | 公式は単一サイズ (16px / icon 24px)。アイコン専用は別部品 44px (icon css L28-29) | sm(14px,icon20px) / md(16px,icon24px) / lg(18px,icon28px) の 3 段階 (vue L112-147) | ⚠️ | md が公式相当。sm/lg は公式に存在しない拡張。差異④参照 (実害なし・拡張) |
| forced-colors / ハイコントラスト | icon を `color: currentcolor` に戻す (css L43-47) | icon `currentcolor` + root に `border: 1px solid CanvasText` / `color: CanvasText` (vue L200-207) | ✅ | 公式相当 + 強化。問題なし |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | テキスト版 `.dads-hamburger-menu-button` と アイコン版 `.dads-hamburger-menu-icon-button` の 2 部品構成 | 単一コンポーネント + `variant` prop (default / icon-only / mobile-conditional) で集約 | ⚠️ | テキスト版は構造・クラス名・トークンを忠実に再現。icon-only バリアントは公式の `hamburger-menu-icon-button`(44px・radius 4px)とは別実装で、角丸/サイズがドリフト。差異①参照 |

## 検出した差異 (修正対象)

1. **[low]** 角丸: 公式アイコン専用部品 `hamburger-menu-icon-button` は `border-radius: 4px` かつタップ領域 `44px` だが、Vue の `--variant-icon-only` は root の `border-radius: var(--border-radius-6)`=6px を継承し、`padding: var(--spacing-8)` + `aspect-ratio:1` で構成。公式の 4px / 44px と乖離。
   - 該当行: `DadsHamburgerMenuButton.vue:99` (radius 6px), `DadsHamburgerMenuButton.vue:156-161` (icon-only)
2. **[low]** focus-visible outline: 公式 `outline: 4px solid black` + `outline-offset: 2px` + `background-color: yellow-300` (css L28-33) に対し、共有 focus-ring mixin は `outline: 2px solid black` + `outline-offset: 0` + bg 変化なし。outline 太さ(4px→2px)・offset(2px→0)・focus 時 bg が公式と相違。
   - 該当行: `_focus-ring.scss:11-12` (mixin 経由 `DadsHamburgerMenuButton.vue:88`)
3. **[low]** focus-visible 背景色: 公式は focus 時に `background-color: var(--color-primitive-yellow-300)` をボタン面に塗る (css L31) が、Vue は box-shadow リングのみで面の bg 変化なし。視覚的ハイライトが弱い。
   - 該当行: `_focus-ring.scss:9-13`
4. **[low]** サイズバリアント拡張: 公式テキスト版は単一サイズのみ。Vue は sm/lg を独自追加 (font 14/18px, padding 縮小)。公式に対応値が無いため「公式逸脱」ではなく拡張。実害は無いが DADS 準拠範囲外であることを明記すべき。
   - 該当行: `DadsHamburgerMenuButton.vue:124-128` (sm), `112-116` (lg)

## ハードコード / 誤トークンの洗い出し

- `DadsHamburgerMenuButton.vue:132` `margin-top: 0.125rem`、`134-135` `width/height: 1.5rem`、`140-141` `1.25rem`、`145-146` `1.75rem` — アイコン寸法の直値。公式も `calc(24/16*1rem)` の素の値で `--spacing/--size` トークン化されていないため、これは公式同等であり許容。
- `DadsHamburgerMenuButton.vue:187` `text-underline-offset: 0.1875rem` — 公式 `calc(3/16*1rem)` と同値の直値。公式にも対応トークンが無いため許容。
- `_focus-ring.scss:11` `outline: 2px solid` / `12` `box-shadow: 0 0 0 4px` — 数値が直値だが共有 mixin の方針。ただし公式 outline は 4px であり数値自体が不一致 (差異②)。
- ⚠️ 誤トークンは無し。色は全て正準トークン(`--color-neutral-*` / `--color-primitive-yellow-300`)を参照しており、HeaderContainer のような独自セマンティックトークンの混入は無い。

## 結論

- 修正要否: **任意 (low)**。テキスト版(既定)は公式トークン・クラス名・非対称 padding・hover を忠実に再現しており高 fidelity。
- 優先度: 低。focus-visible の outline 太さ(4px) と focus 時背景色は共有 focus-ring mixin に起因するため、ライブラリ横断の方針判断が必要 (HMB 単独では直さない方が良い)。
- icon-only バリアントを公式 `hamburger-menu-icon-button` (radius 4px / 44px) に寄せるかは設計判断。
- 想定 changeset レベル: **patch** (CSS のみ・API/aria 不変)。`aria-expanded` / `aria-controls` / `aria-label` 構造は維持可能。
