# Gap Report: `DadsList`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/List/DadsList.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/list/{list.css,all-lists.html}` + `dads-document-md/dads/components/list/index.md` |
| 総合判定 | ⚠️ 軽微差異 (構造観点で 1 件 medium) |
| 重大度 | medium |
| 検出差異数 | 5 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式 list.css は font 系を未指定 (global.css / 継承に委譲)。MD: 行間 12/8/4px は項目間 spacing の話 | `font-family: var(--font-family-sans)`, `font-size: var(--font-size-16,1rem)`, `line-height: var(--line-height-150,1.5)` を明示 | ⚠️ | 公式は継承前提で未指定。Vue が独自に font/size/line-height を固定 → 親文脈と乖離する恐れ。継承に委ねるのが安全 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 公式 list.css は color を未指定 (継承) | `color: var(--color-text-primary, #1a1a1a)` を指定。`--color-text-primary` は **design-tokens に不在** でフォールバック直値に落ちる | ❌ | color 指定を撤去し継承に戻す。残すなら実在トークン (`--color-neutral-solid-gray-800` 等) へ |
| 角丸 (`--border-radius-*`) | 該当なし (リストに角丸無し) | 指定なし | ✅ | 該当なし |
| スペーシング (padding / gap / margin: `--spacing-*`) | `padding-left: 32/16rem`; `li` pad-y `--_spacing` (4/8/12 = data-spacing); 入れ子 `margin-top: var(--_spacing)` / `margin-bottom: calc(-1*var(--_spacing))` | `padding-left: var(--spacing-32,2rem)` (トークン不在→2rem は一致); `li` pad-y を `--spacing-4/8/12` フォールバック (4/8/12px 同値); 入れ子 `margin-top: var(--spacing-4,0.25rem)` 固定, `margin-bottom: 0` | ⚠️ | 入れ子マージンが公式の `--_spacing` 連動 (=spacing prop に追従) でなく 4px 固定 + 下マージン補正欠落。視覚リズムが spacing=8/12 で公式とズレる |
| エレベーション / 影 (`--elevation-*`) | 該当なし | 指定なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | 該当なし | 指定なし | ✅ | 該当なし |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | リスト自体に状態なし (内部リンクは link.css 側) | 状態スタイルなし | ✅ | 該当なし |
| サイズバリアント (sm/md/lg 等) | サイズ概念なし。spacing バリアント (4/8/12) のみ | `spacing` prop で 4/8/12 を再現 ✅ | ✅ | 一致 |
| forced-colors / ハイコントラスト | 公式 list.css に記述なし | `dads-forced-colors` で `color: CanvasText` | ✅ | 公式超過。害なし維持可 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 番号タイプは `data-marker="number"` + `display: grid` / `grid-template-columns: subgrid` + テキスト `<span>` 採番 (コピー可能)。`<ul>` のみ使用 (`<ol>` 禁止) | `type="ordered"` で **`<ol>` を描画** (DEV 警告は出すが描画は行う)。番号タイプの grid/subgrid レイアウトと `<span>` 採番を **未再現** (`list-style-type: decimal` で代替) | ❌ | 公式は `<ol>` 不使用が明確なガイドライン。grid+subgrid+テキスト採番の正準実装を流用すべき |

## 検出した差異 (修正対象)

1. **[medium]** `<ol>` 描画: 公式は `<ul>` のみ (MD/example とも `<ol>` 不使用、番号はテキスト)。Vue は `type="ordered"` で `<ol>` を出力。修正方針: `<ol>` ルートを廃し `data-marker="number"` + テキスト採番に統一。
   - 該当行: `DadsList.vue:51` (`type === 'ordered' ? 'ol' : 'ul'`), `:55`
2. **[medium]** 番号タイプのレイアウト未再現: 公式の `display: grid` / `subgrid` / `<span>` 採番を `list-style-type: decimal` で代替。コピー可能テキスト採番にならない。
   - 該当行: `DadsList.vue:115-118`
3. **[low]** 入れ子マージン: 公式 `margin-top/bottom` は `--_spacing` 連動だが Vue は `margin-top: 4px` 固定 + `margin-bottom: calc(-1*…)` 補正欠落。
   - 該当行: `DadsList.vue:122-125`
4. **[low]** 不在トークン `--color-text-primary` で color 直値化 (公式は color 未指定=継承)。
   - 該当行: `DadsList.vue:79`
5. **[low]** font-family / font-size / line-height を独自固定 (公式は継承委譲)。
   - 該当行: `DadsList.vue:78`,`80`,`81`

## ハードコード / 誤トークンの洗い出し

- `color: var(--color-text-primary, #1a1a1a)` — トークン不在、`L79`
- `var(--spacing-32, 2rem)` / `var(--spacing-4|8|12, …)` — `--spacing-*` は design-tokens に存在しないため常にフォールバック直値。値自体は公式 `calc(N/16*1rem)` と一致するため視覚差は無いが、トークン参照としては無効。`L77`,`L92-93`,`L96-97`,`L100-101`,`L117`,`L123`

## 結論

- **修正要 / 優先度 medium**。視覚的なリズム差は小さいが、`<ol>` 描画は公式アクセシビリティガイドライン (項番はコピー可能テキスト / `<ol>` 不使用) に反する設計上の逸脱で、最優先で是正したい。
- 想定 changeset レベル: **minor**。`type='ordered'` の挙動変更 (= `<ol>` 廃止) は API 振る舞いの変更を伴う。番号タイプを grid+テキスト採番へ寄せる場合は items の型 (採番テキストの受け渡し) も影響し得る。
- aria 不変: リスト構造自体は `<ul>/<li>` 維持で問題なし。`<ol>` 廃止はむしろ SR 体験を公式準拠に改善する。
