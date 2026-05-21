# Tasklist — DADS Vue Navigation-Menus 追加実装 (Spec 2/3)

- Spec ID: `2026-05-14-dads-vue-navigation-menus`
- Depends on: `./requirements.md`, `./design.md`
- Status: **✅ Done（2026-05-14 完了）— historical reference**（2026-05-17 注記）
- Last Updated: 2026-05-14

> **📌 Historical reference banner（2026-05-17 追記）**
>
> 本書は **Wave 計画書（plan-of-record）** であり、`[ ]` チェックボックスは
> 計画時のタスク粒度の記録。**実装は別経路（個別 PR / 後続 spec）で完了済**で、
> 現在のコードベース・テスト（`2098 tests pass`）・ドキュメントに反映されている。
> 残された未チェック項目は **再着手不要** — 履歴として保持。
>
> 最新の対応状況は以下を参照:
>
> - [`2026-05-17-dads-vue-naming-and-gap`](../2026-05-17-dads-vue-naming-and-gap/) — 命名整合 + High/Medium/Low 全件ギャップ解消
> - [`2026-05-17-dads-vue-figma-compliance`](../2026-05-17-dads-vue-figma-compliance/) — Figma スナップショット準拠化

---

## 進め方

- **Wave 1 (基礎部品 5 並列) → Wave 2 (合成部品 5 並列)** の 2 段階
- Wave 1 完了後に main agent が index.ts と config.ts に Wave 1 分 (5 件) を追記し、Wave 2 から import できる状態にする
- 各 wave は **Exit Criteria を満たすまで次に進まない**

---

## Wave 一覧

| Wave | カテゴリ      | 件数 | 並列度 | 目安  |
| ---- | ------------- | ---- | ------ | ----- |
| 1    | Nav-Base      | 5    | 5      | 45 分 |
| 2    | Nav-Composite | 5    | 5      | 60 分 |

合計: **1.5〜2 時間**

---

## 前提条件チェック

- [ ] Spec 1 完了 (974+ tests green, 31 demo MD)
- [ ] `git status` clean
- [ ] 10 件の公式仕様 MD 存在確認:
  - `dads-document-md/dads/components/{global-menu,mega-menu,page-navigation,bottom-navigation,mobile-menu,hamburger-menu-button,menu-list,menu-list-box,scroll-top-button,utility-link}/index.md`

---

## Wave 1 — Nav-Base (MenuList / MenuListBox / HamburgerMenuButton / UtilityLink / ScrollTopButton)

### sub-agent 呼び出し (1 メッセージ内 5 並列)

design.md §4.1 テンプレを使用。

| #   | NAME                | SLUG                  |
| --- | ------------------- | --------------------- |
| 1   | MenuList            | menu-list             |
| 2   | MenuListBox         | menu-list-box         |
| 3   | HamburgerMenuButton | hamburger-menu-button |
| 4   | UtilityLink         | utility-link          |
| 5   | ScrollTopButton     | scroll-top-button     |

### main agent タスク (Wave 1 sub-agent 完了後)

1. `packages/vue/src/index.ts` に 5 件追加
2. `apps/docs/.vitepress/config.ts` に Navigation sidebar 追加 (5 件)
3. 検証 (下記)

### 検証

```bash
pnpm exec prettier --write packages/vue/src/components/{MenuList,MenuListBox,HamburgerMenuButton,UtilityLink,ScrollTopButton}/ \
  apps/docs/components/{menu-list,menu-list-box,hamburger-menu-button,utility-link,scroll-top-button}.md \
  packages/vue/src/index.ts apps/docs/.vitepress/config.ts
pnpm -w run format:check
pnpm -w run typecheck
pnpm -w run lint
pnpm --filter @dads/vue test    # 974 + 75 = ~1049 tests
pnpm --filter @dads/docs build  # 36 HTML
ls apps/docs/.vitepress/dist/components/*.html | wc -l   # → 36
```

### Exit Criteria

