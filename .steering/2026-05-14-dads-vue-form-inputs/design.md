# Design — DADS Vue Form-Inputs 追加実装 (Spec 1/3)

- Spec ID: `2026-05-14-dads-vue-form-inputs`
- Depends on: `./requirements.md`
- Status: Draft（承認待ち）
- Last Updated: 2026-05-14

---

## 1. 目的

requirements.md の F1〜F6 を、**sub-agent 並列実行**で達成する技術設計を確定する。1 sub-agent = 1 コンポーネント = 4〜6 ファイル作成。

---

## 2. 全体アプローチ

```
┌───────────────────────────────────────────────────────────────────┐
│  Main Agent                                                        │
│  ・spec ドキュメント生成                                            │
│  ・wave 内で 5 sub-agent を並列起動                                 │
│  ・wave 後に typecheck / lint / test / docs build で検証            │
│  ・問題があれば sub-agent に再依頼                                  │
│  ・user 承認後にコミット                                            │
└───────────────────────────────────────────────────────────────────┘
                                │
            ┌───────────────────┼────────────────────┬─────────────┐
            ▼                   ▼                    ▼             ▼
   ┌──────────────┐  ┌──────────────┐    ┌──────────────┐  (5 並列)
   │ sub-agent #1 │  │ sub-agent #2 │... │ sub-agent #5 │
   │ DatePicker   │  │ SearchBox    │    │ Language…    │
   │ → 6+ files   │  │ → 4 files    │    │ → 5 files    │
   └──────────────┘  └──────────────┘    └──────────────┘
```

### 2.1 1 sub-agent = 1 コンポーネント の理由

- 1 コンポーネントの実装は **types / vue / index / tests / demo MD** を含めると 4〜6 ファイルになり、agent 出力の妥当範囲
- 失敗時の切り分けが容易 (依存無し)
- agent context が軽い

### 2.2 並列度 5 の根拠

- docs rollout で 5〜6 並列が安定動作した実績
- Form-Inputs は 5 件なので 1 wave で完結

---

## 3. Wave 分割

| Wave  | 件数 | コンポーネント                                                       |
| ----- | ---- | -------------------------------------------------------------------- |
| **1** | 5    | DatePicker, SearchBox, Disclosure, DescriptionList, LanguageSelector |

すべて Form 系で互いに独立。**1 wave 完結**で進める。

---

## 4. Sub-agent ブリーフ・テンプレート

各 sub-agent には以下のテンプレを **そのまま** 渡す（変数部分のみ置換）。

### 4.1 テンプレート本体

```text
You are implementing the Dads<NAME> component for @dads/vue
in the dads-lib monorepo at /Users/nakamura_kouji/git/dads-lib.

## Your output (5 files to write/edit, scoped to this component)

1. NEW: packages/vue/src/components/<NAME>/Dads<NAME>.types.ts
2. NEW: packages/vue/src/components/<NAME>/Dads<NAME>.vue
3. NEW: packages/vue/src/components/<NAME>/index.ts
4. NEW: packages/vue/src/components/<NAME>/__tests__/Dads<NAME>.test.ts
5. NEW: apps/docs/components/<SLUG>.md

You MUST NOT modify any file outside the above paths.
Do NOT touch packages/vue/src/index.ts — the main agent will append the export.
Do NOT touch apps/docs/.vitepress/config.ts — the main agent will append to sidebar.

## Source of truth (read in this order)

### 1. Official DADS spec (REQUIRED reading)
dads-document-md/dads/components/<SLUG>/index.md

### 2. HTML reference implementation (if exists, REQUIRED if exists)
design-system-example-components-html/src/components/<SLUG>/
  → contains the canonical HTML / CSS / class names / aria attributes.
  Replicate the DOM structure and class names faithfully.

### 3. Existing component patterns (REQUIRED reading)
Read at least 2 existing components to match the API conventions:
- packages/vue/src/components/TextField/   (form-control pattern)
- packages/vue/src/components/Accordion/   (toggle/expanded pattern)
- packages/vue/src/components/Combobox/    (interactive form with options)
Match their naming: `modelValue`, `disabled`, `error`, `hint`, `label`, `size`, etc.

### 4. Tests for reference
packages/vue/src/components/TextField/__tests__/DadsTextField.test.ts
Match its test structure (15+ test cases, describe blocks for render/props/events/a11y).

### 5. Tokens
packages/tokens/src/   → CSS variables to use in SCSS.
NEVER hardcode colors or spacing — always use `var(--color-...)` etc.

## API design rules

- `<script setup lang="ts">` with `defineProps<DadsXProps>()` and
  `defineEmits<DadsXEmits>()`
- All props documented with JSDoc
- Default values via `withDefaults(defineProps<...>(), { ... })`
- v-model: `modelValue` prop + `update:modelValue` emit
- Size: only when supported, use `'lg' | 'md' | 'sm'` (no `xs` unless TextField allows)
- a11y: label/error/hint wiring with aria-describedby and aria-invalid

## SCSS rules

- `<style lang="scss" scoped>`
- Class name root: `.dads-<slug>` (kebab-case)
- Use design tokens: `var(--color-primary-...)` `var(--spacing-...)` `var(--font-size-...)`
- Inherit shared base if appropriate: `@use '../../styles/base';`

## Test rules

- vitest + @vue/test-utils + happy-dom (already configured in
  packages/vue/test/setup.ts)
- 15+ tests minimum, organized in `describe` blocks:
  - render: 基本レンダリング
  - props: 各 prop の効果
  - events: emit 検証
  - keyboard: キーボード操作 (該当する場合)
  - a11y: aria-* / role 属性
- Do NOT add vitest-axe — separate task

## Demo MD rules

Mirror apps/docs/components/button.md — same structure:
1. `# <NAME>` heading + 1-2 line 概要
2. `## 基本` — live demo with `<script setup>` using `ref` + v-model
3. variant / size / state sections as applicable
4. `## Props` table (all props from types.ts)
5. `## Events` table (all events from *Emits)
6. `## アクセシビリティ` — 3-5 bullets

