# Issue #18 Fidelity Audit — 完了サマリ & 公式準拠ベースライン

`@dads/vue`（全 49 コンポーネント）を DADS 公式実装に突き合わせ、ビジュアル差異を全面的に監査・修正した **Issue #18 "fidelity audit"** の成果記録。実装は複数 PR（#19–#28）に分割され、破壊的変更は changesets（次 major）に集約済み。

- 親 Issue: #18（**CLOSED** / 全テーマ完了）
- 引き継ぎ: #29（**T9** = Image / PageNavigation / Tab / TableControl・Figma 公開待ち）
- 基準ポリシー: [`a3-breaking-change-policy.md`](./a3-breaking-change-policy.md)
- 残課題台帳: [`a3-deferred.md`](./a3-deferred.md)（本監査で消し込み済み）
- コンポーネント別監査: [`gap-reports/`](./gap-reports/)

---

## 1. 目的と結論

- **目的**: 本ライブラリは「DADS 参照実装」であり、公式（`design-system-example-components-html` の正準 CSS / `dads-document-md` / WAI-ARIA）との**ビジュアル・構造・アクセシビリティの忠実度**が最優先。実装で生じていた独自拡張・構造ドリフトを公式へ寄せる。
- **結論**: 49 コンポーネントを監査（[gap-reports](./gap-reports/)）し、低リスク是正（柱A-2）から破壊的な構造作り直し（柱A-3）まで段階的に実施。**ほぼ全テーマが破壊的変更**のため、`@dads/vue` の**次 major** としてまとめて公開する。

---

## 2. 基準となった意思決定（案X ポリシー）

Issue #18 の全変更が従う基準。詳細は [`a3-breaking-change-policy.md`](./a3-breaking-change-policy.md) §2/§5。

| # | 決定 | 内容 |
|---|---|---|
| **案X** | 公式準拠で major 統一 | 非公式バリアント/prop は**原則削除**し公式軸へ統一（案Y=deprecation 併存は不採用）。公式忠実度を最優先。 |
| 版管理 | 次 major | テーマ単位で複数 PR に分割し、最後に major をまとめて公開。 |
| 真実の源 | example > md > wai-aria | 正準 CSS（`design-system-example-components-html`）を最優先。Figma PNG は補完。 |
| トークン | 上流のみ | 不在の「セマンティック風」トークンを実在の公式トークンへ置換（[token-replacement-map](./token-replacement-map.md)）。色・余白の直書き禁止。 |
| アイコン | inline SVG 統一 | MDI webfont → `DadsIcon`（Material Symbols inline SVG, 案B-2）。[icon-mapping](./icon-mapping.md)。 |
| 実装順 | T1→柱B→T5→T2→T3→T4→T6→T7→T8 | 柱B(DadsIcon) を T5 の前に先行。T9 は保留。 |

### 存続させた非公式機能（keep-list）

案X の例外として、**利用実績があり公式を阻害しない**以下のみ維持。これ以外の非公式バリアントは削除した。

- **Button** `loading` / `spinner`
- **Select** リッチ選択（multiple / chips / type-ahead。native `<select>` 化はせず維持）
- **SearchBox** `clear` / `suggestions`
- **DescriptionList** `bordered`

---

## 3. テーマ別の変更（新ベースライン + 移行要点）

各 PR の changeset（`.changeset/*.md`）が移行情報の正本。以下は要約。

### 基盤（柱A-2 / 柱B）

| テーマ | 変更 | 破壊度 |
|---|---|---|
| 柱A-2 ファウンデーション / コンポーネント是正 | 不在トークン → 公式トークン置換、API/aria 不変の見た目是正 | patch |
| 柱B **DadsIcon** | MDI webfont → inline SVG（Material Symbols, weight 400）。`icon-registry` に使用アイコンのみ同梱（tree-shaking） | major |

### T1 — 共有 `DadsFormControlLabel`
- Checkbox / Radio / CheckboxGroup / RadioGroup / InputText / Textarea の独自 `__legend/__required/__hint/__error` を公式 `dads-form-control-label`（`__label` / `__requirement[data-required]`=**※必須** / `__support-text` / `data-size`）へ委譲。
- **移行**: 必須表現が「塗りバッジ」→「※必須」。`__legend` 等のクラスに依存した CSS は要修正。

### T5 — アイコン presentation（柱B 依存・patch）
- Breadcrumb / Accordion / NotificationBanner / UtilityLink / Drawer(close) / HeaderContainer(menu) / ResourceList などのアイコンを inline SVG（DadsIcon / 公式 SVG path）へ。

### T2 — menu-list 系の公式整合（PR #25）
- **MenuListBox** / **LanguageSelector** の独自 popup を公式 menu-list-box の markup/class/ARIA へ。opener `__opener`（data-size/data-style）、popup `ul.dads-menu-list[role=menu]`。
- **移行**: MenuListBox `triggerSize='lg'` 削除（sm/md）、`triggerStyle` 追加、非公式 `description` 削除。LanguageSelector の colorScheme/cornerShape/size lg 削除。

### T3 — ネイティブ要素化（PR #26）
- **Accordion**: 管理型 multi-item(`<button aria-expanded>`) → 単一 native `<details>/<summary>`（DadsDisclosure 同型）。`items[]`/`type`/`size`/矢印キーナビ/`returnLink` 廃止。
- **Drawer**: Teleport+手書き focus-trap → native `<dialog>`+`showModal()`+`::backdrop`。本文は default slot。`items[]`/`DadsDrawerItem`/`placement="full"` 廃止、閉じるは `DadsHamburgerMenuButton`。
- ※ **Select** は keep-list によりネイティブ化せず現状維持（対象外）。

