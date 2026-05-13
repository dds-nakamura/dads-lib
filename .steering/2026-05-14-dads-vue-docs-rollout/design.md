# Design — DADS Vue カタログ全コンポーネントデモ整備

- Spec ID: `2026-05-14-dads-vue-docs-rollout`
- Depends on: `./requirements.md`
- Status: **Done** (2026-05-14 完了)
- Last Updated: 2026-05-14

---

## 1. 目的

requirements.md の F1〜F4 を、**sub-agent 並列実行**で 90 分以内に達成する技術設計を確定する。

---

## 2. 全体アプローチ

```
┌───────────────────────────────────────────────────────────────────┐
│  Main Agent (本セッション)                                         │
│  ・spec ドキュメント生成                                           │
│  ・wave ごとに sub-agent を spawn                                   │
│  ・wave 完了後に format:check + docs build で検証                   │
│  ・タスクリストにチェックを入れて user に承認を求める               │
└───────────────────────────────────────────────────────────────────┘
                                │
            ┌───────────────────┼────────────────────┬─────────────┐
            ▼                   ▼                    ▼             ▼
   ┌──────────────┐  ┌──────────────┐    ┌──────────────┐  (5 並列)
   │ sub-agent #1 │  │ sub-agent #2 │... │ sub-agent #5 │
   │ TextField    │  │ Textarea     │    │ Radio        │
   │ → MD 1 file  │  │ → MD 1 file  │    │ → MD 1 file  │
   └──────────────┘  └──────────────┘    └──────────────┘
```

### 2.1 1 sub-agent = 1 コンポーネント の理由

- 出力長制限 (1 brief = 1 ファイル = ~250 行 = sub-agent 出力上限内)
- 失敗時の切り分けが容易
- agent 1 つあたりの context が軽く済む → 並列度を 5 まで上げられる

### 2.2 並列度 5 の理由

- Claude harness の同時実行は実用上 5 程度が安定
- 1 wave あたり 5〜6 件で揃えるとスケジューリングが綺麗

---

## 3. Wave 分割 (5 wave)

| Wave | カテゴリ       | 件数 | コンポーネント                                               |
| ---- | -------------- | ---- | ------------------------------------------------------------ |
| 1    | **Form-A**     | 5    | TextField, Textarea, Select, Checkbox, Radio                 |
| 2    | **Form-B**     | 5    | CheckboxGroup, RadioGroup, FileUpload, Combobox, ColorPicker |
| 3    | **Navigation** | 5    | Header, Drawer, Breadcrumb, StepNavigation, Tab              |
| 4    | **Feedback**   | 4    | NotificationBanner, Modal, Tooltip, ProgressIndicator        |
| 5    | **Display**    | 6    | Card, Heading, Divider, Table, Accordion, Chip               |

意図的に **似た性質のコンポーネントを 1 wave にまとめる** ことで、user レビュー時の比較も容易にする。

---

## 4. Sub-agent ブリーフ・テンプレート (重要)

各 sub-agent には以下のテンプレを **そのまま** 渡す（変数部分のみ置換）。

### 4.1 テンプレート本体

```text
You are writing the VitePress live-demo page for Dads<NAME> component
in the dads-lib monorepo.

## Your output

Replace the file at:
apps/docs/components/<SLUG>.md

This file currently contains a TODO stub. Overwrite it completely with a
full demo, mirroring the structure and tone of the existing template:
apps/docs/components/button.md ← READ THIS FIRST, it's your model

## Source of truth

The ONLY authoritative source for props / events is:
packages/vue/src/components/<NAME>/Dads<NAME>.types.ts

Read it carefully. Do not invent props or events. Every prop in the
interface must appear in your Props table. Every event in the *Emits
interface must appear in your Events table.

For slot names and component behavior, also read:
packages/vue/src/components/<NAME>/Dads<NAME>.vue

For correct usage patterns, you MAY consult:
packages/vue/src/components/<NAME>/__tests__/Dads<NAME>.test.ts

## Required sections (in this order)

1. `# <NAME>` heading + 1-2 line description (Japanese)
2. `## 基本` — minimal usage + live demo with `<script setup>`
3. API variant sections (`## Variant`, `## Size`, `## Type` etc. — only the
   ones that exist as props in types.ts)
4. `## 状態` — disabled / loading / error / required / readonly as applicable
5. `## アイコン` / `## Slot` — when applicable
6. `## Props` — Markdown table with ALL props from types.ts:
   | Prop | 型 | デフォルト | 説明 |
7. `## Events` — Markdown table with ALL events from \*Emits interface:
   | Event | Payload | 説明 |
8. `## アクセシビリティ` — 3-5 bullet points about aria-\*, keyboard, focus

## Code rules

- `<script setup>` at the top, `<style>` blocks NOT allowed (use only
  `<div class="demo">` / `<div class="demo-row">` / `<span class="demo-label">`
  which are pre-defined in apps/docs/.vitepress/theme/custom.css)
