---
name: dads-lib-patterns
description: dads-lib リポジトリの git 履歴から抽出した実装・運用パターン集。コミット規約、コンポーネント追加フロー、リリース運用、a11y テスト、spec 駆動開発などを定式化したリファレンス
version: 1.0.0
source: local-git-analysis
analyzed_commits: 103
generated_at: 2026-05-23
---

# dads-lib Patterns

`dads-lib` (デジタル庁デザインシステム Vue 3 ライブラリ monorepo) の git 履歴 103 コミットから抽出したコーディング・運用パターン集。新規コンポーネント追加、リリース、テスト、spec 作成のすべてが本書のパターンに従う。

---

## 1. Commit Conventions

**Conventional Commits を 95%+ で遵守**。形式: `<type>(<scope>): <description>`

### Types (出現頻度順)

| Type                     | 用途                                   | 例                                                                     |
| ------------------------ | -------------------------------------- | ---------------------------------------------------------------------- |
| `feat(@dads/vue)`        | 新機能・コンポーネント追加・props 拡張 | `feat(@dads/vue): add variant + locale to DadsDatePicker`              |
| `test(@dads/vue)`        | テスト追加（特に a11y axe テスト）     | `test(@dads/vue): add a11y axe tests for 9 Navigation components`      |
| `refactor(@dads/vue)`    | リネーム・分割・構造変更               | `refactor(@dads/vue): rename DadsModal to DadsDialog (公式 slug 整合)` |
| `chore` / `chore(<sub>)` | 雑務・整備・version bump               | `chore(release): @dads/vue 0.2.0` / `chore(build): migrate to Vite 8`  |
| `docs` / `docs(<sub>)`   | ドキュメント・README・CLAUDE.md        | `docs(claude): PR workflow ルールを追加`                               |
| `fix` / `fix(<sub>)`     | バグ修正                               | `fix(release): replace associative array with parallel arrays`         |
| `ci`                     | CI 設定変更                            | `ci: add GitHub Actions workflow and initialize Changesets`            |
| `style`                  | 整形のみ                               | `style: reorder :is before v-if to satisfy vue/attributes-order`       |

### Scope の慣習

- **workspace スコープ**: `@dads/vue`, `apps/docs`, `packages/vue`
- **サブシステムスコープ**: `release` (リリース系), `build` (ビルド系), `claude` (CLAUDE.md), `gitignore`, `lint`, `spec`
- **スコープ省略可**: `chore`, `docs` 単独もよく使われる

### メッセージ本文の慣習

- 1 行目は **70 文字以内**で完結
- 多言語混合 OK（日本語コメントを多用）
- "(公式 slug 整合)" のような **判断根拠** を末尾に括弧で残す
- 複雑な変更は `-m` を複数回で段落分け（HEREDOC ではなく）

---

## 2. Branch Naming

PR から merge した実例:

| パターン                   | 用途                   | 例                                                |
| -------------------------- | ---------------------- | ------------------------------------------------- |
| `feat/<topic>`             | 機能追加               | `feat/i18n-template-strings`                      |
| `feature/issue-<n>-<slug>` | GitHub Issue 紐付き    | `feature/issue-3-changeset-and-catalog-i18n-docs` |
| `docs/<topic>`             | ドキュメント変更       | `docs/claude-md-pr-workflow-rules`                |
| `chore/<topic>`            | リファクタ・ビルド基盤 | `chore/vite-8-migration`                          |
| `release/vue-v<semver>`    | リリース version bump  | `release/vue-v0.2.0`                              |

---

## 3. Protected Branches

**絶対に削除してはならない**ブランチ（CLAUDE.md に明文化）:

- `main` — リリース本流
- `development` — PR デフォルト base
- `vue-pkg` — `@dads/vue` の npm 配布用 **orphan ブランチ**（`main` と履歴独立。`vue-v<semver>` tag を打つ場所）

`git branch -r --merged origin/development` の結果から削除候補を選ぶ際、**必ず上記 3 つを allowlist で除外**してから `git push origin --delete` を実行する。`vue-pkg` は orphan ゆえ未マージ feature branch のように見えるが、これは設計通り。

---

## 4. Component Architecture (`@dads/vue`)

### Folder Structure (必須レイアウト)

新規コンポーネント `Dads<Name>` 追加時の **5 ファイル必須セット**:

