# Tasklist — DADS Vue Display-Misc 追加実装 (Spec 3/3)

- Spec ID: `2026-05-14-dads-vue-display-misc`
- Depends on: `./requirements.md`, `./design.md`
- Status: **Done（2026-05-14 完了）**
- Last Updated: 2026-05-14

---

## 進め方

- **Wave 1 (8 並列) で 8 件すべて実装** (リソース不足の場合 5+3 分割)
- main agent が wave 後に index.ts / config.ts を一括追記
- Exit Criteria 満たしたら user 承認 → コミット

---

## Wave 一覧

| Wave | カテゴリ     | 件数 | 並列度          | 目安  |
| ---- | ------------ | ---- | --------------- | ----- |
| 1    | Display-Misc | 8    | 8 (推奨) or 5+3 | 50 分 |

合計: **50〜60 分**

---

## 前提条件チェック

- [ ] Spec 1 + Spec 2 完了 (1124+ tests green, 41 demo MD, 36 component dir)
- [ ] `git status` clean
- [ ] 8 件の公式仕様 MD 存在確認:
  - `dads-document-md/dads/components/{image,image-slider,carousel,list,blockquote,resource-list,emergency-banner,table-control}/index.md`

---

## Wave 1 — Display-Misc (8 並列)

### sub-agent 呼び出し

design.md §4.1 テンプレ + §4.2 追加事項 を渡す。

| #   | NAME            | SLUG             |
| --- | --------------- | ---------------- |
| 1   | Image           | image            |
| 2   | ImageSlider     | image-slider     |
| 3   | Carousel        | carousel         |
| 4   | List            | list             |
| 5   | Blockquote      | blockquote       |
| 6   | ResourceList    | resource-list    |
| 7   | EmergencyBanner | emergency-banner |
| 8   | TableControl    | table-control    |

### main agent タスク (Wave 完了後)

1. `packages/vue/src/index.ts` に 8 件 export 追記
2. `apps/docs/.vitepress/config.ts` の sidebar に 8 件追加:
   - Display カテゴリへ: Image, ImageSlider, Carousel, List, Blockquote, ResourceList, TableControl
   - Feedback カテゴリへ: EmergencyBanner
3. 検証

### 検証

```bash
# 1. format
pnpm exec prettier --write packages/vue/src/components/{Image,ImageSlider,Carousel,List,Blockquote,ResourceList,EmergencyBanner,TableControl}/ \
  apps/docs/components/{image,image-slider,carousel,list,blockquote,resource-list,emergency-banner,table-control}.md \
  packages/vue/src/index.ts apps/docs/.vitepress/config.ts
pnpm -w run format:check

# 2. quality gates
pnpm -w run typecheck
pnpm -w run lint
pnpm --filter @dads/vue test           # 1240+ tests
pnpm --filter @dads/docs build         # 49 HTML
ls apps/docs/.vitepress/dist/components/*.html | wc -l    # → 49

# 3. diff scope
git diff --stat | tail -20
# 期待: 8 新規ディレクトリ + index.ts + config.ts + 8 demo MD
```

### Exit Criteria

- [ ] 8 新規ディレクトリ作成
- [ ] `src/index.ts` に 8 件 export
- [ ] sidebar 更新 (Display 7 + Feedback 1)
- [ ] demo MD 8 件
- [ ] test 1240+ pass
- [ ] docs build 49 HTML
- [ ] typecheck / lint / format クリーン
- [ ] DADS 公式仕様準拠 spot check
- [ ] commit: `feat(@dads/vue): add Display-Misc components (Wave 1)`

---

## 最終ステップ — シリーズ全体 (Spec 1 + 2 + 3) Exit Criteria

本 spec 完了が **DADS 公式 46 件カバー達成** に直結するため、シリーズ総括を行う:

```bash
# 1. component 数確認 (49 期待)
ls packages/vue/src/components/ | wc -l   # → 49

# 2. demo MD 数確認 (49 期待)
ls apps/docs/components/*.md | wc -l       # → 49

# 3. 全テスト
pnpm --filter @dads/vue test 2>&1 | tail -5  # 1240+ tests

# 4. docs build 完全成功
pnpm --filter @dads/docs build

# 5. quality gates 一括
pnpm -w run format:check
pnpm -w run lint
pnpm -w run typecheck
```

### シリーズ完了タスク (本 spec 完了時に main agent が実施)

- [ ] ルート `README.md` Status 行更新: 「全 49 component (公式 46 + 独自 4)」
- [ ] `packages/vue/README.md` 更新
- [ ] `apps/docs/README.md` 更新
- [ ] Spec 1 / 2 / 3 すべての Status を Done に更新
- [ ] CHANGELOG 追加 (`.changeset/dads-vue-full-coverage.md`)
- [ ] 総括コミット: `chore: complete DADS official component coverage (49 components total)`

### スペック完了条件 (AC-1 〜 AC-10)

- [ ] **AC-1** 8 component ディレクトリ作成
- [ ] **AC-2** `src/index.ts` に 8 export
- [ ] **AC-3** test 1240+ pass
- [ ] **AC-4** typecheck / lint / format クリーン
- [ ] **AC-5** sidebar に 8 件追加
- [ ] **AC-6** demo MD 8 件
- [ ] **AC-7** docs build 49 HTML
- [ ] **AC-8** 公式仕様準拠
- [ ] **AC-9** 1 wave コミット記録
- [ ] **AC-10** DADS 公式 46 件完全カバー (シリーズ目標達成)

---

## トラブルシュート

Spec 1 / 2 のトラブルシュート + 以下:

| 症状                                                                 | 対処                                                                              |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Carousel / ImageSlider のテストが flaky                              | `vi.useFakeTimers()` + `vi.advanceTimersByTime` で時間操作                        |
| EmergencyBanner の Z-index 衝突                                      | 既存 Modal (1000) / Drawer (1100) を確認 → 9999 で安全                            |
| 8 並列 sub-agent でリソース不足                                      | 5 + 3 の 2 wave に分割し再実行 (tasklist 修正のうえ)                              |
| TableControl と Table の組合せが demo で複雑                         | 既存 Table demo MD は触らず、TableControl demo に「Table と組合せ」セクション追加 |
| List の type prop (`'ordered'` / `'unordered'`) で TS narrowing 失敗 | union type を `as const` で固定                                                   |

---

## 進捗トラッキング

Wave 1 → 検証 → 承認 → コミット → シリーズ総括 → 完了報告。
