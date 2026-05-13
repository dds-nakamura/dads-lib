# Requirements — DADS Vue Form-Inputs 追加実装 (Spec 1/3)

- Spec ID: `2026-05-14-dads-vue-form-inputs`
- Owner: nakamura_kouji
- Status: **Draft（着手前）**
- Last Updated: 2026-05-14
- Depends on: `2026-05-12-dads-vue-library-init` (Phase 0〜8 完了済), `2026-05-14-dads-vue-docs-rollout` (全 26 デモ完成)
- Sibling specs: `2026-05-14-dads-vue-navigation-menus` (Spec 2), `2026-05-14-dads-vue-display-misc` (Spec 3)

---

## 1. 背景・目的

`@dads/vue` には現在 26 コンポーネントが実装されているが、DADS 公式仕様 (46 件) のカバー率は 50% に留まる。本シリーズ (Spec 1〜3) で残り **23 件を完全網羅** する。

本スペック (Spec 1/3) は **Form-Inputs カテゴリの 5 件** を扱う。

### 採用する方針

- DADS 公式仕様 (`dads-document-md/dads/components/<slug>/index.md`) を**唯一の真実の源**とする
- HTML 実装サンプル (`design-system-example-components-html/src/components/<slug>/`) を**第一参照**として活用 (CSS / DOM 構造)
- 既存 26 コンポーネントの API 命名規則 (`size` / `disabled` / `loading` / `modelValue` / `*Emits` interface など) を踏襲
- 実装と同時にテスト (vitest + @vue/test-utils) を作成 — Phase 8 の green 状態を維持
- sub-agent (`general-purpose`) 並列 — **1 wave 5 並列 × 1 wave**

---

## 2. スコープ

### In Scope (本スペックで完了する 5 件)

| #   | 公式 slug           | 実装名                 | 用途                     | HTML 実装例 |
| --- | ------------------- | ---------------------- | ------------------------ | ----------- |
| 1   | `date-picker`       | `DadsDatePicker`       | 日付入力 (カレンダー UI) | あり        |
| 2   | `search-box`        | `DadsSearchBox`        | 検索入力                 | あり        |
| 3   | `disclosure`        | `DadsDisclosure`       | 開閉トグル (単体)        | あり        |
| 4   | `description-list`  | `DadsDescriptionList`  | 説明リスト (`<dl>`)      | なし        |
| 5   | `language-selector` | `DadsLanguageSelector` | 言語切替                 | あり        |

合計: **5 ファイルセット**（components ディレクトリ）× 平均 4 ファイル + 周辺更新 = **約 25 ファイル**

### Out of Scope

- 別 spec で扱う 18 件 (Navigation-Menus: 10 件 / Display-Misc: 8 件)
- 既存 26 コンポーネントへの変更
- `apps/docs` のテーマカスタマイズ・sidebar 構造変更（既存パターンに従って追記のみ）
- Storybook 等への乗り換え
- `web-label-print` の依存置換

---

## 3. 機能要件 (Functional Requirements)

### F1. パッケージ構成

各コンポーネントについて以下のファイル構成を満たす:

```
packages/vue/src/components/<Name>/
├── Dads<Name>.types.ts        props / events / slots / 関連型
├── Dads<Name>.vue             SFC (template + script setup + scoped SCSS)
├── index.ts                   export { default as Dads<Name> } 等
└── __tests__/
    └── Dads<Name>.test.ts     vitest + @vue/test-utils
```

`packages/vue/src/index.ts` に **追記**:

```ts
export * from './components/DatePicker'
export * from './components/SearchBox'
export * from './components/Disclosure'
export * from './components/DescriptionList'
export * from './components/LanguageSelector'
```

### F2. API 設計規則 (既存 26 コンポーネントと統一)

- **FR-2.1** `modelValue` + `update:modelValue` 二方向バインディング規約 (v-model 対応)
- **FR-2.2** `size` prop が存在する場合は `DadsSize` (`xs|sm|md|lg`) のサブセット
- **FR-2.3** `disabled` / `readonly` / `required` / `error` prop の意味は既存と同一
- **FR-2.4** props は **TypeScript interface** で定義 + JSDoc コメント
- **FR-2.5** emits は `Dads<Name>Emits` interface で定義

### F3. 仕様準拠

- **FR-3.1** `dads-document-md/dads/components/<slug>/index.md` の **使用ガイドライン** をすべて満たす
- **FR-3.2** `design-system-example-components-html/src/components/<slug>/` (存在する場合) の DOM 構造・class 名・aria 属性を保持
- **FR-3.3** デザイントークンは `@dads/tokens` 経由 (`var(--color-...)` / `var(--spacing-...)` 等)。直接の hex / px 禁止
- **FR-3.4** WCAG 2.1 AA 準拠 (aria-\*, キーボード操作, focus visible)

