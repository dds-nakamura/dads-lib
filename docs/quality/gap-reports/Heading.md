# Gap Report: `DadsHeading`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Heading/DadsHeading.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/heading/` (`heading.css` / `heading.mdx` / `playground.html`) |
| 総合判定 | ❌ 要修正 |
| 重大度 | medium |
| 検出差異数 | 7 |

## 観点別チェック

> 公式 heading は **`data-size` 属性 (64/57/45/36/32/28/24/20/18/16) で font-size を直接指定** するモデルで、HTML 見出しレベル (h1–h6) とサイズは完全に独立。サイズごとに font-size / line-height / letter-spacing / ショルダーサイズが個別定義される (heading.css)。Vue は `level` (1–6) による暗黙マッピング + `size` 上書きという別モデルを採用し、サイズ段階・line-height・letter-spacing が公式と乖離している。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | `font-family: var(--font-family-sans)`、`font-weight: bold`、サイズ段階 64/57/45/36/32/28/24/20/18/16、line-height はサイズ毎 (例 36→1.4, 32→1.5, 24/20→1.5, 18→1.6, 16→1.7)、letter-spacing もサイズ毎 (36→0.01em, 24/20/18/16→0.02em) (css L1-104) | `font-family: var(--font-family-sans, ...)`、`font-weight: 700`、サイズ 14/16/18/20/24/28/32/36、line-height は level 毎に 130/140/150 トークン、letter-spacing 指定なし (vue L68,121-184) | ❌ | line-height・letter-spacing がサイズ毎の公式値と不一致。size 段階も乖離 (差異①②③④) |
| カラー (背景 / 文字 / ボーダー: トークン参照) | text=`var(--color-neutral-solid-gray-800)`、chip 縦線=`var(--color-primitive-blue-900)`、rule 下線=`var(--color-primitive-blue-900)` (css L2,117,139) | text=`var(--color-text-primary, #1a1a1a)`、shoulder/subtitle=`var(--color-text-secondary, #4d4d4d)` (vue L69,73,113) | ❌ | **誤トークン**: `--color-text-primary` / `--color-text-secondary` は DADS tokens に存在しない。公式は `--color-neutral-solid-gray-800`。差異⑤参照 |
| 角丸 (`--border-radius-*`) | 該当なし (heading に角丸無し) | 該当なし | ✅ | 該当なし |
| スペーシング (padding / gap / margin: `--spacing-*`) | ショルダーと見出しの間隔は要素マージン依存、`__heading{margin:0}`、`__shoulder{margin:0}`、chip は `padding-left: calc(1em/3 + 0.5em)`、rule は `data-rule` 毎 `padding-bottom` (8→32px,6→24px,4→16px,2→8px) (css L142-173) | flex `gap: var(--spacing-4)`=4px で shoulder/title/subtitle を一律配置 (vue L66-67)、`__title{margin:0}` (vue L85) | ⚠️ | 間隔モデルが公式 (要素マージン/em ベース) と異なり flex gap 固定。chip/rule の em ベース配置は未実装 (差異⑥) |
| エレベーション / 影 (`--elevation-*`) | 該当なし | 該当なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | `data-rule` で下線 `border-bottom: solid var(--color-primitive-blue-900)`、太さ 8/6/4/2px (css L138-160) | 飾り罫 (rule) 機能を**未実装** | ❌ | 公式の `data-rule` (飾り罫) 相当 prop/CSS が無い。差異⑥参照 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | 見出しは静的要素、状態スタイルなし | 状態スタイルなし | ✅ | 該当なし (公式同様 静的) |
| サイズバリアント (sm/md/lg 等) | `data-size`: **64/57/45/36/32/28/24/20/18/16** の 10 段階 (css L6-104, mdx L53) | `size`: **14/16/18/20/24/28/32/36** の 8 段階 + `level` 1-6 暗黙 (types L27, vue L161-184) | ❌ | 段階が公式と不一致。公式の 64/57/45 (大見出し) が欠落、公式に無い 14 を追加。差異①参照 |
| forced-colors / ハイコントラスト | chip 縦線 `background-color: CanvasText` (css L132-135) | text/title/icon=`CanvasText`、shoulder/subtitle=`GrayText` (vue L186-201) | ✅ | 対応あり。chip 縦線は未実装のため該当 CSS も無し |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | クラス: `.dads-heading` / `__shoulder` / `__heading` / `__icon` / `__icon-svg`。サイズは `data-size` 属性。chip/rule も `data-chip`/`data-rule` 属性 | クラス: `.dads-heading` / `__shoulder` / `__title`(≠公式`__heading`) / `__icon` / `__text` / `__chip` / `__subtitle`。サイズは `--size-NN`/`--level-N` 修飾クラス | ❌ | 公式の属性ベース (`data-size`/`data-chip`/`data-rule`) を独自 BEM クラスで再実装。クラス名も `__heading`→`__title` に改名。完全な独自実装でドリフト大。差異⑦参照 |

## 検出した差異 (修正対象)

