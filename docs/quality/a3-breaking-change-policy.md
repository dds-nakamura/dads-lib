# 柱A-3 破壊的変更ポリシー & 移行影響（Issue #18・レビュー用）

柱A-3（公式準拠の構造リファクタ）に着手する前に、**破壊的変更の方針・対象・移行影響**を確定するためのレビュー文書。実装はこの文書の方針合意後に開始する。

- 入力: [`a3-deferred.md`](./a3-deferred.md)（165項目/45コンポーネント）、各 [`gap-reports/`](./gap-reports/)、`design-system-example-components-html`。
- 関連: 柱A-2 は PR #19 でマージ済み（API/aria 不変の見た目是正）。柱B（DadsIcon）は別途。

---

## 1. 結論サマリ

- 柱A-3 は **ほぼ全項目が破壊的変更**（公開 props/バリアント削除・DOM/クラス名変更・aria/role・emit 変更）。
- したがって **`@dads/vue` の次 major リリース**として扱い、**移行ガイド**（`docs/guides/MIGRATION-v<next>.md`）を用意する。
- **柱B（DadsIcon）依存が多い**（T5）。アイコンを伴う構造変更は DadsIcon 整備後にやらないと二度手間。
- **Figma 待ちで本環境では確定不能**な項目（T9）は保留。

## 2. ポリシー選択肢（要決定）

| 観点 | 案X: 公式準拠で major 統一（非公式を削除） | 案Y: deprecation 併存（段階的） |
|---|---|---|
| 非公式バリアント/prop | 削除し公式軸へ統一 | `@deprecated` で当面残し、次々 major で削除 |
| 公式忠実度 | ◎ 最高 | ○（移行期間は混在） |
| 利用側影響 | 破壊的（要移行） | 緩やか |
| コード複雑度 | 低（公式のみ） | 高（旧API互換コード併存） |
| リリース | 1回の major | minor + 後続 major |

> どちらでも **DOM/クラス名/aria の構造変更は破壊的**で major が必要な点は共通（案Y でも構造系は major）。案Y が緩和できるのは主に「非公式 prop 値の削除」部分のみ。

**推奨: 案X（公式準拠 major 統一）** — 本ライブラリは「DADS 参照実装」であり公式忠実度が最優先。ただし利用実績のある非公式機能（例: Button の loading、Carousel autoPlay）は個別に存続要否を判断する余地を残す（下表「存続検討」欄）。

## 3. バージョニング / 進め方

- `@dads/vue`: 次 **major**（changeset major）。テーマ単位で複数 PR に分割し、最後に major をまとめて公開。
- 既存 **2066 テストの多くは DOM/クラス/prop 依存** → 構造変更に合わせ**テスト更新が必須**（意図的な公開仕様変更のため）。
- 各 PR: `typecheck / build / test（更新後）` + Playwright で公式 example とビジュアル対比。
- 移行ガイドを段階的に追記。

---

## 4. 破壊的変更サーフェス（テーマ別・要決定）

凡例: 影響 = 利用側の移行コスト。存続検討 = 非公式機能を残す余地。

### T1 共有 form-control-label（最初の着手対象 → §6 で詳細）
| Component | before → after | 公式根拠 | 影響 |
|---|---|---|---|
| Checkbox/Radio/CheckboxGroup/RadioGroup/InputText/Textarea | 独自 `__legend/__required/__hint/__error` → 共有 `dads-form-control-label`（`__label`/`__requirement[data-required]`=※必須/`__support-text`/`data-size`） | `form-control-label.css` | クラス名・必須表現（バッジ→※必須）変更。major |

### T2 menu-list 合成
| Component | before → after | 影響 |
|---|---|---|
| LanguageSelector / MenuListBox / MegaMenu | 独自 popup CSS → `DadsMenuList(Box)` 合成（クラス `__item` 等の契約変更） | major |

