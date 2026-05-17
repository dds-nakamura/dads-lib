# dads-lib — デジタル庁デザインシステム参照ライブラリ

このリポジトリは **新規アプリのデザインにデジタル庁デザインシステム（DADS / Digital Agency Design System）を適用するための参照資産** をまとめたものです。Claude Code はこのフォルダを「設計仕様の引き出し」として利用します。

公式サイト: <https://design.digital.go.jp/dads/>

---

## 最重要ルール（Claude Code への指示）

### 仕様参照は必ず `dads-document-md/` を優先する

- HTML (`dads-document-html/`) と Markdown (`dads-document-md/`) は **同じ公式サイトの内容** を別形式で保存したものです。
- Claude Code が仕様・ガイドライン・コンポーネント説明を読む際は **常に Markdown 側を最優先** で参照してください。
- 理由: 同一ページが HTML 128KB に対し MD 3KB と約 **40倍コンテキスト効率** が高く、CSS/script/astro 属性などのノイズがありません。
- HTML 側を使うのは以下の場合のみ:
  - 実際のレンダリング・ビジュアル確認（`start-server.sh` でローカルサーバ起動）
  - MD に欠落しているページの照合（HTML 955 ファイル / MD 90 ファイル）
  - script・style の挙動を確認したいとき

### 実装サンプルは `design-system-example-components-html/` を一次参照する

- ボタン・入力・ダイアログ等の **HTML/CSS/JS の正準実装** はここにあります。
- 新規アプリで部品を作る前に **必ずこのフォルダを `grep` / `Read` で確認** し、再発明を避けてください。
- フレームワーク非依存（プレーン HTML/CSS/JS）なので、React/Vue/Svelte/Astro いずれにも移植可能です。

### デザイントークンは `design-tokens/` を上流ソースとする

- すべての色・スペーシング・タイポグラフィ・エレベーション等の **トークン値の正本** は `design-tokens/` です（Figma → Style Dictionary でビルドされた成果物）。
- 提供形式の使い分け:
  - **プレーン CSS / 任意フレームワーク** → `design-tokens/` ビルドで生成される `tokens.css`（全トークン）または `tokens-simple.css`（色・フォント・エレベーションのみ）を読み込む
  - **Tailwind プロジェクト** → `tailwind-theme-plugin/` 経由で利用（内部で design-tokens を参照）
  - **生の JSON が必要なとき** → `design-tokens/figma/tokens.json` を直接読む
- **自前でカラーコードやスペーシング値を定義しない**。必ず上流のトークンを参照すること。

### ビジュアル仕様は `dads-document-figma/` を参照する (2026-05-17 追加)

- DADS 公式 Figma ファイルから自動エクスポートした **PNG スナップショット 42 件** が `dads-document-figma/<ページ名>/<ページ名>.png` に格納されている（gitignore 対象 / 各環境で生成）。
- 用途: 公式 MD が **「ガイドラインは準備中です」** とだけ書いてあるコンポーネント（chip-tag, tab, combobox, mega-menu, page-navigation, table-control, image, dialog 等）の**ビジュアル仕様確認**。
- `Read` ツールは PNG をマルチモーダルに直接読めるため、`dads-document-md/` だけでは不足する状態・バリエーション情報を補完できる。
- 再取得: `pnpm figma:pw-export`（事前に `pnpm figma:login` で認証保存が必要、初回 1 回）。詳細は [scripts/README.md](./scripts/README.md)。
- ファイル存在しない環境では `dads-document-md/` + WAI-ARIA Authoring Practices を真実の源とする（過去の方針どおり）。

---

## monorepo 構成 (2026-05-13 追加)

このリポジトリは **pnpm workspaces monorepo** として運用される。Vue 3 コンポーネント実装本体は `packages/vue/`、デザイン参照資産は従来どおりルート直下に置く。

| パッケージ              | パス                        | 用途                                                   |
| ----------------------- | --------------------------- | ------------------------------------------------------ |
| `@dads/vue`             | `packages/vue/`             | ★ 50 個の Vue 3 コンポーネント実装 (本体)              |
| `@dads/tokens`          | `packages/tokens/`          | `@digital-go-jp/design-tokens` の薄ラッパ              |
| `@dads/tailwind-plugin` | `packages/tailwind-plugin/` | `@digital-go-jp/tailwind-theme-plugin` の薄ラッパ (v3) |
| `@dads/docs`            | `apps/docs/`                | VitePress カタログ (26 コンポーネントの demo + API)    |