Use `<div class="demo">` / `<div class="demo-row">` wrappers (custom.css already loaded).

## Quality gates (sub-agent must self-verify before reporting done)

Before reporting done, run from the dads-lib root:
1. `pnpm --filter @dads/vue typecheck` → must pass for your component
2. `pnpm --filter @dads/vue test packages/vue/src/components/<NAME>/` → all your tests pass

(Do NOT run lint / format / docs build — main agent runs those after the wave.)

## When done

Output a one-line summary:
"Wrote Dads<NAME>: <X> props, <Y> events, <Z> tests."
Nothing else.
```

### 4.2 変数置換ルール (Wave 1 components)

| sub-agent | NAME             | SLUG              |
| --------- | ---------------- | ----------------- |
| #1        | DatePicker       | date-picker       |
| #2        | SearchBox        | search-box        |
| #3        | Disclosure       | disclosure        |
| #4        | DescriptionList  | description-list  |
| #5        | LanguageSelector | language-selector |

---

## 5. 検証ループ (wave 完了後)

各 wave のすべての sub-agent が完了した直後に、main agent が以下を順に実行:

```bash
# 1. main agent が packages/vue/src/index.ts に 5 件の export を追記
# 2. main agent が apps/docs/.vitepress/config.ts の Form sidebar に 5 件追加

# 3. quality gates 一括
pnpm exec prettier --write packages/vue/src/components/{DatePicker,SearchBox,Disclosure,DescriptionList,LanguageSelector}/ \
  apps/docs/components/{date-picker,search-box,disclosure,description-list,language-selector}.md
pnpm -w run format:check
pnpm -w run lint
pnpm -w run typecheck
pnpm --filter @dads/vue test                  # 974+ tests
pnpm --filter @dads/docs build                # dist/components/*.html 31 件

# 4. 公式仕様照合 (sample spot check)
diff -u dads-document-md/dads/components/date-picker/index.md ...  # 目視
```

すべて pass したら **user 承認** を取りに行く。

---

## 6. コミット戦略

選択肢を提示:

- **A. 1 wave = 1 コミット** (推奨)
  - `feat(@dads/vue): add Form-Inputs components (Wave 1) — DatePicker / SearchBox / Disclosure / DescriptionList / LanguageSelector`
- **B. コンポーネント別コミット** (review しやすいが 5 コミット)
  - `feat(@dads/vue): add DadsDatePicker` × 5

推奨は A (まとめて 1 コミット)。

---

## 7. ロールバック・リスク対策

| リスク                                                | 検知                            | 対策                                                                               |
| ----------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| sub-agent が API 命名規則を破壊                       | typecheck error / lint warning  | brief に「既存 TextField / Accordion を参考に」明記 + main agent が review         |
| DatePicker が肥大化 (内部 Calendar が複雑)            | テスト件数 50+ / vue file 800行 | sub-agent に「200 行を目安、超えそうなら calendar 例から流用」を伝える             |
| sub-agent が `packages/vue/src/index.ts` を勝手に編集 | git diff で検知                 | brief で禁止明記 / main agent が手動で追記                                         |
| `apps/docs/.vitepress/config.ts` の sidebar が壊れる  | docs build error                | brief で禁止明記 / main agent が手動で追記                                         |
| 公式仕様 MD が薄い (description-list は記載少ない)    | 設計判断が必要                  | brief で「公式 MD で不明な箇所は標準 HTML 仕様 (`<dl>`/`<dt>`/`<dd>`) を採用」明記 |

---

## 8. 完了判定 (受入基準との対応)

| AC                         | 関連設計章          |
| -------------------------- | ------------------- |
| AC-1 5 ディレクトリ存在    | §4 brief 出力 1〜4  |
| AC-2 src/index.ts 追記     | §5 main agent step  |
| AC-3 974+ tests pass       | §5 検証 step 3      |
| AC-4 typecheck/lint/format | §5 検証 step 3      |
| AC-5 sidebar 追記          | §5 main agent step  |
| AC-6 demo MD 5 件          | §4 brief 出力 5     |
| AC-7 docs build 31 HTML    | §5 検証 step 3      |
| AC-8 公式仕様準拠          | §4 brief source 1-2 |
| AC-9 コミット記録          | §6                  |

---

## 9. 次フェーズ

承認後に `tasklist.md` を生成し、Wave 1 の sub-agent 呼び出しと検証コマンドを列挙する。