```
packages/vue/src/components/<PascalCaseName>/
├── Dads<Name>.vue              # SFC 本体 (<script setup lang="ts">)
├── Dads<Name>.types.ts         # props / emits / 関連型
├── index.ts                    # named export
└── __tests__/
    └── Dads<Name>.test.ts      # Vitest + vitest-axe
```

### Component File Conventions

- **PascalCase フォルダ名** + **`Dads` プレフィックスのコンポーネント名** が必須（公式 DADS slug に整合）
- types.ts は **同名フォルダ内の同名 prefix**（`DadsButton/DadsButton.types.ts`）
- SFC は `<script setup lang="ts">` で書く（Vue 3 Composition API）
- props 定義は `withDefaults(defineProps<DadsXxxProps>(), { ... })` の組み合わせ
- emit 定義は `defineEmits<{ (e: 'click', ev: MouseEvent): void }>()`

### Co-change Pattern (新規追加時に必ず同時更新)

| ファイル                                                          | 役割                                                  |
| ----------------------------------------------------------------- | ----------------------------------------------------- |
| `packages/vue/src/components/<Name>/Dads<Name>.vue`               | コンポーネント本体                                    |
| `packages/vue/src/components/<Name>/Dads<Name>.types.ts`          | 型定義                                                |
| `packages/vue/src/components/<Name>/index.ts`                     | named export                                          |
| `packages/vue/src/components/<Name>/__tests__/Dads<Name>.test.ts` | テスト                                                |
| `packages/vue/src/index.ts`                                       | **全エクスポート集約**（11 / 100 commits で変更）     |
| `apps/docs/.vitepress/config.ts`                                  | **VitePress sidebar 追加**（11 / 100 commits で変更） |
| `apps/docs/components/<kebab-name>.md`                            | demo + API ドキュメント                               |
| `packages/vue/README.md`                                          | 一覧更新                                              |

新規コンポーネント追加では **最低この 8 ファイル**を一括コミットする。

### Naming Compliance

DADS 公式 slug への整合のため **リネームは積極的に行う**:

- `DadsModal` → `DadsDialog` (公式 slug)
- `DadsTextField` → `DadsInputText`
- `DadsHeader` → `DadsHeaderContainer`
- `DadsPageNavigation` → `DadsTableOfContents`

リネーム時のコミット形式: `refactor(@dads/vue): rename DadsXxx to DadsYyy (公式 slug 整合)`

---

## 5. Testing Patterns

### スタック

- **Vitest 4.x** (`vitest run --passWithNoTests`)
- **@vue/test-utils**: `mount` + `enableAutoUnmount(afterEach)`
- **happy-dom 20.x**: 軽量 DOM 環境（jsdom 不使用）
- **vitest-axe**: a11y アサーション

### Test Setup (`packages/vue/test/setup.ts`)

```ts
import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'
expect.extend(matchers)
```

すべての component test で `import { axe } from 'vitest-axe'` → `expect(await axe(el)).toHaveNoViolations()` を含める。

### Mock Cleanup (Vitest 4 で必須)

`vi.spyOn(...)` を使うテストファイルでは **必ず**:

```ts
afterEach(() => {
  vi.restoreAllMocks()
})
```

を書く。これがないと spy の bind chain がテストを跨いで累積し、後続テストの `toHaveBeenCalled` 系アサーションが意図せず汚染される（Vitest 3 では緩く扱われていたが Vitest 4 で顕在化）。

### Coverage Target

- `vitest run --coverage` (provider: v8)
- 100% a11y 適用済み（52 components / 2151 tests）

---

## 6. Release Workflow (`@dads/vue`)

リリースは **2 段階の PR + orphan ブランチ** で運用。`main` ブランチには **dist を一切コミットしない**ことが鉄則。

### Phase 1: Source merge

- feature ブランチ → PR (`base: development`) → merge
- PR には **changeset ファイル**を必ず含める: `.changeset/<slug>.md`

```markdown
---
'@dads/vue': minor # or patch / major
---

<人間が読む変更内容の説明>
```

### Phase 2: Version PR

```bash
git switch -c release/vue-v<semver>
pnpm changeset version    # changeset 消費 → package.json bump + CHANGELOG 生成
git add .changeset/ packages/vue/package.json packages/vue/CHANGELOG.md
git commit -m "chore(release): @dads/vue <semver>"
git push -u origin release/vue-v<semver>
gh pr create --base development --title "chore(release): @dads/vue <semver>" --body "..."
```

### Phase 3: Distribution (release-vue.sh)

