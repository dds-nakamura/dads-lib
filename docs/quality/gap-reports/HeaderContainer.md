# Gap Report: `DadsHeaderContainer`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/HeaderContainer/DadsHeaderContainer.vue` |
| 真実の源 (一次) | `md` (example 不在)。補完: WAI-ARIA Authoring Practices (landmark/banner) |
| 参照パス | `dads-document-md/dads/components/header-container/index.md` |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 6 |

## 観点別チェック

> 公式 (MD) はビジュアル正準値 (色/角丸/spacing) を一切規定していない。MD は「ワイド(フル/スリム)・ミディアム・コンパクト」のレイアウト分類と内包コンポーネント (ユーティリティリンク / ランゲージセレクター / 検索ボックス / ログイン) のみ規定。example も Figma PNG も無いため、**ビジュアル値の正準が存在しない**。よって色/角丸の「正準値」は不明であり、Vue が独自に定義した値は検証不能 = 推測実装である点が最大の問題。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | MD に規定なし。Foundations の `--font-family-sans` が妥当 | `font-family: var(--font-family-sans, ...)` (vue L80) | ✅ | font-family の選択は妥当 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | MD に規定なし | bg=`var(--color-bg-surface, #fff)`、text=`var(--color-text-primary, #1a1a1a)`、border=`var(--color-border-default, rgba(0,0,0,0.1))`、hover bg=`var(--color-bg-subtle, rgba(0,0,0,0.05))` (vue L78-81,148,152) | ❌ | **誤トークン**: `--color-bg-surface` / `--color-text-primary` / `--color-border-default` / `--color-bg-subtle` は DADS design-tokens に**存在しない独自命名**。tokens.css に該当なし。差異①参照 |
| 角丸 (`--border-radius-*`) | MD に規定なし | menu-toggle `border-radius: var(--border-radius-4, 0.25rem)`=4px (vue L146) | ⚠️ | トークン名は正準。値の妥当性は公式不明だが命名は正しい |
| スペーシング (padding / gap / margin: `--spacing-*`) | MD に規定なし | gap=`var(--spacing-16)`、padding=`var(--spacing-16)` / モバイル `var(--spacing-8) var(--spacing-12)` (vue L95-97,105-107) | ✅ | `--spacing-*` はライブラリ共通慣習でフォールバック値も妥当。問題なし |
| エレベーション / 影 (`--elevation-*`) | MD に規定なし。sticky ヘッダは慣例的に影あり | 影の指定なし (sticky 時も box-shadow 無し) | ⚠️ | sticky 時に下端へ `--elevation-*` 影が無く、スクロール時のコンテンツ境界が border 1px のみ。公式不明だが要検討。差異⑤参照 |
| ボーダー (太さ / 色 / 有無) | MD に規定なし | `border-bottom: 1px solid var(--color-border-default, rgba(0,0,0,0.1))` (vue L79) | ❌ | border 色が誤トークン (差異①)。太さ 1px の妥当性は公式不明 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | MD に規定なし。menu-toggle は button のため focus 必須 | menu-toggle: focus-ring mixin あり (vue L139)、hover bg (vue L151-153)。logo-text hover underline (vue L174-176)。disabled/expanded なし | ⚠️ | menu-toggle に `aria-expanded` が無い (mobile-menu を開閉するトリガなのに状態を SR へ伝えていない)。差異②参照 |
| サイズバリアント (sm/md/lg 等) | MD: ワイド-フル / ワイド-スリム / ミディアム / コンパクト の 4 種 | `wide-full` / `wide-slim` / `medium` / `compact` の 4 variant (vue L112-134) | ✅ | MD の 4 分類に名称・粒度とも対応。良好 |
| forced-colors / ハイコントラスト | MD に規定なし。banner landmark の境界が視認できること | forced-colors: `border-bottom: 1px solid CanvasText` + menu-toggle `border: 1px solid CanvasText` (vue L224-229) | ⚠️ | 対応あり。ただし scoped `&__menu-toggle` ネストが forced-colors ブロック内で `.dads-header-container &__menu-toggle` に展開されず効かない可能性。差異⑥参照 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式は header-container 自体に CSS 実装を提供せず (HTML/React とも「提供予定」)。内包は既存部品 (utility-link / language-selector / search-box) を slot で受ける構造が正解 | menu-toggle を `<i class="mdi mdi-menu">` で**独自実装**。HamburgerMenuButton 部品 (`DadsHamburgerMenuButton`) を使わず生 button + mdi アイコンを直書き | ❌ | **最重要ドリフト**: MD は「ハンバーガーメニューボタンが右端に配置」と明記 (header-container/index.md L33,37) しているのに、既存の `DadsHamburgerMenuButton` を内包せず mdi フォントアイコンで再実装。LanguageSelector と同型のドリフト。差異③参照 |

## 検出した差異 (修正対象)