- [ ] 5 ディレクトリ作成
- [ ] index.ts / config.ts に 5 件追記
- [ ] test 1049+ pass
- [ ] docs build 36 HTML
- [ ] commit: `feat(@dads/vue): add Navigation-Menus base components (Wave 1)`

---

## Wave 2 — Nav-Composite (GlobalMenu / MegaMenu / PageNavigation / BottomNavigation / MobileMenu)

### sub-agent 呼び出し

design.md §4.2 テンプレ + §4.3 追加事項 (Wave 1 component を import 可能と明記)。

| #   | NAME             | SLUG              |
| --- | ---------------- | ----------------- |
| 1   | GlobalMenu       | global-menu       |
| 2   | MegaMenu         | mega-menu         |
| 3   | PageNavigation   | page-navigation   |
| 4   | BottomNavigation | bottom-navigation |
| 5   | MobileMenu       | mobile-menu       |

### main agent タスク

1. `packages/vue/src/index.ts` に 5 件追記 (Wave 2 分)
2. `apps/docs/.vitepress/config.ts` Navigation sidebar に追記
3. 検証

### 検証

```bash
pnpm exec prettier --write packages/vue/src/components/{GlobalMenu,MegaMenu,PageNavigation,BottomNavigation,MobileMenu}/ \
  apps/docs/components/{global-menu,mega-menu,page-navigation,bottom-navigation,mobile-menu}.md \
  packages/vue/src/index.ts apps/docs/.vitepress/config.ts
pnpm -w run format:check
pnpm -w run typecheck
pnpm -w run lint
pnpm --filter @dads/vue test    # ~1124 tests
pnpm --filter @dads/docs build  # 41 HTML
ls apps/docs/.vitepress/dist/components/*.html | wc -l   # → 41
```

### Exit Criteria

- [ ] 5 ディレクトリ作成 (Wave 2 分)
- [ ] index.ts / config.ts に 5 件追記
- [ ] test 1124+ pass
- [ ] docs build 41 HTML
- [ ] commit: `feat(@dads/vue): add Navigation-Menus composite components (Wave 2)`

---

## 最終ステップ — スペック全体 Exit Criteria

```bash
ls packages/vue/src/components/ | wc -l   # 26 + 10 = 36 dirs
ls apps/docs/components/*.md | wc -l      # 31 + 10 = 41
ls apps/docs/.vitepress/dist/components/*.html | wc -l   # 41

pnpm -w run format:check
pnpm -w run lint
pnpm -w run typecheck
pnpm --filter @dads/vue test    # 1124+ tests pass
pnpm --filter @dads/docs build
```

### スペック完了条件 (AC-1 〜 AC-9)

- [ ] **AC-1** 10 component ディレクトリ作成
- [ ] **AC-2** `src/index.ts` に 10 export
- [ ] **AC-3** test 1124+ pass (974 + 150〜200)
- [ ] **AC-4** typecheck / lint / format クリーン
- [ ] **AC-5** sidebar に 10 件追加
- [ ] **AC-6** demo MD 10 件
- [ ] **AC-7** docs build 41 HTML
- [ ] **AC-8** 公式仕様準拠
- [ ] **AC-9** 2 wave コミット記録

---

## トラブルシュート

Spec 1 のトラブルシュート + 以下を追加:

| 症状                                          | 対処                                                               |
| --------------------------------------------- | ------------------------------------------------------------------ |
| Wave 2 で Wave 1 component が import できない | index.ts に未追記 → main agent が `pnpm install` 不要、再 build OK |
| MegaMenu / MobileMenu の DOM が不明確         | 公式 MD の usage を最優先、不明な部分は GlobalMenu HTML をひな型に |
| ScrollTopButton で SSR 警告                   | `onMounted` で listener 登録、`onBeforeUnmount` で cleanup         |
| MobileMenu / Drawer 重複                      | 別 component として独立（DOM 構造・aria 違うため OK）              |

---

## 進捗トラッキング

Wave 1 → 検証 → 承認 → コミット → Wave 2 → 検証 → 承認 → コミット → 次 spec へ。
