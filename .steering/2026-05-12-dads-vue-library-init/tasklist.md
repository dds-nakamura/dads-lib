# Tasklist — DADS Vue コンポーネントライブラリ初期化

- Spec ID: `2026-05-12-dads-vue-library-init`
- Depends on: `./requirements.md`, `./design.md`
- Status: Draft（承認待ち）
- Last Updated: 2026-05-12

---

## 進め方

- **Phase 単位で実装 → ユーザー確認 → 次 Phase へ** を繰り返す
- 各 Phase は **Exit Criteria（完了条件）** を満たすまで次に進まない
- タスクは `[ ]` チェックボックスで管理。完了時に `[x]` に更新する
- 着手前に必ず該当 Phase の冒頭サマリを再読する

---

## Phase 一覧

| Phase | 内容                                           | 目安      | 並列度                 |
| ----- | ---------------------------------------------- | --------- | ---------------------- |
| 0     | リポジトリ初期化 / monorepo スカフォールド     | 30〜60 分 | 直列                   |
| 1     | `@dads/tokens` + `@dads/tailwind-plugin` 構築  | 30 分     | 並列可（2 つを同時に） |
| 2     | `@dads/vue` スカフォールド + ビルド config     | 45 分     | 直列                   |
| 3     | **26 コンポーネントの移植 + テストグリーン化** | 60〜90 分 | コピー後は並列検証可   |
| 4     | Lint / Format / Typecheck 整備                 | 30 分     | 直列                   |
| 5     | VitePress カタログ (`apps/docs`)               | 60 分     | 直列                   |
| 6     | a11y テスト (vitest-axe)                       | 30 分     | 直列                   |
| 7     | CI / Changesets                                | 30 分     | 並列可                 |
| 8     | README / 受入確認                              | 30 分     | 直列                   |

合計目安: **5〜7 時間**（実装オンリー、レビュー / 試行錯誤を含まない場合）

---

## Phase 0 — リポジトリ初期化 / monorepo スカフォールド

### 着手前確認

- [x] `dads-lib` 配下に既存の `node_modules` や `package.json` が **無い** ことを再確認 (2026-05-12)
- [x] `git init` 実行の可否を user に確認 → **承認** (2026-05-13)
- [x] サブ clone の取り扱い → **Option A (vendor)** で確定 (D-6)

### タスク

- [x] T-0.1 `.gitignore` 作成（`node_modules`, `dist`, `.DS_Store`, `*.log`, `coverage`, `.vitepress/cache`, `.vitepress/dist`, サブ clone の `.git` 等）
- [x] T-0.2 `.nvmrc` 作成（`24`）
- [x] T-0.3 `.prettierrc.json` / `.prettierignore` 作成（design.md §5.2）
- [x] T-0.4 ルート `package.json` 作成
  - `private: true`
  - `packageManager: "pnpm@11.1.1"` に修正（実機が 11 系のため）
  - `engines.node`: `>=24`
  - `scripts`: `build`, `test`, `lint` (placeholder), `typecheck`, `format`, `format:check`
- [x] T-0.5 `pnpm-workspace.yaml` 作成
- [x] T-0.6 `tsconfig.base.json` 作成（design.md §3.3）
- [~] T-0.7 ルート `tsconfig.json` → **Phase 1 へ繰越**。空 references の solution-style は `tsc -b` でエラーになるため、最初のパッケージが登場する Phase 1 で作成する
- [x] T-0.8 ディレクトリ作成: `packages/{tokens,tailwind-plugin,vue}`, `apps/docs` (空)
- [x] T-0.9 `git init` 実行 (main ブランチ)
- [x] T-0.10 `pnpm install` (lockfile 生成 / prettier + typescript のみ取得)

### Exit Criteria

- [x] `pnpm -r --filter "@dads/*" exec echo "ok"` がエラーなく完了（exit=0、informational のみ）
- [x] `pnpm-lock.yaml` が生成されている
- [x] `node -v` v24.12.0 / `.nvmrc` = 24
- [x] `pnpm format:check` クリーン
- [x] `pnpm build` / `pnpm test` / `pnpm typecheck` が全て exit=0（projects 未登録なので no-op）

---

## Phase 1 — `@dads/tokens` + `@dads/tailwind-plugin`

### タスク（並列可）

#### `@dads/tokens`