1. **[medium]** サイズ段階の不一致: 公式 `data-size` は 64/57/45/36/32/28/24/20/18/16 の 10 段階。Vue `size` は 14/16/18/20/24/28/32/36 の 8 段階。公式の大見出し 64/57/45 が欠落し、公式に無い 14 を追加。フォントスケールが DADS と一致しない。
   - 該当行: `DadsHeading.types.ts:27`, `DadsHeading.vue:161-184`
2. **[medium]** line-height の不一致: 公式はサイズ毎 (36→1.4, 32→1.5, 28/24/20→1.5, 18→1.6, 16→1.7)。Vue は level 毎の `--line-height-130/140/150` トークン (level1-3→1.3, level4-5→1.4, level6→1.5) で、公式値と全く異なる。
   - 該当行: `DadsHeading.vue:123,129,135,141,147,153` (level), 公式 `heading.css:13,22,...`
3. **[medium]** letter-spacing の欠落: 公式はサイズ毎に letter-spacing を指定 (36→0.01em, 32/24/20/18/16→…0.01/0.02em)。Vue は letter-spacing を一切指定していない (詰まり方が公式と異なる)。
   - 該当行: `DadsHeading.vue` (title 系に letter-spacing 無し)
4. **[low]** font-weight 表記: 公式 `bold`、Vue `700`。数値的に等価だが、shoulder は公式が `bold` (css L164) なのに Vue は `font-weight: 500` (vue L76)。ショルダーの太さが公式 bold と相違。
   - 該当行: `DadsHeading.vue:76` (shoulder `font-weight: 500` ← 公式 `bold`)
5. **[medium]** 誤トークン: `--color-text-primary` (#1a1a1a) / `--color-text-secondary` (#4d4d4d) は DADS tokens に存在しない独自命名。公式 heading は本文色に `--color-neutral-solid-gray-800` (#333) を使用。tokens.css 不読込でフォールバック直値に落ち DADS 色に追従しない。
   - 該当行: `DadsHeading.vue:69` (title), `:73` (shoulder), `:113` (subtitle)
6. **[medium]** 飾り罫 (rule) / chip 縦線 / shoulder サイズ連動の未実装: 公式は `data-rule` (下線 8/6/4/2px + padding-bottom) と `data-chip` (左縦線 `--color-primitive-blue-900`, `width: calc(1em/3)`) と shoulder の `--_shoulder-size` サイズ連動を持つ。Vue は rule 未実装、chip は slot 任せ (公式の縦線 CSS 無し)、shoulder は固定 14px。
   - 該当行: `DadsHeading.vue:100-109` (chip は slot のみ・縦線 CSS 無), shoulder `:74` (固定 font-size-14), rule 該当機能無し
7. **[medium]** 独自実装ドリフト (構造): 公式は `data-*` 属性ベースかつクラス名 `__heading`。Vue は `--size-NN`/`--level-N` 修飾クラス + クラス名を `__title` に改名 + `__text`/`__chip`/`__subtitle` を追加。公式 CSS を流用せず独自 BEM で全面再実装しており、公式更新への追従が困難。
   - 該当行: `DadsHeading.vue:42` (`__title` ← 公式 `__heading`), `:48` (`__text` 公式に無し)

## ハードコード / 誤トークンの洗い出し

- `DadsHeading.vue:69` `var(--color-text-primary, #1a1a1a)` — 誤トークン + 直値 (公式は `--color-neutral-solid-gray-800`)
- `DadsHeading.vue:73` `var(--color-text-secondary, #4d4d4d)` — 誤トークン + 直値 (shoulder)
- `DadsHeading.vue:113` `var(--color-text-secondary, #4d4d4d)` — 誤トークン + 直値 (subtitle)
- `DadsHeading.vue:108` `line-height: 1.2` (chip) / `:178` (実際は size 系) — chip line-height 直値
- `DadsHeading.vue:76` `font-weight: 500` — 公式 shoulder は `bold`。値ずれ
- font-size は `--font-size-NN` トークン参照で正準 (問題なし)。line-height は `--line-height-NN` トークン参照だが**値の割当が公式と不一致** (誤トークンではなく誤マッピング、差異②)

## 結論

- 修正要否: **要修正 (medium)**。公式の `data-size` 10 段階モデル・サイズ毎 line-height/letter-spacing・飾り罫(rule)・chip 縦線を Vue が独自 BEM + level モデルで再構成しており、フォントスケールと装飾が DADS と乖離。誤トークン2種も混入。
- 優先度: 中。誤トークン置換 (`--color-text-*` → `--color-neutral-solid-gray-800`) と shoulder font-weight は patch で即修正可。サイズ段階/line-height/letter-spacing/rule/chip 縦線の公式準拠化は CSS 大改修。
- 想定 changeset レベル: 誤トークン + shoulder weight のみ **patch**。サイズ段階を公式 (64/57/45 追加, 14 整理) に合わせると `DadsHeadingSize` 型が変わり **minor〜major**。`as`/`level`/slot の公開 API は維持可能だが、`size` の許容値拡張は型変更を伴う。
- API/aria 不変: 見出しレベル (`as`/`level`) と `<hgroup>` 構造は維持できる。誤トークン・font-weight・line-height/letter-spacing 値の修正は API 不変で実施可能。
