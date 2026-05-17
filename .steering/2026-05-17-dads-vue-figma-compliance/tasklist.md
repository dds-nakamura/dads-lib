# Tasklist — DADS Vue Figma 準拠化

- Spec ID: `2026-05-17-dads-vue-figma-compliance`
- Depends on: `./requirements.md`, `./design.md`
- Status: **Done (2026-05-17)**

> 完了サマリ: Wave 1 (High) で DadsPageNavigation を TableOfContents に rename + 新 pagination 実装。Wave 2 (Medium) で DadsTab に orientation/icon 追加、DadsChip は既存 `prepend` slot で要件充足を確認 → docs 例追加のみ。Wave 3 (Low) で DadsImage に loading skeleton、DadsTableControl に preset/reset 追加。テスト 1542 → 1585、docs HTML 49 → 50。

---

## Wave 1: High (PageNavigation 再構成)

### 1.1 リネーム

- [x] `git mv packages/vue/src/components/PageNavigation packages/vue/src/components/TableOfContents`
- [x] `git mv` ファイル名: `DadsPageNavigation.{vue,types.ts,test.ts}` → `DadsTableOfContents.{vue,types.ts,test.ts}`
- [x] ファイル内容置換:
  - 型名: `DadsPageNavigation*` → `DadsTableOfContents*`
  - CSS class: `dads-page-navigation*` → `dads-table-of-contents*`
  - aria-label default は維持
- [x] `index.ts` を `TableOfContents` 用に更新
- [x] `packages/vue/src/index.ts` の export を `TableOfContents` に変更
- [x] テスト名を `DadsTableOfContents` に置換、pass 確認

### 1.2 新 DadsPageNavigation (pagination)

- [x] `packages/vue/src/components/PageNavigation/` を再作成
- [x] `DadsPageNavigation.types.ts` 作成 (requirements §3 FR-H2 参照)
- [x] `DadsPageNavigation.vue` 作成
- [x] `index.ts` 作成
- [x] `__tests__/DadsPageNavigation.test.ts` 作成 (design §2.3 テスト設計)
- [x] `packages/vue/src/index.ts` に再 export 追加

### 1.3 docs

- [x] `apps/docs/components/page-navigation.md` を pagination 用に書き換え
- [x] `apps/docs/components/table-of-contents.md` 新規作成 (旧 page-navigation.md を移植)
- [x] `apps/docs/.vitepress/config.ts` sidebar に TableOfContents 追加

### 1.4 検証

- [x] `pnpm -w run format`
- [x] `pnpm -w run typecheck`
- [x] `pnpm -w run lint`
- [x] `pnpm --filter @dads/vue test`
- [x] `pnpm --filter @dads/docs build`
- [x] `git commit -m "refactor(@dads/vue): rename DadsPageNavigation to DadsTableOfContents"`
- [x] `git commit -m "feat(@dads/vue): add DadsPageNavigation (pagination per Figma spec)"`

---

## Wave 2: Medium

### 2.1 DadsTab.orientation + icon

- [x] `DadsTab.types.ts` に `DadsTabOrientation` と `DadsTabItem.icon` 追加
- [x] `DadsTab.vue` に `aria-orientation` 反映、Up/Down 矢印キー対応
- [x] SCSS に `.dads-tab--vertical` レイアウト追加
- [x] テスト追加: vertical の aria-orientation、Up/Down で active 切替、icon 表示
- [x] `apps/docs/components/tab.md` に vertical / icon サンプル追加
- [x] 検証 + commit

### 2.2 DadsChip.leading slot

- [x] `DadsChip.vue` template に `<slot name="leading">` 追加
- [x] SCSS に `.dads-chip__leading` 追加
- [x] テスト追加: leading slot が描画される / 既存スタイル維持
- [x] `apps/docs/components/chip.md` にアバター付きサンプル追加
- [x] 検証 + commit

---

## Wave 3: Low

### 3.1 DadsImage.loading skeleton

- [x] `DadsImage.types.ts` に `showSkeleton` 追加
- [x] `DadsImage.vue` に `loaded` ref + skeleton overlay 実装
- [x] テスト追加: skeleton 表示 / load イベント後に消える
- [x] 検証 + commit

### 3.2 DadsTableControl.preset/reset

- [x] `DadsTableControl.types.ts` に `presets` と `showReset` 追加
- [x] `DadsTableControl.vue` に Reset ボタンと preset チップ追加
- [x] テスト追加: preset クリックで search update + click:preset emit / Reset で空文字 emit
- [x] 検証 + commit

---

## 最終仕上げ

- [x] README.md / packages/vue/README.md / CLAUDE.md / apps/docs/README.md の component 数 49 → 50 に更新
- [x] requirements.md / design.md / tasklist.md の Status を Done に
- [x] `chore: mark 2026-05-17 figma-compliance spec done`
