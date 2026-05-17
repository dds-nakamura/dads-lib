# Tasklist

## Phase 1: ギャップ分析 (Done)

- [x] G1-G4: sub-agent A/B/C 起動 + 集約

## Phase 2: 命名整合 (Done)

- [x] N1. DadsModal → DadsDialog
- [x] N2. DadsHeader → DadsHeaderContainer
- [x] N3. DadsTextField → DadsInputText
- [x] N4. DadsChip → DadsChipLabel + DadsChipTag 分割
- [x] N5. docs sidebar / ページ更新
- [x] N6. verify

## Phase 3: High 実装 (Done)

- [x] H1. breadcrumb (aria-current 確認のみ)
- [x] H2. dialog (variant + returnFocusTo + initialFocus)
- [x] H3. heading (shoulder/subtitle/icon/chip/size + hgroup)
- [x] H4. drawer (placement variant)
- [x] H5. notification-banner (style/timestamp/persistKey)
- [x] H6. menu-list-box (opener + 開閉state)
- [x] H7. mobile-menu (type slide/accordion)
- [x] H8. header-container (variant + logo/utility slot)
- [x] H9. carousel (type/mode/heading/showAll + autoPlay warn)

## Phase 4: Medium 全件 + carousel multi (Done)

- [x] M1. divider (variant/thickness/lineStyle)
- [x] M2. emergency-banner (timestamp/linkExternal)
- [x] M3. hamburger-menu-button (variant)
- [x] M4. list (spacing/nestingMarker/ordered warn)
- [x] M5. input-text (placeholder/maxlength warn + align)
- [x] M6. progress-indicator (color)
- [x] M7. accordion (size + returnLink)
- [x] M8. chip-label + chip-tag (appearance: filled/outlined)
- [x] M9. card (#image / #sub slot)
- [x] M10. menu-list (divider/section)
- [x] M11. image-slider (heading + showAll)
- [x] M12. file-upload (expandDropArea + showFileSize)
- [x] M13. select (prefixIcon + chips)
- [x] M14. table (loading skeleton)
- [x] M15. search-box (suggestions/clearable/categories)
- [x] M16. date-picker (variant separated + locale wareki)
- [x] M17. resource-list (kind/selected/disabled/action)
- [x] M18. carousel multi mode (visibleCount + track layout)

## Phase 5: Low 13 件 (Done — 2026-05-17 第 3 セッション)

実装あり (3 件):

- [x] L-button. xs サイズ確認 (実装済み確認のみ; `DadsSize` に xs 含有、CSS に `--xs` 28px 定義済み)
- [x] L-language-selector. `colorScheme` (`light-blue` / `light-green` / `light-gray`) + `cornerShape` (`rounded` / `pill` / `square`) 追加
- [x] L-radio. `description` (label 直下の説明文) + RadioGroup `legendVisuallyHidden` 追加

Deprecated 警告強化 (2 件):

- [x] L-bottom-navigation. docs に `danger` バナー + 代替案 (HamburgerMenuButton + MobileMenu / HeaderContainer + GlobalMenu / Tab) を追記。types に `@deprecated` JSDoc
- [x] L-scroll-top-button. docs に `danger` バナー + 代替案 (TableOfContents / PageNavigation / skip-link / Header sticky) を追記。types に `@deprecated` JSDoc

「該当なし」確認のみ (6 件):

- [x] L-blockquote / L-checkbox / L-description-list / L-disclosure / L-textarea / L-utility-link. 各 docs 冒頭に「✅ 公式仕様充足」ステータスバナーを追加

評価結論 (2 件):

- [x] L-mega-menu. 公式仕様準備中のため追加 prop 評価不能。docs に「🚧 公式仕様準備中」バナー追加。公式仕様確定後に再評価
- [x] L-heading. 公式中核仕様は H3 (Phase 3) で実装済 (shoulder/subtitle/icon/chip/size + hgroup)。Low では追加なし

## 累計成果 (3 セッション)

- **テスト**: 1585 → 1881 (+296、Low 段で +10)
- **コミット**: 31 + Low 段
- **検証**: 全工程グリーン
