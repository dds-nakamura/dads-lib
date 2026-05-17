# scripts/

リポジトリ運用ユーティリティ。

## Figma エクスポート 2 系統の使い分け

| スクリプト                                        | 仕組み                      | rate limit | 認証                  | 用途                                                 |
| ------------------------------------------------- | --------------------------- | ---------- | --------------------- | ---------------------------------------------------- |
| `figma-export.mjs`                                | Figma REST API              | あり       | Personal Access Token | 安定して動く時はこれが速い                           |
| `figma-login.mjs` + `figma-playwright-export.mjs` | ブラウザ自動化 (Playwright) | **なし**   | 通常の Figma ログイン | starter プランで API rate limit に阻まれた時の回避策 |

REST API が使える環境では `figma-export.mjs` を、`429` が長期化する場合は Playwright 系を使う。

---

## figma-export.mjs

DADS の Figma ファイルを **REST API 経由で一括 PNG/PDF/SVG エクスポート**する。
「準備中」マークの付いたコンポーネント（chip-tag / tab / table-control 等）の仕様確認や、
ガイドラインのバージョン差分追跡で `dads-document-md/` と並列に使う想定。

### 事前準備

#### 1. Community ファイルを自分の drafts に複製

公式の Community ファイル <https://www.figma.com/community/file/1255349027535859598>
（または URL: `https://www.figma.com/design/RLVNQjrXaFSbvyj22E2bz1/...`）は
**Community のままだと REST API でアクセスできない**ため、

1. Figma を開いて「Open in Figma」→「Duplicate to your drafts」
2. 自分のチームに複製
3. 複製後の URL `https://www.figma.com/design/<NEW_FILE_KEY>/...` の `<NEW_FILE_KEY>` を控える

#### 2. Personal Access Token を発行

Figma 右上アカウントメニュー → Settings → Security → Personal access tokens →
「Generate new token」で **`File content` 読取スコープ**だけ付けた token を作成。

シェルの環境変数か `.env` に保存（`.env` は `.gitignore` 済み）:

```bash
export FIGMA_TOKEN=figd_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
export FIGMA_FILE_KEY=<上で控えた NEW_FILE_KEY>
```

### 実行

```bash
# 1. 全フレームを 2x PNG で dads-document-figma/<ページ名>/<フレーム名>.png に出力
pnpm figma:export

# 2. ページ単位 (1 ページ = 1 PNG)
MODE=page pnpm figma:export

# 3. SVG で出力 (フレームが大きい場合のサイズ対策)
FORMAT=svg pnpm figma:export

# 4. 特定ページだけ (正規表現)
PAGE_FILTER='Components|チップ' pnpm figma:export

# 5. ドライラン (DL せず対象一覧だけ出力)
DRY_RUN=1 pnpm figma:export
```

### 環境変数一覧

| 変数             | 既定値                | 説明                                                                 |
| ---------------- | --------------------- | -------------------------------------------------------------------- |
| `FIGMA_TOKEN`    | (必須)                | Personal access token                                                |
| `FIGMA_FILE_KEY` | (必須)                | Drafts に複製した後の file key                                       |
| `OUT_DIR`        | `dads-document-figma` | 出力先ディレクトリ                                                   |
| `MODE`           | `frame`               | `frame`: 直下フレーム単位 / `page`: ページ単位                       |
| `FORMAT`         | `png`                 | `png` / `jpg` / `svg` / `pdf`                                        |
| `SCALE`          | `2`                   | 1〜4 (`svg`/`pdf` では無視)                                          |
| `PAGE_FILTER`    | (なし)                | 対象ページ名のフィルタ正規表現 (大文字小文字無視)                    |
| `BATCH`          | `5`                   | `/v1/images` 1 リクエストで処理する id 数。Figma は 5 前後が安定     |
| `COOLDOWN_MS`    | `1500`                | バッチ間の待機 (ms)。rate limit (100 req/min 程度) を踏まない 範囲で |
| `RETRY`          | `3`                   | 429 / 5xx / `Render timeout` のリトライ最大回数                      |
| `OVERWRITE`      | (なし)                | `1` で既存ファイルを再 DL。既定では skip して resume 動作            |
| `DRY_RUN`        | (なし)                | `1` で DL せず対象一覧のみ表示                                       |

