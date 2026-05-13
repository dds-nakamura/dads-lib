# Tasklist — DADS Vue カタログ全コンポーネントデモ整備

- Spec ID: `2026-05-14-dads-vue-docs-rollout`
- Depends on: `./requirements.md`, `./design.md`
- Status: **Done** (2026-05-14 完了)
- Last Updated: 2026-05-14

---

## 進め方

- **Wave 単位で sub-agent 並列実行 → 検証 → user 承認 → 次 wave** を繰り返す
- 各 wave は **Exit Criteria** を満たすまで次に進まない
- sub-agent ブリーフは design.md §4 のテンプレートを **そのまま** 使う

---

## Wave 一覧

| Wave | カテゴリ   | 件数 | 並列度 | 目安  |
| ---- | ---------- | ---- | ------ | ----- |
| 1    | Form-A     | 5    | 5      | 15 分 |
| 2    | Form-B     | 5    | 5      | 15 分 |
| 3    | Navigation | 5    | 5      | 15 分 |
| 4    | Feedback   | 4    | 4      | 12 分 |
| 5    | Display    | 6    | 6      | 18 分 |

合計目安: **75 分** (sub-agent 呼び出し + 検証 + commit 含む)

---

## 前提条件チェック (wave 1 着手前)

- [x] `git status` がクリーン (uncommitted changes なし)
- [x] `pnpm --filter @dads/docs build` が現状で成功する (Phase 8 完了状態の維持)
- [x] `apps/docs/components/button.md` が無変更で存在する (sub-agent のテンプレ参照源)
- [x] 25 個の TODO スタブが `apps/docs/components/` 配下にすべて存在する
  - 検証: `grep -l 'TODO' apps/docs/components/*.md | wc -l` → 25

---

## Wave 1 — Form-A (TextField / Textarea / Select / Checkbox / Radio)

### sub-agent 呼び出し (1 メッセージ内 5 並列)

各 sub-agent に design.md §4.1 のテンプレを `<NAME>` / `<SLUG>` 置換して渡す:

| #   | NAME      | SLUG       |
| --- | --------- | ---------- |
| 1   | TextField | text-field |
| 2   | Textarea  | textarea   |
| 3   | Select    | select     |
| 4   | Checkbox  | checkbox   |
| 5   | Radio     | radio      |

### 検証 (5 件全完了後)

```bash
pnpm exec prettier --write apps/docs/components/{text-field,textarea,select,checkbox,radio}.md
pnpm -w run format:check
pnpm --filter @dads/docs build
grep -L 'TODO' apps/docs/components/{text-field,textarea,select,checkbox,radio}.md | wc -l  # → 5
for slug in text-field textarea select checkbox radio; do
  echo "$slug: $(grep -c 'class="dads-' apps/docs/.vitepress/dist/components/${slug}.html) elements"
done
git diff --stat apps/docs/components/  # 5 files modified, no other
```

### Exit Criteria

- [x] 5 ファイルすべて TODO 脱却
- [x] `pnpm --filter @dads/docs build` 成功
- [x] 5 ファイル分の dist/components/\*.html に `class="dads-"` 出力あり
- [x] `git diff` で `apps/docs/components/` 以外の変更なし
- [x] user 承認後コミット: `docs(apps/docs): add Form-A component demos (Wave 1)` (8ef2dee)

---

## Wave 2 — Form-B (CheckboxGroup / RadioGroup / FileUpload / Combobox / ColorPicker)

| #   | NAME          | SLUG           |
| --- | ------------- | -------------- |
| 1   | CheckboxGroup | checkbox-group |
| 2   | RadioGroup    | radio-group    |
| 3   | FileUpload    | file-upload    |
| 4   | Combobox      | combobox       |
| 5   | ColorPicker   | color-picker   |

### 検証

```bash
pnpm exec prettier --write apps/docs/components/{checkbox-group,radio-group,file-upload,combobox,color-picker}.md
pnpm -w run format:check
pnpm --filter @dads/docs build
for slug in checkbox-group radio-group file-upload combobox color-picker; do
  echo "$slug: $(grep -c 'class="dads-' apps/docs/.vitepress/dist/components/${slug}.html) elements"
done
```

### Exit Criteria

- [x] 同 Wave 1 形式
- [x] commit: `docs(apps/docs): add Form-B component demos (Wave 2)` (634960b)

---

## Wave 3 — Navigation (Header / Drawer / Breadcrumb / StepNavigation / Tab)

| #   | NAME           | SLUG            |
| --- | -------------- | --------------- |
| 1   | Header         | header          |
| 2   | Drawer         | drawer          |
| 3   | Breadcrumb     | breadcrumb      |
| 4   | StepNavigation | step-navigation |
| 5   | Tab            | tab             |

### 検証

```bash
pnpm exec prettier --write apps/docs/components/{header,drawer,breadcrumb,step-navigation,tab}.md
pnpm -w run format:check
pnpm --filter @dads/docs build
for slug in header drawer breadcrumb step-navigation tab; do
  echo "$slug: $(grep -c 'class="dads-' apps/docs/.vitepress/dist/components/${slug}.html) elements"
done
```

### Exit Criteria