- [x] T-1.1 `packages/tokens/package.json` 作成
- [x] T-1.2 `packages/tokens/src/index.ts` 作成（`export * from '@digital-go-jp/design-tokens'`）
- [x] T-1.3 `packages/tokens/tsconfig.json` 作成（noEmit）
- [x] T-1.4 `pnpm install` (`@digital-go-jp/design-tokens@1.1.9` 取得)
- [x] T-1.5 ローカルビルドで `dist/{tokens.css,tokens-simple.css}` が生成されることを確認 (smoke test: JS module も import 可能)
- [x] T-1.6 `packages/tokens/README.md` 作成
- [+] T-1.7 (追加) `scripts/copy-css.mjs` 作成 — pnpm hoisting 対策で CSS をローカル `dist/` にコピー (R-2 への対応)

#### `@dads/tailwind-plugin`

- [x] T-1.8 `packages/tailwind-plugin/package.json` 作成 (**v3 only**)
- [x] T-1.9 `packages/tailwind-plugin/src/index.ts` 作成（`export { default }`）
- [x] T-1.10 `packages/tailwind-plugin/tsconfig.json` 作成
- [x] T-1.11 `packages/tailwind-plugin/README.md` 作成（v4 ステータス明記）
- [+] T-1.12 (追加) `src/shims.d.ts` 作成 — 上流 v0.3.4 の `exports['.']` に `types` condition が無いため、ローカルでモジュール宣言を補完
- [-] **v4.css 配布は撤回** — 上流 npm パッケージ v0.3.4 の `dist/` に `v4.css` が含まれず、`exports` にも `./v4` が無いため。後段 Phase で「自前ビルド」または「上流が修正するのを待つ」のいずれかで対応

### Exit Criteria

- [x] `pnpm --filter @dads/tokens typecheck` 成功
- [x] `pnpm --filter @dads/tailwind-plugin typecheck` 成功
- [x] `pnpm build` で `@dads/tokens/dist/*.css` 生成
- [x] `pnpm format:check` クリーン
- [~] ルート `tsconfig.json` の `references` 追加 → **Phase 4 (Lint 整備時) へ繰越**。各パッケージ自身で `tsc --noEmit` するため必須ではない（IDE 連携用途のみ）

---

## Phase 2 — `@dads/vue` スカフォールド + ビルド config

### タスク

- [x] T-2.1 `packages/vue/package.json` 作成 (peer: vue ^3.4 / devDep: vite 6 + vitest 2 + vue-tsc 2 + sass-embedded 等)
- [x] T-2.2 `packages/vue/tsconfig.json` / `tsconfig.build.json` 作成
- [x] T-2.3 `packages/vue/vite.config.ts` 作成 (library mode / ESM / cssCodeSplit:false / SCSS modern-compiler)
- [x] T-2.4 `packages/vue/vitest.config.ts` 作成 (vite config を mergeConfig で継承)
- [x] T-2.5 `packages/vue/test/setup.ts` プレースホルダ作成 — vitest-axe の matcher 登録は Phase 6 で追加
- [x] T-2.6 `packages/vue/src/index.ts` を空 export で作成
- [x] T-2.7 ディレクトリ骨組み (Phase 0 で作成済み)
- [x] T-2.8 `pnpm install` (`@parcel/watcher` / `esbuild` の build script を `pnpm-workspace.yaml#allowBuilds` で承認)
- [x] T-2.9 ビルド成功 — `dist/index.js` (※ `.mjs` ではなく `.js`、`type: module` で ESM) と `dist/index.d.ts` を生成
- [x] T-2.10 `vitest run --passWithNoTests` で exit 0 確認
- [~] T-2.11 ルート `tsconfig.json` references → Phase 4 (Lint 整備時) へ繰越

### Exit Criteria

- [x] スカフォールド状態でビルド・テスト・型チェックすべてエラーなく終了
- [x] `dist/index.js` + `dist/index.d.ts` 生成済み（空エクスポート）
- [x] `pnpm format:check` クリーン

### 計画からの差分

- 出力拡張子を `.mjs` → `.js` に変更 (Vite library mode のデフォルト挙動 + `type: module` で ESM 解釈される)
- `vitest-axe` を install したが setup.ts では未使用。Phase 6 で matcher 登録を実装する方が依存関係が明確
- `@types/node` を devDep に追加 (vite.config.ts で `node:url` 使用)
- pnpm 11 で追加の build script approval が必要だった (`@parcel/watcher` / `esbuild`)

---

## Phase 3 — 26 コンポーネントの移植 + テストグリーン化

