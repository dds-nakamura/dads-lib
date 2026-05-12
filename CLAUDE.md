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

---

## フォルダ構成と役割

```
dads-lib/
├── CLAUDE.md                              ← このファイル
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