- [x] 同 Wave 1 形式
- [x] Drawer は portal/teleport を含むため、`ref(false)` トリガ実装を確認
- [x] commit: `docs(apps/docs): add Navigation component demos (Wave 3)` (8e4da33)

---

## Wave 4 — Feedback (NotificationBanner / Modal / Tooltip / ProgressIndicator)

| #   | NAME               | SLUG                |
| --- | ------------------ | ------------------- |
| 1   | NotificationBanner | notification-banner |
| 2   | Modal              | modal               |
| 3   | Tooltip            | tooltip             |
| 4   | ProgressIndicator  | progress-indicator  |

### 検証

```bash
pnpm exec prettier --write apps/docs/components/{notification-banner,modal,tooltip,progress-indicator}.md
pnpm -w run format:check
pnpm --filter @dads/docs build
for slug in notification-banner modal tooltip progress-indicator; do
  echo "$slug: $(grep -c 'class="dads-' apps/docs/.vitepress/dist/components/${slug}.html) elements"
done
```

### Exit Criteria

- [x] 同 Wave 1 形式
- [x] Modal / Tooltip は v-model / ref(false) トリガパターンを確認
- [x] commit: `docs(apps/docs): add Feedback component demos (Wave 4)` (6db66b3)

---

## Wave 5 — Display (Card / Heading / Divider / Table / Accordion / Chip)

| #   | NAME      | SLUG      |
| --- | --------- | --------- |
| 1   | Card      | card      |
| 2   | Heading   | heading   |
| 3   | Divider   | divider   |
| 4   | Table     | table     |
| 5   | Accordion | accordion |
| 6   | Chip      | chip      |

**※ 唯一 6 並列の wave**

### 検証

```bash
pnpm exec prettier --write apps/docs/components/{card,heading,divider,table,accordion,chip}.md
pnpm -w run format:check
pnpm --filter @dads/docs build
for slug in card heading divider table accordion chip; do
  echo "$slug: $(grep -c 'class="dads-' apps/docs/.vitepress/dist/components/${slug}.html) elements"
done
```

### Exit Criteria

- [x] 同 Wave 1 形式
- [x] commit: `docs(apps/docs): add Display component demos (Wave 5)` (01418e6)

---

## 最終ステップ — スペック全体の Exit Criteria

Wave 5 完了後、main agent が以下を一括検証:

```bash
# 1. 全 26 ファイルが TODO 脱却
grep -L 'TODO' apps/docs/components/*.md | wc -l   # 期待値 26

# 2. 全 26 ファイルが <script setup> を含む
grep -l '<script setup' apps/docs/components/*.md | wc -l   # 期待値 26

# 3. 全 26 ファイルが Props テーブル (列ヘッダ "| Prop") を含む
grep -l '| Prop' apps/docs/components/*.md | wc -l   # 期待値 26

# 4. 既存 quality gates 維持
pnpm -w run format:check
pnpm -w run lint
pnpm -w run typecheck
pnpm --filter @dads/vue test                 # 899 tests pass
pnpm --filter @dads/docs build               # 27 HTML pages
```

### スペック完了条件 (AC-1 〜 AC-8)

- [x] **AC-1** 26 ファイル全 TODO 脱却 (button.md + 25 新規)
- [x] **AC-2** 全 26 ファイルに `<script setup>` で Dads<Name> import
- [x] **AC-3** 全 26 ファイルに Props テーブル
- [x] **AC-4** `pnpm format:check` 0 件
- [x] **AC-5** docs build で 27 HTML 生成 (index + 26 components)
- [x] **AC-6** Vue compile error / warning 0 件
- [x] **AC-7** Phase 8 状態の typecheck / lint / test (899) 維持 (regression なし)
- [x] **AC-8** 5 wave コミットが git log に記録 (8ef2dee / 634960b / 8e4da33 / 6db66b3 / 01418e6)

### 任意追加タスク (本スペック内 or 別タスク)

- [x] ルート `README.md` の Status 行を「全 26 コンポーネントカタログ完成」に更新
- [ ] `packages/vue/README.md` の TODO 行 (残り 23 a11y) はそのまま (a11y は別スペック対象)
- [x] `apps/docs/README.md` の「Button のみフルデモ」記載を更新

---

## トラブルシュート

| 症状                                          | 対処                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| sub-agent が 250 行を大幅超過                 | 該当 agent に「現状を保持しつつ末尾の冗長セクション削除」と再依頼        |
| sub-agent が `<style>` ブロックを使った       | brief 違反 → 該当 agent に再依頼 (custom.css 既存クラスのみ許可)         |
| docs build で Vue compile error               | エラーログから該当ファイル特定 → 該当 sub-agent に該当行を提示して再依頼 |
| sub-agent が button.md を上書き               | `git checkout apps/docs/components/button.md` で即復元                   |
| sub-agent が `packages/vue/` のファイルを変更 | `git checkout packages/vue/` で即復元 → brief 違反として記録             |
| 並列で git index が壊れる                     | sub-agent は git 操作しない / main agent のみ commit 実行                |

---

## 進捗トラッキング

各 wave 着手時に「Wave N 開始」と宣言、Exit Criteria を満たしたら user 承認 → コミット → 次 wave。
