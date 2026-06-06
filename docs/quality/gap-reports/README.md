# DADS Fidelity Gap Reports (Issue #18)

`@dads/vue` 全 49 コンポーネントを DADS 公式実装（`design-system-example-components-html` の正準CSS / `dads-document-md` / WAI-ARIA）と突き合わせた **ビジュアル差異監査** の集約索引。

- 監査方法: 1 コンポーネント 1 レポート（`<Component>.md`）。観点別チェックリストは [`_TEMPLATE.md`](./_TEMPLATE.md) を参照。
- 真実の源の優先順: `example`（正準CSS・最優先）→ `md`（仕様）→ `wai-aria`（挙動）。Figma PNG はこの環境に不在のため未使用。
- 監査実施: 17 並列サブエージェント（Workflow `dads-fidelity-audit`）。

---

## 総括

| 指標 | 値 |
| ---- | ---- |
| 監査コンポーネント | **49** |
| 完全一致（match） | **0** |
| 軽微差異（minor） | 14 |
| 要修正（needs-fix） | 35 |
| 重大度 high | **27** |
| 重大度 medium | 15 |
| 重大度 low | 7 |
| 検出差異 合計 | 約 370 件 |

**結論: 全コンポーネントに何らかの差異があり、過半数（27/49）が重大。** 個別の値ズレよりも、下記 **2 つの横断課題（systemic root cause）が大半の差異を生んでいる**。これらを先に基盤修正すると、多数のコンポーネントの差異が一括解消される（最高レバレッジ）。

---

## 🔴 横断課題（最優先・基盤修正）

### S-1. 存在しないトークン名を全コンポーネントが参照 → 全て直値フォールバックに落ちている

`@dads/vue` の多くが `--color-text-primary` / `--color-bg-surface` / `--color-border-default` / `--color-brand-primary` / `--color-error` / `--color-success` / `--spacing-*` といった **「セマンティックなトークン名」を参照しているが、これらは DADS design-tokens に 1 件も存在しない**。実証（`design-tokens/examples/tokens.css`）:

| 参照しているトークン | tokens.css 内の定義数 | 実在する正しいトークン |
| -------------------- | --------------------- | ---------------------- |
| `--color-text-primary` | **0** | `--color-neutral-solid-gray-800` |
| `--color-brand-primary` | **0** | `--color-primitive-blue-900` |
| `--color-bg-surface` | **0** | `--color-neutral-white` |
| `--color-border-default` | **0** | `--color-neutral-solid-gray-600` 等 |
| `--color-error` | **0** | `--color-semantic-error-1` |
| `--spacing-*`（全軸） | **0** | （DADS に spacing トークンは存在しない → `calc(N/16*1rem)` 運用） |
| `--border-radius-pill` | **0** | `--border-radius-full` / `--border-radius-8` |

- 結果、`var(--color-text-primary, #1a1a1a)` のように **常にフォールバック直値で描画**され、`design-tokens` の更新が一切反映されない＝実質ハードコード。
- 一部はフォールバック値自体も誤り（例: gray-900 を `#1a1a1c`、正は `#1a1a1a` / gray-50 を `#f3f4f5`、正は `#f2f2f2`）。
- **対策**: 不在トークン → 実在 primitive/semantic/neutral トークンへの **横断置換マッピング表**を作り、全コンポーネントを一括修正する。`design-tokens` 側に意図的な semantic alias 層を足すかは別途判断（ただし「公式に存在しない命名を勝手に足さない」原則に注意）。

### S-2. 共有 focus-ring mixin が公式と逆の値（`_focus-ring.scss`）

`packages/vue/src/styles/_focus-ring.scss` の `_dads-focus-ring-style` が
`outline: 2px / outline-offset: 0 / box-shadow: 0 0 0 4px yellow` を出力しているが、
**公式は `outline: 4px black / outline-offset: 2px / box-shadow: 0 0 0 2px yellow-300`（＋要素により黄背景塗り）**。

