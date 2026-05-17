# Tasklist — DADS Vue Figma 準拠化

- Spec ID: `2026-05-17-dads-vue-figma-compliance`
- Depends on: `./requirements.md`, `./design.md`
- Status: **In Progress**

---

## Wave 1: High (PageNavigation 再構成)

### 1.1 リネーム

- [ ] `git mv packages/vue/src/components/PageNavigation packages/vue/src/components/TableOfContents`
- [ ] `git mv` ファイル名: `DadsPageNavigation.{vue,types.ts,test.ts}` → `DadsTableOfContents.{vue,types.ts,test.ts}`
- [ ] ファイル内容置換:
  - 型名: `DadsPageNavigation*` → `DadsTableOfContents*`
  - CSS class: `dads-page-navigation*` → `dads-table-of-contents*`
  - aria-label default は維持
- [ ] `index.ts` を `TableOfContents` 用に更新
- [ ] `packages/vue/src/index.ts` の export を `TableOfContents` に変更
- [ ] テスト名を `DadsTableOfContents` に置換、pass 確認

### 1.2 新 DadsPageNavigation (pagination)

- [ ] `packages/vue/src/components/PageNavigation/` を再作成
- [ ] `DadsPageNavigation.types.ts` 作成 (requirements §3 FR-H2 参照)
- [ ] `DadsPageNavigation.vue` 作成
- [ ] `index.ts` 作成
- [ ] `__tests__/DadsPageNavigation.test.ts` 作成 (design §2.3 テスト設計)
- [ ] `packages/vue/src/index.ts` に再 export 追加

### 1.3 docs

- [ ] `apps/docs/components/page-navigation.md` を pagination 用に書き換え
- [ ] `apps/docs/components/table-of-contents.md` 新規作成 (旧 page-navigation.md を移植)
- [ ] `apps/docs/.vitepress/config.ts` sidebar に TableOfContents 追加

### 1.4 検証

- [ ] `pnpm -w run format`
- [ ] `pnpm -w run typecheck`
- [ ] `pnpm -w run lint`
- [ ] `pnpm --filter @dads/vue test`
- [ ] `pnpm --filter @dads/docs build`
- [ ] `git commit -m "refactor(@dads/vue): rename DadsPageNavigation to DadsTableOfContents"`
- [ ] `git commit -m "feat(@dads/vue): add DadsPageNavigation (pagination per Figma spec)"`

---

## Wave 2: Medium

### 2.1 DadsTab.orientation + icon

- [ ] `DadsTab.types.ts` に `DadsTabOrientation` と `DadsTabItem.icon` 追加
- [ ] `DadsTab.vue` に `aria-orientation` 反映、Up/Down 矢印キー対応
- [ ] SCSS に `.dads-tab--vertical` レイアウト追加
- [ ] テスト追加: vertical の aria-orientation、Up/Down で active 切替、icon 表示
- [ ] `apps/docs/components/tab.md` に vertical / icon サンプル追加
- [ ] 検証 + commit

### 2.2 DadsChip.leading slot

- [ ] `DadsChip.vue` template に `<slot name="leading">` 追加
- [ ] SCSS に `.dads-chip__leading` 追加
- [ ] テスト追加: leading slot が描画される / 既存スタイル維持
- [ ] `apps/docs/components/chip.md` にアバター付きサンプル追加
- [ ] 検証 + commit

---

## Wave 3: Low

### 3.1 DadsImage.loading skeleton

- [ ] `DadsImage.types.ts` に `showSkeleton` 追加
- [ ] `DadsImage.vue` に `loaded` ref + skeleton overlay 実装
- [ ] テスト追加: skeleton 表示 / load イベント後に消える
- [ ] 検証 + commit

### 3.2 DadsTableControl.preset/reset

- [ ] `DadsTableControl.types.ts` に `presets` と `showReset` 追加
- [ ] `DadsTableControl.vue` に Reset ボタンと preset チップ追加
- [ ] テスト追加: preset クリックで search update + click:preset emit / Reset で空文字 emit
- [ ] 検証 + commit

---

## 最終仕上げ

- [ ] README.md / packages/vue/README.md / CLAUDE.md / apps/docs/README.md の component 数 49 → 50 に更新
- [ ] requirements.md / design.md / tasklist.md の Status を Done に
- [ ] `chore: mark 2026-05-17 figma-compliance spec done`
