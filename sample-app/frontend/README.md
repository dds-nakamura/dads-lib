# @dads/sample-frontend

DADS（デジタル庁デザインシステム）準拠の **新規フロントエンドアプリ用コピー元テンプレート**です。
`@dads/vue` コンポーネントを使った空のダッシュボード（ヘッダー＋左サイドメニュー＋空メイン）を提供します。

- Vue 3 + TypeScript + Vite
- `vue-router` / `vue-i18n`（日本語・英語）
- モバイル対応レスポンシブ（768px ブレークポイント）
- `@dads/vue` / `@dads/tokens` を利用（色・余白・タイポは DADS トークンのみ）

## 画面構成

ヘッダー右側のアイテムは左から **言語切替 → アカウントメニュー → アプリ選択リンク** の順。

| 領域               | 実装                                                                         |
| ------------------ | ---------------------------------------------------------------------------- |
| ヘッダー           | `AppHeader.vue`（`DadsHeaderContainer` の `#actions` スロットに 3 アイテム） |
| 言語切替           | `DadsLanguageSelector`（`vue-i18n` の locale と連動 / "Language" 文字なし）  |
| アカウントメニュー | `AccountMenu.vue`（頭文字アバター / 名前・メール表示 / ログアウト）          |
| アプリ選択         | `AppLauncherLink.vue`（`https://app.<domain>/launcher` へ画面遷移）          |
| 左サイドメニュー   | `SideMenu.vue`。PC は `DadsMenuList` 固定、モバイルは `DadsDrawer`           |
| メインパネル       | `DashboardView.vue`（空。ここにアプリ本体を実装する）                        |
| ユーザー情報       | `composables/useCurrentUser.ts`（スタブ。認証ストア / API に差し替える）     |

## ディレクトリ

```
src/
├── main.ts                 tokens/css → vue/styles → mdi の順で読み込み + router/i18n
├── App.vue                 RouterView のみ
├── router/index.ts         / (dashboard) と /login (ログアウト先スタブ)
├── i18n/                   createI18n + locales/{ja,en}.ts + ブラウザ言語判定
├── layouts/AppLayout.vue   ヘッダー + サイド + メインの 3 ペイン
├── components/             AppHeader / AccountMenu / AppLauncherLink / SideMenu
├── composables/            useCurrentUser (ユーザー情報スタブ)
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
- ユーザー情報（アバター/名前/メール）: `src/composables/useCurrentUser.ts`（スタブを認証ストア / API に差し替え）
- ログアウト処理: `src/components/AccountMenu.vue` の `onLogout`（現状は `/login` へ遷移するスタブ）
- アプリ選択リンクの遷移先: `src/components/AppLauncherLink.vue` の `launcherUrl`（ホスト名から導出）
- 文言・言語: `src/i18n/locales/{ja,en}.ts`、対応言語は `src/i18n/index.ts` の `SUPPORTED_LOCALES`