- この 1 ファイルのバグが、focus-visible を持つ **ほぼ全コンポーネント**（Button/Accordion/Card/Checkbox/Radio/Input/Select/MenuList/UtilityLink/EmergencyBanner/…）に同一のドリフトを伝播させている。
- **対策**: mixin を公式値に修正（outline/offset/shadow を入れ替え）。加えて、要素固有の「黄背景塗り（`--color-primitive-yellow-300`）」「角丸 4px」を必要箇所で上書きできるよう mixin を拡張。

### S-3（準横断）. 「公式の共有部品を流用せず独自 CSS で再実装」ドリフト

LanguageSelector で起きた事象（`menu-list-box`/`menu-list` を独自再実装）と**同型の構造ドリフト**が多数で再発。公式が共有部品を使う箇所を独自 BEM で作り直しているもの:

- `form-control-label` 未流用: Checkbox / CheckboxGroup / Radio / RadioGroup / InputText / Textarea
- `menu-list` / `menu-list-box` 未流用: MenuListBox / LanguageSelector / MegaMenu（一部）
- `button` 未流用: FileUpload / NotificationBanner / TableControl / SearchBox
- ネイティブ要素の置換: Accordion(`<details>`→button)、Drawer(`<dialog>`→div)、Select(native→ARIA listbox)、Divider(`<hr>`→div)、List(`<ol>` 誤用)

これらは値置換では直らず、**構造リファクタ（API/aria への影響あり）** が必要 → changeset minor〜major。

### S-4（アイコン・柱B）. MDI webfont 依存 → 案B-2 で DadsIcon (inline SVG) へ

NotificationBanner / ResourceList / UtilityLink / HeaderContainer 等が `<i class="mdi mdi-*">` を使用。公式は inline SVG。Issue #18 の **案B-2（DadsIcon）** で別途対応（柱B・別PR）。

---

## コンポーネント別サマリ（重大度順 = 修正ワークリスト）

凡例: 判定 ✅match / ⚠️minor / ❌needs-fix ｜ 源 = 真実の源

### 重大度 high（27）

