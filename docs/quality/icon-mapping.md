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

## アイコン追加の方針と手順（runbook）

### 方針: キュレートされた registry を都度追加で運用する（方針 A）

`DadsIcon` は **ビルド時に同梱された `iconRegistry` のみ**を描画する（`packages/vue/src/components/Icon/DadsIcon.vue`）。registry に無い名前を渡すと **何も描画されず**（空 `<svg>`）、開発時に `console.warn` が出るだけで webfont フォールバックは無い。利用側が外部から独自アイコンを登録したり raw SVG を渡す拡張ポイントは **現状用意していない**。

これは「使うアイコンだけ同梱してバンドルを最小化する（tree-shaking）」ための意図的なトレードオフ。代償として、**未収録の Material Symbols が必要になるたびに registry へ追加 → `@dads/vue` を patch リリース → 利用側で依存更新**、という対応が必要になる。

> 補足: アプリ固有のニッチなアイコンまで毎回ここへ追加する運用が重くなってきた場合は、`DadsIcon` に「登録 API / raw SVG prop」等の拡張ポイントを設ける案（方針 B）を別 Issue で検討する。共通性の高いアイコンは本体 registry（方針 A）、アプリ固有は利用側で登録、という住み分けが想定。現時点では方針 A のみ採用。

### 利用側で「未収録アイコンが必要」と判明したら

1. 必要な Material Symbols 名（outlined / weight 400）を確定する。名前は <https://fonts.google.com/icons> で検索（例: ゴミ箱 → `delete`）。複数アプリで共通利用されそうな**基本アイコンか**を確認する（基本アイコンであれば本体 registry に入れる価値がある）。
2. dads-lib に Issue を立てる（`feat(vue): icon-registry に <name...> を追加` 等）。要求元アプリと用途を添える。

### registry にアイコンを追加する手順（メンテナ向け）

1. **追加先の定数を選ぶ**（`packages/vue/scripts/generate-icon-registry.mjs`）:
   - 旧 `mdi-*` クラスからの移行を伴うもの → `MDI_TO_SYMBOL`（移行表も兼ねる）
   - `@dads/vue` のコンポーネント内部でのみ使う / デモ用 → `EXTRA_SYMBOLS`
   - **利用側アプリ向けの汎用基本アイコン** → `COMMON_SYMBOLS` ← 通常はここ
2. 対象の Material Symbols 名を上記いずれかの配列に追記する（**`icon-registry.ts` を手書きしない**）。
3. registry を再生成する:

   ```sh
   pnpm --filter @dads/vue exec node scripts/generate-icon-registry.mjs
   # または packages/vue/ で: node scripts/generate-icon-registry.mjs
   ```

   - 名前が `@material-symbols/svg-400` に存在しなければ `missing` でエラー終了する（名前ミスや当バージョン未収録を検知できる）。
   - 生成後は `pnpm --filter @dads/vue exec prettier --write src/components/Icon/icon-registry.ts` で整形。

4. このファイル（`icon-mapping.md`）の該当表に追記する（汎用追加なら「汎用追加アイコン」表）。必要に応じて `packages/vue/README.md` のアイコン節も更新。
5. 検証: `pnpm --filter @dads/vue typecheck`（`DadsIconName` 型反映）/ `test`（`DadsIcon` の同梱・描画検証）/ `build`。
6. changeset を追加（**patch** 相当。additive で非破壊）し、PR（base `development`）→ マージ後 `./scripts/release-vue.sh <version>` で `vue-v<version>` をリリース。手順は [`../architecture/multi-remote-release.md`](../architecture/multi-remote-release.md) を参照。

> ポイント: registry への追加は常に **additive（既存名・型・公開 API 不変）** なので patch リリースで足りる。`DadsIconName` が増えるだけで利用側に破壊的影響は無い。
