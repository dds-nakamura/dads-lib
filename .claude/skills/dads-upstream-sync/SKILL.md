---
name: dads-upstream-sync
description: DADS（デジタル庁デザインシステム）公式が新バージョンをリリースした際に、dads-lib の参照資産を全レイヤ追随させるランブック。GitHub vendor 3 件 + npm 依存 bump（design-tokens / tailwind-theme-plugin / example-components-html）、Figma スナップショット再エクスポート、公式サイト md の差分更新、docs/ への追随状況反映を、レイヤごとの PR に分割して安全に実施する。第一引数に対象 DADS バージョン（例: v2.14.0）を取る。
allowed-tools: Read, Write, Edit, Bash, WebFetch, AskUserQuestion, Glob, Grep
---

# /dads-upstream-sync — DADS 上流バージョン追随ランブック

## 目的

DADS 公式（<https://design.digital.go.jp/dads/>）が新バージョンをリリースしたとき、dads-lib が抱える **5 つの vendored ソース**を新バージョンへ追随させる。各ソースは追随手段もバージョン判定も異なるため、本ランブックで漏れなく・安全に（非破壊性を検証しつつ）実施する。

| ソース                                                                             | 種別                         | 追随手段                          | 担当フェーズ |
| ---------------------------------------------------------------------------------- | ---------------------------- | --------------------------------- | ------------ |
| `@digital-go-jp/design-tokens`（npm, `packages/tokens`）                           | 機能依存                     | wrapper の dep を手で bump        | Phase 1      |
| `@digital-go-jp/tailwind-theme-plugin`（npm, `packages/tailwind-plugin`）          | 機能依存                     | wrapper の dep を手で bump        | Phase 1      |
| `design-tokens/` `tailwind-theme-plugin/` `design-system-example-components-html/` | 参照素材（vendor）           | clone → rsync                     | Phase 1      |
| `dads-document-figma/`                                                             | snapshot（PNG は gitignore） | `pnpm figma:pw-export`            | Phase 2      |
| `dads-document-md/` (+ `dads-document-html/`)                                      | サイト snapshot              | 公式更新履歴ベースの差分 WebFetch | Phase 3      |
| `docs/`（永続ドキュメント）                                                        | 自前ドキュメント             | 件数・pin・追随状況の反映         | Phase 4      |

> **pin の正本は常に `VENDORED.md`**。各フェーズの最後で `VENDORED.md` を更新し、`pnpm vendor:status` で drift 0 を確認する。

## 使い方

```
/dads-upstream-sync v2.14.0
```

引数が無ければ「Phase 0 で公式の最新バージョンを調べてユーザーに確認」する。

---

## 重要な前提・落とし穴（最初に読む）

- **caret pin はメジャーを跨がない**: `^1.1.9` のままでは v2 は入らない。`packages/tokens` / `packages/tailwind-plugin` の `package.json` を**手で**書き換える必要がある。
- **「メジャー番号 = 破壊的」とは限らない**: DADS の design-tokens / tailwind は SemVer ポリシー上メジャーが上がっても additive なことがある（v1.1.9→v2.0.1 は `--color-key-*` 追加のみで削除・値変更ゼロだった）。**必ず CSS 変数の diff で破壊性を実証**してから進める。
- **Figma は対話ログインが必要**: `pnpm figma:login` はブラウザを開く対話スクリプト。バックグラウンド実行では Enter を送れないことがあるので、**ユーザー自身の通常ターミナルで前面実行**してもらう。これに時間がかかるので **Phase 0 で最初に依頼**し、その間に Phase 1 を進める。
- **Figma の PNG は gitignore 対象**: コミットされるのは `playwright-manifest.json` と `VENDORED.md` のみ。
- **md は全件再クロールしない**: 公式更新履歴（`/dads/updates-dads/`）から「実際に変わったページ」だけ特定して差分更新する。**過去の更新履歴記述（`updates-design` 等の過去エントリ）はリネームせず当時の記録として保持**する。
- **ブランチ規約**: 各フェーズは独立 feature ブランチ・base=`development`。`development`/`main`/`vue-pkg` には直コミット・削除しない。マージ後は `/post-merge` で後始末。
- **CI**: `development` 向け PR でも CI が走る（typecheck/lint/format:check/test/build）。`VENDORED.md` や `playwright-manifest.json` は prettier 対象なので各フェーズで `pnpm -w run format:check` を通す。`dads-document-md` / vendored dir は `.prettierignore` 済み。

