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

## Phase 5: Low 13 件 (別セッション)

- [ ] L1-L13. 要点 (該当なし or 軽微) — gap-report-aggregated.md 参照

## 累計成果 (2 セッション)

- **テスト**: 1585 → 1863 (+278)
- **コミット**: 31 (本セッション分 14 + Medium 段 17)
- **検証**: 全工程グリーン