1. **[high]** 誤トークン (存在しないセマンティックトークン): `--color-bg-surface` / `--color-text-primary` / `--color-border-default` / `--color-bg-subtle` は DADS design-tokens (`design-tokens/examples/tokens.css`) に**定義が無い**独自命名。実行時は全てフォールバック直値 (`#fff` / `#1a1a1a` / `rgba(0,0,0,0.1)` / `rgba(0,0,0,0.05)`) に落ち、tokens.css を読み込んでも DADS 色に追従しない = 実質ハードコード。正準トークン (`--color-neutral-solid-gray-*` 等) に置換すべき。
   - 該当行: `DadsHeaderContainer.vue:78` (bg-surface), `:79` (border-default), `:81` / `:148` (text-primary), `:152` (bg-subtle)
2. **[high]** menu-toggle に `aria-expanded` 欠如: mobile-menu/drawer を開閉するトリガ button なのに `aria-expanded` / `aria-controls` を持たず、開閉状態が支援技術へ伝わらない。`click:menu` を emit するだけで状態管理が呼び出し側任せ。
   - 該当行: `DadsHeaderContainer.vue:36-44`
3. **[high]** 独自再実装によるドリフト (最重要): 既存 `DadsHamburgerMenuButton` 部品があるのに、menu-toggle を生 `<button>` + `<i class="mdi mdi-menu">` で再実装。MD はハンバーガーメニューボタンの内包を明記。LanguageSelector と同じく独自 CSS でドリフトの温床。`DadsHamburgerMenuButton` を slot/内包で使う構造へ寄せるべき。
   - 該当行: `DadsHeaderContainer.vue:36-44`, `:137-158`
4. **[medium]** mdi フォント依存: `mdi mdi-menu` は Material Design Icons の Web フォントが別途読み込まれている前提。DADS は SVG アイコン (HamburgerMenuButton は inline SVG path) を使う方針で、フォント未ロード環境ではアイコンが表示されない。
   - 該当行: `DadsHeaderContainer.vue:43`
5. **[low]** sticky 時のエレベーション欠如: `--sticky` で `position: sticky` にするがスクロール時の浮き上がり表現 (`--elevation-*` box-shadow) が無く、border 1px のみで境界が弱い。公式値は不明だが UX 上要検討。
   - 該当行: `DadsHeaderContainer.vue:84-89`
6. **[low]** forced-colors ネストセレクタ: `@include base.dads-forced-colors` ブロック内の `&__menu-toggle` は SCSS の `&` 連結で `.dads-header-container__menu-toggle` ではなく `.dads-header-container__menu-toggle` を意図通り生成するか要確認 (forced-colors ブロックは `@media` であり `&` は親 `.dads-header-container` を指すため `.dads-header-container__menu-toggle` となり OK だが、メイン定義の `&__menu-toggle` と二重管理)。
   - 該当行: `DadsHeaderContainer.vue:224-230`

## ハードコード / 誤トークンの洗い出し

- `DadsHeaderContainer.vue:78` `var(--color-bg-surface, #fff)` — 誤トークン + フォールバック直値 `#fff`
- `DadsHeaderContainer.vue:79` `var(--color-border-default, rgba(0,0,0,0.1))` — 誤トークン + 直値
- `DadsHeaderContainer.vue:81` `var(--color-text-primary, #1a1a1a)` — 誤トークン + 直値
- `DadsHeaderContainer.vue:148` `var(--color-text-primary, #1a1a1a)` — 誤トークン (再掲)
- `DadsHeaderContainer.vue:152` `var(--color-bg-subtle, rgba(0,0,0,0.05))` — 誤トークン + 直値
- `DadsHeaderContainer.vue:96` `min-height: 3.5rem` / `:115` `4rem` / `:121` `3rem` / `:127` `3.5rem` / `:132` `2.5rem` — variant 高さの直値 (公式値不明のため要確認だが、`--spacing-*` でなく素の寸法で妥当な範囲)
- `DadsHeaderContainer.vue:125` `max-width: 1280px` — medium variant の直値 (Foundations layout grid トークンと突き合わせ要)
- `DadsHeaderContainer.vue:144-145` `width/height: 2.5rem` (40px)、`:147` `font-size: 1.5rem` — menu-toggle 寸法の直値

## 結論

- 修正要否: **要修正 (high)**。最大の問題は (a) 存在しない独自セマンティックカラートークン4種、(b) 既存 `DadsHamburgerMenuButton` を使わず生 button + mdi で再実装したドリフト、(c) menu-toggle の `aria-expanded` 欠如。
- 制約: 公式 example/Figma が無くビジュアル正準値が存在しないため、色は **正準プリミティブトークン** (`--color-neutral-solid-gray-*` 等、tokens.css に実在) へ置換することが唯一の客観的修正方針。
- 優先度: 高。誤トークン置換 (patch) と menu-toggle の HamburgerMenuButton 内包化 (minor/major) は分割可能。
- 想定 changeset レベル: 誤トークン置換のみなら **patch**。menu-toggle を `DadsHamburgerMenuButton` 内包 + `aria-expanded`/`aria-controls` 追加まで行うと slot/props API が変わるため **minor〜major**。API/aria 不変での修正は誤トークン置換に限られる。