---

## Phase 0 — 上流調査 & 影響分析（branch 不要 / 読み取り中心）

1. **Figma ログインを最初に依頼**（時間がかかるため先行）。ユーザーに次を案内する:

   > 通常ターミナルで `pnpm figma:login` を実行 → ブラウザで Figma ログイン → ファイル一覧が出たらターミナルで Enter。`scripts/.figma-auth.json` が出来たら教えてください。
   > あわせて **対象バージョンの Figma Community ファイルを drafts に複製した `NEW_FILE_KEY`** も依頼する（Phase 2 で使用）。

2. **公式の最新バージョンと変更点を取得**（`WebFetch`）:
   - `https://design.digital.go.jp/dads/updates-dads/` … ドキュメント更新履歴（どのコンポーネントが Rev 上がったか）
   - 必要に応じ `/dads/updates-design/` `/dads/updates-code-snippet/`
   - 変更されたコンポーネント slug・名称変更・リリース日を箇条書きで控える。

3. **GitHub upstream のタグ/HEAD を確認**:

   ```bash
   git ls-remote --tags --sort=-v:refname https://github.com/digital-go-jp/design-tokens.git | head
   git ls-remote --tags --sort=-v:refname https://github.com/digital-go-jp/tailwind-theme-plugin.git | head
   git ls-remote https://github.com/digital-go-jp/design-system-example-components-html.git refs/heads/main
   npm view @digital-go-jp/design-tokens version dist-tags
   npm view @digital-go-jp/tailwind-theme-plugin version dist-tags
   ```

4. **トークン破壊性の実証**（最重要）— npm tarball を取って CSS 変数を diff:

   ```bash
   cd /tmp && rm -rf dt-diff && mkdir dt-diff && cd dt-diff
   npm pack @digital-go-jp/design-tokens@<OLD> @digital-go-jp/design-tokens@<NEW>
   for v in <OLD> <NEW>; do mkdir -p e-$v && tar xzf digital-go-jp-design-tokens-$v.tgz -C e-$v; done
   for v in <OLD> <NEW>; do grep -oE '^\s*--[a-zA-Z0-9-]+:[^;]+;' e-$v/package/dist/tokens.css | sed 's/^ *//' | sort -u > decl-$v.txt; done
   echo "=== REMOVED/CHANGED (breaking) ==="; comm -23 decl-<OLD>.txt decl-<NEW>.txt
   echo "=== ADDED ==="; comm -13 <(cut -d: -f1 decl-<OLD>.txt) <(cut -d: -f1 decl-<NEW>.txt)
   ```

   - REMOVED/CHANGED が**空なら additive＝`@dads/vue` 非破壊**。空でなければ影響箇所（`@dads/vue` のトークン参照）を洗い出し、`docs/quality/token-replacement-map.md` を更新する破壊対応を別途計画する。
   - tailwind は `gh release view <tag> --repo digital-go-jp/tailwind-theme-plugin` で変更概要を確認。

5. ユーザーに影響分析サマリ（非破壊 / 破壊・変更点・対象範囲）を提示し、スコープ（どのレイヤまで）を確認する。

---

## Phase 1 — GitHub vendor + npm dep（PR-A）

ブランチ: `chore/dads-<version>-vendor-sync`（base=development）