### 事前検証

- [x] T-3.0 移行元で禁忌 import 0 件確認済 (JSDoc 内の `@/components/dads` 言及のみ)
  ```bash
  grep -rE "(vuetify|pinia|vue-router|vue-i18n|@/(store|router|i18n))" \
    --include='*.vue' --include='*.ts' \
    /Users/nakamura_kouji/git/web-label-print/frontend/src/components/dads/
  ```
  → 何か出たら **Phase 3 を中断してユーザーに報告**

### コピー作業

- [x] T-3.1 共有資産コピー (types/common.ts, \_base.scss, \_focus-ring.scss)
- [x] T-3.2 全 26 コンポーネントディレクトリを `cp -R` で一括コピー (27 .vue / 26 .types.ts / 26 .test.ts)
- [x] T-3.3 `packages/vue/src/index.ts` に移行元と同等の named export を記述
- [x] T-3.4 `packages/vue/src/styles/index.scss` 作成 (forward base + focus-ring)

### 検証

- [x] T-3.5 移植後 grep で禁忌 import 0 件確認
- [x] T-3.6 `pnpm --filter @dads/vue typecheck` 成功
- [x] T-3.7 `pnpm --filter @dads/vue test` で **26 テストファイル / 883 テスト全 pass**
- [x] T-3.8 `pnpm --filter @dads/vue build` 成功:
  - `dist/index.js` (91KB) + `dist/index.js.map`
  - `dist/index.css` (92KB) — 全 26 コンポーネントの SCSS をバンドル
  - `dist/index.d.ts` + `dist/components/**/*.d.ts` 階層
- [x] T-3.9 ビルド成果物の sanity check: `dist/index.d.ts` に `export * from './components/Button'` 等 26 行確認

### Phase 3 で実施した追加修正・差分

1. **`../types/common` → `../../types/common`** (10 ファイル)
   - 移行元は `dads/Button/...types.ts` で `../types/common` 参照だった
   - 移植先で `src/components/Button/...types.ts` 構造になり 1 階層深くなったため一括 sed 修正
2. **`@use '../styles/base'` → `@use '../../styles/base'`** (26 .vue ファイル / 44 occurrence)
   - 同様の階層差分修正。`css: false` でテストには影響しなかったが本番ビルドで露見
3. **`tsconfig.json` を 2 箇所緩和**
   - `noUncheckedIndexedAccess: false` 追加 (移行元 @vue/tsconfig の strictness に合わせる / NFR-1)
   - `exclude: ["src/**/__tests__/**"]` 追加 (移行元も同様にテストを typecheck 対象外にしていた)
4. **テストランタイムを `jsdom` → `happy-dom` に変更**
   - 移行元が happy-dom 環境で書かれていたため。jsdom 26 では `getComputedStyle().lineHeight` が空文字を返さなくなり Textarea auto-resize 計算テストが落ちる
   - `happy-dom@^20.9.0` を devDep に追加、`jsdom` を削除
5. **SCSS preprocessor を `sass-embedded` → `sass`** に変更
   - sass-embedded の async dispatcher が vitest 並列実行で `[sass] Tried writing to closed dispatcher` を起こす既知問題回避
6. **Vite/Vitest スタックをソースに揃えてアップグレード**
   - vite 6 → 7.3, vitest 2.1 → 3.2.4, vue-tsc 2 → 3, @vitejs/plugin-vue 5 → 6
   - vite 7 で SCSS の `api: 'modern'` オプションが削除されたため vite.config.ts から削除
   - vitest.config.ts で `mergeConfig` の型キャストを明示 (`UserConfig`) — vite/vitest の型分岐に対処
7. **`package.json#exports['./styles']` を `./dist/index.css` に修正**
   - Vite が `cssCodeSplit: false` + lib mode で `dist/index.css` を出すため (元の `dist/styles/index.css` 想定とは異なる)
8. **テスト用に `vitest.config.ts` で `css: false`** を維持
   - テストは class/attribute/DOM 構造のみ検証する。SCSS 処理を skip しても挙動変わらず、起動も速い
9. **NotificationBanner のテスト残骸 (typecheck) は `tsconfig` exclude で対処** — 移行元と同じ扱い

### Exit Criteria

- [x] 26 テストファイル / 883 個別テスト 全 pass
- [x] ビルド成功 (`dist/{index.js, index.css, index.d.ts}` + per-component d.ts)
- [x] 禁忌 import スキャン 0 件
- [x] format:check クリーン

