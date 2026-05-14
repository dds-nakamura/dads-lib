# Requirements — DADS Vue Navigation-Menus 追加実装 (Spec 2/3)

- Spec ID: `2026-05-14-dads-vue-navigation-menus`
- Owner: nakamura_kouji
- Status: **Done（2026-05-14 完了）**
- Last Updated: 2026-05-14
- Depends on: `2026-05-14-dads-vue-form-inputs` (Spec 1 完了後着手推奨)
- Sibling specs: Spec 1 (Form-Inputs), Spec 3 (Display-Misc)

---

## 1. 背景・目的

DADS 公式仕様 46 件のうち、Navigation-Menus カテゴリの **10 件** を `@dads/vue` に追加する。

### 採用する方針

Spec 1 と同じ:

- DADS 公式仕様 (`dads-document-md/dads/components/<slug>/index.md`) を真実の源
- HTML 実装サンプル (`design-system-example-components-html/src/components/<slug>/`) を参照
- 既存 26 component の API 命名規則踏襲
- 実装と同時にテスト作成
- sub-agent 並列実装

---

## 2. スコープ

### In Scope (本スペックで完了する 10 件)

| #   | 公式 slug               | 実装名                    | 用途                      | HTML 実装例 |
| --- | ----------------------- | ------------------------- | ------------------------- | ----------- |
| 1   | `global-menu`           | `DadsGlobalMenu`          | グローバルナビ            | あり        |
| 2   | `mega-menu`             | `DadsMegaMenu`            | メガメニュー (グローバル) | なし        |
| 3   | `page-navigation`       | `DadsPageNavigation`      | ページ内ナビ (TOC)        | なし        |
| 4   | `bottom-navigation`     | `DadsBottomNavigation`    | モバイル下部ナビ          | なし        |
| 5   | `mobile-menu`           | `DadsMobileMenu`          | モバイル用メニュー        | なし        |
| 6   | `hamburger-menu-button` | `DadsHamburgerMenuButton` | ハンバーガー開閉ボタン    | あり        |
| 7   | `menu-list`             | `DadsMenuList`            | メニューリスト            | あり        |
| 8   | `menu-list-box`         | `DadsMenuListBox`         | リストボックス型メニュー  | あり        |
| 9   | `scroll-top-button`     | `DadsScrollTopButton`     | トップへ戻るボタン        | なし        |
| 10  | `utility-link`          | `DadsUtilityLink`         | ユーティリティリンク      | あり        |

合計: **10 ファイルセット** × 平均 4 ファイル + 周辺更新 = **約 45 ファイル**

### Out of Scope

- Spec 1 / Spec 3 の対象コンポーネント
- 既存 component の改変
- header-container / drawer (既存 Header / Drawer に統合済)

---

## 3. 機能要件

Spec 1 の F1〜F6 と **完全に同一**。本スペック固有の補足:

- **FR-3.X** `MegaMenu` / `MobileMenu` は内部に複数の `MenuList` を含むため、`DadsMenuList` 実装後に依存させる。Wave 分割で順序を制御。
- **FR-3.Y** `ScrollTopButton` は scroll position 検知が必要 → `IntersectionObserver` または `window.scroll` リスナを `onMounted` で登録
- **FR-3.Z** `HamburgerMenuButton` は **既存 Header の `showMenuToggle` slot で使われる pattern を流用** (依存破壊しないこと)

---

## 4. 非機能要件

Spec 1 と同じ。1 wave あたりの所要時間目安は Form-Inputs より長め (**50〜60 分**)。

---

## 5. 受入基準 (Acceptance Criteria)

- [ ] **AC-1** 10 新規ディレクトリが存在
- [ ] **AC-2** `packages/vue/src/index.ts` に 10 件 export 追記
- [ ] **AC-3** `pnpm --filter @dads/vue test` で **1049+ tests pass** (Spec 1 完了状態 974 + 新規 150〜200)
- [ ] **AC-4** typecheck / lint / format クリーン
- [ ] **AC-5** sidebar に 10 件追加 (Navigation カテゴリ末尾)
- [ ] **AC-6** demo MD 10 件
- [ ] **AC-7** docs build で 41 HTML (既存 31 + 新規 10)
- [ ] **AC-8** 公式仕様準拠
- [ ] **AC-9** 2 wave コミット (or 1 wave) が git log に記録

---

## 6. リスク・前提

| ID  | 内容                                   | 影響   | 対策                                                                 |
| --- | -------------------------------------- | ------ | -------------------------------------------------------------------- |
| R-1 | `MegaMenu` の内部構造が DADS MD で曖昧 | High   | 既存 GlobalMenu の HTML を **container として再利用** / 公式 MD 優先 |
| R-2 | Wave 内の依存 (MenuList → MegaMenu)    | High   | 2 wave 分割: Wave 1 (基礎) → Wave 2 (依存先)                         |
| R-3 | `BottomNavigation` の icon font 依存   | Medium | `@mdi/font` ロード前提を Button と同じくドキュメント注記             |
| R-4 | `ScrollTopButton` の SSR/teleport      | Medium | `<ClientOnly>` 不要 / `IntersectionObserver` を `onMounted` で wrap  |
| R-5 | sub-agent 並列度が 10 で破綻           | Medium | 5 + 5 の 2 wave に分割                                               |

### 前提

- Spec 1 が完了している (974 tests pass + 31 demo MD)
- 同じインフラ (vitest / pnpm / VitePress) を流用
- `dads-document-md/dads/components/<slug>/index.md` が 10 件すべて存在することを **前提条件チェック** で確認

---

## 7. 次フェーズへの引き継ぎ

承認後に `design.md` (sub-agent ブリーフ) と `tasklist.md` (2 wave 分割) を作成する。
