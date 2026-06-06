# Gap Report: `DadsUtilityLink`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/UtilityLink/DadsUtilityLink.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/utility-link/utility-link.css` / `multiple.html`、`dads-document-md/dads/components/utility-link/index.md` |
| 総合判定 | ⚠️ 軽微差異 (focus-visible は要修正寄り) |
| 重大度 | medium |
| 検出差異数 | 5 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`, `font-size: calc(16/16*1rem)`=16px, `font-weight: normal`, `line-height: 1.3`, `letter-spacing: 0` (utility-link.css:5-10) | `font-family: var(--font-family-sans,'Noto Sans JP',sans-serif)`, `font-size: var(--font-size-16,1rem)`, `font-weight: normal`, `line-height: var(--line-height-130,1.3)`, `letter-spacing: 0` (Vue:145-149) | ✅ | フォールバック付きトークン化のみで値は一致。問題なし |
| カラー (背景 / 文字 / ボーダー: トークン参照) | label `--color-neutral-solid-gray-800`、lead/tail icon `--color-neutral-solid-gray-900` (utility-link.css:26,30,57) | label `--color-neutral-solid-gray-800,#424966`、icon `--color-neutral-solid-gray-900,#1a1a1c` (Vue:161,166,193) | ✅ | 同一セマンティックトークン。フォールバック直値は許容範囲 |
| 角丸 (`--border-radius-*`) | 通常状態に角丸指定なし。focus-visible 時のみ `border-radius: calc(4/16*1rem)`=4px (utility-link.css:16) | 通常状態 `border-radius: var(--border-radius-4,0.25rem)` を常時付与 (Vue:152)。focus-ring mixin は border-radius を設定しない (_focus-ring.scss:9-13) | ⚠️ | 公式は focus 時のみ 4px、Vue は常時 4px。透明背景・枠なしのため通常時の見た目影響は小さいが、focus 時の角丸が mixin 側で欠落 |
| スペーシング (padding / gap / margin: `--spacing-*`) | 単一リンク自体に padding/gap 指定なし (display:block)。複数並びは親の inline style `gap: calc(16/16*1rem)`=16px (multiple.html:15) | リンク内 `gap: var(--spacing-4,0.25rem)`=4px (アイコン↔ラベル間, Vue:143)、リストラッパ `gap: var(--spacing-16,1rem)`=16px (Vue:124) | ⚠️ | 公式 single は flex でなく block + SVG の `vertical-align` 制御。Vue は flex+gap 4px を独自付与。視覚上の間隔は近いが構造が異なる (下記参照) |
| エレベーション / 影 (`--elevation-*`) | 該当なし (通常状態に box-shadow なし。focus 時の黄色 shadow はフォーカスリング扱い) | 該当なし | ✅ | 通常状態の影は両者ともなし |
| ボーダー (太さ / 色 / 有無) | 通常状態ボーダーなし。下線は `text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 3px` (utility-link.css:31-33) | 同左を `text-decoration-thickness: 1px; text-underline-offset: 3px` で再現 (Vue:167-169) | ✅ | 下線仕様一致 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `text-decoration-thickness: 3px` (utility-link.css:43)、active: 1px に戻す (49)、visited: gray-800 維持 (37)。**focus-visible: `outline: 4px solid --color-neutral-black; outline-offset: 2px; border-radius: 4px; background-color: --color-primitive-yellow-300; box-shadow: 0 0 0 2px --color-primitive-yellow-300`** (utility-link.css:13-19) | hover 3px / active 1px / visited 維持は一致 (Vue:172-186)。**focus-visible は共有 mixin `dads-focus-ring` 経由で `outline: 2px solid black; outline-offset: 0; box-shadow: 0 0 0 4px yellow-300`、background-color 無し、border-radius 無し** (_focus-ring.scss:9-13) | ❌ | **focus-visible が公式と不一致** (詳細は差異 #1)。current/disabled/expanded は該当なし |
| サイズバリアント (sm/md/lg 等) | 該当なし (単一サイズのみ) | 該当なし (size prop 無し) | ✅ | 仕様どおりバリアント無し |
| forced-colors / ハイコントラスト | utility-link.css に forced-colors 専用指定なし (公式は未対応) | `@include base.dads-forced-colors` で label/lead/tail を `LinkText` 化 (Vue:198-207) | ⚠️ | 公式に無い独自強化。アクセシビリティ向上方向なので許容。ただし focus-visible 側の forced-colors 対応は無い点に留意 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 単一クラス `.dads-utility-link` の自己完結 CSS。focus はコンポーネント固有値で直書き (共有 mixin 概念は無い) | focus を**共有 `dads-focus-ring` mixin に委譲**。lead-icon を SVG でなく **`<i class="mdi">` アイコンフォント**で実装。レイアウトを block+vertical-align でなく **flex+gap** で独自再構成 | ⚠️ | 共有 focus mixin 流用が utility-link 固有 focus 値とドリフト (#1)。アイコン実装方式の差異 (#2)・レイアウト方式の差異 (#3) も独自実装由来 |

## 検出した差異 (修正対象)

1. **[high]** 観点: 状態 (focus-visible)。公式 `outline: 4px solid --color-neutral-black; outline-offset: 2px; border-radius: 4px; background-color: --color-primitive-yellow-300; box-shadow: 0 0 0 2px --color-primitive-yellow-300` → 現状 (共有 mixin) `outline: 2px solid black; outline-offset: 0; box-shadow: 0 0 0 4px yellow-300; background-color なし; border-radius なし`。utility-link 固有の focus スタイル (4px outline / 2px offset / 黄色背景塗り / 2px shadow) を共有 `dads-focus-ring` の汎用値 (2px outline / 4px shadow) で代替してしまっている。修正方針: utility-link 専用の `&:focus-visible` を直書きして公式値に揃える、または focus-ring mixin に utility-link variant を追加。`background-color: var(--color-primitive-yellow-300)` の塗りつぶしが欠落している点が視覚的に最も顕著。
   - 該当行: `DadsUtilityLink.vue:139` (`@include ring.dads-focus-ring`) / `packages/vue/src/styles/_focus-ring.scss:9-13`

2. **[low]** 観点: アイコン実装方式 (正準流用 vs 独自)。公式 lead-icon は **inline SVG** (`viewBox="0 0 24 24"`, multiple.html:17) → 現状は **`<i class="mdi {iconName}">` アイコンフォント** (Vue:56-60,87-91)。公式は SVG 固定アイコン、Vue は MDI クラス名を任意指定する設計。視覚は近いが、MDI フォント未ロード環境ではアイコンが出ない依存リスク。修正方針: 機能拡張として許容しうるが、公式同等の inline SVG パスをデフォルト提供するか、MDI 依存を README で明示。
   - 該当行: `DadsUtilityLink.vue:56-60`

3. **[low]** 観点: レイアウト方式 / スペーシング。公式 single は `display: block` + SVG の `vertical-align: -0.15em` でアイコンを行内整列 (utility-link.css:2,25,56) → 現状は `display: inline-flex; align-items: baseline; gap: var(--spacing-4)` + アイコンに `transform: translateY(0.15em)` (Vue:141-143,162,194)。視覚結果はほぼ同等だが、公式の `vertical-align` 制御を flex+gap+transform で再現した独自構成。修正方針: 視覚一致していれば許容。厳密一致を要するなら公式の block/vertical-align 方式へ寄せる。
   - 該当行: `DadsUtilityLink.vue:141-143,162,194`

4. **[low]** 観点: 角丸。公式は通常状態に角丸なし・focus 時のみ 4px → 現状は通常状態に常時 `border-radius: var(--border-radius-4)` (Vue:152)、かつ focus mixin 側に border-radius が無い。修正方針: focus 時のみ 4px を付与する形 (#1 の focus 修正に統合) に整理。背景・枠が無いため通常時の角丸は無害だが公式と構造がずれる。
   - 該当行: `DadsUtilityLink.vue:152`

5. **[info]** 観点: forced-colors。公式に無い `LinkText` 対応を Vue が独自追加 (Vue:198-207)。アクセシビリティ向上方向のため維持推奨。ただし focus-visible 側の forced-colors (Highlight 等) 対応は無いので、#1 修正時に合わせて検討余地。
   - 該当行: `DadsUtilityLink.vue:198-207`

## ハードコード / 誤トークンの洗い出し

- 直書きカラーは全て `var(--token, #fallback)` 形式のフォールバック値であり許容範囲。新規の裸ハードコード色は無し (Vue:161,166,173,178,184,193)。
- `width: 1rem; height: 1rem; font-size: 1rem; line-height: 1` (lead-icon, Vue:157-160)、`width: 1rem; height: 1rem` (tail-icon, Vue:191-192) はアイコンサイズの裸数値。公式は `calc(16/16*1rem)`=1rem 相当で値自体は一致するが、`--size-*` / `--font-size-16` 等のトークン参照に統一すると望ましい (現状は無害)。
- `transform: translateY(0.15em)` (Vue:162,194) / `letter-spacing: 0` (Vue:149) は公式由来の固定値で問題なし。
- `border-radius: var(--border-radius-4, 0.25rem)` (Vue:152) はトークン参照済み。配置箇所のみ #4 の論点。

## 結論

- **修正要否**: 要修正 (1 件 high)。focus-visible が utility-link 固有値 (4px outline / 2px offset / 黄色背景塗り / 2px shadow) を汎用 `dads-focus-ring` mixin の値で上書きしており、フォーカス時の見た目が公式と明確に異なる。これは LanguageSelector と同型の「共有部品流用によるドリフト」事例。
- **優先度**: 中〜高 (focus #1)。アイコン方式 #2・レイアウト #3・角丸 #4 は low、forced-colors #5 は維持推奨。
- **想定 changeset レベル**: **patch**。CSS のみの修正で視覚を公式へ寄せる範囲。focus 値変更はバグ修正相当。
- **API / aria 不変**: 保てる。props (`href`/`label`/`items`/`iconName`/`external`/`ariaLabel`/`newTabAriaLabel`)・emits (`click:item`)・aria 属性 (`aria-hidden`/`role="img"`/`aria-label`/list の `aria-label`) はいずれも変更不要。修正はスコープ付き SCSS の focus-visible ブロック差し替えで完結。
