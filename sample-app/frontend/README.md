# @dads/sample-frontend

DADS（デジタル庁デザインシステム）準拠の **新規フロントエンドアプリ用コピー元テンプレート**です。
`@dads/vue` コンポーネントを使った空のダッシュボード（ヘッダー＋左サイドメニュー＋空メイン）を提供します。

- Vue 3 + TypeScript + Vite
- `vue-router` / `vue-i18n`（日本語・英語）
- モバイル対応レスポンシブ（768px ブレークポイント）
- `@dads/vue` / `@dads/tokens` を利用（色・余白・タイポは DADS トークンのみ）

## 画面構成

| 領域             | 実装                                                                              |
| ---------------- | --------------------------------------------------------------------------------- |
| ヘッダー         | `DadsHeaderContainer`。右側にアプリ選択アイコンボタン・ユーザーメニュー・言語切替 |
| アプリ選択       | `AppSwitcher.vue`（`DadsMenuListBox` opener / アイコンボタン）                    |
| ユーザーメニュー | `UserMenu.vue`（`DadsMenuListBox` opener / ログアウト項目あり）                   |
| 言語切替         | `DadsLanguageSelector`（`vue-i18n` の locale と連動）                             |
| 左サイドメニュー | `SideMenu.vue`。PC は `DadsMenuList` 固定、モバイルは `DadsDrawer`                |
| メインパネル     | `DashboardView.vue`（空。ここにアプリ本体を実装する）                             |

## ディレクトリ

```
src/
├── main.ts                 tokens/css → vue/styles → mdi の順で読み込み + router/i18n
├── App.vue                 RouterView のみ
├── router/index.ts         / (dashboard) と /login (ログアウト先スタブ)
├── i18n/                   createI18n + locales/{ja,en}.ts + ブラウザ言語判定
├── layouts/AppLayout.vue   ヘッダー + サイド + メインの 3 ペイン
├── components/             AppHeader / AppSwitcher / UserMenu / SideMenu
├── views/                  DashboardView / LoginView
└── styles/global.css       最小リセット（値は DADS トークンを参照）
```

## 開発（このリポジトリ内 / monorepo）

このテンプレートは pnpm workspace のメンバーで、`@dads/vue` / `@dads/tokens` を `workspace:*` で参照します。
依存パッケージはビルド成果物（`dist/`）を参照するため、初回は依存パッケージのビルドが必要です。

```bash
# リポジトリルートで
pnpm install
pnpm --filter @dads/tokens --filter @dads/vue run build   # 依存パッケージを先にビルド

# サンプルアプリの起動 / 型チェック / ビルド
pnpm --filter @dads/sample-frontend dev
pnpm --filter @dads/sample-frontend typecheck
pnpm --filter @dads/sample-frontend build
```

## 新規アプリとしてコピーして使う場合

このフォルダを monorepo の外へコピーして独立プロジェクトとして使う場合は、
`workspace:*` の依存を **公開済み npm バージョンに差し替え**てください。

```jsonc
// package.json
{
  "dependencies": {
    "@dads/tokens": "^x.y.z", // workspace:* から公開バージョンへ
    "@dads/vue": "^x.y.z", //     〃
  },
}
```

その後、独立プロジェクトとして以下を実行します。

```bash
pnpm install   # もしくは npm install / yarn
pnpm dev
```

## カスタマイズの起点

- メニュー項目: `src/components/SideMenu.vue` の `menuItems` / `drawerItems`
- アプリ一覧: `src/components/AppSwitcher.vue` の `apps`
- ログアウト処理: `src/components/UserMenu.vue` の `onSelect`（現状は `/login` へ遷移するスタブ）
- 文言・言語: `src/i18n/locales/{ja,en}.ts`、対応言語は `src/i18n/index.ts` の `SUPPORTED_LOCALES`
