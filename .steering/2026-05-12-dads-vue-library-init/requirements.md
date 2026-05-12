# Requirements — DADS Vue コンポーネントライブラリ初期化

- Spec ID: `2026-05-12-dads-vue-library-init`
- Owner: nakamura_kouji
- Status: **Approved**（2026-05-12）
- Last Updated: 2026-05-12

---

## 1. 背景・目的

`dads-lib` リポジトリは現在、デジタル庁デザインシステム（DADS）の **参照資産（仕様 MD / HTML サンプル / design-tokens / tailwind-theme-plugin）** をまとめた読み取り専用の引き出しとして機能している。

一方、別プロジェクト `web-label-print` の `frontend/src/components/dads/` 配下では **Vuetify-free / Vue 3 のみに依存 / 切り出し可能** という設計方針で 26 個の DADS 準拠 Vue コンポーネントが完成しており、Phase 5（2026-05-05）で WCAG 2.1 AA 準拠・ja-en 二言語対応・レスポンシブ検証まで完了している。

これらを **dads-lib リポジトリへ移植し、Vue 3 コンポーネントライブラリ（npm パッケージ群）として再配布可能な形にする** ことが本スペックのゴール。

### 採用する全体方針

- `dads-lib` を **pnpm workspaces monorepo** に昇格させる
- 既存の `design-tokens/` と `tailwind-theme-plugin/`（どちらも公式リポジトリの clone）はサブモジュール的に再エクスポートする `@dads/tokens` / `@dads/tailwind-plugin` パッケージを置く
- 新規に `@dads/vue` パッケージを作り、26 個（Vue ファイル数で 27）のコンポーネントを移植する
- カタログ用ドキュメントアプリ（Storybook or VitePress）を `apps/docs/` に置く
- 初期リリースでは **npm 公開しない**。`private: true` で組織内 / file: 参照 / GitHub Packages のいずれかで利用先行

---

## 2. スコープ

### In Scope

1. `dads-lib` の monorepo 化（pnpm workspaces + TypeScript project references）
2. `packages/tokens/` — `@digital-go-jp/design-tokens` の再エクスポート + CSS ファイルの提供
3. `packages/tailwind-plugin/` — `@digital-go-jp/tailwind-theme-plugin` の再エクスポート
4. `packages/vue/` — 26 コンポーネント（Vue ファイル 27 個）の移植
   - Button / TextField / Textarea / Select / Checkbox / CheckboxGroup / Radio / RadioGroup / FileUpload / Combobox / ColorPicker
   - Header / Drawer（DrawerItem 含む）/ Breadcrumb / StepNavigation / Tab
   - NotificationBanner / Modal / Tooltip / ProgressIndicator
   - Card / Heading / Divider / Table / Accordion / Chip
   - 共有 `styles/_base.scss`, `styles/_focus-ring.scss`, `types/common.ts`, `index.ts`
5. ビルド設定（Vite library mode + d.ts 出力）
6. テスト環境（Vitest + @vue/test-utils）— 既存テストをグリーンのまま移行
7. Lint / Format（ESLint + Prettier）
8. リリース管理（Changesets）
9. `apps/docs/` のスカフォールド（Storybook or VitePress / Phase 3 で確定）
10. README / 利用ガイドの基本整備
11. CI（GitHub Actions）の最小セット — type check / lint / test / build

### Out of Scope（後回し）

- npm 公開（publish）
- `web-label-print` 側の `frontend/src/components/dads/` 削除と `@dads/vue` への置換
- Playwright + axe による a11y 自動テスト（既存パターンを踏襲する場合に限り Phase 4 で追加検討）
- Visual regression（Chromatic / Loki 等）
- 公式 DADS パッケージへの貢献（fork / PR 送出）

---

## 3. 機能要件（Functional Requirements）

EARS 記法（Easy Approach to Requirements Syntax）で記載。

### F1. monorepo 構造

