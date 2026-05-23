# Multi-Remote Release 戦略

`@dads/vue` を npm レジストリを介さず、GitHub と Backlog Git の両方から同一の `vue-v<semver>` tag で `pnpm add` / `npm install` できるようにするための配布方式を定義する。

## 背景と目的

- `@dads/vue` は npm に公開せず、Git tag 経由でインストールする運用とする。
- `main` ブランチは `dist/` を gitignore しているため、`main` の HEAD では import 解決できない。
- 配布対象（dist 込み）を独立した orphan ブランチ `vue-pkg` に commit し、`vue-v<semver>` tag を打って配布する。
- 社内 (Backlog Git) と社外 (GitHub) の両方の利用者を同じ tag で賄うため、1 回の release 実行で両 remote に push できる仕組みを提供する。

## 対象リモート / ブランチ構成

| Remote 名 | URL 形式 | 用途 |
| --------- | -------- | ---- |
| `origin` (GitHub) | `git@github.com:dds-nakamura/dads-lib.git` | OSS 公開・主要配布チャネル |
| `backlog` | `git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git` | 社内利用者向け配布（任意設定） |

両 remote とも以下を共有する。

- `vue-pkg`: dist + `src/styles` + `package.json` + `README` を flatten した orphan ブランチ。`main` とは履歴を共有しない。
- `vue-v<semver>`: 各リリースで `vue-pkg` の HEAD に打つ tag。インストール時はこの tag を参照する。

## 配布フロー (vue-pkg + tag)

1. `main` 上で `packages/vue/` を build し dist を生成。
2. `mktemp -d` で隔離 clone を作成し、そこで orphan ブランチ `vue-pkg` を構成（dist 込みで flatten）。
3. orphan ブランチを commit し `vue-v<semver>` tag を打つ。
4. 指定された全 remote に `vue-pkg` ブランチと `vue-v<semver>` tag を順次 push。
5. 利用側は以下のいずれかでインストール。

```bash
# GitHub
npm install "git+https://github.com/dds-nakamura/dads-lib.git#vue-v<semver>"
npm install "git+ssh://git@github.com:dds-nakamura/dads-lib.git#vue-v<semver>"

# Backlog Git (社内)
npm install "git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git#vue-v<semver>"
```

## release-vue.sh の動作

### 引数仕様

```
Usage: release-vue.sh <version> [remote1,remote2,...]

  release-vue.sh 0.2.1                  # origin にのみ push (デフォルト / 後方互換)
  release-vue.sh 0.2.1 origin           # 明示
  release-vue.sh 0.2.1 origin,backlog   # 両方に push
```

- 第 2 引数省略時は `origin` のみ。
- カンマ区切りで複数 remote を指定可。
- 指定 remote が `git remote` に存在しなければ push 前にエラー終了。

### 実行ステップ

1. 引数解析：`REMOTES=(origin)` 配列を、第 2 引数があれば `IFS=,` で上書き。
2. Pre-flight 検証：
   - 全 remote について URL 取得可能か確認。
   - 全 remote について `vue-v<semver>` tag が未使用か確認。**いずれか 1 つでも既存なら abort。**
3. `mktemp -d` で隔離 clone を作成し、`vue-pkg` orphan ブランチを構成。
4. build → flatten → commit → tag。
5. Push ループ：`for r in "${REMOTES[@]}"; do git push "$r" "${BRANCH}" "${TAG}"; done`
6. 完了メッセージで push 成功 remote 一覧を表示。

### エッジケース

- **Push 途中失敗**: 早い段階の remote には push 済みになる。`trap` でのロールバックは行わない（orphan の force-push 取消は危険）。最終メッセージで成功 remote を列挙し、残りは手動再 push で補う。
- **後追い配布** (例: 既存 tag を別 remote に push): `release-vue.sh` ではなく以下を手動実行する。
  ```bash
  git push <remote> vue-pkg vue-v<semver>
  ```
- **Build 失敗**: `set -e` により即終了。
- **`dist/` の肥大化**: `vue-pkg` 限定の commit なので `main` 履歴には影響しない。

## 認証 / 権限

- `origin` (GitHub): SSH 鍵 (`git@github.com:...`) または HTTPS + PAT。`dds-nakamura/dads-lib` への push 権限が必要。
- `backlog`: SSH 鍵を Backlog に登録した上で `git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git` を `git remote add backlog` で追加。
- インストール側（利用者）は read 権限のみで足りる。GitHub は public なら認証不要、Backlog は SSH 鍵が必要。

## 失敗時のリカバリ

| 状況 | 対応 |
| ---- | ---- |
| Pre-flight で tag 既存検出 | 新しい semver を採番し直して再実行。既存 tag を上書きしない。 |
| 一部 remote のみ push 成功 | 失敗 remote に対し `git push <remote> vue-pkg vue-v<semver>` を手動再実行。 |
| 誤った内容で `vue-pkg` を push してしまった | 各 remote 上で当該 tag を削除し (`git push <remote> :refs/tags/vue-v<semver>`)、新 semver で再リリースする。orphan ブランチの force-push は最終手段で、社内外の影響範囲を確認してから実施。 |
| Build 失敗で release 中断 | local clone・隔離 clone のいずれにも push 前に止まる。`main` 側の修正後、同じ semver で再実行可能。 |
| Backlog remote 未設定環境 | GitHub のみで release を実行し、後日 `git remote add backlog ...` → `git push backlog vue-pkg vue-v<semver>` で後追い配布。 |

## 関連保護ブランチ

以下のブランチは削除・force-push 禁止。`vue-pkg` は本配布フローの中核。

| ブランチ | 種類 | 役割 |
| -------- | ---- | ---- |
| `main` | 長期ブランチ | リリース本流。`packages/vue/` の source / build 設定の正本。 |
| `development` | 長期ブランチ | 開発統合ブランチ。PR のデフォルト base。 |
| `vue-pkg` | orphan ブランチ | `@dads/vue` の配布スナップショット。`vue-v<semver>` tag を打つ先。`main` と履歴が独立しているため `git branch -r --merged` には現れないが、これは設計通り。 |
