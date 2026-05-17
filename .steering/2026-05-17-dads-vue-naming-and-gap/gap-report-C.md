# Gap Report Group C

担当: Group C (13 件)。公式 MD は `dads-document-md/dads/components/<slug>/index.md`、実装は `packages/vue/src/components/<PascalName>/Dads<PascalName>.types.ts` を参照。Figma が存在するものは `dads-document-figma/<日本語名>/<日本語名>.png` も突き合わせ済み。

---

## menu-list (DadsMenuList)

- **Missing props**: `divider`/`section` 表現 (`DadsMenuListItem.divider?: boolean | { title?: string }`) — 公式 MD「セクションの明確化」でディバイダー＋カテゴリータイトル (太字) によるセクション分割が明示されているが、現 `items` 型はリンク/ボタンしか表現できない。
- **Missing variants**: 「リンク強調」用途のエンドアイコン (`tailIcon`) はあるが、CTA 挙動 (リンク遷移 vs アコーディオン開閉) を明確に分けるための **意味的なバリアント区分** (`itemKind?: 'link' | 'accordion'`) が無く、`endIcon` 任意指定に委ねられている。公式は「アイコン仕様は挙動別に一貫性を保つ必要」と明記。
- **a11y**: `ariaLabel` 指定時のみ `<nav>` ラップになる設計だが、ローカルメニュー用途では `aria-label` 必須運用を docs で促した方が良い。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: type/size/active/disabled/children/expanded など主要 API は揃っている。

## menu-list-box (DadsMenuListBox)

- **Missing props**: `opener` 関連 (`label`, `icon`, `triggerSize` 等) と内部開閉 state — 公式 MD は「**オープナーにより開閉**し、ボックス内にメニューリストを内包する」コンポーネントと定義しているが、現実装は「常時表示の box」とし、開閉トリガを呼び出し側に委譲している（実装コメントで明示）。公式定義から見るとオープナー無しは半実装。
- **Missing props**: `placement` (`'start' | 'end'`) — 公式「表示位置」節で「起点の左端 / 右端に揃える」と明記。
- **Missing events**: `'open' | 'close'` — オープナー実装時に必須。
- **a11y**: 現状 `aria-expanded` / `aria-controls` 連携が無く、開閉トリガを内包する公式仕様に追従できていない。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: 現実装はメニュー surface 単体としては妥当だが、公式名の「menu-list-box」は開閉付きの dropdown を指すため、`DadsDropdownMenu` 系として拡張が必要。

## mobile-menu (DadsMobileMenu)

- **Missing variants**: `type` (`'slide' | 'accordion'`) — 公式 MD「2 つの主要タイプ」(スタンダード=スライド型 / アコーディオン型) が明記されており、これが主要なバリアント軸。現実装は `items.children` を `DadsMenuList` で描画するだけで第二階層 (パネル切替) のスライド遷移が無い。
- **Missing props**: `sectionIcon` / divider セクション分割サポート — 公式「セクション明確化」で divider + section icon が指定されている。
- **a11y**: `role="dialog"` + `aria-modal` + Esc クローズ + フォーカストラップは実装済み (types コメントに記載) で OK。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: items / utilityItems / v-model / close 系は揃っている。スライド型未対応がコア仕様欠落。

## notification-banner (DadsNotificationBanner)

- **Missing props**: `style` (`'standard' | 'color-chip'`) — 公式「デザインスタイル」でスタンダード (角丸ボーダー) と **カラーチップスタイル (左側カラーアクセント)** の 2 種が明記。
- **Missing props**: `timestamp` (string | Date) — 公式「日時テキスト」が任意要素として明記されている。
- **Missing props**: `actions` (Action[]) または `#actions` slot — 公式「アクションボタン」が任意要素として明記、ビューポート別ボタン数制限の言及あり。
- **Missing props**: `persistKey` (string) — 公式「閉じるボタン」節「閉じた状態をストレージに保存」。ライブラリ側で簡易ヘルパが望ましい。
- **a11y**: `role="status"` / `role="alert"` の出し分け (success/info=status, error/warning=alert) が types 上明示されていない。要確認。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: color (success/error/warning/info/neutral) と closable は揃っている。

## progress-indicator (DadsProgressIndicator)

- **Missing variants**: 公式 Figma で `variant='circular'` (スピナー) の他に **インデターミネート linear** (ストライプ/アニメ) と複数サイズの spinner が確認できる。現実装は `value` 未指定でインデターミネートに切替えるロジックがあり概ね妥当。
- **Missing props**: `color` (semantic — primary/success/error 等) — Figma に色違いの spinner サンプル有り。現実装は色固定。
- **a11y**: `role="progressbar"` + `aria-valuenow/min/max` + indeterminate 時の `aria-valuetext` 出し分けが types から判定不能。実装側で確認推奨。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: 公式 MD は「準備中」、Figma も spinner と簡素な linear bar のみで詳細仕様は乏しい。

## radio (DadsRadio / DadsRadioGroup)