1. **wrapper の npm dep を bump**（caret 跨ぎ不可なので手編集）:
   - `packages/tokens/package.json`: `@digital-go-jp/design-tokens` → `^<NEW>`
   - `packages/tailwind-plugin/package.json`: `@digital-go-jp/tailwind-theme-plugin` → `^<NEW>`
   - `packages/vue/package.json`: optional peerDep `@digital-go-jp/design-tokens` を **`^<OLD-major>.x || ^<NEW-major>.0.0`** に拡張（consumer の peer 警告回避）。
2. **lockfile 更新 + 重複排除**:
   ```bash
   pnpm install
   pnpm dedupe   # 旧バージョンが残る場合に単一版へ集約
   grep -nE "@digital-go-jp/design-tokens@[0-9]" pnpm-lock.yaml   # 単一版になったか確認
   ```
3. **@dads/tokens を rebuild**してトークン CSS を更新（`--color-*` 追加が入る）:
   ```bash
   pnpm --filter @dads/tokens build
   grep -c "color-key-" packages/tokens/dist/tokens.css   # 例: 新トークンの反映確認
   ```
4. **vendored dir を re-vendor**（clone → rsync。`VENDORED.md` の手順に準拠）:
   ```bash
   cd /tmp && rm -rf revendor && mkdir revendor && cd revendor
   git clone --quiet --no-checkout <repo> <dir> && git -C <dir> checkout --quiet <ref>
   rm -rf <dir>/.git
   rsync -a --delete --exclude=node_modules --exclude=dist "$PWD/<dir>/" "<dads-lib>/<dir>/"
   ```
   対象: `design-tokens`(@tag) / `tailwind-theme-plugin`(@tag) / `design-system-example-components-html`(@main HEAD)。
   各 commit SHA を控える（VENDORED.md 記入用）。
5. **回帰ゲート**（CI と同一・全 green 必須）:
   ```bash
   pnpm --filter @dads/vue build
   pnpm -w run typecheck && pnpm -w run lint && pnpm -w run format:check
   pnpm --filter @dads/vue test          # vitest + vitest-axe
   pnpm --filter @dads/docs build
   ```
6. **`VENDORED.md`** の GitHub vendor 3 行（バージョン / commit / 取り込み日）を更新。`pnpm vendor:status` で 3 件 ✓ / err 0 を確認（md/html の mtime warn は想定内）。
7. commit（`chore: ...`）→ push → `gh pr create --base development`。マージ後 `/post-merge`。

---

## Phase 2 — Figma スナップショット（PR-B）

前提: Phase 0 の `pnpm figma:login` 完了（`scripts/.figma-auth.json` 存在）と `NEW_FILE_KEY` 受領。

ブランチ: `chore/dads-<version>-figma-snapshot`（base=development）

1. 再エクスポート（Playwright・rate limit 無し）。**時間がかかるので `run_in_background` で実行**:
   ```bash
   FIGMA_FILE_KEY=<NEW_FILE_KEY> pnpm figma:pw-export
   ```
2. 完了後、`dads-document-figma/playwright-manifest.json` の `fileKey` / `exportedAt` / `pages` と PNG 件数を検証。ページ増減（新規ページ追加等）を控える。
3. `VENDORED.md` の Figma(playwright) 行を更新（新 fileKey / pages / exportedAt / バージョン）。frame モードの `manifest.json` は通常据え置き（canonical は playwright 側）。
4. `pnpm -w run format:check`（manifest は prettier 対象）→ `pnpm vendor:status` で figma 行 ✓。
5. commit → push → PR（base=development）→ `/post-merge`。

> PNG はコミットされない（gitignore）。差分は manifest + VENDORED.md のみ。

---

## Phase 3 — 公式サイト md 差分更新（PR-C）

ブランチ: `chore/dads-<version>-docs-md-diff`（base=development）

