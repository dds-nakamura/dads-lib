# アイコン方式: MDI → DadsIcon (Material Symbols inline SVG) 移行マップ (Issue #18 柱B)

`@dads/vue` のアイコンを **MDI webfont（`@mdi/font` / `mdi-*` クラス）** から **inline SVG の `DadsIcon`（Google Material Symbols, outlined / weight 400）** に統一した（案B-2）。webfont 読込ゼロ・使用アイコンのみ同梱（tree-shaking）。

## DadsIcon

```vue
<DadsIcon name="search" :size="20" />
<DadsIcon name="open_in_new" :size="16" label="新しいタブで開く" />
```

- `name`（必須）— Material Symbols 名（下表「新」）。レジストリ（`packages/vue/src/components/Icon/icon-registry.ts`）に同梱されたもののみ描画可。
- `size`（既定 24）— number→px / string→そのまま。SVG は font-size でなく `width`/`height` でサイズ決定。
- `label` — 指定時 `role="img"`+`aria-label`、未指定時 `aria-hidden="true"`（装飾）。
- 色は `currentColor` 継承。

## ソースとレジストリ

- ソース: `@material-symbols/svg-400`（outlined, weight 400, Apache-2.0）。**devDependency**（レジストリ生成時のみ使用、実行時依存なし）。
- 生成: `packages/vue/scripts/generate-icon-registry.mjs` が下表の使用アイコンのみ抽出し `icon-registry.ts` を生成（`viewBox` は Material Symbols の 960 グリッド `0 -960 960 960` を保持）。
- アイコン追加時はスクリプトの `MDI_TO_SYMBOL` / `EXTRA_SYMBOLS` / `COMMON_SYMBOLS`（後述の汎用追加アイコン）を更新して再生成。

## 破壊的変更（公開 API）

icon 系 props（`prependIcon` / `appendIcon` / `iconName` / `triggerIcon` / `item.icon` 等）が受け取る値が **`mdi-*` クラス文字列 → Material Symbols 名** に変わる（案X・後方互換シムなし）。利用側は下表「旧→新」で置換が必要。

## 名前マッピング（旧 mdi → 新 Material Symbols）

| 旧 (mdi クラス)            | 新 (Material Symbols `name`)  |
| -------------------------- | ----------------------------- |
| `mdi-alert`                | `warning`                     |
| `mdi-alert-circle`         | `error`                       |
| `mdi-arrow-right`          | `arrow_forward`               |
| `mdi-bell`                 | `notifications`               |
| `mdi-bookmark`             | `bookmark`                    |
| `mdi-calendar`             | `calendar_today`              |
| `mdi-check`                | `check`                       |
| `mdi-check-circle`         | `check_circle`                |
| `mdi-chevron-double-left`  | `keyboard_double_arrow_left`  |
| `mdi-chevron-double-right` | `keyboard_double_arrow_right` |
| `mdi-chevron-down`         | `keyboard_arrow_down`         |
| `mdi-chevron-left`         | `chevron_left`                |
| `mdi-chevron-right`        | `chevron_right`               |
| `mdi-chevron-up`           | `keyboard_arrow_up`           |
| `mdi-close`                | `close`                       |
| `mdi-close-circle`         | `cancel`                      |
| `mdi-cog`                  | `settings`                    |
| `mdi-content-save`         | `save`                        |
| `mdi-download`             | `download`                    |
| `mdi-file`                 | `draft`                       |
| `mdi-file-document`        | `description`                 |
| `mdi-fire`                 | `local_fire_department`       |
| `mdi-help-circle-outline`  | `help`                        |
| `mdi-home`                 | `home`                        |
| `mdi-information`          | `info`                        |
| `mdi-magnify`              | `search`                      |
| `mdi-menu`                 | `menu`                        |
| `mdi-newspaper`            | `newspaper`                   |
| `mdi-open-in-new`          | `open_in_new`                 |
| `mdi-tag`                  | `label`                       |

> 備考: `expand_more`/`expand_less` は当バージョンの `@material-symbols/svg-400` に同梱されないため、同形の `keyboard_arrow_down`/`keyboard_arrow_up` を採用。

## 汎用追加アイコン（mdi 由来なし / Issue #45）

`@dads/vue` のコンポーネントが内部で使うアイコンに加え、**利用側アプリで頻出する汎用 Material Symbols 39 個**をレジストリに同梱する（`vue-v1.0.2` で追加）。これらは旧 `@mdi/font` からの移行ではなく **新規の additive 追加**（mdi 由来なし）であり、利用側が個別に registry を再生成せず `DadsIcon` / icon 系 props でそのまま使えるようにするためのもの。

スクリプト側では `generate-icon-registry.mjs` の `COMMON_SYMBOLS` 定数に列挙する（`MDI_TO_SYMBOL` とは独立）。

| Material Symbols `name`  | 主な用途           | Material Symbols `name` | 主な用途           |
| ------------------------ | ------------------ | ----------------------- | ------------------ |
| `add`                    | 追加               | `open_with`             | 移動・ドラッグ     |
| `add_circle`             | 追加（強調）       | `palette`               | 配色・テーマ       |
| `arrow_back`             | 戻る               | `pending`               | 処理中・保留       |
| `aspect_ratio`           | 縦横比・サイズ     | `picture_as_pdf`        | PDF 出力           |
| `bolt`                   | クイック動作・電力 | `print`                 | 印刷               |
| `border_all`             | 罫線・表枠         | `print_disabled`        | 印刷不可           |
| `checklist`              | チェックリスト     | `qr_code_2`             | QR コード          |
| `content_copy`           | コピー             | `refresh`               | 再読込・更新       |
| `delete`                 | 削除               | `rotate_right`          | 右回転             |
| `delete_forever`         | 完全削除           | `schedule`              | 時刻・スケジュール |
| `delete_sweep`           | 一括削除           | `star`                  | お気に入り・評価   |
| `edit`                   | 編集               | `straighten`            | 寸法・計測         |
| `edit_document`          | ドキュメント編集   | `table_chart`           | テーブル・表       |
| `format_color_fill`      | 塗りつぶし         | `table_rows`            | 行                 |
| `format_indent_increase` | インデント追加     | `tune`                  | 設定・調整         |
| `format_size`            | 文字サイズ         | `view_column`           | 列                 |
| `grid_off`               | グリッド非表示     | `visibility`            | 表示・プレビュー   |
| `grid_view`              | グリッド表示       | `inbox`                 | 受信・トレイ       |
| `lock`                   | ロック             | `new_label`             | 新規ラベル         |
| `notes`                  | メモ・注記         |                         |                    |

> 出典元: dds-nakamura/web-label-print#311（`@dads/vue` v0.2.0 → v1.x 移行。アプリ使用 66 アイコン中、現 registry に無かった 39 個）。`search` は既収録のため対象外。