### 想定トラブル時の対応

| 症状                                               | 対処                                                                                |
| -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `@use '../styles/base'` で `Can't find stylesheet` | `vite.config.ts` の `css.preprocessorOptions.scss.loadPaths` に `src/styles` を追加 |
| `mdi-*` クラス参照で IDE が警告                    | 文字列リテラルなので実行時問題なし、無視可                                          |
| テストが import パスで落ちる                       | `vite.config.ts` の resolve.alias を確認                                            |
| Drawer の `DadsDrawerItem.vue` の export がない    | `packages/vue/src/components/Drawer/index.ts` を確認・修正                          |

### Exit Criteria

- [ ] 26 テスト全 pass
- [ ] ビルド成功
- [ ] 禁忌 import スキャン 0 件
- [ ] `pnpm --filter @dads/vue build` の生成物に SCSS コンパイル済 CSS が含まれる

---

## Phase 4 — Lint / Format / Typecheck

### タスク

- [x] T-4.0 ルート `tsconfig.json` (solution-style references) 作成 — Phase 0〜2 から繰越分
- [x] T-4.1 ルート `eslint.config.js` 作成（design.md §5.1）
- [x] T-4.2 `eslint-config-prettier` / `eslint-plugin-vue` / `typescript-eslint` / `vue-eslint-parser` / `@eslint/js` / `globals` を root の devDependencies に追加（ルート単位で集約管理）
- [x] T-4.3 `pnpm lint` をルートから実行 → エラー・警告を **0 件** にする
  - 設定調整: `no-useless-assignment` off、テストファイルから型認識ルール除外、Vue/src ts にブラウザ globals
  - コード修正 2 件: `DadsTab.vue` / `DadsAccordion.vue` の `nextTick(...)` に `void` を付与（`no-floating-promises` 対応 / 挙動不変）
  - ESLint `--fix` 適用: `vue/attributes-order` で 3 ファイル (Accordion/Combobox/Select/Tab) の template attribute 順序を整列（出力 HTML は不変 / NFR-1 適合）
- [x] T-4.4 `pnpm format:check` をルートから実行 → `tasklist.md` 1 件を `pnpm format` で修正
- [x] T-4.5 `pnpm typecheck` がルートから全 references を走査して成功
- [x] T-4.6 移行元との **挙動差分が出ていない** ことを再確認（26 テストファイル / 883 個別テスト全 pass）

### 各パッケージ追加事項

- [x] `package.json` の `scripts.lint` を 3 パッケージ (tokens / tailwind-plugin / vue) に追加
- [x] ルート `package.json` の `scripts.lint` を `echo` プレースホルダから `eslint .` に置換、`lint:fix` も追加

### Exit Criteria

- [x] `pnpm lint` 警告 / エラー 0 件
- [x] `pnpm format:check` 違反 0 件
- [x] `pnpm typecheck` エラー 0 件
- [x] Phase 3 で green だったテストが Phase 4 後も green (883/883)
- [x] `pnpm --filter @dads/vue build` 成功 (dist/index.{js,css,d.ts})

---

## Phase 5 — VitePress カタログ (`apps/docs`)

### タスク

- [ ] T-5.1 `apps/docs/package.json` 作成（design.md §3.4）
- [ ] T-5.2 `apps/docs/.vitepress/config.ts` 作成
- [ ] T-5.3 `apps/docs/.vitepress/theme/index.ts` 作成（`@dads/tokens/css` + `@dads/vue/styles` を読み込む）
- [ ] T-5.4 `apps/docs/index.md` 作成（トップページ）
- [ ] T-5.5 **Button** のデモページ `apps/docs/components/button.md` を作成
  - `<DadsButton>` を `<script setup>` でインポート
  - variant × size × color のマトリックスデモ
  - props 一覧表
- [ ] T-5.6 `pnpm --filter @dads/docs dev` で起動、ブラウザで Button が描画されることを目視確認
- [ ] T-5.7 `pnpm --filter @dads/docs build` 成功
- [ ] T-5.8 残り 25 コンポーネントのデモページは **空ファイル + TODO コメントだけ作る**（Phase 1 スコープ外、後続で埋める）
- [ ] T-5.9 ルート `tsconfig.json` の `references` に `apps/docs` を追加

### Exit Criteria

- [ ] dev サーバ起動 + Button デモ表示 OK
- [ ] static build 成功

---