- **Missing props**: DadsRadio に `description` (label の下に表示する補助テキスト) — 公式 Figma の各項目に description 行が見える (リストモード)。現 `hint` は単一フォーム用途のみ想定。
- **Missing props**: DadsRadioGroup に `legendVisuallyHidden` 等 (legend を視覚非表示にする属性) — 公式アクセシビリティとして fieldset/legend の運用幅を確保したい。
- **a11y**: DadsRadio に `aria-describedby` (hint/error) が組まれているか types から確定不能。`id` 自動生成しているので概ね OK と思われる。
- **重要度**: Low
- **推定工数**: 30 min
- **備考**: size / value / required / error / errorMessage / disabled / name / id / RadioGroup direction (vertical/horizontal) / fieldset 連動など API は十分。公式必須要素は満たしている。

## resource-list (DadsResourceList)

- **Missing variants**: 公式 Figma に **Information / Form Type** の 2 大カテゴリ × 多数の状態 (default / hover / active / disabled / selected) が確認できる。現 `variant: 'frame' | 'list'` のみではバリエーション不足。
- **Missing props**: 各項目に `selected`/`disabled` 状態 — Figma で明確に状態区別あり。
- **Missing events**: `click:item` (item, index, event) — 現実装は props のみで `<a href>` ナビゲートに任せており、JS ナビ統合や selection 用途のイベントが無い。
- **Missing props**: `action` (右端のアクションボタン) — Figma の Form Type に右端ボタン (download/external) あり。
- **a11y**: 各 `<li>` が article 風になる場合の `aria-labelledby` 推奨。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: 公式 MD は「準備中」だが Figma 仕様は豊富。現実装は最小機能。

## scroll-top-button (DadsScrollTopButton)

- 該当なし
- **備考**: 公式は **非推奨 (Deprecated)** で詳細仕様なし。実装は showOffset / position / disabled / ariaLabel を備えており十分。docs に deprecated 警告を明示すべき。
- **重要度**: Low
- **推定工数**: 0 (docs のみ)

## search-box (DadsSearchBox)

- **Missing props**: `suggestions` または `#suggestions` slot (オートコンプリート) — 公式 Figma に検索候補リスト付きのサンプル (combobox 連携) あり。MD でも関連コンポーネントに combobox が明記。
- **Missing props**: `clearable` (boolean) + clear ボタン — Figma に入力済み state の clear 表現あり。
- **Missing props**: `withCategory` / `categorySelect` (検索カテゴリ select 並置) — Figma に「全文 / カテゴリ別」セレクトを伴うバリアント有り。
- **a11y**: `role="search"` のラップが types から不明。`role="search"` 付与は SR の地標機能で重要。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: size / label / hint / error / required / readonly / submit イベント等は揃っている。

## select (DadsSelect)

- **Missing props**: `prefixIcon` / `suffixIcon` (右ドロップダウンアイコン以外のリーディングアイコン) — 公式 Figma で select に icon 付きバリアントは確認できないが、`items` の各エントリにアイコンを表示する `item-icon` ルックアップが無い。
- **Missing props**: `chips` (multiple 選択時のチップ表示) — multiple は対応しているが、選択値の見せ方が types から不明。
- **a11y**: 公式注記「展開時のリストは OS デフォルトを使用」を尊重するなら native `<select>` 実装が望ましい。現実装が ARIA listbox カスタム実装か native かは types からは不明だが、`open`/`close` イベントがあるためカスタム listbox の可能性が高い。native フォールバックモード (`useNative: boolean`) を持つと公式推奨に沿える。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: size / label / hint / error / errorMessage / required / disabled / readonly / placeholder / itemValue/itemTitle / multiple / open/close イベントは揃っている。

## table (DadsTable)

- **Missing props**: `sortable` / `selection` / `pagination` 連携 — types コメントで「sorting/pagination/selection は呼び出し側に委譲」と明記されており、設計判断としては妥当。ただし公式「データテーブル」用途では「選択・編集・並び替え」が明示されており、ヘルパ slot (`#header-sort` 等) が無いと公式仕様の Data Table を満たすのは困難。
- **Missing props**: `loading` (skeleton/spinner) — 公式「データテーブル」用途で必須水準。
- **Missing variants**: `density='comfortable'|'compact'` あり OK。公式 Figma の row hover / selected row のスタイルは striped で代用可能。
- **a11y**: `<caption>` 対応済み、stickyHeader 対応済みで主要要件は満たす。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: 設計上「presentation のみ」と割り切っているが、DadsTableControl と組み合わせて Data Table 全体を成立させる必要がある。docs で combo パターンを示すこと。

## textarea (DadsTextarea)

- 該当なし
- **備考**: 公式 MD のパーツ (入力フィールド / 項目ラベル / 要否ラベル / サポートテキスト / 文字数カウンター / エラーテキスト) はすべて props (`label` / `required` / `hint` / `counter` / `errorMessage`) でカバー済み。さらに autoResize / minRows / maxRows / resize など実用拡張も完備。
- **重要度**: Low
- **推定工数**: 0

## utility-link (DadsUtilityLink)

- 該当なし
- **備考**: 公式 MD のユースケース (お問合わせ / よくあるご質問 / プライバシーポリシー等の頻出・法的リンク) は単一/リスト両モード + iconName + external + click イベントでカバー済み。Figma 確認でも追加バリアント仕様なし。
- **重要度**: Low
- **推定工数**: 0
