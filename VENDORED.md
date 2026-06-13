# Vendored Upstream Sources

このリポジトリは以下の上流リポジトリのソースを **vendor (取り込み)** している。各サブディレクトリはこちらの git 管理下に置かれ、上流の `.git/` は `.gitignore` で除外している。

詳細な戦略: [`docs/architecture/monorepo-and-vue-library.md`](./docs/architecture/monorepo-and-vue-library.md)（Vendor 方式 / 主要意思決定 D-6）

## 取り込みバージョン (Pinned)

| サブディレクトリ                         | 上流リポジトリ                                                           | 上流バージョン (タグ等) | 取り込み時の HEAD コミット                 | 取り込み日 |
| ---------------------------------------- | ------------------------------------------------------------------------ | ----------------------- | ------------------------------------------ | ---------- |
| `design-tokens/`                         | <https://github.com/digital-go-jp/design-tokens>                         | v2.0.1 (tag)            | `cde7dfe58d53341bba5ebae565406992fbe1218b` | 2026-06-13 |
| `tailwind-theme-plugin/`                 | <https://github.com/digital-go-jp/tailwind-theme-plugin>                 | v1.0.0 (tag)            | `a21b2355ef541febb90ddbb287012f40665e2fb9` | 2026-06-13 |
| `design-system-example-components-html/` | <https://github.com/digital-go-jp/design-system-example-components-html> | main ブランチ HEAD      | `7899f7ab0acf6b7fead0d3a5d3fd7869c2beaaf7` | 2026-06-13 |

## サイト / Figma 抽出物 (Snapshot)

公式 GitHub に存在しない以下は **静的スナップショット** として取り込んでいる。
バージョン判定は git タグではなく、**抽出元の DADS バージョン** または **Figma `fileKey` + `exportedAt`** を真実の源とする。

| サブディレクトリ       | 抽出元                                                                      | スナップショット情報                                                                                         | 抽出日                                  | 詳細リファレンス                               |
| ---------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ---------------------------------------------- |
| `dads-document-md/`    | <https://design.digital.go.jp/dads/>                                        | DADS **v2.14.0**（v2.13.0 全件 + v2.14.0 差分更新）/ 92 ファイル / 612 KB                                    | 2026-05-12（全件）／ 2026-06-13（差分） | `dads-document-md/README.md`                   |
| `dads-document-html/`  | <https://design.digital.go.jp/dads/>                                        | DADS **v2.13.0** (md と同時取得) / 958 ファイル (HTML 148 + PNG 669 + フォント/assets) / 51 MB               | 2026-05-12                              | （README 未配置。md と同一抽出に由来）         |
| `dads-document-figma/` | Figma Community: <https://www.figma.com/community/file/1255349027535859598> | (frame モード) `fileKey=SZ2T652pyb3nz4Mrh06ALt` / "v2.13.0 (Community)" / lastModified 2026-05-14T06:48Z     | 2026-05-14                              | `dads-document-figma/manifest.json`            |
| `dads-document-figma/` | Figma Community: <https://www.figma.com/community/file/1255349027535859598> | (playwright モード) **v2.14.0** / `fileKey=k37j9LDbHk1LwpgdzTZJWY` / 43 pages / exportedAt 2026-06-13T05:32Z | 2026-06-13                              | `dads-document-figma/playwright-manifest.json` |

> 注: DADS v2.14.0 追随状況 —
>
> - **GitHub vendor 3 件**（design-tokens v2.0.1 / tailwind-theme-plugin v1.0.0 / example-components-html）: 更新済み（PR-A）。
> - **Figma（playwright モード）**: v2.14.0 へ更新済み（43 pages・新規「スタイルガイド」追加。canonical な参照は playwright-manifest.json 側。frame モードの `manifest.json` は v2.13.0 Community 由来の旧エクスポートで未更新）（PR-B）。
> - **`dads-document-md/`**: v2.14.0 **差分更新済み**（PR-C）。v2.13.0 全件アーカイブに対し、v2.14.0 の変更（グローバルメニュー → 水平メニュー 名称変更）に関わるページのみ再取得（horizontal-menu 新規 / global-menu 名称変更告知 / header-container Rev 002 / index・updates-dads・components 索引・関連リンク）。それ以外のページは v2.13.0 時点のまま（v2.14.0 で内容変更なし）。
> - **`dads-document-html/`**: 依然 v2.13.0。今回のリネームはガイドライン準備中でビジュアル変更がないため html スナップショットは未更新。

`dads-document-figma/` は `.gitignore` 対象（各環境で再生成）。再取得手順は [scripts/README.md](./scripts/README.md) (`pnpm figma:pw-export`) を参照。

`dads-document-md/` `dads-document-html/` の再取得手順は未スクリプト化（次回上流アップデート時に整備予定）。当面は **DADS 公式サイトに更新通知が出たら手動で全件再クロール** し、ここに新しい抽出日と DADS バージョンを追記すること。

## 上流追随手順

```bash
# 例: design-tokens を最新化
cd /tmp
git clone https://github.com/digital-go-jp/design-tokens.git
rm -rf design-tokens/.git
rsync -a --delete \
  --exclude=node_modules --exclude=dist \
  design-tokens/ /Users/nakamura_kouji/git/dads-lib/design-tokens/
cd /Users/nakamura_kouji/git/dads-lib
git add design-tokens
git commit -m "chore: bump vendored design-tokens to vX.Y.Z (commit ABCDEF)"
# VENDORED.md の該当行を更新
```

## ライセンス

- **GitHub 由来の 3 ディレクトリ** (`design-tokens/` / `tailwind-theme-plugin/` / `design-system-example-components-html/`) は MIT License (Digital Agency 著作)。各 `LICENSE` ファイルが各ディレクトリ内に同梱されているため帰属表示は維持されている。
- **`dads-document-md/` / `dads-document-html/`** は <https://design.digital.go.jp/dads/> サイトコンテンツのスナップショット。利用条件は公式サイトのライセンス表記に従う（再頒布時は要確認）。
- **`dads-document-figma/`** は Figma Community ファイルからのエクスポート。Figma Community の利用規約および同コミュニティファイルのライセンス記載に従う。
