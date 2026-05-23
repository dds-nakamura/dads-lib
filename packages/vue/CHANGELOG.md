# @dads/vue

## 0.2.1

### Patch Changes

- b5ef4cc: build: Vite 7 → Vite 8 (Rolldown) へ移行

  `@dads/vue` のビルド基盤を Vite 7.3.3 → Vite 8.0.14 にアップグレード。Vite 8 は Rollup + esbuild の二重バンドラを Rust 製の **Rolldown** に統一しており、当ライブラリでは以下の改善が確認できた:
  - **ビルド時間**: 7.59s → 3.34s (約 2.27× 高速)
  - **`dist/index.js`**: 214.94 kB → 185.59 kB (-13.7%, gzip 42.98 → 40.18 kB)
  - **`dist/index.css`**: 209.58 kB → 206.14 kB (-1.6%, Lightning CSS による minify)

  公開 API の変更なし、後方互換 100%。`dist/index.js` / `dist/index.css` / `dist/index.d.ts` のファイル構成は従来通り。

  合わせて `vitest`: ^3.2.4 → ^4.0.0、`@vitest/coverage-v8`: ^3.2.4 → ^4.0.0 にも追従。`vite.config.ts` の `rollupOptions` を `rolldownOptions` にリネーム（Vite 8 の compat layer により両表記とも受理されるが、可読性のため）。`apps/docs` (VitePress 1.6.4) は VitePress 2.0 stable 待ちのため、Vite 7 のまま据え置き — pnpm の per-workspace 解決で Vite 7 / 8 が共存する構成。

## 0.2.0

### Minor Changes

- ceda43c: i18n 対応: テンプレート直書きの日本語を全て optional プロップ化（後方互換 100%）

  22 コンポーネントに対し、ハードコードされていた日本語のラベル・ARIA テキスト・補間文字列を上書き可能な optional プロップとして外出ししました。既存デフォルトは全て現状の日本語のままなので、利用側の挙動には変化ありません。

  新規プロップの内訳:
  - **フォーム系 11 コンポーネント**（InputText / Textarea / Select / Combobox / Checkbox / CheckboxGroup / Radio / RadioGroup / SearchBox / FileUpload / DatePicker）に `requiredLabel?: string` を追加（既定値 `'必須'`）
  - **DatePicker**: `yearLabel` / `monthLabel` / `dayLabel` / `openCalendarAriaLabel` / `prevMonthAriaLabel` / `nextMonthAriaLabel` を追加
  - **TableControl**: `prevPageLabel` / `nextPageLabel` / `formatPageSizeOption(n)` / `formatRangeLabel(start, end, total)` を追加
  - **Table**: `loadingLabel` を追加
  - **Drawer**: `defaultAriaLabel` / `navAriaLabel` を追加
  - **HeaderContainer**: `navAriaLabel` を追加
  - **MobileMenu**: `navAriaLabel` / `subLinksAriaLabel` を追加
  - **Carousel / ImageSlider**: `prevSlideAriaLabel` / `nextSlideAriaLabel` / `slidePositionAriaLabel` / `formatSlideAriaLabel(current, total)` を追加
  - **ColorPicker**: `defaultAriaLabel` / `hexInputAriaLabel` / `formatSwatchAriaLabel(color)` を追加
  - **Select**: `formatRemoveAriaLabel(label)` を追加（複数選択時のチップ削除ボタン）
  - **UtilityLink**: `newTabAriaLabel` を追加
  - **EmergencyBanner**: `newTabHintText` を追加
  - **ScrollTopButton**: `defaultLabel` を追加

  スコープ外（次回以降）:
  - `withDefaults` 内の文字列デフォルト（カテゴリB）の prop 化
  - console.warn メッセージ / DatePicker の和暦変換 / FileUpload のエラー文言