PR マージ後:

```bash
git checkout development && git pull
./scripts/release-vue.sh <semver>           # origin のみ
./scripts/release-vue.sh <semver> origin,backlog   # 両 remote 配布
```

スクリプトが行うこと:

1. `pnpm --filter @dads/vue build` でビルド
2. dist / src/styles / package.json / README.md / LICENSE を temp dir にステージ
3. リポジトリを temp clone し `vue-pkg` orphan ブランチをチェックアウト（無ければ作成）
4. ステージ内容で全置換 → commit
5. `vue-v<semver>` タグを打って remote に push

### 利用側のインストール

```bash
npm install "git+https://github.com/dds-nakamura/dads-lib.git#vue-v<semver>"
```

---

## 7. PR Workflow

- **Base ブランチは `development`** がデフォルト（`main` ではない。`main` はリリース PR のみ）
- `gh pr create --base development` を **必ず**明示
- PR 本文は HEREDOC で構造化:

```
## Summary
- 何を変えたか（箇条書き）

## Background
- なぜこの変更が必要か

## Changes
- ファイル単位の説明

## Test plan
- [ ] チェックボックス形式のテストプラン
```

- 後処理（マージ後）: `git checkout development && git pull && git branch -d <branch> && git push origin --delete <branch>`

---

## 8. Spec-driven Development (`.steering/` + `docs/`)

新規大型タスクは **spec フォルダ**を切ってから着手する。`.steering/` は **`.gitignore` 対象の一時作業エリア**、永続化が必要な仕様・設計・意思決定は `docs/` に集約する。

### Folder Structure

```
.steering/<ID>-<kebab-task-name>/    # ID = GitHub Issue 番号 or Backlog 課題キー数値部
├── requirements.md    # 要件定義 (WHAT / WHY / 制約)
├── design.md          # 設計 (HOW / アーキテクチャ / 代替案)
└── tasklist.md        # Phase 別タスクリスト ([ ] / [x])
```

例: GitHub Issue #42 → `.steering/42-dads-vue-figma-compliance/`
例: Backlog 課題キー `DDS-123` → `.steering/123-dads-vue-figma-compliance/`

### Phase 設計

- 各 Phase に **Exit Criteria（完了条件）** を明記
- Phase 内のタスクは `[ ]` / `[x]` チェックボックス
- 並列度（直列 / 並列可）を Phase ヘッダに記す

### 永続化フロー

- タスク完了時点で永続化対象の内容（仕様・設計・意思決定の根拠）を `docs/` 配下の該当トピックに集約する。
- 集約後は `.steering/<ID>-<kebab-task-name>/` を削除可能。`.steering/` 自体は版管理対象外なので残しても他環境に影響しない。
- `docs/` の構成は [`docs/README.md`](../../../docs/README.md) を索引として `architecture/` / `components/` / `quality/` / `guides/` に分類。

---

## 9. Monorepo Structure

### Workspaces (`pnpm-workspace.yaml`)

```yaml
packages:
  - 'packages/*' # @dads/vue, @dads/tokens, @dads/tailwind-plugin
  - 'apps/*' # @dads/docs (VitePress)
```

ルート直下の `tailwind-theme-plugin/` `design-tokens/` `dads-document-{md,html,figma}/` `design-system-example-components-html/` は **vendored copy で workspace 対象外**（参照資産）。

### Workspace 役割

| Workspace               | 公開        | 用途                                      |
| ----------------------- | ----------- | ----------------------------------------- |
| `@dads/vue`             | ✅ npm 配布 | Vue 3 コンポーネント本体                  |
| `@dads/tokens`          | ✅ npm 配布 | `@digital-go-jp/design-tokens` の薄ラッパ |
| `@dads/tailwind-plugin` | ✅ npm 配布 | Tailwind プラグイン薄ラッパ               |
| `@dads/docs`            | ❌ private  | VitePress カタログ                        |

`.changeset/config.json` の `linked: [["@dads/*"]]` と `ignore: ["@dads/docs"]` により、配布 3 パッケージは **同期 version bump**、docs は対象外。

---

## 10. Build Toolchain