### F4. テスト

- **FR-4.1** 各コンポーネントについて **最低 15 テストケース**: render / props / events / a11y / edge cases
- **FR-4.2** vitest + `@vue/test-utils` + jsdom 環境
- **FR-4.3** Spec 1 完了後 `pnpm --filter @dads/vue test` で **既存 899 + 新規 75〜100 = 974〜999 件** が all-green
- **FR-4.4** vitest-axe a11y テストは本スペックでは **必須ではない** (a11y 単独で別タスク化)

### F5. ドキュメント

- **FR-5.1** `apps/docs/components/<slug>.md` に Button.md と同等のフルデモを作成
- **FR-5.2** `apps/docs/.vitepress/config.ts` の sidebar に追加 (Form カテゴリ末尾)
- **FR-5.3** `pnpm --filter @dads/docs build` 成功

### F6. ビルド・型・lint

- **FR-6.1** `pnpm typecheck` green (vue-tsc)
- **FR-6.2** `pnpm lint` green (eslint flat config)
- **FR-6.3** `pnpm format:check` green (prettier)

---

## 4. 非機能要件 (Non-Functional Requirements)

- **NFR-1**: 1 コンポーネント = 1 sub-agent。並列度 5。1 wave 完走目安 **30〜45 分**
- **NFR-2**: 各 sub-agent は **公式仕様 MD + HTML サンプル + 既存コンポーネント (TextField / Accordion 等)** を読み込んでから実装
- **NFR-3**: 全 Vue ファイルは `<style lang="scss" scoped>` を使用し、共有 mixin (`@use '../../styles/base'` 等) を活用
- **NFR-4**: SCSS でカラー直書き禁止 (`@dads/tokens` の CSS variables を使用)

---

## 5. 受入基準 (Acceptance Criteria)

スペック完了時、以下がすべて満たされていること:

- [ ] **AC-1** 5 つの新規ディレクトリ `packages/vue/src/components/{DatePicker,SearchBox,Disclosure,DescriptionList,LanguageSelector}/` がそれぞれ 4 ファイル構成で存在
- [ ] **AC-2** `packages/vue/src/index.ts` に 5 件の export が追記
- [ ] **AC-3** `pnpm --filter @dads/vue test` で **974+ tests pass** (既存 899 + 新規 75+)
- [ ] **AC-4** `pnpm typecheck` / `pnpm lint` / `pnpm format:check` クリーン
- [ ] **AC-5** `apps/docs/.vitepress/config.ts` の Form sidebar に 5 件追加
- [ ] **AC-6** `apps/docs/components/{date-picker,search-box,disclosure,description-list,language-selector}.md` が 5 件存在 + Button.md 同等のフルデモ
- [ ] **AC-7** `pnpm --filter @dads/docs build` 成功 + dist/components/ に 31 HTML (既存 26 + 新規 5)
- [ ] **AC-8** 5 件すべて DADS 公式仕様 (`dads-document-md/dads/components/<slug>/index.md`) のガイドライン項目を満たす
- [ ] **AC-9** 5 wave (or 1 wave) コミットが git log に記録

---

## 6. リスク・前提

| ID  | 内容                                                                      | 影響   | 対策                                                                                          |
| --- | ------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------- |
| R-1 | sub-agent が公式仕様に無い prop を独自追加                                | High   | 各 brief に「公式 MD + HTML を唯一の真実とする / 推測禁止」を明記                             |
| R-2 | 既存コンポーネントの命名規則を破壊                                        | High   | brief に「既存 26 component の API を踏襲」「TextField / Accordion 等の参考実装を読む」を明記 |
| R-3 | DADS HTML サンプルに無いコンポーネント (description-list) の DOM 構造ブレ | Medium | brief に「公式 MD の例示 HTML を最優先 / 不足箇所は標準的な `<dl>` 構造」を明記               |
| R-4 | DatePicker の Calendar 内部実装が肥大化                                   | Medium | HTML サンプルの `calendar` component を流用 (vendor 取り込み済の design-system-example)       |
| R-5 | sub-agent 同士の SCSS 命名衝突                                            | Low    | 各 component は独自スコープ `.dads-<slug>` 配下で完結 / グローバル class 追加禁止             |
| R-6 | テスト時間の急増                                                          | Low    | 1 component あたり 15〜20 件に制限。E2E は別タスクへ                                          |

### 前提

- Phase 0〜8 + docs-rollout 完了済 monorepo (依存追加なし)
- `dads-document-md/` と `design-system-example-components-html/` は読み取り専用で参照
- 既存 26 component の API 命名規則を真実の源とする

---

## 7. 次フェーズへの引き継ぎ

承認後に `design.md` (sub-agent ブリーフ設計) と `tasklist.md` (1〜2 wave 分割) を作成する。