| Component | 源 | 判定 | 差異数 | 主要ドリフト |
| --------- | --- | ---- | ------ | ------------ |
| [Accordion](./Accordion.md) | example | ❌ | 11 | `<details>`+円形アイコンを button+chevron で全面独自再実装 |
| [Button](./Button.md) | example | ❌ | 12 | 全色トークン不在/角丸サイズ別未対応(一律4px)/44pxタップ域未実装 |
| [Card](./Card.md) | example | ❌ | 11 | 角丸16px→8px/枠透明(MD違反)/全色トークン不在 |
| [Carousel](./Carousel.md) | example | ❌ | 12 | 公式数値ナビ/プレビュー無視で独自スライダー化、MD禁止の自動再生実装 |
| [Checkbox](./Checkbox.md) | example | ❌ | 11 | input隠蔽+疑似要素自作(公式はappearance:none)/箱24→16px |
| [ChipLabel](./ChipLabel.md) | example | ❌ | 9 | 角丸ピル化(公式8px矩形)/12色相→5semantic/size軸を独自発明 |
| [ChipTag](./ChipTag.md) | md | ❌ | 8 | semantic色9種がfallbackも無くvar無効/border-radius-pill誤 |
| [Combobox](./Combobox.md) | md | ❌ | 8 | 色7種不在/影直書き→elevation化/角丸8px化（aria良好） |
| [DatePicker](./DatePicker.md) | example | ❌ | 12 | error誤トークン/focus逆転/separated構造/影直書き/角丸直値 |
| [DescriptionList](./DescriptionList.md) | example | ❌ | 6 | 既定2列gridが公式縦積みと別物/bordered独自/誤トークン |
| [Divider](./Divider.md) | example | ❌ | 7 | `<hr>`→div全面独自/色段階2 vs公式3/線描画手法不一致 |
| [Drawer](./Drawer.md) | example | ❌ | 9 | 影/overlay直書き/`<dialog>`→div独自/幅288→320px |
| [FileUpload](./FileUpload.md) | example | ❌ | 11 | button/checkbox共有部品未流用/色体系不在/dragover配色別物 |
| [HeaderContainer](./HeaderContainer.md) | md | ❌ | 6 | 誤トークン4種/Hamburger部品あるのにmdi生button再実装/aria欠落 |
| [ImageSlider](./ImageSlider.md) | md(carousel) | ❌ | 8 | MD明記の「carousel実装」を無視し独自フェード式で新規実装 |
| [InputText](./InputText.md) | example | ❌ | 9 | 角丸8→4px/focus逆転/色名前空間別物/disabled opacity |
| [LanguageSelector](./LanguageSelector.md) | example | ❌ | 11 | menu-list-box未流用で独自再実装/不在トークン/影直書き（PR#17で一部修正済） |
| [MenuListBox](./MenuListBox.md) | example | ❌ | 8 | popupにmenu-list未流用/角丸opener8→4px/data-style欠落 |
| [NotificationBanner](./NotificationBanner.md) | example | ❌ | 13 | 見出し`<p>`(公式`<h2>`必須)/色不在/border3→1px/角丸12→4px |
| [ProgressIndicator](./ProgressIndicator.md) | example | ❌ | 11 | SVG line→div-fill+circleで別実装/公式type体系欠落/size独自 |
| [Radio](./Radio.md) | example | ❌ | 12 | input隠蔽+疑似要素自作/色全滅/寸法24→16px/focus逆転 |
| [SearchBox](./SearchBox.md) | example | ❌ | 11 | 角丸8→4px/未定義色多用/focus逆転/連結ビジュアル未再現 |
| [Select](./Select.md) | example | ❌ | 12 | native→ARIA listbox全面再実装/角丸8→4px/影直値/focus逆転 |
| [StepNavigation](./StepNavigation.md) | example | ❌ | 13 | reached/current配色を青塗り化(公式gray)/size variant欠落 |
| [Table](./Table.md) | example | ❌ | 11 | data-*駆動を独自BEM化/色不在/ヘッダ下強調border欠落 |
| [TableOfContents](./TableOfContents.md) | wai-aria | ❌ | 6 | 色名全てDADS未定義/spacing軸依存(patch相当) |
| [Textarea](./Textarea.md) | example | ❌ | 9 | 角丸8→4px/focus逆転/border既定rgba/form-control-label未流用 |

### 重大度 medium（15）

| Component | 源 | 判定 | 差異数 | 主要ドリフト |
| --------- | --- | ---- | ------ | ------------ |
| [Breadcrumb](./Breadcrumb.md) | example | ❌ | 9 | SVG chevron→文字'》'/link色誤/タイポ不一致/spacing過大 |
| [CheckboxGroup](./CheckboxGroup.md) | example | ❌ | 7 | form-control-label未流用/色spacing誤トークン/required表現別物 |
| [ColorPicker](./ColorPicker.md) | wai-aria | ❌ | 6 | 非公式部品(妥当)/色spacing不在トークン(patch相当) |
| [Disclosure](./Disclosure.md) | example | ⚠️ | 6 | focus-visible乖離/本文色不在トークン/padding直書き |
| [Heading](./Heading.md) | example | ❌ | 7 | size10段階→8段階で大見出し欠落/line-height誤マップ/飾り罫未実装 |
| [List](./List.md) | example | ⚠️ | 5 | ordered`<ol>`(公式`<ul>`)/採番未再現/spacing不在 |
| [MegaMenu](./MegaMenu.md) | md | ⚠️ | 6 | fallback色誤値/影直書き→elevation(patch相当・MenuList流用は良好) |
| [MenuList](./MenuList.md) | example | ⚠️ | 4 | focus-visible乖離/親項目ハイライト未実装/角丸直値(本体は忠実) |
| [MobileMenu](./MobileMenu.md) | md | ⚠️ | 4 | 影/overlay直書き(正準CSS不在・部品流用は良好・patch相当) |
| [RadioGroup](./RadioGroup.md) | example | ❌ | 8 | form-control-label未流用/色不在/spacing誤/required別物 |
| [ResourceList](./ResourceList.md) | example | ❌ | 9 | 色fallback依存/focus逆転/状態未再現/見出し`<h3>`(公式`<h2>`) |
| [Tab](./Tab.md) | md | ⚠️ | 5 | 色6種spacing不在(aria良好・patch相当) |
| [TableControl](./TableControl.md) | md | ⚠️ | 6 | border-radius-pill誤/search-box等公式部品未流用で独自再実装 |
| [Tooltip](./Tooltip.md) | wai-aria | ❌ | 5 | 反転色名不在/影直書き/Escキー閉じ未実装(patch相当) |
| [UtilityLink](./UtilityLink.md) | example | ❌ | 5 | focus黄背景塗り欠落/lead-iconがmdi(patch相当) |

