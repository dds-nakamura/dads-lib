# Vendored Upstream Sources

このリポジトリは以下の上流リポジトリのソースを **vendor (取り込み)** している。各サブディレクトリはこちらの git 管理下に置かれ、上流の `.git/` は `.gitignore` で除外している。

詳細な戦略: `.steering/2026-05-12-dads-vue-library-init/design.md` §9 / requirements.md D-6

## 取り込みバージョン (Pinned)

| サブディレクトリ                          | 上流リポジトリ                                                                  | 上流バージョン (タグ等) | 取り込み時の HEAD コミット                 | 取り込み日 |
| ----------------------------------------- | ------------------------------------------------------------------------------- | ----------------------- | ------------------------------------------ | ---------- |
| `design-tokens/`                          | <https://github.com/digital-go-jp/design-tokens>                                | v1.1.9 (develop ブランチ) | `797dee988d8a0dab5310ad206436d20190678713` | 2026-05-13 |
| `tailwind-theme-plugin/`                  | <https://github.com/digital-go-jp/tailwind-theme-plugin>                        | v0.3.4 (develop ブランチ) | `37e88973f7dbdb24b151fd2d2b864c6f46be6c68` | 2026-05-13 |
| `design-system-example-components-html/`  | <https://github.com/digital-go-jp/design-system-example-components-html>        | main ブランチ HEAD      | `b0acbeed91aebc1509295974ab7444cf99e422e6` | 2026-05-13 |

`dads-document-md/` および `dads-document-html/` は公式 DADS サイト (<https://design.digital.go.jp/dads/>) からの抽出物で、独立した git 履歴を持たないためここには記載していない。

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

3 ディレクトリとも MIT License (Digital Agency 著作)。各 `LICENSE` ファイルが各ディレクトリ内に同梱されているため帰属表示は維持されている。