- **Node**: `>=24` (`engines` で固定)
- **pnpm**: `>=11`（`packageManager` field で exact version pin: `pnpm@11.1.1`）
- **Vite 8.x (Rolldown)** — 2026-05-23 に Vite 7 から移行（ビルド 2.27× 高速化、bundle -13.7%）
- **Vitest 4.x** + happy-dom + vitest-axe
- **vue-tsc 3.x** — `.d.ts` のみ別工程で生成（`vite build && vue-tsc -p tsconfig.build.json --emitDeclarationOnly`）
- **TypeScript 5.x**
- **ESLint 9 flat config** (L3 strictness、ルート集約)
- **Prettier** — 整形のみは `style:` または `chore: prettier auto-format` コミット

---

## 11. Documentation Practices

### 多層 README

- `/README.md` — monorepo 全体概観
- `/CLAUDE.md` — Claude Code 向け指示書（仕様参照優先順位・worktree 安全・PR rule）
- `/packages/vue/README.md` — `@dads/vue` 利用ガイド
- `/scripts/README.md` — Figma export / release-vue.sh の詳細

### 同期コミット

機能追加と同時に README が更新される慣例: `docs: sync README to 100% a11y coverage (52/52, 1973 → 2098 tests)`

### Spec 文書

`.steering/<ID>-<kebab-task-name>/` (gitignore) で作業し、永続化が必要な仕様・設計・意思決定の根拠は `docs/` 配下のトピック別ドキュメントに集約する。`.steering/` 配下は完了後に削除可能。詳細は §8 を参照。

---

## 12. Verification Practices

### CI (`.github/workflows/ci.yml`)

- Node 24 + pnpm 11
- ステップ: typecheck / lint / format check / test / build × 3 workspaces
- **注意**: 2026-05-23 時点で `branches: [main]` 限定のため、`development` 向け PR では trigger されない（既知の課題、別 PR で修正予定）

### ローカル検証

UI/CSS 変更時は Playwright MCP で visual verification（CLAUDE.md に明記）。Playwright 未導入の場合は build + unit test + curl にフォールバックし、その制限を PR に明示する。

### Visual Spec Source

DADS 公式 MD が「ガイドラインは準備中です」となっているコンポーネントは、`dads-document-figma/<page>/<page>.png` を `Read` ツールでマルチモーダル読み込みし、ビジュアル仕様を取得する（PNG は gitignore で各環境再生成）。

---

## 13. Anti-patterns (やってはいけないこと)

| ❌ NG                                                               | 理由                                             |
| ------------------------------------------------------------------- | ------------------------------------------------ |
| `vue-pkg` ブランチを削除                                            | npm 配布 tag が孤立する                          |
| `main` / `development` に直 commit                                  | feature branch 必須                              |
| HTML 仕様 (`dads-document-html/`) を読む                            | 同じ内容が `dads-document-md/` に 40× 軽量で存在 |
| カラーコード・スペーシング値を直接書く                              | `design-tokens/` のトークン参照必須              |
| Conventional Commits を破る                                         | 95%+ で遵守、CI/CHANGELOG/changeset が前提とする |
| `Dads` プレフィックスを省く                                         | DADS 公式 slug への整合が崩れる                  |
| 新コンポーネント追加時に `packages/vue/src/index.ts` を更新し忘れる | export されず利用不可能                          |
| `vi.spyOn` を `restoreAllMocks` なしに使う (Vitest 4)               | spy bind chain が累積しテスト汚染                |
| changeset なしで `@dads/vue` の機能変更 PR                          | release で CHANGELOG が抜ける                    |

---

## 14. Quick Reference Cheatsheet

```bash
# 新規コンポーネント追加（最低限のファイル群）
mkdir -p packages/vue/src/components/<Name>/__tests__
touch packages/vue/src/components/<Name>/{Dads<Name>.vue,Dads<Name>.types.ts,index.ts}
touch packages/vue/src/components/<Name>/__tests__/Dads<Name>.test.ts
# packages/vue/src/index.ts に export 追加
# apps/docs/.vitepress/config.ts に sidebar 追加
# apps/docs/components/<kebab-name>.md に demo 追加
# packages/vue/README.md の一覧更新
pnpm changeset    # 変更を changeset 化

# テスト & ビルド
pnpm --filter @dads/vue typecheck
pnpm --filter @dads/vue lint
pnpm --filter @dads/vue test
pnpm --filter @dads/vue build

# リリース
git switch -c release/vue-v<semver>
pnpm changeset version
git commit -am "chore(release): @dads/vue <semver>"
git push -u origin release/vue-v<semver>
gh pr create --base development --title "chore(release): @dads/vue <semver>"
# (PR マージ後)
git checkout development && git pull
./scripts/release-vue.sh <semver>
```