- **FR-1.1** `dads-lib` ルートには `pnpm-workspace.yaml` を置き、`packages/*` と `apps/*` をワークスペースに含めること。
- **FR-1.2** ルート `package.json` は `private: true` で、`scripts` から各ワークスペースの `build` / `test` / `lint` / `typecheck` を recursive に呼べること。
- **FR-1.3** Node バージョンは **24** を `.nvmrc` / `engines` で固定すること（既存 `design-tokens/` は node 22 系を使うが、新規パッケージは 24）。
- **FR-1.4** パッケージマネージャは **pnpm**（最新安定）を `packageManager` フィールドで固定すること。

### F2. `@dads/tokens` パッケージ

- **FR-2.1** `packages/tokens/` は `@digital-go-jp/design-tokens` を再エクスポートする薄いラッパであること。
- **FR-2.2** CSS（`tokens.css` / `tokens-simple.css`）と JSON を import / 配布可能な形で公開すること。
- **FR-2.3** 既存 `dads-lib/design-tokens/` ディレクトリは **そのまま残す**。`packages/tokens/` はその成果物を参照するか、別途 `dependency` として `@digital-go-jp/design-tokens` を入れる。どちらを採るかは Design Phase で決定。

### F3. `@dads/tailwind-plugin` パッケージ

- **FR-3.1** `packages/tailwind-plugin/` は `@digital-go-jp/tailwind-theme-plugin` を再エクスポートする薄いラッパであること。
- **FR-3.2** Tailwind v3 / v4 両対応の方針を踏襲すること（peerDependency: `tailwindcss ^3.4 || ^4`）。
- **FR-3.3** 既存 `dads-lib/tailwind-theme-plugin/` は **そのまま残す**。

### F4. `@dads/vue` パッケージ — 移植

- **FR-4.1** 移行元 `web-label-print/frontend/src/components/dads/` の全 27 個 `.vue` を `packages/vue/src/components/` 配下に **そのままのフォルダ構造で** コピーすること。
- **FR-4.2** 移行元の `types/common.ts` と `styles/_base.scss` / `styles/_focus-ring.scss` を `packages/vue/src/types/` `packages/vue/src/styles/` に移すこと。
- **FR-4.3** 公開エントリ `packages/vue/src/index.ts` は移行元の `index.ts` と同等の named export を提供すること。
  - `DadsButton`, `DadsTextField`, ... のコンポーネント export
  - `DadsButtonProps`, `DadsButtonEmits`, ... の型 export
  - `DadsSize`, `DadsSemanticColor` の primitive 型 export
- **FR-4.4** import パスは機械的に書き換える（移行元には現状 `@/` aliased import は無いことを確認済み）:
  - 相対パス `../types/common` / `../styles/...` はそのまま使える
  - `@/` プレフィックスのファイルは検出されなかったため、変換ルールの追加は不要
- **FR-4.5** 移植後、Vuetify / pinia / vue-router / vue-i18n / 任意の `@/` aliased import がコンポーネント・型・テストいずれにも残っていないことを検証すること。検出時は **エラーとして報告**し、移植を停止する。

### F5. `@dads/vue` パッケージ — ビルド

- **FR-5.1** Vite library mode で **ESM のみ** を一次出力する（CJS は当面不要 / Vue 3 系プロジェクトは ESM 前提）。
- **FR-5.2** `vue-tsc --emitDeclarationOnly` で `.d.ts` を出力すること。
- **FR-5.3** `package.json` の `exports` フィールドに `.` のメインエントリと `./styles` の SCSS / CSS 配布エントリを定義すること。
- **FR-5.4** `vue` は **peerDependency**（`^3.4`）として宣言すること。実 dependency は最小限とする（必要なら `@digital-go-jp/design-tokens` のみ）。
- **FR-5.5** SCSS は **コンパイル済み CSS** と **未コンパイル SCSS の両方** を配布すること（後者は将来的に利用先で変数オーバーライドできるように）。判断は Design Phase で再確認。

### F6. `@dads/vue` パッケージ — テスト

- **FR-6.1** Vitest + `@vue/test-utils` + jsdom 環境で既存テスト（26 ファイル）が **追加修正なしで全件 pass** すること（import パス書き換えのみ許容）。
- **FR-6.2** カバレッジ計測（`vitest --coverage`）を可能にするが、Phase 1 では閾値の強制はしない。
- **FR-6.3** Playwright + axe による a11y E2E は、Phase 4 で追加判断する（既存プロジェクトでの利用パターンを確認したうえで）。

