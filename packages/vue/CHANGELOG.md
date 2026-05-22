# @dads/vue

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
