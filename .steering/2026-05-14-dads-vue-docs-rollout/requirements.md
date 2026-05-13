# Requirements — DADS Vue カタログ全コンポーネントデモ整備

- Spec ID: `2026-05-14-dads-vue-docs-rollout`
- Owner: nakamura_kouji
- Status: **Done** (2026-05-14 完了)
- Last Updated: 2026-05-14
- Depends on: `.steering/2026-05-12-dads-vue-library-init/` (Phase 0〜8 完了済)

---

## 1. 背景・目的

先行スペック `2026-05-12-dads-vue-library-init` の Phase 5 で `apps/docs`（VitePress カタログ）を構築したが、フルデモは **Button のみ**。残り **25 コンポーネント** は TODO スタブのまま放置されている。

```
apps/docs/components/
├── button.md                ← フルデモ (Phase 5 で作成済)
├── text-field.md            ← TODO スタブ
├── textarea.md              ← TODO スタブ
├── ... (合計 25 ファイルが TODO)
```

本スペックのゴール: **残り 25 コンポーネントを Button.md と同等品質のフルデモに置き換える** こと。

### 採用する方針

- 既存 `apps/docs/components/button.md` を **テンプレート**として、構造とトーンを揃える
- 各コンポーネントの仕様は `packages/vue/src/components/<Name>/Dads<Name>.types.ts` を **単一の真実の源**とする
- 実装は sub-agent (`general-purpose`) 並列 — **5 wave × 5 並列**（最終 wave は 6 並列）

---

## 2. スコープ

### In Scope (本スペックで完了する 25 件)

| Wave  | カテゴリ   | コンポーネント (slug)                                            |
| ----- | ---------- | ---------------------------------------------------------------- |
| **1** | Form-A     | text-field, textarea, select, checkbox, radio                    |
| **2** | Form-B     | checkbox-group, radio-group, file-upload, combobox, color-picker |
| **3** | Navigation | header, drawer, breadcrumb, step-navigation, tab                 |
| **4** | Feedback   | notification-banner, modal, tooltip, progress-indicator          |
| **5** | Display    | card, heading, divider, table, accordion, chip                   |

合計: 5 + 5 + 5 + 4 + 6 = **25 ファイル**

### Out of Scope

- `packages/vue/` 配下のコンポーネント実装・型・テストの **一切の変更**
- 残り 23 コンポーネントの vitest-axe a11y テスト追加（別タスク）
- VitePress テーマカスタマイズ・sidebar 構成変更
- Storybook 等への乗り換え
- アプリ側 `web-label-print` の依存置換

---

## 3. 機能要件 (Functional Requirements)

### F1. ドキュメントファイル

- **FR-1.1** 25 ファイルすべてが `apps/docs/components/<slug>.md` に存在し、既存の TODO スタブを **上書き** する
- **FR-1.2** 各ファイルは `# <ComponentName>` で始まる
- **FR-1.3** 各ファイル冒頭に `<script setup>` ブロックで `Dads<Name>` を `@dads/vue` から import すること

### F2. デモ構造 (Button.md と同等の深さ)

各ファイルは以下のセクションをこの順で含む（コンポーネントに該当しないセクションは省略可）:

1. **見出し + 1〜2 行の概要**
2. **基本** — 最小利用例 + reactive demo (`<div class="demo">`)
3. **API バリアント別セクション** — `variant` / `type` / `size` / `color` 等が props にあれば必ずデモを置く
4. **状態** — `disabled` / `loading` / `error` / `required` / `readonly` 等
5. **アイコン / Slot** — 該当する場合
6. **Props テーブル** — types.ts から拾った **全 props** を網羅
7. **Events テーブル** — types.ts の `*Emits` interface から **全 events** を網羅
8. **アクセシビリティ** — aria-\* 属性・キーボード操作の要点 (DadsButton README 同様 3〜5 項目)

### F3. コード品質

- **FR-3.1** `pnpm format:check` がクリーン (`prettier --check` 違反 0 件)
- **FR-3.2** `pnpm --filter @dads/docs build` が成功し、25 ファイル分の `dist/components/<slug>.html` が生成される
- **FR-3.3** ビルド時の Vue compile error / VitePress 警告 が 0 件
- **FR-3.4** ESLint 対象外（`apps/docs/components/*.md` は lint scope に含まれない / 既存設定維持）

### F4. NFR-1 (移植忠実度) の遵守