詳細仕様は `.steering/2026-05-12-dads-vue-library-init/{requirements,design,tasklist}.md` を参照。

### 新規アプリで `@dads/vue` を使うときの最短手順

```ts
// main.ts
import '@dads/tokens/css' // CSS 変数を :root に注入
import '@dads/vue/styles' // 全コンポーネントの CSS
```

```vue
<script setup lang="ts">
import { DadsButton, DadsTextField } from '@dads/vue'
</script>
```

ルート README.md と各 package の README.md にも詳細を記載。

---

## フォルダ構成と役割

```
dads-lib/
├── CLAUDE.md                              ← このファイル
├── README.md                              monorepo 概観
├── VENDORED.md                            vendor 取り込みバージョン管理
├── package.json / pnpm-workspace.yaml     monorepo ルート
├── tsconfig.base.json / tsconfig.json     TypeScript 共通設定 + solution-style references
├── eslint.config.js                       ESLint 9 flat config (ルート集約 / L3 strictness)
│
├── packages/                              ★ 配布対象パッケージ群
│   ├── vue/                               @dads/vue (Vue 3 コンポーネント本体)
│   │   ├── src/components/                26 コンポーネント (Button, TextField, Modal, ...)
│   │   ├── src/styles/                    共有 SCSS (_base, _focus-ring)
│   │   ├── src/types/                     共有型 (DadsSize, DadsSemanticColor)
│   │   └── test/                          Vitest setup (vitest-axe 登録)
│   ├── tokens/                            @dads/tokens
│   └── tailwind-plugin/                   @dads/tailwind-plugin
│
├── apps/                                  ★ プライベートアプリ
│   └── docs/                              @dads/docs (VitePress カタログ)
│       ├── .vitepress/config.ts           sidebar / nav 定義
│       ├── .vitepress/theme/              tokens + vue/styles を global load
│       ├── components/                    26 ページ (Button は full demo, 他は TODO スタブ)
│       └── index.md                       ホーム
│
├── .changeset/                            Changesets (linked: @dads/*, ignore: @dads/docs)
├── .github/workflows/ci.yml               CI (typecheck/lint/test/build × 3)
├── .steering/                             仕様ドキュメント (requirements/design/tasklist)
│
├── dads-document-md/                      ★ 仕様参照の第一候補（90 ファイル / 596KB）
│   └── dads/
│       ├── index.md                       概要・最新お知らせ
│       ├── introduction/                  デザインシステム入門
│       ├── guidance/                      導入ガイダンス
│       ├── foundations/                   基本デザイン（color/typography/spacing 等）
│       ├── components/                    47 種類の UI コンポーネント仕様
│       ├── resources/                     リソース・データ
│       ├── webaccessibility/              アクセシビリティ
│       └── updates-*/                     更新履歴
│
├── dads-document-html/                    ビジュアル確認用（955 ファイル / 51MB）
│   ├── dads/                              静的サイト本体
│   ├── start-server.sh                    ローカルサーバ起動
│   ├── stop-server.sh                     停止
│   └── status-server.sh                   状態確認
│
├── design-system-example-components-html/ ★ 実装サンプル（HTML/CSS/JS の正準実装）
│   └── src/components/                    button, input-text, dialog, ...
│
├── design-tokens/                         ★ デザイントークン上流ソース（Figma 由来）
│   ├── figma/tokens.json                  Figma からエクスポートされた生のトークン
│   ├── style-dictionary/                  ビルド設定（config.json, transform.ts）
│   └── examples/                          tokens.css 利用サンプル（plain HTML/CSS）
│
├── dads-document-figma/                   ★ Figma スナップショット（gitignore / 各環境で生成）
│   ├── <ページ名>/<ページ名>.png            42 件: Foundation / 各コンポーネントのビジュアル仕様
│   └── playwright-manifest.json           fileKey / exportedAt / ページ一覧
│
├── scripts/                               リポジトリ運用ユーティリティ
│   ├── figma-export.mjs                   Figma REST API 経由のエクスポート
│   ├── figma-login.mjs                    Playwright 用認証取得 (1 回だけ実行)
│   ├── figma-playwright-export.mjs        Playwright 経由のエクスポート (rate limit 回避)
│   └── README.md                          スクリプトの使い方詳細
│
└── tailwind-theme-plugin/                 ★ Tailwind 用デザイントークンプラグイン
    ├── examples/                          v3 サンプル
    └── examples-v4/                       v4 サンプル                   （内部で design-tokens を参照）
```

