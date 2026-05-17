# Tasklist

## Phase 1: ギャップ分析 (Done)

- [x] G1. sub-agent A 起動 (13 件)
- [x] G2. sub-agent B 起動 (13 件)
- [x] G3. sub-agent C 起動 (13 件)
- [x] G4. 結果集約 (`gap-report-aggregated.md`)

## Phase 2: 命名整合 (Done)

- [x] N1. DadsModal → DadsDialog (`a10909f`)
- [x] N2. DadsHeader → DadsHeaderContainer (`2d3a880`)
- [x] N3. DadsTextField → DadsInputText (`8eac883`)
- [x] N4. DadsChip → DadsChipLabel + DadsChipTag 分割 (`60ac2ef`)
- [x] N5. docs sidebar / ページ更新 (N1-N4 と同時)
- [x] N6. verify: typecheck / lint / test / build

## Phase 3: High 実装 (Done)

- [x] H1. breadcrumb (aria-current 確認のみ、既に実装済)
- [x] H2. dialog (variant + returnFocusTo + initialFocus) (`6d4b187`)
- [x] H3. heading (shoulder/subtitle/icon/chip/size + hgroup) (`854d497`)
- [x] H4. drawer (placement variant) (`f6fefb1`)
- [x] H5. notification-banner (style/timestamp/persistKey) (`30c59a7`)
- [x] H6. menu-list-box (opener + 開閉state) (`f1782d3`)
- [x] H7. mobile-menu (type slide/accordion) (`ece765b`)
- [x] H8. header-container (variant + logo/utility slot) (`044935c`)
- [x] H9. carousel (type/mode/heading/showAll + autoPlay warn) (`78116b1`)

## Phase 4: クローズ (Done)

- [x] C1. tasklist にチェック
- [x] C2. 最終コミット

## 成果

- **テスト**: 1585 → 1755 (+170)
- **コミット**: 13 (命名整合 4 + High 拡張 8 + 最終)
- **検証**: 全工程 typecheck/lint/format:check/test/build グリーン
- **a11y**: 全実装が WAI-ARIA Authoring Practices 準拠

## 未対応 (将来)

- Medium 17 件 / Low 13 件 (gap-report-aggregated.md 参照)
- carousel multi mode の完全実装 (現状は modifier のみ)