### T3 ネイティブ要素化
| Component | before → after | 影響 |
|---|---|---|
| Accordion | `<div>+<button aria-expanded>` → `<details>/<summary>` | DOM/aria/イベント変更。major |
| Drawer | `<div role=dialog>`+手書きfocus-trap → `<dialog>`+`showModal()`+`::backdrop` | DOM/aria/挙動。major |
| Select | role=combobox+独自listbox → native `<select>`+chevron | role/emit（multiple/chips/type-ahead 喪失）。major・**存続検討**（リッチ選択を別コンポーネントに退避するか） |

### T4 正準構造作り直し
| Component | before → after | 影響 |
|---|---|---|
| Checkbox/Radio | input隠蔽+疑似要素 → input自身 `appearance:none`（寸法 24/32/44・border 2/2/3px） | クラス全面・DOM。major（T1と一体） |
| Table | 独自BEM → `.dads-table__table`+`__col-header/__row-header`+辺別border+行hover/選択 | DOM/クラス/prop。major |
| StepNavigation | `__item/__button/__indicator` → `__step/__number/__description`+status enum(reached/completed/error/skipped/editing)+data-size | クラス/status型。major |
| ProgressIndicator | div-fill+circle → SVG `<line>`/spinner+type(stacked/inlined/stacked-underlay)、circular/size軸削除 | API全面。major |

### T5 アイコン inline SVG（**柱B=DadsIcon 依存**）
| Component | 項目 |
|---|---|
| Breadcrumb | SVG chevron separator / home-icon バリアント |
| Accordion | 円形 border アイコン+SVG chevron |
| Checkbox | check を `::before` clip-path(SVG) で描画 |
| NotificationBanner / UtilityLink / Drawer(close) / HeaderContainer(menu) / ResourceList | mdi → inline SVG |

### T6 非公式バリアント整理（API 削除/変更）
| Component | 変更 | 存続検討 |
|---|---|---|
| ChipLabel | color 5 semantic→12 primitive 色相、size軸削除、style 2→4 | — |
| LanguageSelector | colorScheme(light-green/gray)/cornerShape(pill/square)/size lg 削除 | — |
| MenuListBox | triggerSize lg 削除、data-style 追加 | — |
| Heading | size を公式10段階(64..16)へ、飾り罫/chip縦線/shoulder 追加 | — |
| DescriptionList | 既定 layout 変更、bordered/horizontal 削除 | bordered の需要次第 |
| Divider | color 2→3段階(gray-420/536/black) | — |
| Button | color success/error/warning/secondary 削除、loading/spinner | **loading は存続検討** |
| FileUpload | size削除、DadsButton流用、drop拡大をcheckbox化 | — |
| Carousel | autoPlay/interval/pauseOnHover 削除（MD禁止） | autoPlay は MD 違反のため削除推奨 |
| List | type=ordered の `<ol>`→`<ul>`採番 | — |
| NotificationBanner | 見出し `<p>`→`<h2>`、type info/neutral→info-1/info-2 | — |
| SearchBox | 連結category、clear/suggestions（非公式） | clear/suggestions は存続検討 |

### T7 carousel 系移植
| Component | 変更 |
|---|---|
| Carousel | 公式 番号tablist/next preview/全表示disclosure/@container へ |
| ImageSlider | carousel 構造を流用（独自フェード式を置換） |

### T8 小さな a11y/挙動
| Component | 変更 | 破壊度 |
|---|---|---|
| Tooltip | Esc で閉じる追加 | minor |
| InputText | footer `role="alert"` 撤去 | aria 変更（minor〜major） |
| HeaderContainer | menu-toggle を DadsHamburgerMenuButton 内包+aria-expanded/controls | major |
| Breadcrumb | aria-label→aria-labelledby+visually-hidden | aria/DOM |

### T9 Figma 待ち（保留・本環境では確定不能）
Image（画像角丸）/ PageNavigation（角丸・ellipsis色）/ Tab（実寸）/ TableControl（実寸）。公式 HTML/Figma 公開後に再監査。

---

## 5. 要決定チェックリスト（2026-06-06 確定）

