# Requirements — DADS Vue Display-Misc 追加実装 (Spec 3/3)

- Spec ID: `2026-05-14-dads-vue-display-misc`
- Owner: nakamura_kouji
- Status: **Draft（着手前）**
- Last Updated: 2026-05-14
- Depends on: `2026-05-14-dads-vue-navigation-menus` (Spec 2 完了後着手推奨)
- Sibling specs: Spec 1 (Form-Inputs), Spec 2 (Navigation-Menus)

---

## 1. 背景・目的

DADS 公式仕様 46 件のうち、Display 系・その他カテゴリの **8 件** を `@dads/vue` に追加する。本スペック完了で **公式仕様完全カバー (46/46 + 独自拡張 4)** が達成される。

### 採用する方針

Spec 1 / 2 と同じ:

- DADS 公式仕様 (`dads-document-md/dads/components/<slug>/index.md`) を真実の源
- HTML 実装サンプル (`design-system-example-components-html/src/components/<slug>/`) を参照
- 既存 component API 命名規則踏襲
- 実装と同時テスト作成
- sub-agent 並列実装

---

## 2. スコープ

### In Scope (本スペックで完了する 8 件)

| #   | 公式 slug          | 実装名                | 用途                         | HTML 実装例 |
| --- | ------------------ | --------------------- | ---------------------------- | ----------- |
| 1   | `image`            | `DadsImage`           | 画像 (lazy/fallback)         | なし        |
| 2   | `image-slider`     | `DadsImageSlider`     | 画像スライダー               | なし        |
| 3   | `carousel`         | `DadsCarousel`        | カルーセル (汎用)            | あり        |
| 4   | `list`             | `DadsList`            | リスト (`<ul>`/`<ol>`)       | あり        |
| 5   | `blockquote`       | `DadsBlockquote`      | 引用                         | あり        |
| 6   | `resource-list`    | `DadsResourceList`    | リソース一覧                 | あり        |
| 7   | `emergency-banner` | `DadsEmergencyBanner` | 緊急バナー (top fixed)       | あり        |
| 8   | `table-control`    | `DadsTableControl`    | テーブル制御 (検索/ページャ) | なし        |

合計: **8 ファイルセット** × 平均 4 ファイル + 周辺更新 = **約 35 ファイル**

### Out of Scope

- Spec 1 / Spec 2 の対象
- 既存 component 改変
- vitest-axe a11y テスト (別 spec)

---

## 3. 機能要件

Spec 1 の F1〜F6 と同一。本スペック固有の補足:

- **FR-3.A** `ImageSlider` と `Carousel` は内部実装が類似 (両方とも自動再生 + 矢印 + indicators) → 共通の Composable `useSlider()` を考慮可能 (任意)
- **FR-3.B** `TableControl` は既存 `DadsTable` の上に被せて使う前提 → 独立 component として実装し、Demo で組合せ例示
- **FR-3.C** `EmergencyBanner` は `position: fixed; top: 0` で SSR/teleport 不要 (ページ最上段にレンダ)
- **FR-3.D** `Image` は `<img>` ラッパで `loading="lazy"` / `alt` 必須 / fallback 対応

---

## 4. 非機能要件

Spec 1 と同じ。1 wave 所要時間目安: **40〜50 分** (8 件並列なので)。

---

## 5. 受入基準 (Acceptance Criteria)

- [ ] **AC-1** 8 新規ディレクトリ存在
- [ ] **AC-2** `packages/vue/src/index.ts` に 8 件 export
- [ ] **AC-3** `pnpm --filter @dads/vue test` で **1240+ tests pass** (Spec 2 完了 1124 + 新規 120〜160)
- [ ] **AC-4** typecheck / lint / format クリーン
- [ ] **AC-5** sidebar に 8 件追加 (Display + Feedback カテゴリへ振り分け)
- [ ] **AC-6** demo MD 8 件
- [ ] **AC-7** docs build で 49 HTML (既存 41 + 新規 8)
- [ ] **AC-8** 公式仕様準拠
- [ ] **AC-9** 1 wave コミット (8 並列) が git log に記録
- [ ] **AC-10 (シリーズ全体)** Spec 1+2+3 完了で `@dads/vue` が DADS 公式 46 件 + 独自 4 件 = **計 49 component** を提供

---

## 6. リスク・前提

| ID  | 内容                                                 | 影響   | 対策                                                                                        |
| --- | ---------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| R-1 | Carousel / ImageSlider の動作タイミングが複雑        | High   | brief で「自動再生は `setInterval` を `onMounted` で開始、 `onBeforeUnmount` で clear」明記 |
| R-2 | Image の lazy loading が SSR で警告                  | Medium | `loading="lazy"` 属性のみ、 IntersectionObserver は使わない                                 |
| R-3 | TableControl のテスト範囲広い (検索/ソート/ページャ) | Medium | brief で「核 API: pageSize, currentPage, search, sort のみ。15 件テスト」明記               |
| R-4 | EmergencyBanner の z-index が他 component と衝突     | Low    | 既存 Modal / Drawer の z-index を確認、 9999 等の安全値を採用                               |
| R-5 | sub-agent 並列 8 がリソース不足                      | Low    | 5 + 3 に分割可能 (tasklist で wave 分割の余地あり)                                          |

### 前提

- Spec 1 / Spec 2 が完了している
- 同じインフラ流用
- 8 件の公式仕様 MD 存在確認

---

## 7. 次フェーズへの引き継ぎ

承認後に `design.md` (sub-agent ブリーフ) と `tasklist.md` (1 wave または 2 wave 分割) を作成する。