- **FR-4.1** デモ内の `<DadsX>` 利用は移行元コンポーネントの **公開 API のみ** を使う（types.ts に無い prop を渡さない）
- **FR-4.2** SCSS / class 名・aria 属性を改変・上書きしない（デモは外側に `<div class="demo">` ラッパのみ）
- **FR-4.3** ライブデモで使う変数名・ラベル日本語は Button.md のトーンに揃える（敬体「である」、UI ラベルは「保存」「送信」「キャンセル」等）

---

## 4. 非機能要件 (Non-Functional Requirements)

- **NFR-1**: 各ファイル **150〜250 行** を目安とする (Button.md = 149 行を参考)。300 行を超える場合はオーバースペック疑いで sub-agent に確認する
- **NFR-2**: 1 wave あたりの所要時間 **15 分以内** (sub-agent spin-up 込み)、全 5 wave で **90 分以内**完走
- **NFR-3**: sub-agent は `general-purpose` を採用。`frontend-impl` 等の skill 起動はしない (skill 読み込みオーバーヘッド回避)
- **NFR-4**: 各 sub-agent は **1 コンポーネント = 1 タスク**。1 agent に複数件を渡さない (失敗時の切り分け容易性 / 出力長制限の回避)

---

## 5. 受入基準 (Acceptance Criteria)

スペック完了時、以下がすべて満たされていること:

- [ ] **AC-1** `apps/docs/components/` 配下に 26 ファイル (`button.md` 含む) があり、全て TODO スタブの体を脱している
  - 検証: `grep -L "TODO" apps/docs/components/*.md | wc -l` が 26
- [ ] **AC-2** 各ファイルが `<script setup>` ブロックで対応する `Dads<Name>` を import している
- [ ] **AC-3** 各ファイルが Props テーブル (`| Prop | 型 | デフォルト | 説明 |`) を 1 つ以上含む
- [ ] **AC-4** `pnpm format:check` 0 件
- [ ] **AC-5** `pnpm --filter @dads/docs build` 成功 + 27 HTML ページ生成 (index + 26 components)
- [ ] **AC-6** ビルド時に Vue compile error / 警告 0 件
- [ ] **AC-7** `pnpm typecheck` / `pnpm lint` / `pnpm test` の Phase 8 時点グリーン状態を維持 (regression なし)
- [ ] **AC-8** タスクリスト末尾に 25 件すべての PR 相当のコミット (or 1 wave 単位) が記録される

---

## 6. リスク・前提

| ID  | 内容                                                                              | 影響   | 対策                                                                                   |
| --- | --------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------- |
| R-1 | sub-agent が types.ts に無い prop をデモで使う                                    | High   | 各 brief に「types.ts を **唯一の真実**として props を網羅 / 推測禁止」を明記          |
| R-2 | sub-agent が `dads-*` CSS クラスや SCSS を改変                                    | High   | brief に「component 実装には触らない / `apps/docs/components/<slug>.md` のみ編集」明記 |
| R-3 | VitePress の SFC コンパイル失敗 (Vue 構文ミス)                                    | Medium | wave 完了後に必ず `pnpm --filter @dads/docs build` で検証                              |
| R-4 | Tooltip / Modal / Drawer 等 portal/teleport を使う component のデモが描画されない | Medium | brief に「Modal/Tooltip/Drawer は `v-model` で開閉する `ref` を用意」と例示            |
| R-5 | 並列 sub-agent の出力スタイル不一致 (Props 表の列順・絵文字使用など)              | Low    | brief に Button.md のテーブル列順・トーンを明示                                        |
| R-6 | 既存 Button.md を sub-agent が誤って上書き                                        | Low    | brief で出力先パスを明示 / Button.md は対象外                                          |

### 前提

- Phase 0〜8 で構築済の monorepo を **そのまま利用** (依存追加なし)
- `packages/vue/` の現在の実装が真実 — sub-agent はここを読み取り専用で参照
- `apps/docs/components/button.md` は **触らない**（テンプレ参照源）

---

## 7. 参考資料

- テンプレ: `apps/docs/components/button.md`
- 型ソース: `packages/vue/src/components/<Name>/Dads<Name>.types.ts`
- 既存テスト: `packages/vue/src/components/<Name>/__tests__/Dads<Name>.test.ts` (挙動の参考)
- 仕様 MD: `dads-document-md/dads/components/<name>/index.md` (DADS 公式仕様 / 補足参考)

---

## 8. 次フェーズへの引き継ぎ

承認後に `design.md` (sub-agent ブリーフ設計) と `tasklist.md` (5 wave 分割) を続けて作成する。
