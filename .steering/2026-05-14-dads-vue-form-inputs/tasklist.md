# Tasklist — DADS Vue Form-Inputs 追加実装 (Spec 1/3)

- Spec ID: `2026-05-14-dads-vue-form-inputs`
- Depends on: `./requirements.md`, `./design.md`
- Status: **Done（2026-05-14 完了）**
- Last Updated: 2026-05-14

---

## 進め方

- **Wave 1 (5 並列) で 5 件すべて実装 → 検証 → user 承認 → コミット**
- sub-agent ブリーフは design.md §4 のテンプレートを **そのまま** 使う

---

## Wave 一覧

| Wave | カテゴリ    | 件数 | 並列度 | 目安  |
| ---- | ----------- | ---- | ------ | ----- |
| 1    | Form-Inputs | 5    | 5      | 40 分 |

合計目安: **40 分** (sub-agent 呼び出し + main agent 追記 + 検証 + commit)

---

## 前提条件チェック (wave 1 着手前)

- [ ] `git status` がクリーン (uncommitted changes なし)
- [ ] `pnpm --filter @dads/vue test` で **899 tests pass** が現状で出る
- [ ] `pnpm --filter @dads/docs build` が現状で成功する
- [ ] 各 component の公式仕様 MD が存在する:
  - `dads-document-md/dads/components/{date-picker,search-box,disclosure,description-list,language-selector}/index.md`

---

## Wave 1 — Form-Inputs (DatePicker / SearchBox / Disclosure / DescriptionList / LanguageSelector)

### sub-agent 呼び出し (1 メッセージ内 5 並列)

各 sub-agent に design.md §4.1 のテンプレを `<NAME>` / `<SLUG>` 置換して渡す:

| #   | NAME             | SLUG              | HTML 実装例 | 注意                                  |
| --- | ---------------- | ----------------- | ----------- | ------------------------------------- |
| 1   | DatePicker       | date-picker       | あり        | 内部に Calendar 含む → 既存 HTML 流用 |
| 2   | SearchBox        | search-box        | あり        | input + search icon button            |
| 3   | Disclosure       | disclosure        | あり        | button + expand panel (1 件版)        |
| 4   | DescriptionList  | description-list  | なし        | 標準 `<dl>` / `<dt>` / `<dd>`         |
| 5   | LanguageSelector | language-selector | あり        | select + globe icon                   |

### main agent タスク (sub-agent 完了後)

1. `packages/vue/src/index.ts` に 5 件の export を追記
2. `apps/docs/.vitepress/config.ts` の Form sidebar 配列に 5 件追加 (アルファベット順 or 既存末尾)
3. 検証 (下記)

### 検証 (5 件全完了後)

```bash
# 1. format
pnpm exec prettier --write packages/vue/src/components/{DatePicker,SearchBox,Disclosure,DescriptionList,LanguageSelector}/ \
  apps/docs/components/{date-picker,search-box,disclosure,description-list,language-selector}.md \
  packages/vue/src/index.ts apps/docs/.vitepress/config.ts
pnpm -w run format:check

# 2. type + lint
pnpm -w run typecheck
pnpm -w run lint

# 3. test (974+ tests expected)
pnpm --filter @dads/vue test 2>&1 | tail -10
# 確認: "Test Files X passed" の X が 26 + 5 = 31

# 4. docs build
pnpm --filter @dads/docs build 2>&1 | tail -5
# dist HTML が 31 + index = 32 件
ls apps/docs/.vitepress/dist/components/*.html | wc -l   # → 31

# 5. diff scope
git diff --stat
# 期待: packages/vue/src/components/{5 新規ディレクトリ}/* + index.ts + config.ts + 5 demo MD
```

### Exit Criteria

- [ ] 5 新規ディレクトリすべて 4 ファイル構成 (types/vue/index/tests)
- [ ] `packages/vue/src/index.ts` に 5 件 export 追記
- [ ] `apps/docs/.vitepress/config.ts` の Form sidebar に 5 件追加
- [ ] `apps/docs/components/` に 5 件の demo MD
- [ ] `pnpm --filter @dads/vue test` → 974+ tests pass
- [ ] `pnpm --filter @dads/docs build` 成功 + dist/components/ に 31 HTML
- [ ] typecheck / lint / format クリーン
- [ ] DADS 公式仕様 MD のガイドライン項目をすべて満たす
- [ ] user 承認後コミット: `feat(@dads/vue): add Form-Inputs components (Wave 1)`

---

## 最終ステップ — スペック全体の Exit Criteria

```bash
# 全 31 ファイル test 通過 (既存 26 + 新規 5)
pnpm --filter @dads/vue test 2>&1 | tail -5

# 全 31 demo MD 完成
ls apps/docs/components/*.md | wc -l   # 期待 31

# Phase 8 quality gates 維持
pnpm -w run format:check
pnpm -w run lint
pnpm -w run typecheck
pnpm --filter @dads/docs build
```

### スペック完了条件 (AC-1 〜 AC-9)

- [ ] **AC-1** 5 component ディレクトリ作成
- [ ] **AC-2** `src/index.ts` に 5 export
- [ ] **AC-3** test 974+ pass
- [ ] **AC-4** typecheck / lint / format クリーン
- [ ] **AC-5** sidebar に 5 件追加
- [ ] **AC-6** demo MD 5 件 (Button.md 同等)
- [ ] **AC-7** docs build 31 HTML
- [ ] **AC-8** 公式仕様準拠 (spot check OK)
- [ ] **AC-9** コミット記録

---

## トラブルシュート

| 症状                                            | 対処                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| sub-agent が公式 MD に無い prop を実装          | brief 違反 → 該当 agent に再依頼 (要対象 prop の削除指示)                            |
| DatePicker のテストが時刻系で flaky             | `vi.useFakeTimers()` を使って固定化                                                  |
| sub-agent が `packages/vue/src/index.ts` を編集 | `git checkout packages/vue/src/index.ts` で復元 → brief 違反として記録 + main で実施 |
| typecheck で props 型が壊れる                   | sub-agent に該当行を提示して再依頼                                                   |
| docs build で sidebar 経由 import 失敗          | main agent が config.ts の編集を確認 (kebab-case slug 一致)                          |
| Disclosure のアニメーションが必要か             | 公式 HTML 例にあれば踏襲、無ければ初期は CSS transition のみ                         |

---

## 進捗トラッキング

Wave 1 着手時に「Wave 1 開始」と宣言、Exit Criteria を満たしたら user 承認 → コミット → 次 spec へ。