### T6 — 非公式バリアント整理（PR #24・8 コンポーネント）
- ChipLabel（color→11 primitive 色相 / appearance 4 / size 削除）、Heading（公式 10 段階）、Divider（3 段階）、Button（color success/error/warning/secondary 削除・loading 維持）、FileUpload（size 削除）、List（ordered の `<ol>`→`<ul>` 採番）、NotificationBanner（`<p>`→`<h2>` / type info-1/info-2）、DescriptionList（既定 vertical / horizontal 削除・bordered 維持）。

### T8 — 小さな a11y/挙動（PR #23・minor）
- Tooltip: Esc で閉じる。HeaderContainer: menu-toggle に `aria-expanded`/`aria-controls`。Breadcrumb: `aria-label` → `aria-labelledby` + visually-hidden ラベル。

### T7 — carousel 系移植（PR #27）
- **Carousel**: 汎用 translateX スライダー → 公式 `dads-carousel`（番号 tablist / next preview / 全表示 disclosure / blur 背景 / `@container`+ResizeObserver）。`slides[]` データ駆動。`autoPlay` 系・`type`/`mode`/`size` 削除。
- **ImageSlider**: 公式 MD 定義（= carousel コンテナ型・マルチ・幅狭）に従い **DadsCarousel の薄ラッパ**化。
- **DadsCarouselSingle**（新規）: 公式 `dads-carousel-single`（静的 1 枚絵・任意リンク）。

### T4 — 正準構造作り直し（PR #28・最難）
- **Checkbox / Radio**: input 隠蔽+疑似要素 → `input` 自身を `appearance:none` の可視コントロール（寸法 24/32/44・border 2/2/3px、チェックは `::before` clip-path SVG）。Checkbox `readonly` 削除、Radio の Vue 独自サブ要素は FCL/Group へ委譲。
- **Table**: 独自 BEM → `.dads-table`>`.dads-table__table`+`__col-header`/`__row-header`、辺別 border（`data-cell-border`/`data-border`）、行 hover/選択、caption/dense/striped。
- **StepNavigation**: クラス改名（`__step/__header/__number/__description`+`::before/::after`）、status enum を `reached/completed/error/skipped/editing`+`aria-current`、`data-size`。
- **ProgressIndicator**: div-fill+circle → 公式 SVG `<line>`+spinner、`type`(stacked/inlined/stacked-underlay)、circular/size 軸削除。

### T9 — Figma 待ち（保留 → #29）
- Image / PageNavigation / Tab / TableControl。公式 HTML/Figma 公開後に再監査。

---

## 4. 検証基準（全テーマ共通）

各 PR で以下を必須ゲートとした。

- `pnpm --filter @dads/vue run typecheck`（vue-tsc）
- `pnpm --filter @dads/vue test`（Vitest + vitest-axe による a11y）
- `pnpm run lint`（ESLint 9 flat / L3）
- `build`（`@dads/vue` declaration emit + VitePress docs）
- **Playwright** による公式 example とのビジュアル/DOM/ARIA 対比（スクリーンショットは `screenshots/`・gitignore）

> ハマりどころ: 共有 mixin `dads-forced-colors` は bare `forced-color-adjust: auto` を出力するため**スタイルシート root では使用不可**（セレクタ内で `@include` するか、plain `@media (forced-colors: active)` を使う）。T2/T3/T4 で再発し都度修正した。

---

## 5. 成果物・参照ドキュメント（artifact map）

| ドキュメント | 役割 |
|---|---|
| [`a3-breaking-change-policy.md`](./a3-breaking-change-policy.md) | **基準**: 案X ポリシー・テーマ別破壊サーフェス・要決定チェックリスト・T1 詳細設計 |
| [`a3-deferred.md`](./a3-deferred.md) | 柱A-2 で扱えなかった破壊的項目の台帳（本監査で消し込み済み・各項目に解消テーマを記載） |
| [`gap-reports/`](./gap-reports/) | 49 コンポーネント別の差異監査（各レポートに "T◯ 解消" 追記） |
| [`token-replacement-map.md`](./token-replacement-map.md) | 不在トークン → 公式トークン 置換マップ（S-1） |
| [`icon-mapping.md`](./icon-mapping.md) | MDI → DadsIcon(inline SVG) 移行マップ（柱B） |
| [`naming-and-gap.md`](./naming-and-gap.md) | 命名規約と公式仕様との Gap 分析 |
| `.changeset/*.md` | **移行情報の正本**（テーマ別 major/minor/patch と breaking 詳細） |

---

## 6. 次段階（リリース）

全テーマ（T9 除く）完了により、`@dads/vue` の**次 major** を配布できる状態。

1. `pnpm changeset version` で蓄積 changeset を版へ反映（CHANGELOG 生成）。
2. `./scripts/release-vue.sh` で `vue-pkg` orphan ブランチへ dist 配布 + `vue-v<semver>` タグ（[multi-remote-release](../architecture/multi-remote-release.md) 参照）。
3. T9（#29）は Figma 公開後に着手。

> 注: `vue-pkg` は保護ブランチ（削除禁止）。リリース手順とリカバリは [multi-remote-release](../architecture/multi-remote-release.md) を参照。
