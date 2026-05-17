# Gap Report Group A

担当: Group A (13 件)。公式 MD は `dads-document-md/dads/components/<slug>/index.md`、実装は `packages/vue/src/components/<PascalName>/Dads<PascalName>.types.ts` を参照。

---

## accordion (DadsAccordion)

- **Missing props**: `size` (`'l' | 'm' | 's' | 'xs'`) — 公式仕様で開閉アイコンに L/M/S/XS の 4 サイズが定義されている。
- **Missing props**: `returnLink` (boolean | { label: string; href: string }) — 「リターンリンク」が公式仕様に明記されている任意パーツ。
- **Missing variants**: details/summary によるネイティブ実装オプション (`useNativeDetails` 等) — 公式アクセシビリティ章で `<details>`/`<summary>` 実装が推奨されている。現実装は ARIA カスタムロールのみ。
- **a11y**: 現状の WAI-ARIA Accordion Pattern 実装で許容範囲だが、ネイティブ details 実装を選択肢として持たないのは公式推奨から外れる。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: `type='single'|'multiple'` は公式仕様外の便利機能で適合。

## blockquote (DadsBlockquote)

- 該当なし
- **備考**: 公式 MD が「ガイドラインは準備中」で Figma も無し。HTML 実装 (`design-system-example-components-html`) と等価な `quote` / `cite` / `citeUrl` を提供しており、現状で十分。
- **重要度**: Low
- **推定工数**: 0

## bottom-navigation (DadsBottomNavigation)

- 該当なし
- **備考**: 公式は **非推奨 (Deprecated)** 扱いで仕様詳細なし。実装も最低限の API (items / modelValue / ariaLabel) を備えており、これ以上の拡張は公式が推奨しないため不要。むしろ docs で deprecated 警告を強調すべき。
- **重要度**: Low
- **推定工数**: 0 (docs のみ)

## breadcrumb (DadsBreadcrumb)

- **Missing variants**: モバイル時の「横スクロール仕様」モード (`mobileBehavior?: 'wrap' | 'scroll'`) — 公式 MD に明示。
- **Missing props**: 区切り記号として SVG/アイコンを差し込めるスロット (`#separator`) — 文字列 `separator` だけだと「》」固定文字以外 (シェブロンアイコン等) の DADS Figma 表現に追従できない。
- **a11y**: 末尾項目に `aria-current="page"` を付与しているか要確認 (types からは判定不能だが、無い場合は High)。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: items / disabled / click:item など基本 API は揃っている。

## button (DadsButton)

- **Missing variants**: 公式の `variant` 命名と微差 — 公式は「塗り (solid-fill)・アウトライン (outline)・テキスト (text)」で完全一致。OK。
- **Missing props**: `xs` (X-Small 72×28) サイズが `DadsSize` に含まれているか要確認 — 公式は L/M/S/XS の 4 段階。`common.ts` の `DadsSize` 定義次第。
- **a11y**: `aria-label` prop あり / アイコン専用ボタン対応 OK。コントラスト・ターゲット領域 44px は CSS 側の責務。
- **重要度**: Low
- **推定工数**: ~30 min (xs サイズ確認・追加)
- **備考**: variant / color / size / loading / icon / href / type すべて公式仕様を満たす。

## card (DadsCard)

- **Missing props**: `imageSrc` / `imageAlt` または `#image` スロット — 公式仕様の「イメージエリア (任意)」が独立パーツとして規定されているが、現実装はスロット (header/default/footer) のみ。`#image` スロットがあれば OK。
- **Missing props**: `subArea` / `#sub` スロット — 「サブエリア (任意, リンクリストまたはアクションボタン必須)」が独立パーツ。`footer` で代替可能なら問題なし。
- **a11y**: `clickable=true` で `<button>` に切り替える設計は良いが、公式の「クリッカブルなエリア内には内部リンクやフォームコントロールを配置できない」制約は呼び出し側責務として docs に明記すべき。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: variant (outlined/filled/elevated) と elevation 1-8 は公式 design-tokens と整合。

## carousel (DadsCarousel)

- **Missing variants**: 公式定義の「打ち出しタイプ (Key Visual) / コンテナタイプ (Container)」「マルチ / シングル」「スタンダードサイズ / 幅狭サイズ」の type 分け — `type?: 'key-visual' | 'container'` および `mode?: 'single' | 'multi'` が無い。
- **Missing props**: 「ネクストエリア (次スライドプレビュー)」「すべてのスライドボタン」を出すか否かのトグル — 公式仕様の主要 UI 要素。
- **Missing props**: `headingLevel?: 1-6` — コンテナタイプは `<hn>` 見出しを伴うことが必須。
- **Missing props**: `autoPlay` 実装は公式が「自動再生機能を備えていない」と明言。残しておくのは spec 違反になり得る → docs で「公式は非推奨」と注意書きを追加するか、削除を検討。
- **a11y**: `aria-live` リージョン / `tablist` + `tab` ロールの実装が必要 (実装ファイル側で確認要)。types からは判定不能。
- **重要度**: High
- **推定工数**: 2h+
- **備考**: 公式仕様がかなり厚く、現実装は ImageSlider に近い汎用 carousel になっている。DADS 準拠版への寄せ替えは大規模。

