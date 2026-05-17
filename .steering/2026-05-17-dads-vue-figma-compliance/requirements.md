# Requirements — DADS Vue Figma 準拠化

- Spec ID: `2026-05-17-dads-vue-figma-compliance`
- Created: 2026-05-17
- Status: **In Progress**

---

## 1. 背景

`dads-document-figma/` (Playwright 経由で取得した DADS 公式 Figma スナップショット 42 件) と現 `@dads/vue` 実装を照合した結果、「準備中」コンポーネント 8 件のうち以下のギャップが判明した:

| 重要度     | コンポーネント       | ギャップ                                                                       |
| ---------- | -------------------- | ------------------------------------------------------------------------------ |
| **High**   | `DadsPageNavigation` | Figma は **pagination (ページ送り)** だが実装は **in-page TOC** で別物         |
| **Medium** | `DadsTab`            | Figma は **horizontal + vertical (Left/Right)** だが実装は **horizontal 専用** |
| **Medium** | `DadsChip`           | Figma の **アバター付きチップ** (宛先/CC 人物選択 UI) を表現できない           |
| **Low**    | `DadsImage`          | Figma の **ローディング skeleton** が未実装                                    |
| **Low**    | `DadsTableControl`   | Figma の **検索プリセット / Reset ボタン** が未実装                            |

詳細レビューは 2026-05-17 セッションログ参照。

---

## 2. ゴール

DADS 公式 Figma 仕様と `@dads/vue` の API を整合させる。「準備中」マークが取れたあとに DADS 公式 React 実装と相互運用可能になる土台を作る。

### 採用方針

- 既存テスト (1542 件) は **退化させない**
- 互換性破壊が避けられない箇所は **renaming で対応** し、`DadsXxx` import パスは新旧両方を保持する**移行期 alias 不要**（プライベートライブラリのためメジャー breaking 可）
- 各タスクは **テスト追加 → 実装 → docs 更新** の順 (TDD)
- High 完了後にビルド緑を確認してから Medium / Low に進む

---

## 3. 機能要件

### FR-H1: `DadsPageNavigation` リネーム (TOC → pagination)

- 現 `packages/vue/src/components/PageNavigation/` を `packages/vue/src/components/TableOfContents/` にリネーム
- 型名: `DadsPageNavigationProps/Emits/Item` → `DadsTableOfContentsProps/Emits/Item`
- CSS class 接頭辞: `dads-page-navigation` → `dads-table-of-contents`
- aria-label default は `'このページの目次'` を維持
- 既存テストはすべて新名で pass する

### FR-H2: 新 `DadsPageNavigation` (pagination) を実装

API:

```ts
export interface DadsPageNavigationProps {
  modelValue: number // 1-indexed 現在ページ (v-model)
  totalPages: number // 総ページ数
  maxPageButtons?: number // 表示する page-number ボタン上限 (default: 7, 0 = 非表示)
  showPrevNext?: boolean // < / > ボタン (default: true)
  showFirstLast?: boolean // << / >> ボタン (default: false)
  prevLabel?: string // default: '前のページ'
  nextLabel?: string // default: '次のページ'
  firstLabel?: string // default: '最初のページ'
  lastLabel?: string // default: '最後のページ'
  ariaLabel?: string // <nav aria-label>. default: 'ページ送り'
  disabled?: boolean
}

export interface DadsPageNavigationEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}
```

実装:

- `<nav aria-label>` 内に `<ul>` でボタンを並べる
- 現在ページに `aria-current="page"`
- ページ番号が多い場合は `1 … 4 5 [6] 7 8 … 100` 形式の省略
- Prev/Next は disabled になる端で aria-disabled
- すべて native `<button type="button">`
- design-tokens で色・spacing 統一

### FR-M1: `DadsTab` に `orientation` 追加

- `DadsTabProps.orientation?: 'horizontal' | 'vertical'` (default: `'horizontal'`)
- `<div role="tablist" aria-orientation>` に値を反映
- vertical のキーボード操作: `ArrowUp` / `ArrowDown` (現状の左右と相互排他)
- Figma の Left/Right tabs UI に合わせ縦並びレイアウトの SCSS を追加
- `DadsTabItem.icon?: string` を追加 (mdi class名)。アイコン表示対応

### FR-M2: `DadsChip` に `leading` slot 追加

- `<slot name="leading" />` をルート要素の先頭に追加
- 既存の text content slot は `default` で維持
- アバター画像/アイコン挿入を想定した最小限の CSS (gap, alignment)

### FR-L1: `DadsImage` の loading skeleton

- `loading="lazy"` の挙動と並行して、画像が `load` イベントを発火するまで CSS skeleton を表示
- `props.showSkeleton?: boolean` (default: `true`) で制御
- `load` 発火後はフェードイン

### FR-L2: `DadsTableControl` の preset / reset

- `props.presets?: Array<{ label: string; query: string }>` で検索プリセット表示
- `props.showReset?: boolean` (default: `true`) で検索フィールド横の Reset ボタン
- emit `update:search`, `click:preset`

---

## 4. 非機能要件

- 全テスト pass (1542 + 追加)
- typecheck / lint / format:check すべてグリーン
- VitePress docs ビルド成功 (49 ページから 50 ページに増える: 新 PageNavigation + TableOfContents)
- a11y axe: 影響範囲のコンポーネントで違反なし

---

## 5. 受け入れ基準

- [ ] **AC-H1** `DadsTableOfContents` で旧テストが pass
- [ ] **AC-H2** 新 `DadsPageNavigation` (pagination) のテスト 15 件以上 / すべて pass
- [ ] **AC-H3** docs に `/components/page-navigation` (pagination) と `/components/table-of-contents` の両ページが存在し、ビルド成功
- [ ] **AC-M1** `DadsTab` で `orientation='vertical'` 指定時に `aria-orientation="vertical"` + ArrowUp/Down で active 切替
- [ ] **AC-M2** `DadsChip` で `<slot name="leading">` にアバター挿入できる
- [ ] **AC-L1** `DadsImage` で load 前は skeleton、load 後はフェードイン
- [ ] **AC-L2** `DadsTableControl` で preset 表示 + reset 動作
- [ ] **AC-Full** `pnpm typecheck && pnpm lint && pnpm test && pnpm build` グリーン

---

## 6. リスク

| リスク                                            | 対策                                                                                   |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 既存 `DadsPageNavigation` を使うアプリ側が壊れる  | プライベート monorepo のため影響は `@dads/docs` のみ。docs を新旧両方に再配線          |
| `DadsTab` の orientation 切替で既存テストが落ちる | 既定値 horizontal を維持 / 既存 spec はそのまま通る設計                                |
| 新 pagination の page-number 省略ロジックが複雑化 | 単純な algorithm を採用 + ユニットテストで境界 (1ページ / 2ページ / 大量ページ) を網羅 |

---

## 7. 完了の定義

- 5. のすべてのチェックボックスにチェック
- git log に Wave コミットが残る (High / Medium / Low 単位)
- README / CLAUDE.md の component 数表記を更新 (49 → 50)
