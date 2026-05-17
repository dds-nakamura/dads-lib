# Requirements: DADS Vue 命名整合 & 全件ギャップ分析

**日付**: 2026-05-17
**ブランチ**: main

## 背景

直前 spec (`2026-05-17-dads-vue-figma-compliance`) で「準備中」コンポーネント 8 件のうち 5 件を Figma 視覚仕様に基づき改修した。残り 38 件の公式仕様 (準備中 8 + 仕様あり 30) は未点検で、API レベルのギャップが残っている可能性がある。また、公式 slug と Vue 実装名の不一致が 4 箇所存在し、利用者の混乱要因となっている。

## ゴール

1. **命名整合 (4 件)**: 公式 slug と一致する新名を追加し、旧名は `@deprecated` alias として併存させる (Option B)。
2. **全件ギャップ分析 (38 件)**: 公式 MD と実装 types を突き合わせ、prop / event / variant / a11y の欠落を一覧化。
3. **High 重要度のみ実装**: 全件集約後、High と判定したものから順に新規 prop / event / variant を追加。

## スコープ

### 命名整合の対象

| 公式 slug                 | 現実装            | 新名                                   | 旧名の扱い                            |
| ------------------------- | ----------------- | -------------------------------------- | ------------------------------------- |
| `dialog`                  | `DadsModal`       | `DadsDialog`                           | `@deprecated` re-export               |
| `header-container`        | `DadsHeader`      | `DadsHeaderContainer`                  | `@deprecated` re-export               |
| `input-text`              | `DadsTextField`   | `DadsInputText`                        | `@deprecated` re-export               |
| `chip-label` / `chip-tag` | `DadsChip` (兼用) | `DadsChipLabel` / `DadsChipTag` (分離) | `DadsChip` は `@deprecated` re-export |

### ギャップ分析の対象 (39 件)

準備中 8 + 仕様あり 30 + `chip-tag` (分割対象) = 39

## 制約

- 1585 テストを退化させない
- `design-tokens/` 経由のトークンのみ使用
- WAI-ARIA Authoring Practices 準拠
- private package のため breaking change 可能だが、Option B により暫定的に互換維持
