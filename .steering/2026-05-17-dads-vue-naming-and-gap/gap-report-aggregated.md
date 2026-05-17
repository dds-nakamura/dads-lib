# 集約ギャップ分析レポート (39 件)

集計日: 2026-05-17
ソース: gap-report-A.md / gap-report-B.md / gap-report-C.md
判定基準: High = a11y 違反 / 主要ユースケース不可 / 公式必須要素欠落

## サマリ

| 重要度 | 件数 | 内訳                                                                                                                                                                                                                                  |
| ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| High   | 9    | carousel, dialog(Modal), drawer, header-container(Header), heading, menu-list-box, mobile-menu, notification-banner, breadcrumb(条件付)                                                                                               |
| Medium | 17   | accordion, card, chip-label, chip-tag, date-picker, divider, emergency-banner, file-upload, hamburger-menu-button, image-slider, input-text(a11y warn), list, menu-list, progress-indicator, resource-list, search-box, select, table |
| Low    | 13   | blockquote, bottom-navigation(deprecated), button(xs確認), checkbox, description-list, disclosure, language-selector, radio, scroll-top-button(deprecated), textarea, utility-link, mega-menu(仕様乏), heading(略)                    |

合計: 39 件 (chip-label/chip-tag 各 1、その他 37)

---

## High 重要度 9 件: 必要工数 & 内容

### 1. carousel (DadsCarousel) — 2h+

- type (`'key-visual' | 'container'`), mode (`'single' | 'multi'`) 不足
- ネクストエリア / すべてのスライドボタン / `headingLevel` 必要
- `autoPlay` は公式非推奨 (削除または docs 警告)
- `aria-live` / `tablist` 役割が必要

### 2. dialog (DadsModal → DadsDialog) — 2h+

- `variant?: 'modal' | 'non-modal'` 不足
- `returnFocusTo` / `initialFocus` (a11y 必須)
- focus trap 実装確認必要

### 3. drawer (DadsDrawer) — 2h+

- `placement` (`'left' | 'right' | 'full'`) 不足
- 公式は 3 パターン明記、現実装は片側固定

### 4. header-container (DadsHeader → DadsHeaderContainer) — 2h+

- `variant` (`'wide-full' | 'wide-slim' | 'medium' | 'compact'`) 4 種不足
- `logoHref` / `logoLabel` / `logo` slot / `utility` slot 不足
- 構造的に再設計レベル

### 5. heading (DadsHeading) — 2h+

- `shoulder` / `subtitle` / `icon` / `chip` / `size` 不足
- `<hgroup>` ラッパー不足 (a11y)
- 公式中核仕様

### 6. menu-list-box (DadsMenuListBox) — 2h+

- オープナー (`label` / `icon` / `triggerSize`) と開閉 state 不足
- `placement` / `open` / `close` event 不足
- 現実装は半実装 (常時表示 box のみ)

### 7. mobile-menu (DadsMobileMenu) — 2h+

- `type` (`'slide' | 'accordion'`) 不足 (主要バリアント軸)
- 階層スライド遷移なし

### 8. notification-banner (DadsNotificationBanner) — 2h+

- `style` (`'standard' | 'color-chip'`) 不足
- `timestamp` / `actions` / `persistKey` 不足
- `role="status" vs alert` 出し分け要確認

### 9. breadcrumb (DadsBreadcrumb) — 条件付 1h

- `aria-current="page"` 実装次第で Medium↔High が変動
- 実装ファイル `DadsBreadcrumb.vue` の確認必要

---

## Medium 重要度 17 件 (要点のみ)

- **accordion**: `size` (L/M/S/XS) / `returnLink` / native details オプション
- **card**: `#image` / `#sub` slot 強化
- **chip-label / chip-tag**: `variant` / `appearance='filled'|'outlined'` (分離 spec で対応)
- **date-picker**: `variant='consolidated'|'separated'` / `locale` (和暦)
- **divider**: `variant='full-width'|'inset'` / `thickness` / `style`
- **emergency-banner**: `timestamp` / `linkExternal`
- **file-upload**: `expandDropArea` / メタ情報整形
- **hamburger-menu-button**: `variant` (default/icon-only/mobile-conditional)
- **image-slider**: `heading` / showAll ボタン
- **input-text (TextField)**: `placeholder`/`maxlength` の dev warn / `align` バリアント
- **list**: `spacing` / `nestingMarker` / `ordered` deprecate
- **menu-list**: `divider`/`section` 表現 / `itemKind`
- **progress-indicator**: indeterminate linear / `color`
- **resource-list**: Information/Form Type バリアント / `selected` / `action`
- **search-box**: `suggestions` / `clearable` / `withCategory`
- **select**: `prefixIcon` / `chips` (multiple) / native フォールバック
- **table**: `loading` skeleton / sort/selection helper slot

## Low 重要度 13 件

該当なし or 軽微 (詳細は各 group report 参照)。

---

## 推定総工数

- **High 9 件**: 約 18-20 時間 (2h+ × 8 + 1h × 1)
- **Medium 17 件**: 約 17-25 時間
- **命名整合 4 件**: 約 3-4 時間
- **High だけ実装すると**: ~20h、命名整合と合わせて ~24h
