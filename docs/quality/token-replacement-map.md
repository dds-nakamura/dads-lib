# 不在トークン → 公式トークン 置換マップ (Issue #18 / 横断課題 S-1)

`@dads/vue` の多くが参照する「セマンティック風トークン名」は DADS design-tokens（`@digital-go-jp/design-tokens`）に**存在しない**。`var(--invented, #fallback)` の形で常にフォールバック直値へ落ち、`design-tokens` 更新が反映されない＝実質ハードコード（[gap-reports/README.md](./gap-reports/README.md) S-1 参照）。

本表は不在トークンを **実在する公式トークン**へ置換するための正本。値は `design-tokens/examples/tokens.css` と `design-system-example-components-html/**/*.css` の実使用で裏取り済み。

- **S-1a（一意・全体一括置換）**: 公式での対応が文脈に依らず一意。スクリプトで全コンポーネント一括置換可。
- **S-1b（文脈依存・コンポーネント別）**: 公式で用途により対応トークンが変わる。各コンポーネントの gap-report と example を見て個別に置換（柱A のコンポーネント別フェーズで対応）。
- **除外（コンポーネント内部変数）**: `--dads-carousel-visible` / `--dads-radio-size` / `--menu-list-indentation` は DADS トークンでなくローカル custom property。置換対象外。

---

## S-1a 一意置換（全体一括）

| 不在トークン | 置換先（公式） | 実値 | 根拠 |
| ------------ | -------------- | ---- | ---- |
| `--color-text-primary` | `--color-neutral-solid-gray-800` | #333333 | 本文標準色（button/input 等 example 共通） |
| `--color-text-body` | `--color-neutral-solid-gray-800` | #333333 | 同上 |
| `--color-text-secondary` | `--color-neutral-solid-gray-700` | #4d4d4d | 補足テキスト |
| `--color-text-disabled` | `--color-neutral-solid-gray-420` | #949494 | 無効テキスト |
| `--color-text-on-primary` | `--color-neutral-white` | #ffffff | 塗り上の文字 |
| `--color-text-inverse` | `--color-neutral-white` | #ffffff | 反転文字（tooltip 等） |
| `--color-bg-surface` | `--color-neutral-white` | #ffffff | 面の背景 |
| `--color-bg-primary` | `--color-neutral-white` | #ffffff | 同上 |
| `--color-background-base` | `--color-neutral-white` | #ffffff | 同上 |
| `--color-bg-subtle` | `--color-neutral-solid-gray-50` | #f2f2f2 | 微弱背景/zebra/hover 下地 |
| `--color-bg-hover` | `--color-neutral-solid-gray-50` | #f2f2f2 | hover 背景 |
| `--color-bg-inverse` | `--color-neutral-solid-gray-900` | #1a1a1a | 反転背景（tooltip） |
| `--color-bg-selected` | `--color-primitive-blue-100` | #d9e6ff | 選択行/項目背景（公式 current 既定） |
| `--color-border-divider` | `--color-neutral-solid-gray-420` | #949494 | 区切り線（table default border 等） |
| `--color-error` | `--color-semantic-error-1` | (red-800) | エラー前景 |
| `--color-success` | `--color-semantic-success-1` | (green-600) | 成功前景 |
| `--color-warning` | `--color-semantic-warning-orange-1` | (orange-600) | 警告前景 |
| `--color-primary` | `--color-primitive-blue-900` | #0017c1 | ブランド基準 |
| `--color-brand-primary` | `--color-primitive-blue-900` | #0017c1 | primary（button solid 既定 bg） |
| `--color-brand-primary-hover` | `--color-primitive-blue-1000` | #00118f | primary hover |
| `--color-brand-primary-active` | `--color-primitive-blue-1200` | #000060 | primary active |
| `--color-link-default` | `--color-primitive-blue-1000` | #00118f | リンク既定（link.css:2） |
| `--color-link-hover` | `--color-primitive-blue-900` | #0017c1 | リンク hover（link.css:14） |
| `--border-radius-pill` | `--border-radius-full` | 9999px | 全角丸 |
| `--spacing-4` | `calc(4 / 16 * 1rem)` | 0.25rem | DADS に spacing 軸なし→公式 calc 運用 |
| `--spacing-8` | `calc(8 / 16 * 1rem)` | 0.5rem | 同上 |
| `--spacing-12` | `calc(12 / 16 * 1rem)` | 0.75rem | 同上 |
| `--spacing-16` | `calc(16 / 16 * 1rem)` | 1rem | 同上 |
| `--spacing-24` | `calc(24 / 16 * 1rem)` | 1.5rem | 同上 |
| `--spacing-32` | `calc(32 / 16 * 1rem)` | 2rem | 同上 |

> 注: 置換は `var(--invented, fallback)` の **トークン名のみ** を置き換える（色系）。`--spacing-*` は DADS にトークンが無いため `var(--spacing-N, …)` 全体を `calc(N/16*1rem)` に置換する。色系の旧 fallback 値は inert になるが、別途 fallback の整理は後続で実施。

---

## S-1b 文脈依存（コンポーネント別に判断）

| 不在トークン | 候補と文脈 |
| ------------ | ---------- |
| `--color-border-default` | フォーム枠=`--color-neutral-solid-gray-600`(#666) / table=`--color-neutral-solid-gray-420` / 軽い区切り=`-420`。用途で選択 |
| `--color-border-strong` | card 強枠/table ヘッダ=`--color-neutral-solid-gray-500` or `-536`、最強=`-900`/`black`。用途で選択 |
| `--color-bg-selected-hover` | 選択行 hover=`--color-primitive-blue-200`（要 example 確認） |
| `--color-info-bg` | 情報バナー薄背景=`--color-primitive-blue-50`（notification-banner の data 属性配色を確認） |
| `--color-success-bg` | 成功薄背景=`--color-primitive-green-50`（同上） |
| `--color-brand-secondary` | 二次ブランド。link active 等=`--color-primitive-orange-800`。用途で選択 |
| `--font-size-12` | DADS 最小は `--font-size-14`(0.875rem)。chip 等は公式 16px のため `--font-size-16`。用途で選択（12px トークンは公式に無い） |

---

## 適用記録

- S-1a: スクリプト `scripts/apply-token-map-s1a.mjs`（または sed）で一括置換 → 全 `var(--invented)` 参照が解消されることを `grep` で検証。
- S-2（focus-ring）と合わせて `packages/vue` の test / build / typecheck を実行して回帰確認。
- S-1b と各コンポーネントのビジュアル是正は柱A のコンポーネント別フェーズ（サブエージェント並列）で gap-report に沿って実施。