### Rate Limit / Render Timeout 対策

スクリプト側で以下を自動でやります:

- **`Retry-After` ヘッダ尊重**: 429 が来たら Figma 指定秒だけ待機 (なければ指数バックオフ 10s → 20s → 40s)
- **指数バックオフ**: 5xx / `Render timeout` で 2s → 4s → 8s のリトライ
- **バッチ失敗時の単発フォールバック**: 5 件まとめの render が落ちたら 1 件ずつ再試行
- **既存ファイル skip (resume)**: 途中で落ちても再実行で続きから DL される
- **manifest 逐次保存**: バッチごとに `manifest.json` を更新するので進捗が消えない

それでも 429 が続く場合は:

```bash
# クールダウンを伸ばす (3 秒間隔 = ~20 req/min)
COOLDOWN_MS=3000 pnpm figma:export

# 解像度を下げると render が軽くなる
SCALE=1 pnpm figma:export

# ページを絞って分割実行
PAGE_FILTER='Components' pnpm figma:export
PAGE_FILTER='Foundations' pnpm figma:export
```

### 出力構造

```
dads-document-figma/
├── manifest.json                       # 全エクスポートの id↔path 対応
├── Components/
│   ├── Chip_Tag.png
│   ├── Chip_Label.png
│   ├── Tab.png
│   └── ...
├── Foundations/
│   ├── Color.png
│   └── ...
└── Patterns/
    └── ...
```

`manifest.json` には `fileKey` / `lastModified` / `exportedAt` が記録されるので、
Figma 側の更新検知に使える。

### Claude Code から参照する

`Read` ツールは PNG をマルチモーダルに直接読めるため、

```text
dads-document-figma/Components/Chip_Tag.png を読んでください
```

のように指示すれば「準備中」のチップタグも視覚仕様を確認できる。

### 注意

- `/v1/images` が返す S3 URL は **約 30 分で expire** するためスクリプトは即時 DL する。
- Figma 無料プランでも REST API は利用可能（Dev Mode MCP は有料プラン必須）。
- Rate limit に当たった場合は `BATCH` を 10〜15 に下げて再実行。

---

## figma-login.mjs

Playwright 経由でエクスポートする前に **1 度だけ** 実行して Figma の認証状態を保存する。

```bash
pnpm figma:login
```

挙動:

1. Chromium がヘッドフルで起動 (Figma のログインページが開く)
2. ブラウザで通常通り Figma にログイン (2FA / SSO 含めて完了)
3. ファイル一覧が表示されたらターミナルに戻って **Enter** キーを押す
4. 認証情報 (cookie + localStorage) が `scripts/.figma-auth.json` に保存される
5. ブラウザはそのまま残るので Ctrl+C で終了

保存ファイルは `.gitignore` 済み。**外部に共有しない**こと (パスワードと同等)。

期限が来てログインが切れたら再度 `pnpm figma:login` を実行する。

---

## figma-playwright-export.mjs

`figma-login.mjs` で作成した認証を使って、Figma ファイルをブラウザで開き
ページ単位で全フレームを ZIP (PNG セット) でエクスポートする。
**REST API を使わないので Figma の rate limit と無関係**。

```bash
# 全ページ
pnpm figma:pw-export

# 動作確認用にヘッドフル (画面表示) で起動
HEADLESS=0 pnpm figma:pw-export

# 一部ページだけ
PAGE_FILTER='Components|Foundations' pnpm figma:pw-export

# 最初の 1 ページだけで selector を試す
MAX_PAGES=1 HEADLESS=0 pnpm figma:pw-export
```

### 仕組み

1. 保存済み認証で Figma エディタを開く
2. 左サイドバーの Pages 一覧を DOM 取得（日本語 / 英語 / 構造ベース fallback）
3. 各ページに対して:
   - ページをクリック
   - 以下のいずれかでキャプチャ:
     - `EXPORT_MODE=screenshot` (既定): canvas に `Shift+1`（Zoom to fit）→ canvas 領域を browser screenshot
     - `EXPORT_MODE=figma-export`: canvas を `Cmd+A` → `Cmd+Shift+E` → Export ダイアログ操作
4. PNG（または ZIP）を `dads-document-figma/<ページ名>/` に保存

