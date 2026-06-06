# Gap Report: `DadsAccordion`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Accordion/DadsAccordion.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/accordion/accordion.css` / `playground.html` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 11 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`; summary `font-size: 16/16rem` (md以上 `18/16rem`); `font-weight: normal`; `line-height: 1.7` (md以上 `1.6`); `letter-spacing: 0.02em` (`accordion.css:19-23,38-40`) | `font-family: var(--font-family-sans, ...)`; header `font-size: var(--font-size-16,1rem)`; `font-weight: 500`; `line-height: var(--line-height-150,1.5)`; letter-spacing なし (`DadsAccordion.vue:181-184`) | ❌ | weight が 500 (公式 normal)、line-height 1.5 (公式 1.7)、letter-spacing 0.02em 欠落。公式値に合わせる |
| カラー (背景 / 文字 / ボーダー: トークン参照) | text `--color-neutral-solid-gray-800` (#333); border `--color-neutral-solid-gray-420` (#949494); icon `--color-primitive-blue-1000` (#00118f); back-link `--color-primitive-blue-1000` (`accordion.css:3,17,71,127`) | text `--color-text-primary, #1a1a1a` (誤・存在しないトークン+誤フォールバック); divider `--color-border-divider, #d6d6d6` (存在しない); icon `--color-text-secondary, #4d4d4d` (存在しない); back-link `--color-brand-primary, #0017c1` (存在しない+誤フォールバック) (`DadsAccordion.vue:148-149,212,256`) | ❌ | 使用トークンが design-tokens に存在せず全てフォールバック直値で描画。公式の primitive/solid-gray トークンへ全面置換 |
| 角丸 (`--border-radius-*`) | focus-visible 時のみ `border-radius: 4/16rem` (`accordion.css:52`) | コンポーネント本体に角丸なし。focus-ring mixin に border-radius 指定なし (`_focus-ring.scss:9-13`) | ⚠️ | focus-visible 時の 4px 角丸が未実装 (focus-ring mixin 側) |
| スペーシング (padding / gap / margin: `--spacing-*`) | summary padding `8/16rem`（md `16/16rem`）+ アイコン分の左 inset; content padding `16/16rem ...`（md `24/16rem`）; back-link gap `6/16rem` (`accordion.css:15,36,111,117,125`) | header `padding: var(--spacing-12) var(--spacing-16)` (=12px/16px); panel `padding: var(--spacing-12) var(--spacing-16) var(--spacing-16)`; gap `var(--spacing-12)` (`DadsAccordion.vue:177,180,269`) | ❌ | 公式の 8px/16px (md) スケールと不一致 (12px は公式に無い段)。レスポンシブ (48rem 境界) も未実装 |
| エレベーション / 影 (`--elevation-*`) | 影なし (focus-visible の yellow box-shadow を除く) | 影なし | ✅ | 該当なし (影は持たないのが正) |
| ボーダー (太さ / 色 / 有無) | 各 details に `border-bottom: 1px solid --color-neutral-solid-gray-420`; top border なし (`accordion.css:3`) | container に `border-top: 1px solid --color-border-divider`、item に `border-bottom: 1px solid --color-border-divider` (`DadsAccordion.vue:149,153`) | ❌ | 公式は border-bottom のみ・top border 無し。色トークンも誤り (420 が正) |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `bg --color-neutral-solid-gray-50` かつ `:not(:focus-visible)` 限定; focus-visible: 黒 4px outline+offset 2px+黄 box-shadow+角丸 4px; `[open]` で icon `rotate(180deg)`; hover で icon `outline 2px currentcolor` (`accordion.css:43-55,81-89`) | hover: `bg --color-bg-subtle, #f0f0f0` (`:not(:disabled)`); focus: 共有 mixin (黒 2px outline+黄 box-shadow, **offset 0/角丸無し**); open で chevron アイコン差し替え; disabled で opacity 0.6 (`DadsAccordion.vue:188-196`, `_focus-ring.scss`) | ❌ | (1) focus outline 公式 4px vs 現状 2px、offset 公式 2px vs 0、角丸欠落、focus 時 yellow 背景塗り無し (2) hover 背景色トークン誤り (3) icon の rotate でなく chevron アイコン入替 (4) 公式に disabled 状態は無い |
| サイズバリアント (sm/md/lg 等) | 公式はサイズ prop 無し。`@media (min-width:48rem)` でレスポンシブに padding/font/icon を切替 (`accordion.css:6,34,74,98,115`) | `size: l/m/s/xs` prop で 4 段の min-height/padding/font を切替。レスポンシブ media query 無し (`DadsAccordion.vue:9-13,217-248`) | ❌ | 公式にないサイズ API を独自追加し、公式のレスポンシブ挙動を未実装。最重要のドリフト要因 |
| forced-colors / ハイコントラスト | 公式 CSS に forced-colors 専用指定なし (currentcolor / system 依存) | `dads-forced-colors` で border/icon を CanvasText 化 (`DadsAccordion.vue:276-286`) | ⚠️ | 公式より手厚いが害は無い。維持可 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | `<details>/<summary>` ネイティブ disclosure + circle-outline アイコン (border 1px currentcolor の丸) + SVG chevron 回転 + back-link (`playground.html:15-34`) | `<div>+<h3>+<button aria-expanded>` の ARIA accordion パターン。アイコンは mdi web font の chevron 差替。circle outline 無し。back-link を `returnLink` prop で簡略化 (`DadsAccordion.vue:104-136`) | ❌ | 構造・アイコン・状態管理すべて独自再実装。公式の `<details>` ベース円形アイコン UI と乖離。最重要ドリフト |

## 検出した差異 (修正対象)

1. **[high]** カラー: 存在しないセマンティックトークンを使用。公式 `--color-neutral-solid-gray-800`/`-420`/`--color-primitive-blue-1000` → 現状 `--color-text-primary`/`--color-border-divider`/`--color-text-secondary` (design-tokens に未定義でフォールバック直値描画)。公式 primitive トークンへ置換。
   - 該当行: `DadsAccordion.vue:148`, `:149`, `:153`, `:212`, `:256`
2. **[high]** 正準CSS流用: 公式 `<details>/<summary>` + 円形アイコンを ARIA `<button>` + chevron で独自再実装。
   - 該当行: `DadsAccordion.vue:104-136`
3. **[high]** サイズバリアント: 公式に無い `l/m/s/xs` API を追加し公式のレスポンシブ (48rem) 挙動を欠落。
   - 該当行: `DadsAccordion.vue:217-248`
4. **[medium]** 状態(focus): 公式 outline 4px/offset 2px/角丸 4px/黄背景 → 現状 outline 2px/offset 0/角丸無し/黄背景無し。
   - 該当行: `_focus-ring.scss:9-13`
5. **[medium]** タイポ: weight 公式 normal → 現状 500; line-height 公式 1.7 → 1.5; letter-spacing 0.02em 欠落。
   - 該当行: `DadsAccordion.vue:182-184`
6. **[medium]** ボーダー: 公式 border-bottom のみ → 現状 container border-top も追加。
   - 該当行: `DadsAccordion.vue:149`
7. **[low]** hover 背景色: 公式 `--color-neutral-solid-gray-50` → 現状 `--color-bg-subtle, #f0f0f0`。
   - 該当行: `DadsAccordion.vue:189`
8. **[low]** スペーシング: 公式 8/16/24px スケール → 現状 12px (公式に無い段)。
   - 該当行: `DadsAccordion.vue:180,269`

## ハードコード / 誤トークンの洗い出し

- 誤フォールバック直値 (トークン自体が design-tokens に存在しない → 実際に描画される値): `--color-text-primary, #1a1a1a` (`:148`,`:272`)、`--color-border-divider, #d6d6d6` (`:149`,`:153`)、`--color-text-disabled, #999` (`:156`,`:193`)、`--color-text-secondary, #4d4d4d` (`:212`)、`--color-bg-subtle, #f0f0f0` (`:189`)、`--color-brand-primary, #0017c1` (`:256`)
- マジックナンバー: `min-height: 3rem`/`4rem`/`2.5rem`/`2rem` (`:179,218,226,234,242`)、`opacity: 0.6` (`:195`)、`transition 0.15s` (`:186`)
- font-weight 直値 `500` (`:182`、公式は normal)

## 結論

- 修正要否: **要修正 (high)**。使用トークンが design-tokens に存在せずフォールバック直値で描画されており、公式の primitive/solid-gray 値とも一致しない。さらに `<details>` ベースの公式 UI を ARIA button で独自再実装しており構造・アイコン・サイズ API が全面的にドリフト。
- 優先度: 高 (3 コンポーネント中最も乖離が大きい)。
- 想定 changeset レベル: **minor** (サイズ API の扱い次第では major)。色/状態/トークンのみなら patch〜minor だが、`<details>` ベースへの構造刷新やサイズ API 廃止を伴うと公開 props (`size`, `type`, slot) が変わり major。
- API/aria 不変: 色・トークン・focus-ring 修正のみなら API/aria 維持可。構造刷新を行う場合は不変を保てない。