- [x] **ポリシー**: **案X（公式準拠 major 統一）** で進める。非公式バリアント/prop は原則削除し公式軸へ統一。
- [x] **存続させる非公式機能（維持）**: Button `loading/spinner` / Select リッチ選択（multiple/chips/type-ahead、native 化せず維持 or 別コンポーネント退避） / SearchBox `clear/suggestions` / DescriptionList `bordered`。**それ以外の非公式バリアントは削除**（ChipLabel size軸、LanguageSelector colorScheme/cornerShape/size lg、MenuListBox lg、Button color success/error/warning/secondary、Heading 非公式、Divider 2段階、Carousel autoPlay 等）。
- [x] **Carousel autoPlay**: MD 違反のため **削除**。
- [x] **柱B との順序**: **柱B(DadsIcon) を T5 の前に先行整備**。
- [x] **PR 分割単位**: テーマ単位。**T1 から着手**。
- [x] **T9 保留**: Figma 公開待ちで **保留**（Image / PageNavigation / Tab / TableControl）。

> 実装順（確定）: **T1（form-control-label）→ 柱B（DadsIcon）→ T5 → T2 → T3 → T4 → T6 → T7 → T8**、T9 保留。

---

## 6. T1 詳細設計（最初の着手対象）

### 公式仕様（`form-control-label.css` / `single.html`）
```
<div class="dads-form-control-label" data-size="md">     ← 単体は div、グループは <fieldset>
  <label class="dads-form-control-label__label" for="...">  ← グループは <legend>
    ラベル
    <span class="dads-form-control-label__requirement" data-required="true">※必須</span>
  </label>
  <p class="dads-form-control-label__support-text" id="...">サポートテキスト</p>
  <div> … 入力本体（dads-input-text / checkbox / radio など） … </div>
</div>
```
- ルート: `display:flex; flex-direction:column; gap: data-size(sm=4 / md=8 / lg=8)px`、color gray-800、font 16/1.7/0.02em。
- `__label`: `font-weight:bold`、size 別 font-size（sm16/md17/lg18）。`legend.__label` は `margin-bottom:8px; float:none`。
- `__requirement[data-required=true]`: `※必須` を `--color-semantic-error-1`。任意時は無印。
- `__status`: 任意の状態ピル（gray-536 背景/白文字/角丸8px）。
- `__support-text`: 補足テキスト（gray-800）。

### 提供方針
1. **新規コンポーネント `DadsFormControlLabel`** を `packages/vue/src/components/FormControlLabel/` に作成（公式クラス・data-size・slots: default(=control) / label / requirement / support-text）。`as` prop で `div`↔`fieldset`、ラベルを `label`↔`legend` に切替。
2. 6コンポーネントを内部でこれに委譲：
   - 単体（Checkbox/Radio/InputText/Textarea）: ラベル/必須/サポート/エラーを FormControlLabel 経由に。
   - グループ（CheckboxGroup/RadioGroup）: `fieldset`+`legend` 構成に。
3. **必須表現を ※必須（`__requirement`）に統一**（現状の塗りバッジを廃止）。
4. クラス名 `__legend/__required/__hint/__error` は公式名（`__label/__requirement/__support-text`、エラーは各入力部品の `__error-text`）へ。

### 移行影響（利用側）
- 必須マーカーの見た目が「バッジ」→「※必須」に変わる。
- 公開クラス名（`dads-*-group__legend` 等）に CSS で依存している利用側は要修正。
- props（`hint` 等）名は可能な限り温存しつつ、内部 DOM が変わる旨を移行ガイドに明記。

### テスト
- 既存 Checkbox/Radio/Group/InputText/Textarea テストのクラス/DOM 依存箇所を更新。
- 新規 `DadsFormControlLabel` の単体テスト（slots/data-size/required/legend切替/axe）を追加。

### changeset
- `@dads/vue: major`（DOM/クラス/必須表現の破壊的変更）。

---

## 7. 進め方（合意後）
1. 本ポリシーを確定（§5）。
2. T1 を実装 → 検証 → PR（base=development、major changeset、移行ガイド着手）。
3. 以降テーマ順（推奨 T1→柱B→T5→T2→T3→T4→T6→T7→T8、T9 保留）で PR を重ねる。
