# Design — DADS Vue Display-Misc 追加実装 (Spec 3/3)

- Spec ID: `2026-05-14-dads-vue-display-misc`
- Depends on: `./requirements.md`
- Status: **Done（2026-05-14 完了）**
- Last Updated: 2026-05-14

---

## 1. 目的

requirements.md の F1〜F6 を Spec 1 / Spec 2 と同じ方式で達成する。8 件並列 (or 5+3 分割) で 1 wave 完結を目指す。

---

## 2. 全体アプローチ

Spec 1 (`form-inputs/design.md` §2) と同一。

### 2.1 並列度の選択

| 選択肢 | 並列度              | 所要  |
| ------ | ------------------- | ----- |
| A      | 8 並列 × 1 wave     | 50 分 |
| B      | 5 + 3 並列 × 2 wave | 60 分 |

**推奨: A (8 並列 1 wave)** — Display 系は依存関係が少ないため一括実行可能。harness が 8 並列に耐えられない場合 B にフォールバック。

---

## 3. Wave 分割

| Wave  | 件数 | コンポーネント                                                                              |
| ----- | ---- | ------------------------------------------------------------------------------------------- |
| **1** | 8    | Image, ImageSlider, Carousel, List, Blockquote, ResourceList, EmergencyBanner, TableControl |

---

## 4. Sub-agent ブリーフ・テンプレート

Spec 1 の `form-inputs/design.md` §4.1 テンプレを **そのまま流用**。

### 4.1 Wave 1 変数

| #   | NAME            | SLUG             | HTML 実装例 | 補足                               |
| --- | --------------- | ---------------- | ----------- | ---------------------------------- |
| 1   | Image           | image            | なし        | `<img>` ラッパ + lazy/alt          |
| 2   | ImageSlider     | image-slider     | なし        | 自動再生付き画像送り               |
| 3   | Carousel        | carousel         | あり        | 汎用カルーセル (default slot 連結) |
| 4   | List            | list             | あり        | `<ul>` / `<ol>` ラッパ             |
| 5   | Blockquote      | blockquote       | あり        | `<blockquote>` + 引用元            |
| 6   | ResourceList    | resource-list    | あり        | resource card 集合                 |
| 7   | EmergencyBanner | emergency-banner | あり        | position fixed top                 |
| 8   | TableControl    | table-control    | なし        | 検索 + ページャ + ソート (組合せ)  |

### 4.2 sub-agent ブリーフへの追加事項

```text
For Carousel / ImageSlider: implement auto-play with `setInterval` started in
`onMounted` and cleared in `onBeforeUnmount`. Provide `autoPlay` and
`interval` props with sensible defaults. Allow pause-on-hover via prop.

For TableControl: do NOT modify DadsTable. This is a sibling component that
emits search / page / sort events. Demo MD must show how to combine with
DadsTable (e.g. parent component wires events).

For EmergencyBanner: use `position: fixed; top: 0; left: 0; right: 0;
z-index: 9999;` and provide `closable` prop. No teleport needed.

For Image: use `loading="lazy"` attribute only — no IntersectionObserver.
Required props: `src`, `alt`. Optional: `width`, `height`, `placeholder` (URL).
```

---

## 5. 検証ループ

Spec 1 / Spec 2 と同じ。最終テスト数: **1240+ tests**.

```bash
pnpm exec prettier --write packages/vue/src/components/{Image,ImageSlider,Carousel,List,Blockquote,ResourceList,EmergencyBanner,TableControl}/ \
  apps/docs/components/{image,image-slider,carousel,list,blockquote,resource-list,emergency-banner,table-control}.md \
  packages/vue/src/index.ts apps/docs/.vitepress/config.ts
pnpm -w run format:check
pnpm -w run typecheck
pnpm -w run lint
pnpm --filter @dads/vue test
pnpm --filter @dads/docs build
ls apps/docs/.vitepress/dist/components/*.html | wc -l   # → 49
```

---

## 6. コミット戦略

- `feat(@dads/vue): add Display-Misc components (Wave 1) — Image / ImageSlider / Carousel / List / Blockquote / ResourceList / EmergencyBanner / TableControl`

オプション: spec 完了時に総括コミット `chore: mark dads-vue full-coverage (49 components)` で README とドキュメントを最終更新。

---

## 7. リスク対策

Spec 1 / 2 を踏襲 + 以下:

| リスク                                            | 検知              | 対策                                                            |
| ------------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| Carousel/ImageSlider のテストが flaky             | CI random failure | brief で「`vi.useFakeTimers()` + `vi.advanceTimersByTime`」明記 |
| EmergencyBanner のテストで `body` への style 漏れ | DOM 副作用        | brief で「`scoped` SCSS のみ / global rule 禁止」明記           |
| List の `<ul>`/`<ol>` 分岐                        | API 設計判断      | brief で「`type='ordered'`/`'unordered'` prop」明記             |
| TableControl の API がフラットすぎる              | re-design 必要    | 初回ラフ実装で OK / 後で別 spec で精緻化可                      |

---

## 8. 完了判定

Spec 1 の AC 表に準拠。本スペックは AC-3 = **1240+ tests**, AC-7 = **49 HTML**.

---

## 9. シリーズ完了後の総括 (本 spec 完了タイミング)

- ルート `README.md` の Status 行を「**全 49 component (公式 46 + 独自 4)**」に更新
- `packages/vue/README.md` の Status 行を更新
- `apps/docs/README.md` の Status 行を更新
- 各 spec の Status を Done に更新

---

## 10. 次フェーズ

承認後に `tasklist.md` を生成。
