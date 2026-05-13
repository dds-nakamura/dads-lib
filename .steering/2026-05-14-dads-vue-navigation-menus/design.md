# Design — DADS Vue Navigation-Menus 追加実装 (Spec 2/3)

- Spec ID: `2026-05-14-dads-vue-navigation-menus`
- Depends on: `./requirements.md`
- Status: Draft（承認待ち）
- Last Updated: 2026-05-14

---

## 1. 目的

requirements.md の F1〜F6 を、Spec 1 と同じ sub-agent 並列方式で達成する。**依存があるため 2 wave に分割**する。

---

## 2. 全体アプローチ

Spec 1 (`form-inputs/design.md` §2) と同一。sub-agent ブリーフテンプレートも §4 で同型を流用。

### 2.1 依存関係 (Wave 分割の根拠)

```
基礎部品 (Wave 1):
  MenuList, MenuListBox, HamburgerMenuButton, UtilityLink, ScrollTopButton

合成部品 (Wave 2, Wave 1 完了後に着手):
  GlobalMenu, MegaMenu, PageNavigation, BottomNavigation, MobileMenu
  (→ 内部で MenuList / UtilityLink / HamburgerMenuButton を import する可能性)
```

---

## 3. Wave 分割

| Wave  | 件数 | コンポーネント                                                           |
| ----- | ---- | ------------------------------------------------------------------------ |
| **1** | 5    | MenuList, MenuListBox, HamburgerMenuButton, UtilityLink, ScrollTopButton |
| **2** | 5    | GlobalMenu, MegaMenu, PageNavigation, BottomNavigation, MobileMenu       |

各 wave 5 並列。

---

## 4. Sub-agent ブリーフ・テンプレート

Spec 1 の `form-inputs/design.md` §4.1 テンプレを **そのまま流用**。変数置換のみ:

### 4.1 Wave 1 変数

| #   | NAME                | SLUG                  | HTML 実装例 |
| --- | ------------------- | --------------------- | ----------- |
| 1   | MenuList            | menu-list             | あり        |
| 2   | MenuListBox         | menu-list-box         | あり        |
| 3   | HamburgerMenuButton | hamburger-menu-button | あり        |
| 4   | UtilityLink         | utility-link          | あり        |
| 5   | ScrollTopButton     | scroll-top-button     | なし        |

### 4.2 Wave 2 変数

| #   | NAME             | SLUG              | HTML 実装例 | 依存 (Wave 1)              |
| --- | ---------------- | ----------------- | ----------- | -------------------------- |
| 1   | GlobalMenu       | global-menu       | あり        | MenuList (任意)            |
| 2   | MegaMenu         | mega-menu         | なし        | MenuList                   |
| 3   | PageNavigation   | page-navigation   | なし        | -                          |
| 4   | BottomNavigation | bottom-navigation | なし        | -                          |
| 5   | MobileMenu       | mobile-menu       | なし        | HamburgerMenuButton (任意) |

### 4.3 Wave 2 ブリーフ追加事項

Wave 2 の brief に以下を **追加** で含める:

```text
This component MAY use one or more of the Wave 1 components as building blocks:
- DadsMenuList         (packages/vue/src/components/MenuList/)
- DadsMenuListBox      (packages/vue/src/components/MenuListBox/)
- DadsHamburgerMenuButton (packages/vue/src/components/HamburgerMenuButton/)
- DadsUtilityLink      (packages/vue/src/components/UtilityLink/)

If your component needs a list-style menu inside, import from @dads/vue
(NOT relative path) and pass items via props. Match the official spec's
internal composition.
```

---

## 5. 検証ループ

Spec 1 と同じ。Wave 2 完了後の最終テスト数: **1049+ tests**.

```bash
pnpm exec prettier --write packages/vue/src/components/{MenuList,MenuListBox,HamburgerMenuButton,UtilityLink,ScrollTopButton,GlobalMenu,MegaMenu,PageNavigation,BottomNavigation,MobileMenu}/ \
  apps/docs/components/{menu-list,menu-list-box,hamburger-menu-button,utility-link,scroll-top-button,global-menu,mega-menu,page-navigation,bottom-navigation,mobile-menu}.md \
  packages/vue/src/index.ts apps/docs/.vitepress/config.ts
pnpm -w run format:check
pnpm -w run typecheck
pnpm -w run lint
pnpm --filter @dads/vue test
pnpm --filter @dads/docs build
ls apps/docs/.vitepress/dist/components/*.html | wc -l   # → 41
```

---

## 6. コミット戦略

2 wave 分のコミット:

- `feat(@dads/vue): add Navigation-Menus base components (Wave 1) — MenuList / MenuListBox / HamburgerMenuButton / UtilityLink / ScrollTopButton`
- `feat(@dads/vue): add Navigation-Menus composite components (Wave 2) — GlobalMenu / MegaMenu / PageNavigation / BottomNavigation / MobileMenu`

---

## 7. リスク対策

Spec 1 のリスク表に追加:

| リスク                                          | 検知              | 対策                                                                  |
| ----------------------------------------------- | ----------------- | --------------------------------------------------------------------- |
| Wave 2 で Wave 1 component が未登録             | typecheck error   | main agent が Wave 1 完了直後に index.ts 追記し test green 確認       |
| MegaMenu の DOM 構造が公式 MD で不明確          | review 段階で判明 | sub-agent に「公式 MD の例示がない部分は GlobalMenu HTML を踏襲」明記 |
| MobileMenu と Drawer の役割衝突                 | API 重複          | brief で「Drawer は side panel、MobileMenu は header 内の折畳」明記   |
| ScrollTopButton の scroll listener cleanup 漏れ | テストで warning  | brief で「`onBeforeUnmount` で removeEventListener」を明示            |

---

## 8. 完了判定

Spec 1 の AC 表に準拠。本スペックは AC-3 = **1049+ tests**, AC-7 = **41 HTML**。

---

## 9. 次フェーズ

承認後に `tasklist.md` を生成。