- Wrap each live demo in `<div class="demo">`
- Multiple side-by-side items: nest `<div class="demo-row">`
- Japanese labels in UI strings (保存 / 送信 / キャンセル etc.)
- No emojis
- For Modal / Tooltip / Drawer (portal/teleport): show open/close with a
  trigger button + `const open = ref(false)`
- Don't touch ANY file outside `apps/docs/components/<SLUG>.md`
- Do NOT modify the component implementation, types, tests, or styles
- Match Button.md's tone, comment style, and table column order exactly

## Length target

150-250 lines. Button.md is ~149 lines as a reference.

## When done

Output a one-sentence summary of what you wrote (e.g. "Wrote text-field.md
with 8 sections, 19 props, 4 events"). Nothing else.
```

### 4.2 変数置換ルール

| プレースホルダ | 例: TextField |
| -------------- | ------------- |
| `<NAME>`       | `TextField`   |
| `<SLUG>`       | `text-field`  |

### 4.3 sub-agent 呼び出しパラメータ

```ts
Agent({
  description: "<NAME> demo page",        // 例: "TextField demo page"
  subagent_type: "general-purpose",
  prompt: <上記テンプレ to NAME/SLUG 置換>,
})
```

並列実行: 1 メッセージ内で複数 `Agent({...})` 呼び出しを **同時** に行う。

---

## 5. 検証ループ (wave 完了後)

各 wave のすべての sub-agent が完了した直後に、main agent が以下を順に実行:

```bash
# 1. format 違反確認 (sub-agent が prettier 規約に従わなかった場合の自動修復)
pnpm exec prettier --write apps/docs/components/

# 2. format クリーン再確認
pnpm -w run format:check

# 3. VitePress ビルド成功確認 (Vue 構文エラー検知)
pnpm --filter @dads/docs build

# 4. 該当 wave の MD ファイルが TODO スタブから脱しているか確認
grep -L 'TODO' apps/docs/components/{file1,file2,...}.md | wc -l   # 期待値 = wave 件数

# 5. 該当 wave の dist/components/*.html に DOM が生成されているか
for slug in <wave_slugs>; do
  grep -c 'class="dads-' apps/docs/.vitepress/dist/components/${slug}.html
done
```

すべて pass したら wave 完了として **user 承認を取りに行く**。

---

## 6. コミット戦略

- **1 wave = 1 コミット** (wave 完了 + 検証 + user 承認後)
- コミットメッセージ規約: `docs(apps/docs): add <category> component demos (Wave N)`
- 例:
  - `docs(apps/docs): add Form-A component demos (Wave 1)`
  - `docs(apps/docs): add Form-B component demos (Wave 2)`
  - `docs(apps/docs): add Navigation component demos (Wave 3)`
  - `docs(apps/docs): add Feedback component demos (Wave 4)`
  - `docs(apps/docs): add Display component demos (Wave 5)`

最終 wave 後に **総まとめコミット** (tasklist 更新 + README 更新があれば) を入れる。

---

## 7. ロールバック・リスク対策

| リスク                                          | 検知                            | 対策                                                                          |
| ----------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------- |
| sub-agent が types.ts に無い prop を使った      | docs build 時の Vue warning     | wave 終了後の手動 grep、または `pnpm typecheck` (template の prop 型検証)     |
| Modal/Tooltip 等のデモが正しく開かない          | dev server で目視 / build SSR   | sub-agent brief に `ref(false)` パターンを必須テンプレ化済                    |
| 並列 sub-agent 同士の出力スタイル不一致         | wave 内ファイルの diff レビュー | brief で Button.md を model 指定 / wave 終了後に main agent が一斉整形        |
| sub-agent が button.md を上書きしてしまう       | git diff で検知                 | brief に「button.md は対象外」と明記、また出力先パスをスラッグで縛る          |
| sub-agent が `apps/docs/components/` 以外を編集 | git diff で検知                 | brief に「touch ANY file outside ... 禁止」を明記 / wave 終了後 git diff 確認 |

---

## 8. 完了判定 (受入基準との対応)

| AC                                         | 関連設計章  |
| ------------------------------------------ | ----------- |
| AC-1 TODO スタブ脱却                       | §5 検証 4   |
| AC-2 `<script setup>` で Dads<Name> import | §4 brief    |
| AC-3 Props テーブル必須                    | §4 brief    |
| AC-4 `pnpm format:check` 0 件              | §5 検証 1-2 |
| AC-5 `docs build` 成功 + 27 HTML 生成      | §5 検証 3   |
| AC-6 Vue compile error / 警告 0 件         | §5 検証 3   |
| AC-7 Phase 8 quality gates 維持            | §5 検証拡張 |
| AC-8 wave 単位コミット記録                 | §6 コミット |

---

## 9. 次フェーズ

承認後に `tasklist.md` を生成。Wave 1〜5 の具体的な sub-agent 呼び出しと検証コマンドを列挙する。
