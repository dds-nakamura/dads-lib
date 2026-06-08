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
  DadsMenuList / DadsMenuListBox / DadsHamburgerMenuButton / DadsUtilityLink ほか、合成部品 DadsGlobalMenu / DadsMegaMenu / DadsPageNavigation / DadsMobileMenu。

### Quality（品質ゲート）

- [Issue #18 Fidelity Audit 完了サマリ & 公式準拠ベースライン](./quality/fidelity-audit-summary.md)
  **まず読む #18 の総括**。案X ポリシー、テーマ別（T1〜T8 + 柱A-2/柱B）の新ベースラインと移行要点、存続させた非公式機能（keep-list）、成果物 map、リリース手順。
- [柱A-3 破壊的変更ポリシー](./quality/a3-breaking-change-policy.md)
  #18 の**基準文書**。案X（公式準拠 major 統一）、テーマ別破壊サーフェス、要決定チェックリスト、T1（form-control-label）詳細設計。
- [柱A-3 残課題台帳（a3-deferred）](./quality/a3-deferred.md)
  柱A-2 で扱えなかった破壊的項目の一覧。#18 で消し込み済み（各項目に解消テーマを記載）。
- [Gap Reports（コンポーネント別 差異監査）](./quality/gap-reports/README.md)
  49 コンポーネントを公式実装と突き合わせた監査の集約索引。各レポートに "T◯ 解消" を追記。
- [不在トークン → 公式トークン 置換マップ](./quality/token-replacement-map.md)
  「セマンティック風」不在トークンを実在の公式トークンへ置換する正本（S-1）。
- [アイコン MDI → DadsIcon(inline SVG) 移行マップ](./quality/icon-mapping.md)
  webfont からの inline SVG 統一（柱B / 案B-2）。
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
