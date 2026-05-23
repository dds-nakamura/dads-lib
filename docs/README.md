# dads-lib ドキュメント

dads-lib（デジタル庁デザインシステム / DADS 参照ライブラリ）の永続ドキュメント集約。
旧 `.steering/` 配下のフェーズ別仕様（requirements / design / tasklist）をトピック別に再構成したもの。

## 索引

### Architecture（アーキテクチャ）

- [Monorepo & @dads/vue ライブラリ設計](./architecture/monorepo-and-vue-library.md)
  pnpm workspaces 構成、パッケージ間依存、技術選定（Vite / Vitest / VitePress / Changesets）、公開 API、ビルド・リリースフロー、CI・品質ゲート、主要意思決定 D-1〜D-6。
- [Multi-Remote Release 戦略](./architecture/multi-remote-release.md)
  `origin` / `backlog` / `vue-pkg` orphan + `vue-v<semver>` タグによる多重リモート配布。`scripts/release-vue.sh` の動作と失敗時リカバリ。

### Components（コンポーネント仕様）

- [フォーム入力コンポーネント](./components/form-inputs.md)
  DadsDatePicker / DadsSearchBox / DadsDisclosure / DadsDescriptionList / DadsLanguageSelector の Props・Slots・Emits・a11y。
- [表示系コンポーネント](./components/display-misc.md)
  DadsImage / DadsImageSlider / DadsCarousel / DadsList / DadsBlockquote / DadsResourceList / DadsEmergencyBanner / DadsTableControl。
- [ナビゲーション / メニュー系コンポーネント](./components/navigation-menus.md)
  DadsMenuList / DadsMenuListBox / DadsHamburgerMenuButton / DadsUtilityLink / DadsScrollTopButton ほか、合成部品 DadsGlobalMenu / DadsMegaMenu / DadsPageNavigation / DadsBottomNavigation / DadsMobileMenu。

### Quality（品質ゲート）

- [Figma 仕様準拠](./quality/figma-compliance.md)
  `dads-document-figma/` PNG スナップショット 42 件の運用、エクスポートスクリプト 3 種、Playwright 認証戦略、「準備中」コンポーネントの補完方針。
- [命名規約と DADS 公式仕様との Gap 分析](./quality/naming-and-gap.md)
  Dads プレフィックス、Props / Emits / Slots / 型・CSS class の命名規約、DADS 公式 39 件との Gap（High 9 / Medium 17 / Low 13）、新規追加時の命名チェックリスト。

### Guides（ガイド）

- [ドキュメントサイト（VitePress）構築ガイド](./guides/docs-site-rollout.md)
  `apps/docs/` の構成、sidebar / nav、theme（tokens + vue/styles の global load）、コンポーネントページ構成、ローカル開発フロー、a11y 連携。

## 補助参照

- リポジトリ全体の利用方針は [`/CLAUDE.md`](../CLAUDE.md) を参照（DADS 公式仕様の参照優先順位、コンポーネント追加ワークフロー、保護ブランチ、PR 規約）。
- DADS 公式仕様の一次ソースは [`/dads-document-md/`](../dads-document-md/)。
- 実装サンプル（フレームワーク非依存 HTML/CSS/JS）は [`/design-system-example-components-html/`](../design-system-example-components-html/)。
- デザイントークン上流ソースは [`/design-tokens/`](../design-tokens/)。
