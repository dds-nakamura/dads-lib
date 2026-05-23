# ドキュメントサイト (VitePress) 構築ガイド

`apps/docs/` (`@dads/docs`) は `@dads/vue` の 26 コンポーネントを実機デモ付きで参照できる VitePress カタログである。本ドキュメントは、その設計・構成・運用・拡充計画を集約した永続ガイドである。

## 目的

- `@dads/vue` の全コンポーネントを **live demo + Props/Events テーブル + アクセシビリティ要点** という統一フォーマットで提示する。
- 仕様の単一の真実の源は `packages/vue/src/components/<Name>/Dads<Name>.types.ts`。ドキュメントはこれを忠実に反映する。
- 新規アプリ開発者が「どの prop を渡せばよいか」「どんな挙動になるか」を **HTML を起動せずに** ローカルで確認できる開発体験を提供する。
- DADS デザイントークン (`@dads/tokens`) と Vue コンポーネントスタイル (`@dads/vue/styles`) を **そのまま** 読み込み、本番アプリと同じビジュアルで描画する。

## ディレクトリ構成

```
apps/docs/                              @dads/docs (private VitePress package)
├── .vitepress/
│   ├── config.ts                       sidebar / nav / title / base 定義
│   └── theme/
│       ├── index.ts                    tokens.css + vue/styles を global load
│       └── custom.css                  デモ専用ユーティリティクラス (.demo / .demo-row / .demo-label)
├── components/                         26 ファイル: button.md + 25 件
│   ├── button.md                       テンプレ参照源 (~149 行)
│   ├── text-field.md
│   ├── ...
│   └── chip.md
├── index.md                            ホーム
├── package.json                        @dads/docs (private)
└── README.md
```

- ESLint scope に `apps/docs/components/*.md` は含めない（既存設定維持）。
- `apps/docs/components/button.md` は **全ページの構造テンプレ**。トーン・テーブル列順・コメントスタイルを揃える基準になる。

## VitePress 設定

### sidebar / nav

- `nav`: `Components` 1 項目 (`/components/button` を起点)。
- `sidebar`: `/components/` に対して 5 カテゴリでグルーピング:
  - **Form-A**: TextField / Textarea / Select / Checkbox / Radio
  - **Form-B**: CheckboxGroup / RadioGroup / FileUpload / Combobox / ColorPicker
  - **Navigation**: Header / Drawer / Breadcrumb / StepNavigation / Tab
  - **Feedback**: NotificationBanner / Modal / Tooltip / ProgressIndicator
  - **Display**: Button / Card / Heading / Divider / Table / Accordion / Chip
- カテゴリ分割は `tasklist.md` の Wave 構成と一致させ、レビュー時の比較容易性を確保する。

### theme (tokens + styles)

`.vitepress/theme/index.ts` で以下を **必ずこの順** で読み込む:

```ts
import DefaultTheme from 'vitepress/theme'
import '@dads/tokens/css'      // 1. CSS 変数 (--ds-*) を :root に注入
import '@dads/vue/styles'      // 2. 全コンポーネントの CSS
import './custom.css'          // 3. デモ専用クラス (.demo / .demo-row / .demo-label)
export default DefaultTheme
```

- カスタムテーマ拡張・色上書きはしない。アプリ実装と同じビジュアルで描画することが目的。
- `custom.css` は **ラッパクラスのみ** を提供し、コンポーネント本体の SCSS / class 名 / aria 属性を改変してはいけない。

## コンポーネントページ構成

各 `apps/docs/components/<slug>.md` は **150〜250 行** を目安に以下の構造を守る (Button.md = 149 行が下限の参考値)。

1. `# <Name>` 見出し + 1〜2 行の概要 (日本語)
2. `## 基本` — 最小利用例 + `<div class="demo">` でラップした reactive live demo
3. **API バリアント別セクション** — `variant` / `type` / `size` / `color` 等が props にあれば必ずデモ
4. `## 状態` — `disabled` / `loading` / `error` / `required` / `readonly` 等
5. `## アイコン` / `## Slot` — 該当する場合
6. `## Props` — types.ts の **全 props** を網羅
   ```md
   | Prop | 型 | デフォルト | 説明 |
   ```
7. `## Events` — types.ts の `*Emits` interface の **全 events** を網羅
   ```md
   | Event | Payload | 説明 |
   ```
8. `## アクセシビリティ` — aria-\* 属性 / キーボード操作 / フォーカス管理を 3〜5 項目

### コードルール

- 冒頭に `<script setup lang="ts">` で `import { Dads<Name> } from '@dads/vue'`。
- `<style>` ブロックは禁止。`.demo` / `.demo-row` / `.demo-label` のみ使用。
- 横並び表示は `<div class="demo-row">` をネスト。
- UI ラベルは日本語 (保存 / 送信 / キャンセル 等)。絵文字は使わない。
- Modal / Tooltip / Drawer など portal/teleport を使うコンポーネントは `const open = ref(false)` + トリガボタンで開閉。
- 公開 API (types.ts) に **無い prop / event を使わない**。SCSS / class 名 / aria 属性を改変しない。

## ローカル開発