### F7. `apps/docs/` — カタログ

- **FR-7.1** Storybook 9.x または VitePress 1.x を採用し、26 コンポーネントの基本デモを置けること（実装は Phase 3）。
- **FR-7.2** ドキュメントサイト内では `@dads/vue` を workspace 経由で参照すること（`file:` や copy ではなく）。
- **FR-7.3** 採用するツールの最終決定は Design Phase で行う（暫定: **Storybook 9** を第一候補。理由は a11y addon / controls / interactions が豊富で DADS の検証用途に適合）。

### F8. リリース管理

- **FR-8.1** Changesets を導入し、`packages/*` の semver 管理を可能にすること。
- **FR-8.2** 初期バージョンは全パッケージ `0.1.0` とする。
- **FR-8.3** `private: true` で npm 公開を **明示的に無効化**すること（後段で解除）。

### F9. Lint / Format

- **FR-9.1** ESLint 9（flat config）+ `@vue/eslint-config-typescript` + `eslint-plugin-vue` を採用すること。
- **FR-9.2** Prettier はデフォルト設定 + Vue / SCSS 対応のみ。BiomeJS は既存サブリポジトリで使われているが、新規ワークスペースには **採用しない**（Vue SFC 対応が未成熟なため）。
- **FR-9.3** `pnpm lint` と `pnpm format:check` がルートから一括で走ること。

### F10. CI

- **FR-10.1** GitHub Actions ワークフロー `.github/workflows/ci.yml` を 1 本用意し、push / PR で `typecheck` / `lint` / `test` / `build` を実行すること。
- **FR-10.2** Node 24 / pnpm でキャッシュを効かせること。
- **FR-10.3** matrix 化はしない（Phase 1 はシンプルさを優先）。

---

## 4. 非機能要件（Non-Functional Requirements）

- **NFR-1（移植忠実度）**: 移植後のコンポーネントは、外部から見た挙動（props / emits / slot / CSS クラス名 / aria 属性）が移行元と **完全一致** すること。リファクタや改名は本スペックでは行わない。
- **NFR-2（依存最小化）**: `@dads/vue` の runtime dependency は `@digital-go-jp/design-tokens` のみを許容（必須ではない）。`vue` は peerDependency。
- **NFR-3（ビルドサイズ）**: tree-shake が効くこと（個別 import 可能）。ESM 出力かつ `sideEffects: false`（CSS 配信パスを除く）を維持すること。
- **NFR-4（可搬性）**: 将来 `web-label-print` 以外のプロジェクトが `@dads/vue` を使う際、追加設定なし（peer の `vue` インストールのみ）で動くこと。
- **NFR-5（テストグリーン継続）**: 既存 Vitest テストは移植後も継続して green であること。リファクタによりテストが落ちる場合は Out of Scope に切り出す。
- **NFR-6（DX）**: `pnpm i && pnpm build && pnpm test` が **クリーンな環境で 5 分以内** に完走すること。

---

## 5. 受入基準（Acceptance Criteria）

スペック完了時、以下がすべて満たされていること。

- [ ] **AC-1** `pnpm-workspace.yaml` が存在し、`packages/{tokens,tailwind-plugin,vue}` と `apps/docs` を含む
- [ ] **AC-2** `pnpm install` がルートで成功する（依存解決エラーなし）
- [ ] **AC-3** `pnpm --filter @dads/vue build` で `dist/index.mjs` と `dist/index.d.ts` が生成される
- [ ] **AC-4** `pnpm --filter @dads/vue test` で 既存 26 テストファイルが全件 pass
- [ ] **AC-5** `pnpm typecheck` / `pnpm lint` がエラーなしで完走
- [ ] **AC-6** `pnpm --filter @dads/docs dev`（または `storybook`）でカタログが起動し、最低 1 コンポーネントが描画される
- [ ] **AC-7** 移植後のコンポーネントから Vuetify / pinia / vue-router / vue-i18n / `@/` aliased import が **0 件**
- [ ] **AC-8** Changesets 初期化済み（`.changeset/config.json` が存在）
- [ ] **AC-9** GitHub Actions CI が pass（push or PR で typecheck / lint / test / build が green）
- [ ] **AC-10** 全パッケージが `private: true` で npm 公開無効化されている

