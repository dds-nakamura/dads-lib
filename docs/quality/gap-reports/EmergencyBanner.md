# Gap Report: `DadsEmergencyBanner`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/EmergencyBanner/DadsEmergencyBanner.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/emergency-banner/emergency-banner.css` / `dads-document-md/dads/components/emergency-banner/index.md` |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 4 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | container: `font-family: var(--font-family-sans)` / `font-size: 16/16rem` / `font-weight: normal` / `line-height: 1.7` / `letter-spacing:.02em`。heading: `font-weight:bold` / `20/16rem`→md`24/16rem` / `lh 1.5`。body md: `var(--font-size-20)` / `var(--line-height-150)` | container: 同 family/size/`line-height:1.7`/`letter-spacing:.02em` だが **`font-weight:normal` 指定なし**。heading: `bold`/`1.25rem`(=20px)→md`1.5rem`(=24px)/`1.5`。body md: `var(--font-size-20)`/`var(--line-height-150)` | ⚠️ | 公式 container は `font-weight: normal` を明示。Vue は未指定で継承依存。明示推奨。値自体は一致 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | border `var(--color-semantic-warning-orange-1)` / bg `var(--color-neutral-white)` / text `var(--color-neutral-solid-gray-800)` / button bg `var(--color-semantic-error-1)`→hover`-2` / button text `var(--color-neutral-white)` | 同一トークンを全て使用 (`warning-orange-1` / `neutral-white` / `solid-gray-800` / `semantic-error-1`/`-2`)。アイコン色 `var(--color-semantic-error-1)`、timestamp `var(--color-neutral-solid-gray-700)` を独自追加 (公式に該当なし) | ✅ | 主要カラーは公式トークンに一致。追加要素 (icon/timestamp) のトークンも上流に存在 (検証済) |
| 角丸 (`--border-radius-*`) | button `12/16rem`(=0.75rem)→md`16/16rem`(=1rem)。`::after` `10/16rem`(=0.625rem)→md`12/16rem`(=0.75rem)。forced-colors `8/16rem`(=0.5rem) | button `0.75rem`→md`1rem`、`::after` `0.625rem`→md`0.75rem`、forced-colors `0.5rem`。close ボタン `0.25rem` (独自追加) | ✅ | 公式の角丸段階と一致。ただし全て **直値** (`--border-radius-*` トークン不使用)。公式 CSS も直値計算式なので example 準拠としては許容 |
| スペーシング (padding / gap / margin: `--spacing-*`) | row-gap `8/16rem`→md`16/16rem`。padding `14/16rem 10/16rem`→md`26/16rem`。action padding-top `8`→md`12` + pb`4`。button padding `18/16rem`→md`20/16rem` | row-gap `0.5rem`→md`1rem`。padding `0.875rem 0.625rem`→md`1.625rem`。action pt`0.5rem`→md`0.75rem`+pb`0.25rem`。button padding `1.125rem`→md`1.25rem` | ✅ | 全数値が公式 calc 値と一致 (14/16=.875, 10/16=.625, 26/16=1.625, 18/16=1.125, 20/16=1.25)。`--spacing-*` トークンは上流に存在しないため直値は example 準拠 |
| エレベーション / 影 (`--elevation-*`) | 公式 CSS に box-shadow なし (focus-visible の shadow を除く) | `position: fixed` + `z-index:9999` を独自付与 (公式 example は static)。box-shadow なし | ⚠️ | 公式 example は配置非規定 (static)。Vue は viewport 固定を独自仕様化。MD/example に固定配置の記述なし → 独自拡張。API/見た目意図としては妥当だが「公式準拠」ではない |
| ボーダー (太さ / 色 / 有無) | container `6px solid warning-orange-1`。button `2px transparent`→md`4px`。`::after` `2px white`→md`4px`。focus-visible `outline 4/16rem`(=4px) | container `6px solid warning-orange-1`。button `2px`→md`4px`。`::after` `2px white`→md`4px`。focus-visible は共有 mixin (`outline:2px` + `box-shadow:4px`) | ⚠️ | container/button/::after ボーダーは一致。focus-visible だけ公式と差異 (下記 状態 参照) |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: button bg `error-2` + underline (`thickness 1/16rem`/`offset 3/16rem`)。focus-visible: `outline:4px solid black; outline-offset:2px; box-shadow:0 0 0 2px yellow-300` | hover: button bg `error-2` + `text-decoration: underline` (thickness/offset 指定なし)。focus-visible: 共有 `dads-focus-ring` mixin = `outline:2px solid black; outline-offset:0; box-shadow:0 0 0 4px yellow-300`。close ボタンに `:hover { rgba(0,0,0,.06) }` 独自追加 | ⚠️ | (1) hover underline の thickness/offset 未指定。(2) **focus-visible が公式と逆 (公式 outline4px+shadow2px、Vue outline2px+shadow4px)** — 全コンポ共通の mixin 問題。(3) close hover に直書き rgba |
| サイズバリアント (sm/md/lg 等) | 該当なし (バリアントなし。レスポンシブ `min-width:48rem` のみ) | 該当なし (同じく 48rem ブレークポイントのみ) | ✅ | 一致 |
| forced-colors / ハイコントラスト | `@media (forced-colors: active)` で `::after` を `inset:4/16rem; border-width:2px; border-radius:8/16rem` | `dads-forced-colors` mixin で `border:6px solid CanvasText` + `::after` `inset:.25rem; border-width:2px; border-radius:.5rem` | ✅ | `::after` 調整は一致。さらに container border を `CanvasText` 化する独自強化あり (公式以上の対応で許容) |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | プレーン CSS。button は専用クラス `dads-emergency-banner__button` で自己完結 (共有 button 部品は使わない) | 同様に専用クラスで自己完結。共有部品依存なし。focus-ring/reset-button のみ内部 mixin 流用 | ✅ | 構造ドリフトなし。example と同じ自己完結型。トークンも正しく上流参照 |