## checkbox (DadsCheckbox)

- 該当なし
- **備考**: size (L/M/S) / label / hint / errorMessage / required / disabled / readonly / indeterminate / change/focus/blur すべて公式仕様 (パーツ・サイズ・ステート) を満たす。CheckboxGroup も legend / direction / size 統一あり。
- **重要度**: Low
- **推定工数**: 0

## chip-label (DadsChip 兼用)

- **Missing props**: `variant?: 'label' | 'tag'` — 現実装は 1 ファイルで chip-label / chip-tag を兼用。将来 ChipLabel / ChipTag に分離するなら、当面は `variant` プロパティで視覚切替を可能にすべき。
- **Missing props**: `icon` (prependIcon 等) — Figma スナップショット (`チップラベル.png`) でアイコン付きバリエーションが想定される (環境に PNG がある場合のみ確認可能)。
- **a11y**: `clickable=true` で `<button>` 昇格、`closable` で別 `<button>` 提供、`closeLabel` で aria-label — OK。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: 公式 MD は「準備中」で確定仕様なし。Figma 由来の視覚仕様補完が必要。

## chip-tag (DadsChip 兼用)

- **Missing props**: chip-label と同じく `variant` で切替が必要。
- **Missing variants**: ステータス系の色 (success/warning/error/info) は `DadsSemanticColor` で表現可能だが、tag 用途では「outlined タグ」「filled タグ」の 2 形式が一般的。`appearance?: 'filled' | 'outlined'` が欲しい。
- **a11y**: `closable` を tag に使うかは公式不明 (準備中) なので任意。
- **重要度**: Medium
- **推定工数**: 1h
- **備考**: 公式仕様乏しく差分判定はゆるい。Figma スナップショット (`チップタグ.png`) があれば視覚要件を確定可能。

## date-picker (DadsDatePicker)

- **Missing variants**: 公式は **一体型 (consolidated)** と **分離型 (separated)** の 2 種を React 実装で提供している (リソース表参照)。現実装は一体型のみ。`variant?: 'consolidated' | 'separated'` が欲しい。
- **Missing props**: `locale` (年号表示・週始まりカスタマイズ等) — 公式 MD には明記ないが行政システムで和暦表示要件が出やすい。
- **a11y**: カレンダーポップオーバーの `role="dialog"` / `aria-modal` / フォーカストラップが要確認 (types からは判定不能)。
- **重要度**: Medium
- **推定工数**: 2h+
- **備考**: ISO 文字列で v-model する設計は良い。min/max/required/readonly/error 揃いも OK。

## description-list (DadsDescriptionList)

- **Missing events**: なし (presentation-only コンポーネントなので不要)。
- **Missing variants**: 公式 MD「準備中」のため確定仕様なし。現実装の layout (horizontal/vertical) / marker (none/bullet/custom) / bordered は HTML 実装サンプルと整合。
- **a11y**: ネイティブ `<dl>` / `<dt>` / `<dd>` を使用しているなら OK。
- **重要度**: Low
- **推定工数**: 0
- **備考**: 公式仕様が乏しいため現状で十分。slot fallback あり。

## dialog (DadsModal — 将来 Dialog にリネーム予定)

- **Missing props**: `variant?: 'modal' | 'non-modal'` — WAI-ARIA Dialog Pattern では modal / non-modal の 2 種。現実装は modal のみ。
- **Missing props**: `returnFocusTo?: HTMLElement | string` — Dialog を閉じた後に focus を戻す要素の指定。a11y で重要。
- **Missing props**: `initialFocus?: string | HTMLElement` — Dialog 内の初期 focus 先指定 (APG 推奨)。
- **a11y**: `aria-labelledby` / `aria-modal="true"` / フォーカストラップ / Esc 閉じが必要 (types に `persistent` `closable` `closeLabel` あり)。実装ファイル側で focus trap 実装が確認できれば OK。Dialog コンポーネントは a11y 要件が最も多いため、不足があれば High。
- **重要度**: High (a11y の focus 管理が肝)
- **推定工数**: 2h+
- **備考**: 公式 MD「準備中」かつ Figma v1 のみ提供で確定仕様乏しい → WAI-ARIA APG を真実の源として補完すべき。size (sm/md/lg/fullscreen) は spec を超えた便利機能で OK。

---

## サマリ

- **High**: 3 (carousel, dialog/modal, breadcrumb は a11y 次第で High)
- **Medium**: 6 (accordion, breadcrumb, card, chip-label, chip-tag, date-picker)
- **Low**: 4 (blockquote, bottom-navigation, button, checkbox, description-list)

※ breadcrumb は `aria-current="page"` 実装次第で Medium↔High が変動。実装ファイル `DadsBreadcrumb.vue` の確認が必要。