---

## 6. リスク・前提・未決事項

### リスク

| ID  | 内容                                                                                                           | 影響   | 対策                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------- |
| R-1 | SCSS の `@use '../styles/base'` 等の相対参照がビルド時に解決できない                                           | High   | Vite + `sass` プラグインで `includePaths` または `additionalData` を設定し、Phase 1 で動作確認 |
| R-2 | `mdi-*` クラスを Button 等が参照しているが Material Design Icons をライブラリで配布していない                  | Medium | アプリ側で `@mdi/font` を入れる前提。README に明記。フォントは配布しない                       |
| R-3 | `var(--color-...)` 形式の CSS 変数がアプリ側に注入されていない場合フォールバック色で動作するが、見た目が崩れる | Medium | `@dads/tokens` の `tokens.css` を import する手順を README に明記                              |
| R-4 | Vue 3.4 未満との互換性問題                                                                                     | Low    | `peerDependencies.vue` を `^3.4` に固定 / engines で明示                                       |
| R-5 | Storybook 9 がまだ stable でない / VitePress も Vue SFC 描画にクセがある                                       | Medium | Phase 3 で PoC を作って判断。最悪 `apps/docs` を Phase 1 完了時点ではスカフォールドだけ        |

### 前提

- 既存 `dads-lib/design-tokens/` と `dads-lib/tailwind-theme-plugin/` は **公式リポジトリの mirror なので改変しない**
- 移行元（web-label-print 側）の削除は別タスク（本スペック完了後の作業）
- npm 公開は本スペックでは行わない

### 確定事項（2026-05-12 承認）

- **D-1（U-1 解決）** `@dads/tokens` は **選択肢 A** — `@digital-go-jp/design-tokens` を npm dependency として吸い、薄いラッパで再エクスポートする。`dads-lib/design-tokens/` clone は読み物として残す。
- **D-2（U-2 解決）** カタログツールは **VitePress 1.x** を採用。
- **D-3（U-3 解決）** SCSS は **未コンパイル `.scss` ファイルとコンパイル済み `.css` の両方** を `@dads/vue` から配布する。
- **D-4（U-4 解決）** ESLint flat config は **L3 (typescript-eslint recommended + 選抜 type-checked)** で構成する。`no-floating-promises` / `no-misused-promises` / `await-thenable` / `require-await` を型認識ルールとして強制。テストファイルは緩める。
- **D-5（U-5 解決）** a11y チェックを CI に組み込む。Phase 1 では **`vitest-axe` で jsdom 上のコンポーネント単位 a11y チェック** を導入。VitePress カタログに対する Playwright + axe スモークテストは Phase 後半で追加。
- **D-6（追加・2026-05-13 承認）** 既存サブ clone 3 つ (`design-tokens/`, `tailwind-theme-plugin/`, `design-system-example-components-html/`) は **vendor 方式** とする。各上流の `.git/` / `node_modules/` / `dist/` のみ除外し、ソース実体は dads-lib の git 履歴に取り込む。pin 情報はルート `VENDORED.md` で管理。詳細は design.md §9。

---

## 7. 参考資料

- 公式 DADS: <https://design.digital.go.jp/dads/>
- 移行元README: `/Users/nakamura_kouji/git/web-label-print/frontend/src/components/dads/README.md`
- 移行元 index.ts: `/Users/nakamura_kouji/git/web-label-print/frontend/src/components/dads/index.ts`
- Phase 5 完了記録: 同プロジェクトの `docs/spacifications/frontend/DADS_STYLE_GUIDE.md`
- 既存仕様参照: `dads-lib/dads-document-md/dads/`

---

## 8. 次フェーズへの引き継ぎ

本ドキュメントが **Approved** になったら、次に作成するのは:

- `design.md` — monorepo 構成 / パッケージ境界 / ビルド設定 / SCSS 解決 / カタログツール選定 / リリース戦略
- `tasklist.md` — Phase 0〜4 のタスク分解と依存関係

承認をお願いします。