---

## Foundations（基本デザイン）

`dads-document-md/dads/foundations/` 配下:

- `color/` — カラーパレット・セマンティックカラー
- `typography/` — フォント・サイズ・行間
- `spacing/` — 余白の段階
- `corner-shapes/` — 角丸
- `elevation/` — 影・重なり
- `icon/` — アイコン使用ガイド
- `layout/` — レイアウトグリッド
- `link-text/` — リンクテキスト規約

新規アプリのデザイントークン設定時は、まずこの 8 項目を読んでから実装してください。

---

## Components（47 種類）

`dads-document-md/dads/components/` 配下にすべての仕様が Markdown で揃っています。主要カテゴリ:

- **入力系**: button, checkbox, radio, input-text, textarea, select, combobox, date-picker, file-upload, search-box
- **ナビゲーション系**: breadcrumb, page-navigation, step-navigation, tab, global-menu, mega-menu, mobile-menu, drawer, hamburger-menu-button, header-container, bottom-navigation, scroll-top-button
- **表示系**: card, list, table, table-control, description-list, resource-list, heading, blockquote, divider, image, image-slider, carousel
- **フィードバック系**: dialog, notification-banner, emergency-banner, progress-indicator
- **その他**: accordion, disclosure, chip-label, chip-tag, language-selector, menu-list, menu-list-box, utility-link

各コンポーネントは `components/{name}/index.md` に仕様・使用ガイドライン・アクセシビリティ要件が記載されています。

---

## 新規アプリ作成時の Claude Code ワークフロー

1. **要件確認**: ユーザーが作りたいアプリの種類・対象ユーザー（行政/地方自治体/公共性の高い組織か）を確認。
2. **Foundations 読み込み**: `dads-document-md/dads/foundations/index.md` と関連項目を Read。
3. **必要コンポーネントの特定**: 画面要件から必要な UI 部品を列挙。
4. **仕様確認**: `dads-document-md/dads/components/{name}/index.md` を一括 Read で読む（軽量なので 5〜10 個並列で読める）。
5. **実装方式の選択**:
   - **プレーン HTML/CSS/JS** → `design-system-example-components-html/src/components/{name}/` を流用 + `design-tokens/` の `tokens.css` を読み込む
   - **Tailwind ベース** → `@digital-go-jp/tailwind-theme-plugin` を入れて、example をクラス置換で再現
   - **React/Vue 等** → example の HTML 構造とクラス名を保持しつつコンポーネント化（CSS は tokens.css または Tailwind プラグイン経由）
   - **任意のトークン値を確認したい** → `design-tokens/figma/tokens.json` を直接 grep / Read
6. **アクセシビリティ確認**: `dads-document-md/dads/webaccessibility/index.md` の要件を満たしているか確認。
7. **実機確認**: 必要なら HTML 側のローカルサーバ（`dads-document-html/start-server.sh`）で正しい見た目と比較。
8. **ビジュアル仕様の補完**: MD が「準備中」のコンポーネントは `dads-document-figma/<ページ名>/` の PNG を `Read` してビジュアル仕様を取得（環境に存在する場合のみ）。

---

## やってはいけないこと（Anti-patterns）

- ❌ HTML 版を読んでコンテキストを浪費する（MD 版があるのに）
- ❌ DADS にあるコンポーネントを自前で再実装する（example を必ずチェック）
- ❌ カラーコード・スペーシング値を直接書く（`design-tokens/` のトークン or Tailwind プラグイン経由で参照）
- ❌ 公式が定義していないカラー・スペーシング値を独自に追加する
- ❌ アクセシビリティ要件をスキップする（このシステムの中核価値）

---

## 参考リンク

- 公式サイト: <https://design.digital.go.jp/dads/>
- HTML 版サンプル Storybook: <https://design.digital.go.jp/dads/html/>
- Figma Community（デザインデータ）: <https://www.figma.com/community/file/1255349027535859598>
- GitHub (example): <https://github.com/digital-go-jp/design-system-example-components-html>
- GitHub (Tailwind plugin): <https://github.com/digital-go-jp/tailwind-theme-plugin>
- GitHub (Design Tokens): <https://github.com/digital-go-jp/design-tokens>
- npm (Tailwind plugin): <https://www.npmjs.com/package/@digital-go-jp/tailwind-theme-plugin>
- npm (Design Tokens): <https://www.npmjs.com/package/@digital-go-jp/design-tokens>