```bash
# 開発サーバ (HMR)
pnpm --filter @dads/docs dev

# プロダクションビルド (SSG → apps/docs/.vitepress/dist/)
pnpm --filter @dads/docs build

# プレビュー (built site)
pnpm --filter @dads/docs preview
```

### ページ追加 / 編集の検証フロー

```bash
# 1. Prettier 自動整形
pnpm exec prettier --write apps/docs/components/

# 2. format クリーン確認
pnpm -w run format:check

# 3. VitePress ビルド成功確認 (Vue compile error 検知)
pnpm --filter @dads/docs build

# 4. TODO スタブ脱却確認
grep -L 'TODO' apps/docs/components/*.md | wc -l   # 期待値 26

# 5. dist HTML に DOM が出ているか
grep -c 'class="dads-' apps/docs/.vitepress/dist/components/<slug>.html
```

### 品質ゲート (リポジトリ共通)

ページ追加で既存ゲートを退行させない:

```bash
pnpm -w run format:check
pnpm -w run lint
pnpm -w run typecheck
pnpm --filter @dads/vue test       # 899 tests
pnpm --filter @dads/docs build     # 27 HTML (index + 26 components)
```

## 拡充計画

### 現状 (完了済)

`button.md` をテンプレに、25 件のスタブを **5 wave × 5 並列 sub-agent** で順次フルデモ化済。Form-A → Form-B → Navigation → Feedback → Display の 5 ステップで完成 (26 ページ揃い)。

| Wave | カテゴリ   | 件数 | コンポーネント                                               |
| ---- | ---------- | ---- | ------------------------------------------------------------ |
| 1    | Form-A     | 5    | TextField, Textarea, Select, Checkbox, Radio                 |
| 2    | Form-B     | 5    | CheckboxGroup, RadioGroup, FileUpload, Combobox, ColorPicker |
| 3    | Navigation | 5    | Header, Drawer, Breadcrumb, StepNavigation, Tab              |
| 4    | Feedback   | 4    | NotificationBanner, Modal, Tooltip, ProgressIndicator        |
| 5    | Display    | 6    | Card, Heading, Divider, Table, Accordion, Chip               |

### 新コンポーネント追加時の運用

1. `packages/vue/src/components/<Name>/Dads<Name>.types.ts` で props / events を確定する。
2. `apps/docs/components/<slug>.md` を `button.md` をコピーして作成し、構造とトーンを合わせる。
3. types.ts から **全** props / events を Props / Events テーブルに書き写す。**推測した prop を書かない**。
4. sidebar (`/.vitepress/config.ts`) のカテゴリに追加。
5. 上記「ページ追加 / 編集の検証フロー」をすべて pass させる。
6. コミット規約: `docs(apps/docs): add <Name> component demo`。

### sub-agent 並列実装のテンプレ (再利用可)

カタログ全置換のような一括作業では、以下の制約を **必ず** brief に明記する:

- 出力先は `apps/docs/components/<SLUG>.md` のみ。それ以外のファイルを触らない。
- `packages/vue/src/components/<NAME>/Dads<NAME>.types.ts` を **唯一の真実** として props / events を網羅。
- `apps/docs/components/button.md` を model としてセクション順・テーブル列順・トーンを揃える。
- `<style>` ブロック禁止。`.demo` / `.demo-row` / `.demo-label` のみ使用可。
- 150〜250 行。Modal / Tooltip / Drawer は `ref(false)` トリガパターンで開閉。
- 完了時は「何セクション・何 props・何 events を書いたか」を 1 文で報告。

並列度 5 を上限とし、1 sub-agent = 1 コンポーネント = 1 ファイルで切り分ける（失敗時の局所化と出力長制限の回避）。

### よくあるトラブル

| 症状                                          | 対処                                                            |
| --------------------------------------------- | --------------------------------------------------------------- |
| sub-agent が 250 行を大幅超過                 | 冗長セクションの削除を再依頼                                    |
| `<style>` ブロックを使ってしまった            | brief 違反 → custom.css 既存クラスのみ許可で再依頼              |
| docs build で Vue compile error               | エラーログから該当ファイル特定 → 該当行を提示して再依頼         |
| button.md を上書きしてしまった                | `git checkout apps/docs/components/button.md` で即復元          |
| `packages/vue/` を改変してしまった            | `git checkout packages/vue/` で即復元                           |

## a11y 連携

- コンポーネント実装の aria-\* 属性・キーボード操作・フォーカス管理は **改変しない**。デモは `<DadsX>` を素のまま並べる。
- 各ページの `## アクセシビリティ` セクションで、対象コンポーネントの aria 属性・キーボードショートカット・フォーカス挙動を 3〜5 項目で要約する。
- vitest-axe ベースの a11y 自動テストは `packages/vue/` 側で実施 (現状 Button のみカバー、残り 25 件は別スペック対象)。
- docs サイト自体は静的 HTML 生成のため、ビルド成果物に `class="dads-"` 要素が含まれるかで DOM 生成と CSS 適用を確認する。
- DADS 公式仕様 (`dads-document-md/dads/components/<name>/index.md`) と WAI-ARIA Authoring Practices を参照源とし、ガイドが「準備中」のコンポーネントは `dads-document-figma/` のスナップショットでビジュアル仕様を補完する。
