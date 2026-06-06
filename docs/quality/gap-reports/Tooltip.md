# Gap Report: `DadsTooltip`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Tooltip/DadsTooltip.vue` |
| 真実の源 (一次) | `wai-aria` (公式 example なし / MD なし) |
| 参照パス | WAI-ARIA Authoring Practices Tooltip Pattern (`role="tooltip"` + `aria-describedby`); design-tokens でトークン存在確認 |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | medium |
| 検出差異数 | 5 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | DADS 実在: `--font-family-sans`, `--font-size-14`, `--line-height-150` | font-family `var(--font-family-sans, ...)` ✅ (L201); size `var(--font-size-14)` ✅ (L202); line-height `var(--line-height-150, 1.5)` ✅ (L203) | ✅ | 使用トークン名すべて実在。妥当 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | 反転バブル: 暗背景+白文字。DADS 実在: `--color-neutral-solid-gray-900`/`--color-neutral-white` | bg `var(--color-bg-inverse, #1a1a1a)` (L198); text `var(--color-text-inverse, #fff)` (L199) | ❌ | **`--color-bg-inverse` / `--color-text-inverse` は DADS に未定義** → fallback 直値で描画。`--color-neutral-solid-gray-900` / `--color-neutral-white` (実在) へ置換 |
| 角丸 (`--border-radius-*`) | `--border-radius-4` (実在) | `var(--border-radius-4, 0.25rem)` (L200) | ✅ | 4px は小型バブルとして妥当。トークン名実在 |
| スペーシング (padding / gap / margin: `--spacing-*`) | **DADS に `--spacing-*` 軸は存在しない** | padding `var(--spacing-8) var(--spacing-12)` (L197); GAP=8(JS, L81) | ❌ | `--spacing-*` 軸は未定義 → fallback 直値。実在トークンか rem 直値へ。GAP は JS 定数 8px で配置に使用 (許容範囲だがトークン化が望ましい) |
| エレベーション / 影 (`--elevation-*`) | DADS elevation トークンが存在 (`--elevation-*`) | `box-shadow: 0 2px 8px rgba(0,0,0,0.2)` (L204, **直書き**) | ⚠️ | エレベーションを直書き。DADS の `--elevation-*` トークンへ置換すべき (foundations/elevation 参照) |
| ボーダー (太さ / 色 / 有無) | 通常時ボーダーなし (反転バブル) | 通常時なし; forced-colors 時 `1px solid CanvasText` (L279) | ✅ | 妥当 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA: hover/focus で表示・Esc/blur で非表示・`aria-describedby` 連携 | mouseenter/leave + focusin/out で開閉 (L157-160); `aria-describedby` 連携 (L155); open/close delay; `pointer-events:none` (L205) | ⚠️ | hover/focus 開閉・aria-describedby は妥当。**Esc キーで閉じる挙動が未実装** (WAI-ARIA Tooltip では Esc 閉じが必須要件)。disabled prop でツールチップ抑制は実装済 |
| サイズバリアント (sm/md/lg 等) | 該当なし | position バリアント 8 種 (top/bottom/left/right ± start/end) | ✅ | サイズ軸はなし。配置バリアントは妥当 |
| forced-colors / ハイコントラスト | Canvas/CanvasText で反転を打ち消し可視化 | bubble `Canvas`+`CanvasText`+`1px CanvasText`; arrow も同様 (L278-287) | ✅ | 適切に実装 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 example/共有部品なし。`role="tooltip"`+Teleport+矢印は妥当な独自実装 | Teleport to body + Transition + 回転 square 矢印 (L162-180) | ✅ | 公式部品が無いため独自実装は妥当。構造は WAI-ARIA に整合 |

## 検出した差異 (修正対象)

1. **[medium]** カラー: `--color-bg-inverse` / `--color-text-inverse` が DADS に未定義 → fallback 描画。`--color-neutral-solid-gray-900` / `--color-neutral-white` へ置換。
   - 該当行: `DadsTooltip.vue:198, 199`
2. **[medium]** エレベーション: `box-shadow: 0 2px 8px rgba(0,0,0,0.2)` を直書き。`--elevation-*` トークンへ置換。
   - 該当行: `DadsTooltip.vue:204`
3. **[medium]** 状態(キーボード): Esc キーで閉じる挙動が未実装 (WAI-ARIA Tooltip 必須)。`@keydown.esc` で `close()` を追加。
   - 該当行: `DadsTooltip.vue:152-160` 付近 (追加要)
4. **[low]** スペーシング: 存在しない `--spacing-*` 軸へ依存。実在トークンか rem 直値へ。
   - 該当行: `DadsTooltip.vue:197`
5. **[low]** 矢印・GAP 寸法 (0.5rem/0.25rem/8px) が直書き。トークン化が望ましい (軽微)。
   - 該当行: `DadsTooltip.vue:81, 197, 219-220`

## ハードコード / 誤トークンの洗い出し

- `var(--color-bg-inverse, #1a1a1a)` — L198 (誤トークン名)
- `var(--color-text-inverse, #fff)` — L199 (誤トークン名)
- `box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2)` — L204 (直書きエレベーション)
- `--spacing-8 / --spacing-12` — L197 (DADS に存在しないトークン軸)
- `max-width: 16rem` — L196 (直書き、許容範囲)
- `width/height: 0.5rem` (arrow) / `margin-left: -0.25rem` 等 — L219-220, L234 ほか (直書き寸法、軽微)
- `z-index: 1100 / 1` — L195, L210 (直書き、許容)
- `GAP = 8` — L81 (JS 直値、配置用)

## 結論

- 修正要否: **要修正 (medium)**。構造・aria・forced-colors は良好だが、反転色トークン名の未定義 + エレベーション直書き + Esc 閉じ欠落が残る。
- 優先度: 中 (カラートークン名是正と Esc 閉じが優先。エレベーションのトークン化が次点)。
- 想定 changeset レベル: **patch** (トークン名是正・影トークン化は見た目維持)。Esc 閉じ追加は挙動変更だが a11y 改善で **patch〜minor**。
- API/aria 不変: props/`role="tooltip"`/`aria-describedby` は不変で実施可能。Esc 閉じはキーハンドラ追加のみで API 影響なし。