`screenshot` モードのほうが**安定して動く**（Figma の DOM 変更耐性が高い）が解像度は viewport 依存。
`figma-export` モードは 2x など高解像度で取れるが、Figma のダイアログ DOM 変更でセレクタ調整が必要になることがある。

### 環境変数

| 変数              | 既定                       | 説明                                                                      |
| ----------------- | -------------------------- | ------------------------------------------------------------------------- |
| `FIGMA_FILE_KEY`  | (必須)                     | 対象 file key                                                             |
| `OUT_DIR`         | `dads-document-figma`      | 出力先                                                                    |
| `FIGMA_AUTH_PATH` | `scripts/.figma-auth.json` | 認証状態ファイル                                                          |
| `HEADLESS`        | `1`                        | `0` でブラウザを表示しながら実行                                          |
| `PAGE_FILTER`     | (なし)                     | 対象ページ名フィルタ (正規表現)                                           |
| `SLOWMO_MS`       | `250`                      | 各操作後の待機 (bot 検知抑制)                                             |
| `SCALE`           | `2`                        | 1〜4 (`figma-export` モードのみ使用)                                      |
| `MAX_PAGES`       | (なし)                     | 何ページ目まで処理するか (動作確認用)                                     |
| `EXPORT_MODE`     | `screenshot`               | `screenshot`: canvas を画面キャプチャ / `figma-export`: Export ダイアログ |
| `DEBUG`           | (なし)                     | `1` で各操作後にスクショを残す                                            |

### Figma の DOM 変更で動かなくなった時

Figma の DOM 構造は予告なく変わる。Pages 一覧の selector が見つからない場合、
スクリプトは `dads-document-figma/_debug-no-pages-panel.png` に画面全体の
スクリーンショットを保存して exit 2 で終了する。

そのスクショを Claude に渡して「この左サイドバーの Pages 一覧の selector を特定して
`listPages()` に追加して」と頼むのが最短経路。

### 注意

- **`scripts/.figma-auth.json` は鍵情報**。`.gitignore` 済みだが手動で公開しないこと
- 認証が切れたら `pnpm figma:login` をやり直す
- 連続実行で bot 検知される極稀なリスクあり → `SLOWMO_MS=500` 以上にすると安全

---

## vendor-status.mjs

`VENDORED.md` に書かれている取り込み情報と、実ファイル (各 vendor ディレクトリ内の
`package.json` / `manifest.json` / ファイル mtime 等) を突き合わせて、
**「VENDORED.md が現実と乖離していないか」** を検出する。

ネットワーク不要 / 完全ローカル。CI のドリフト検出 (`pnpm vendor:status -- --quiet`) でも使える。

### 実行

```bash
pnpm vendor:status                # 人間向けレポート (✓ / ⚠ / ✗ マーカー)
pnpm vendor:status -- --json      # 機械可読 JSON
pnpm vendor:status -- --quiet     # drift 時のみ出力 (CI 用)
```

### 何を比較するか

| カテゴリ                       | 比較対象                                                            | drift 判定                                                |
| ------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------- |
| GitHub vendor 3 件             | `VENDORED.md` の上流バージョン ↔ `<dir>/package.json` の `version`  | 一致しなければ ✗ err                                      |
| サイト snapshot (md / html)    | `VENDORED.md` の抽出日 ↔ 実ファイル最新 mtime                       | 3 日以上の差で ⚠ warn (ローカル編集など)                  |
| Figma snapshot (manifest × 2)  | `VENDORED.md` の `fileKey` / `exportedAt` ↔ 実 manifest.json の値   | `fileKey` 不一致で ✗ err / `exportedAt` 1 日超ズレで ⚠    |

### Exit code

- `0` … すべて ok
- `1` … err あり (≒ `VENDORED.md` を更新する必要あり)
- `2` … スクリプト自体の異常

### 仕組み

`VENDORED.md` のテーブル行を正規表現で抽出して、

- 1 列目から ``` `<dir>/` ``` パターンでディレクトリ名
- セルから `vX.Y.Z` / 7〜40 桁 hex (commit) / `fileKey=...` / `2026-05-16T14:54Z` を取り出して比較

する。`VENDORED.md` のフォーマット変更には弱い (列順を変えると追従が必要) ので、
`scripts/vendor-status.mjs` 冒頭のコメントと併せて修正すること。
