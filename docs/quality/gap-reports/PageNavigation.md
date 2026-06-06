# Gap Report: `DadsPageNavigation`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/PageNavigation/DadsPageNavigation.vue` |
| 真実の源 (一次) | `md` (+ WAI-ARIA Authoring Practices) |
| 参照パス | `dads-document-md/dads/components/page-navigation/index.md` (※ example dir 無し / Figma PNG もこの環境に無し) |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | low |
| 検出差異数 | 4 |

## 観点別チェック

> 注: 公式 MD は「ページナビゲーションのガイドラインは準備中です」(index.md:17) で具体的なビジュアル仕様を提供していない。example(HTML 正準実装)も存在しない(MD の「HTML版実装: 提供予定」)。よって本監査は **WAI-ARIA Authoring Practices(Pagination)+ 他 DADS コンポーネントのトークン慣習**を基準とした相対評価であり、ピクセル単位の正準値は確定不能。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | 公式 MD に明記なし。DADS 慣習: `--font-family-sans` / body `line-height 1.7` / `letter-spacing 0.02em` | `--font-family-sans` / `--font-size-14(0.875rem)` / `--line-height-150(1.5)`、letter-spacing なし (.vue:140-143) | ⚠️ | DADS 他コンポーネントは line-height 1.7 + letter-spacing 0.02em が標準。揃えるのが望ましいが正準値未確定のため low |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 公式 MD に明記なし。リンク色慣習: `--color-primitive-blue-900` | リンク文字 `--color-primitive-blue-900`、active 背景 `--color-primitive-blue-900` + 白文字、disabled `--color-neutral-solid-gray-420`、hover 背景 `--color-neutral-solid-gray-50` (.vue:174,181,187,192-193) | ✅ | すべて公式 `--color-primitive-*` / `--color-neutral-*` 系を参照しており DADS トークン慣習に整合。直書きカラー無し(フォールバックのみ) |
| 角丸 (`--border-radius-*`) | 公式 MD に明記なし | `var(--border-radius-4, 0.25rem)` (.vue:171) | ⚠️ | 正準値未確定。他コンポーネント(button)が 8px 系を使う場合があり、要 Figma 照合(この環境では PNG 無し) |
| スペーシング (padding / gap / margin: `--spacing-*`) | 公式 MD に明記なし | list gap `--spacing-4`、btn padding `--spacing-4 --spacing-8`、min 2rem×2rem (.vue:149,166,172) | ✅ | `--spacing-*` トークンを一貫使用。直書きの spacing 無し |
| エレベーション / 影 (`--elevation-*`) | 該当なし | 影の使用なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | 公式 MD に明記なし | `1px solid transparent` ベース、active で塗りつぶし(border は transparent のまま) (.vue:170) | ⚠️ | 1px 透明ボーダーでレイアウトは安定。公式の枠線有無は未確定 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA: 現在ページに `aria-current="page"`、無効リンクは操作不可。focus は視認可能 | hover `--color-neutral-solid-gray-50`、focus 共有 `dads-focus-ring`(black outline + yellow)、active(current)=`aria-current="page"` + 青背景白文字、disabled `pointer-events:none` + グレー (.vue:99-102,179-202) | ✅ | `aria-current="page"` 適用 OK。focus-ring は DADS 標準。状態網羅は良好 |
| サイズバリアント (sm/md/lg 等) | 公式 MD に明記なし | サイズ prop 無し(単一サイズ) | ⚠️ | 公式にサイズ軸があるか不明。現状単一で妥当と思われる |
| forced-colors / ハイコントラスト | OS カラー使用が望ましい | `LinkText`/`CanvasText`/`GrayText`/`Highlight`/`HighlightText` を適切に使用 (.vue:217-232) | ✅ | forced-colors 対応は適切。active を Highlight/HighlightText 化しており良好 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 example 無し。共有部品(button 等)の指定も MD 上で不明 | 独自 `__btn`(共有 `dads-reset-button`/`dads-focus-ring` mixin は流用)。ページ番号生成 + ellipsis ロジックを自前実装 (.vue:159-203) | ⚠️ | example が無いため「独自再実装によるドリフト」とは断定不可。共有 mixin は流用しており構造は健全。ただし将来公式 HTML 版公開時に再照合が必要 |

## 検出した差異 (修正対象)

1. **[low]** タイポグラフィ: line-height が `--line-height-150`(1.5)。DADS 他コンポーネントは body 1.7 + letter-spacing 0.02em が標準。揃えるのが望ましい。
   - 該当行: `DadsPageNavigation.vue:142`
2. **[low]** 角丸: `--border-radius-4`(4px) 固定。公式正準値未確定(Figma PNG 不在のため照合不可)。HTML 版公開後/Figma 取得後に再確認。
   - 該当行: `DadsPageNavigation.vue:171`
3. **[low]** ellipsis 色: `--color-neutral-solid-gray-420`(disabled と同色)。ellipsis は装飾(`aria-hidden`)であり、disabled より視認性のあるグレーが望ましい可能性。要 Figma 照合。
   - 該当行: `DadsPageNavigation.vue:212`
4. **[low]** 正準照合不能: example/Figma PNG いずれもこの環境に無く、寸法・色のピクセル一致を確定できない。公式 HTML 版(MD「提供予定」)公開後に再監査が必要。
   - 該当行: 全般

## ハードコード / 誤トークンの洗い出し

- 直書きカラー / spacing / radius は **検出されず**。すべて `var(--token, fallback)` 形式で、フォールバック直値は許容範囲。
- 使用トークンはすべて DADS 実在トークン(`--color-primitive-blue-900`, `--color-neutral-solid-gray-50/420/900`, `--color-neutral-white`, `--spacing-4/8`, `--font-size-14`, `--line-height-150`, `--border-radius-4`)で、NotificationBanner/ProgressIndicator のような非定義トークン(`--color-brand-*`/`--color-*-bg`)は無し。**3 件中で最もトークン衛生が良好**。

## 結論

- **修正要否**: 軽微(任意)。トークン使用・aria・forced-colors は健全で、公式正準実装が存在しない現状では大きな修正対象なし。
- **優先度**: low
- **想定 changeset レベル**: **patch**(line-height/letter-spacing の調整程度。API/DOM 変更不要)。
- **API/aria 不変を保てるか**: 保てる。`aria-current="page"` / `nav[aria-label]` / disabled 制御は WAI-ARIA に適合済み。今回提案の修正は CSS のみで API・aria に影響なし。
- **要フォロー**: 公式 HTML 版(MD「提供予定」)または Figma PNG 取得後に角丸・寸法の正準照合を再実施すること。
