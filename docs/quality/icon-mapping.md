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
- アイコン追加時はスクリプトの `MDI_TO_SYMBOL`（または symbols 名）を更新して再生成。

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