1. Phase 0 で特定した「変更コンポーネント」について、公式ページを `WebFetch` で取得し**差分のみ**反映:
   - 名称変更があれば: 新 slug の `dads-document-md/dads/components/<new>/index.md` を新規作成（公式書式に合わせる: `# 名称 | …` / Source / Scraped(今日) / 基本情報(バージョン) / 概要 / 各種リソース / 関連コンポーネント / メタデータ）。旧 slug は「名称変更告知」へ更新して残す（旧 URL 互換）。
   - 仕様変更があれば該当ページを再取得して反映。
2. **横断参照を更新**:
   - `dads/index.md`（バージョン見出し + 最新お知らせにエントリ追加）
   - `dads/updates-dads/index.md`（リリース日のエントリ追加）
   - `dads/components/index.md`（一覧の名称 / URL）
   - 関連コンポーネントリンク（`grep -rln "<old-slug>\|<old-name>" dads-document-md/`）
   - `dads-document-md/README.md`（取得バージョン / ナビ参照）
3. **履歴記述は変更しない**: `updates-design` / `updates-code-snippet` 内の過去エントリは当時の記録として保持。
4. `VENDORED.md` の md 行を更新（バージョン / ファイル数 / 取得日に「差分」を明記）。
5. `pnpm -w run format:check`（`dads-document-md` は .prettierignore 済み。VENDORED.md は対象）→ `pnpm vendor:status` err 0。
6. 残存 `<old-slug>` 参照が (a) 意図的な告知 (b) 履歴記述 のみであることを `grep` で確認。
7. commit（`docs: ...`）→ push → PR（base=development）→ `/post-merge`。

> `dads-document-html/` は「ガイドライン準備中・ビジュアル変更なし」のリネームでは原則未更新（VENDORED.md に明記）。html 実体に変更が出た時点で再クロールを別途計画。

---

## Phase 4 — docs/ 追随状況の反映（最終 PR）

ブランチ: `docs/dads-<version>-status`（base=development）

更新候補（`grep -rn` で都度精査）:

- `docs/quality/figma-compliance.md` … Figma 件数・現行スナップショット情報（version / pages / fileKey / exportedAt）
- `docs/README.md` … Figma 件数
- `docs/architecture/monorepo-and-vue-library.md` … upstream pin（design-tokens / tailwind の依存図・package.json 例・vendor 表）。tailwind の `./v4` 等の古いノートも見直す
- `docs/quality/fidelity-audit-summary.md` … 「DADS v<version> 追随」セクションを追記（各 PR の記録 + 残ギャップ）
- `docs/components/navigation-menus.md` 等 … 名称変更があれば slug 更新 + **命名ギャップ**（公式 rename に Vue 側コンポーネント名が未追随なら明記）

検証: `pnpm -w run format:check` → commit（`docs: ...`）→ PR → `/post-merge`。

---

## 完了条件

- [ ] 4 フェーズの PR がすべてマージ済み（各 `/post-merge` 済み）
- [ ] `pnpm vendor:status` が err 0（md/html の mtime warn は許容）
- [ ] `@dads/vue` の typecheck / lint / format:check / test / build が green
- [ ] `VENDORED.md` の全行が新バージョンを反映（pin の正本）
- [ ] docs/ に追随状況と残ギャップ（命名 rename・html・tailwind v4 等）が記録済み

## 参考（前回実績: v2.13.0 → v2.14.0 / 2026-06-13）

PR #35（vendor: design-tokens v2.0.1 / tailwind v1.0.0、いずれも additive・非破壊）→ #36（figma 42→43 pages・スタイルガイド追加）→ #37（md 差分: グローバルメニュー→水平メニュー）→ #38（CI を development PR でも実行）→ #39（docs/ 反映 + DadsGlobalMenu 命名ギャップ記録）。詳細は [`docs/quality/fidelity-audit-summary.md` §7](../../../docs/quality/fidelity-audit-summary.md)。