## 検出した差異 (修正対象)

1. **[low]** 状態(focus-visible): 公式 `outline:4px solid black; outline-offset:2px; box-shadow:0 0 0 2px yellow-300` → 現状 共有 mixin `outline:2px; offset:0; box-shadow:4px`。公式と outline/shadow の太さが逆。修正方針: 共有 `_focus-ring.scss` を公式準拠 (outline 4px / offset 2px / shadow 2px) に揃える (全コンポ横断課題)。
   - 該当行: `DadsEmergencyBanner.vue:210` (`@include ring.dads-focus-ring`) / 大本は `packages/vue/src/styles/_focus-ring.scss:11-14`
2. **[low]** 状態(hover): 公式 hover underline は `text-decoration-thickness:1/16rem` / `text-underline-offset:3/16rem` を指定。現状は `text-decoration: underline` のみ。
   - 該当行: `DadsEmergencyBanner.vue:238`
3. **[low]** エレベーション/配置: 公式 example は配置非規定 (static)。現状は `position:fixed; top/left/right:0; z-index:9999` を独自付与。仕様上の根拠なし (MD/example に記載なし) の独自拡張。
   - 該当行: `DadsEmergencyBanner.vue:109-113`
4. **[low]** close ボタン hover に直書き `rgba(0, 0, 0, 0.06)`。公式 example に close ボタン自体が存在しない (Vue 独自機能) ため許容範囲だが、トークン化が望ましい。
   - 該当行: `DadsEmergencyBanner.vue:276`

## ハードコード / 誤トークンの洗い出し

- `DadsEmergencyBanner.vue:276` `background-color: rgba(0, 0, 0, 0.06)` — var() フォールバックではない純粋な直書き。close ボタンは Vue 独自要素のため公式トークン対応物なし。`--color-neutral-solid-gray-*` 系への置換を検討。
- 角丸・スペーシングは全て直値 (`0.75rem`/`0.5rem`/`1.625rem` 等) だが、**公式 example 自体が `--border-radius-*`/`--spacing-*` トークンを使わず calc 直値で記述している** ため example 準拠として許容。値は全て公式 calc 値と一致。
- 全ての var() は上流に存在するトークンを正しく参照 (検証済: warning-orange-1 / neutral-white / solid-gray-700/800 / semantic-error-1/2 / primitive-yellow-300 / font-size-14/20 / line-height-150 すべて tokens.css に定義あり)。誤トークンなし。

## 結論

- **修正要否: 任意 (low)**。カラー・角丸・スペーシング・ボーダー・forced-colors は公式に高精度で一致。example と同じ自己完結構造でドリフトなし。
- **優先度: 低**。focus-visible の差異 (#1) は EmergencyBanner 固有ではなく共有 `_focus-ring.scss` の横断課題なので、本コンポ単体で直すべきものではない。
- **想定 changeset レベル: patch**。hover underline 詳細 (#2) と close hover トークン化のみなら見た目の微調整で API・aria 不変。
- **API / aria 不変: 保てる**。修正は全て CSS 内 (props/slots/role/aria-live は変更不要)。