### 重大度 low（7）

| Component | 源 | 判定 | 差異数 | 主要ドリフト |
| --------- | --- | ---- | ------ | ------------ |
| [Blockquote](./Blockquote.md) | example | ⚠️ | 4 | コアは忠実/cite等で不在トークン(patch) |
| [Dialog](./Dialog.md) | md | ⚠️ | 5 | 影直書き/非正準トークン(modal挙動は良好・patch) |
| [EmergencyBanner](./EmergencyBanner.md) | example | ⚠️ | 4 | 高精度一致/focus-ring横断課題のみ |
| [GlobalMenu](./GlobalMenu.md) | example | ⚠️ | 4 | 公式CSS完全一致/current セレクタ限定とfocus上書き欠落のみ |
| [HamburgerMenuButton](./HamburgerMenuButton.md) | example | ⚠️ | 4 | 忠実再現/focus-ring横断課題/icon-only角丸 |
| [Image](./Image.md) | md | ⚠️ | 4 | 独自色命名/画像角丸(正準値なし・patch) |
| [PageNavigation](./PageNavigation.md) | md | ⚠️ | 4 | トークン衛生は最良/line-height揃え(正準値未確定・patch) |

---

## 推奨修正順（フェーズ2 = 柱A）

1. **S-1 / S-2 の基盤修正を最初に行う**（不在トークン置換マップ + focus-ring mixin 修正）。これだけで low/medium の多くが解消し、high の color/focus 系差異も大幅減。
   - 影響が広いため、まず置換マップを `docs/quality/` に確定 → スクリプト or 一括 sed → 全テスト。
2. **基礎入力部品**（値置換中心・利用頻度大）: Button / InputText / Textarea / Select / Checkbox / Radio / SearchBox → 角丸8px・disabled専用色・サイズ寸法を公式へ。
3. **共有部品流用リファクタ（S-3）**: form-control-label / menu-list(-box) 流用化（CheckboxGroup/RadioGroup/MenuListBox/LanguageSelector）。API/aria 影響を精査し changeset 区分。
4. **構造ドリフト大（major 候補）**: Accordion / Carousel / ImageSlider / ProgressIndicator / Select / Divider / StepNavigation / FileUpload → 公式構造への移植可否と破壊的変更の是非を個別判断。
5. **正準CSS不在（md/wai-aria）**: ColorPicker / Combobox / Dialog / Tab / TableControl / MobileMenu / PageNavigation / Tooltip / HeaderContainer / MegaMenu → トークン衛生 + 影の elevation 化中心（patch〜minor）。公式 HTML/Figma 公開後に再監査。

各コンポーネントの公式正準値・該当行・想定 changeset は個別レポート参照。
