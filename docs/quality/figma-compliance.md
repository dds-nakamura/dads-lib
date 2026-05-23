# Figma 仕様準拠 (Figma Compliance)

`@dads/vue` 実装と DADS 公式 Figma デザインとの整合性を恒常的に維持するための運用ドキュメント。MD 仕様 (`dads-document-md/`) が「準備中」と記載しているコンポーネントについても、Figma スナップショットを一次資料として実装ギャップを検出・補完する。

---

## 目的

- DADS 公式 Figma 仕様と `@dads/vue` の **API / DOM 構造 / ビジュアル** を整合させる。
- 公式 MD が「ガイドラインは準備中」のコンポーネント (chip-tag, tab, combobox, mega-menu, page-navigation, table-control, image, dialog 等) でも Figma 画像を真実の源として参照可能にする。
- 「準備中」マークが取れたあとに DADS 公式 React 実装と相互運用可能になる土台を整える。
- `dads-document-md/` (Markdown 仕様) と `dads-document-figma/` (PNG スナップショット) を **二系統の一次資料** として並行運用する。

---

## Figma スナップショットの運用

### ファイル配置

```
dads-document-figma/
├── <ページ名>/<ページ名>.png      ← 全 42 件のビジュアル仕様
└── playwright-manifest.json       ← fileKey / exportedAt / ページ一覧メタデータ
```

- 配置先は `dads-document-figma/<ページ名>/<ページ名>.png` 形式。Foundation・各コンポーネントを 1 ページ = 1 PNG で格納。
- gitignore 対象 (リポジトリにはコミットしない / 各環境で再生成)。
- `Read` ツールが PNG をマルチモーダルに直接読めるため、Claude Code から状態・バリエーション情報を直接参照可能。
- 取得日時・fileKey は `playwright-manifest.json` で追跡。

### 取得スクリプトの使い分け

`scripts/` 配下の 3 種類のスクリプトを目的別に使い分ける。

| スクリプト                       | 役割                                         | 使い所                                              |
| -------------------------------- | -------------------------------------------- | --------------------------------------------------- |
| `figma-login.mjs`                | Playwright 用認証状態を初回取得 / 永続化     | 環境セットアップ時 1 回のみ                         |
| `figma-export.mjs`               | Figma REST API 経由でエクスポート            | 認証トークンを持つ少数ページの精密取得              |
| `figma-playwright-export.mjs`    | Playwright 経由で UI からエクスポート (推奨) | 42 ページ一括取得 / rate limit 回避が必要なとき     |

実行コマンド:

```bash
# 認証保存 (初回 1 回のみ)
pnpm figma:login

# 全ページ取得 (Playwright 経由)
pnpm figma:pw-export
```

詳細は [scripts/README.md](../../scripts/README.md)。

### 認証

- Playwright auth state を `scripts/.figma-auth.json` に保存し、以後の自動化はこれを再利用する。
- `figma-login.mjs` は対話的に Figma へログインして state を取得・保存する 1 回限りのスクリプト。
- `.figma-auth.json` は gitignore 対象 (機密情報のため commit 禁止)。
- REST API 経由 (`figma-export.mjs`) を使う場合は別途 Figma Personal Access Token を環境変数で渡す。

---

## 「準備中」コンポーネントへの対応

公式 MD (`dads-document-md/dads/components/<name>/index.md`) に **「ガイドラインは準備中です」** とだけ記載されているコンポーネントは、以下の優先順位でビジュアル仕様を確定させる。

1. **`dads-document-figma/<name>/<name>.png` を `Read`** — ビジュアル仕様の一次資料。
2. **WAI-ARIA Authoring Practices** で動作要件 (キーボード / role / aria-*) を確定。
3. **`design-system-example-components-html/src/components/<name>/`** に該当 HTML/CSS/JS があれば DOM 構造の参考に。
4. PNG が環境にない場合は `dads-document-md/` + WAI-ARIA Authoring Practices を真実の源とする (過去方針どおり)。

該当しやすいコンポーネント例: `chip-tag`, `tab`, `combobox`, `mega-menu`, `page-navigation`, `table-control`, `image`, `dialog`。

---

## ビジュアル準拠の判定

実装が Figma に準拠しているかは以下を基準に判定する。

| 観点                  | 判定基準                                                                          |
| --------------------- | --------------------------------------------------------------------------------- |
| API の意味論          | Figma の用途と実装の API が同じ概念を指している (例: pagination vs in-page TOC)  |
| DOM 構造 / role       | `role` / `aria-*` / 階層構造が Figma の状態を表現できる                           |
| バリエーション網羅    | Figma に存在する向き (horizontal/vertical) / 状態 (active/disabled) を表現可能    |
| デザイントークン      | 色・spacing・タイポを `design-tokens/` 経由で参照 (ハードコード禁止)              |
| アクセシビリティ      | axe 違反なし / WAI-ARIA Authoring Practices を満たす                              |

API の意味論ギャップ (例: `DadsPageNavigation` が in-page TOC として実装されていたが Figma は pagination だった) が見つかった場合、プライベートライブラリのためメジャー breaking 変更を許容し、`renaming` で API を整合させる。移行期 alias は維持しない。

---

## rate limit / Playwright 採用理由

Figma エクスポート手段として REST API ではなく **Playwright 経由 (`figma-playwright-export.mjs`)** を推奨する理由:

- **rate limit 回避**: Figma REST API は短時間に大量ページをエクスポートすると `429 Too Many Requests` を返す。UI 経由のエクスポートはユーザーセッション扱いで制限が緩やか。
- **認証の安定性**: Personal Access Token はファイルアクセス権限が限定的なケースがある。ログインセッション (auth state) なら閲覧権限のあるすべてのファイルにアクセス可能。
- **ビジュアル忠実度**: UI の「Export as PNG」相当の処理を Playwright で再現することで、Figma が公式に出力するピクセルと一致する。
- **42 ページ一括取得**: スナップショット全件 (42 PNG) を 1 コマンドで安定取得できる。

REST API 経由 (`figma-export.mjs`) は少数ページの精密取得・自動化パイプラインで token 認証が前提のときに限定的に使う。