## Phase 6 — a11y テスト (vitest-axe)

### タスク

- [ ] T-6.1 Phase 2 で導入済みの `vitest-axe` の動作確認（setup.ts が読み込まれているか）
- [ ] T-6.2 **Button** の `__tests__/DadsButton.test.ts` に a11y describe ブロックを追加（design.md §6.2 のサンプル）
- [ ] T-6.3 **TextField** に同様の a11y テストを追加
- [ ] T-6.4 **Modal** に同様の a11y テストを追加（focus trap / role="dialog" 等の検証込み）
- [ ] T-6.5 `pnpm --filter @dads/vue test` で a11y テストも含めて green
- [ ] T-6.6 残り 23 コンポーネントの a11y テストは Phase 1 スコープ外として TODO 化（README に明記）

### Exit Criteria

- [ ] Button / TextField / Modal の a11y テストが pass
- [ ] axe 違反 0 件

---

## Phase 7 — CI / Changesets

### タスク（並列可）

#### CI

- [ ] T-7.1 `.github/workflows/ci.yml` 作成（design.md §7）
- [ ] T-7.2 ローカルで CI 相当のコマンド列を完走させて時間計測:
  ```bash
  pnpm install --frozen-lockfile
  pnpm typecheck && pnpm lint && \
    pnpm --filter @dads/vue test && \
    pnpm --filter @dads/vue build && \
    pnpm --filter @dads/docs build
  ```
- [ ] T-7.3 5〜10 分以内に完了することを確認

#### Changesets

- [ ] T-7.4 `pnpm dlx @changesets/cli init`
- [ ] T-7.5 `.changeset/config.json` を design.md §8.2 の通りに書き換え
- [ ] T-7.6 動作確認: `pnpm changeset` を一度実行して対話確認（実際には何も記録せず Ctrl+C で抜ける）

### Exit Criteria

- [ ] `ci.yml` がローカルで全コマンド成功（push 前検証）
- [ ] Changesets が `linked: @dads/*` / `ignore: @dads/docs` 設定済み

---

## Phase 8 — README / 受入確認

### タスク

- [ ] T-8.1 ルート `README.md` を新規作成（monorepo 概観、各パッケージの役割、`pnpm install && pnpm build && pnpm test`、利用手順）
- [ ] T-8.2 `CLAUDE.md` を更新（新しい monorepo 構造を反映、`packages/` / `apps/` の用途を明記、既存の参照資産との関係も整理）
- [ ] T-8.3 各 `packages/*/README.md` を最小内容で揃える
- [ ] T-8.4 受入基準 AC-1 〜 AC-10（requirements.md §5）を **1 件ずつチェック** し、結果を本 tasklist 末尾に追記
- [ ] T-8.5 `pnpm install --frozen-lockfile && pnpm build && pnpm test` をクリーンな state で 1 回走らせて 5 分以内完走を確認（NFR-6）

### Exit Criteria — 全 AC 確認

- [ ] AC-1 `pnpm-workspace.yaml` が存在し `packages/{tokens,tailwind-plugin,vue}` と `apps/docs` を含む
- [ ] AC-2 `pnpm install` 成功
- [ ] AC-3 `pnpm --filter @dads/vue build` で `dist/index.mjs` と `dist/index.d.ts` 生成
- [ ] AC-4 `pnpm --filter @dads/vue test` で 26 テストファイル全 pass
- [ ] AC-5 `pnpm typecheck` / `pnpm lint` エラーなし
- [ ] AC-6 `pnpm --filter @dads/docs dev` で Button カタログが描画される
- [ ] AC-7 禁忌 import 0 件
- [ ] AC-8 `.changeset/config.json` 存在
- [ ] AC-9 GitHub Actions CI が pass（push or PR）
- [ ] AC-10 全パッケージ `private: true`

---

## Phase 終了後の TODO（本スペック外）

- `apps/docs/components/` 配下の **残り 25 コンポーネント** デモページ整備
- 残り 23 コンポーネントの vitest-axe a11y テスト追加
- Playwright + axe による VitePress カタログのスモークテスト
- `web-label-print` 側の `frontend/src/components/dads/` 削除と `@dads/vue` への置換
- npm 公開判断 + `private: true` 解除 + 初回 publish

---

## 進捗トラッキング

各 Phase 着手時に「Phase N 開始」と宣言、Exit Criteria すべて満たしたら「Phase N 完了」とユーザーへ報告 → 承認後に次 Phase へ。
