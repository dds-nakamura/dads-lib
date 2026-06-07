---
'@dads/vue': major
---

T3 ネイティブ要素化 (Issue #18, 案X フル) — Accordion / Drawer を公式準拠のネイティブ HTML 要素へ作り直し。両者とも DOM 構造・ARIA・公開 API が変わる **破壊的変更**。

### DadsAccordion — 単一 native `<details>/<summary>` へ

`<button aria-expanded>` ベースの管理型 multi-item を廃し、DadsDisclosure と同型の単一 disclosure に統一（公式 accordion は単一 `<details>`、スタックは並置）。

- **新 API**: `title`(必須) / `modelValue`(v-model boolean) / `defaultOpen` / `headingLevel`(1–6, 既定 3) / `disabled` / `backLink` / `backLinkLabel`。default slot = 本文。emits `update:modelValue` / `toggle`。
- **削除**: `items[]` / `type`(single|multiple) / `size`(l|m|s|xs) / 独自矢印キーナビ / `returnLink` / `panel-{id}` slot、型 `DadsAccordionItem` / `DadsAccordionType` / `DadsAccordionSize` / `DadsAccordionReturnLink`。
- アイコンは公式 inline SVG chevron（円形ボーダー内、`[open]` で 180° 回転）。`@media(min-width:48rem)` でアイコン 20→32px の公式レスポンシブ挙動。

### DadsDrawer — native `<dialog>` + `showModal()` + `::backdrop` へ

Teleport + `<div role=dialog>` + 手書き overlay/focus-trap を廃し、ネイティブ `<dialog>` のモーダル（focus-trap / Esc / inert 背景）を採用。本文はフリーフォーム default slot に統一。

- **新 API**: `modelValue`(v-model) / `title`(visually-hidden 名・`aria-labelledby`) / `placement`(`left`|`right`) / `closeLabel`。default slot = 本文。emits `update:modelValue`。
- **削除**: `items` / `DadsDrawerItem`（再帰 item ナビ）/ `click:item` emit / `placement="full"` / `defaultAriaLabel` / `navAriaLabel`、コンポーネント `DadsDrawerItem`。
- 閉じるボタンは公式共有部品 `DadsHamburgerMenuButton`（X アイコン + 「閉じる」）。背景は native `::backdrop`（`opacity-gray-100` / forced-colors で `#000b`）。

### マイグレーション

```vue
<!-- before -->
<DadsAccordion v-model="openId" :items="items" type="multiple" />
<!-- after: 1 項目 = 1 コンポーネント。スタックは並べる -->
<DadsAccordion v-model="open" title="見出し">本文</DadsAccordion>
```

```vue
<!-- before -->
<DadsDrawer v-model="open" :items="items" placement="full" />
<!-- after: 本文は slot。ナビは DadsMenuList 等を流し込む -->
<DadsDrawer v-model="open" title="メニュー" placement="left">
  <DadsMenuList :items="items" type="box" />
</DadsDrawer>
```

`full` placement は廃止（`left` / `right` のみ）。Drawer の item ナビが必要な場合は slot 内に `DadsMenuList` を構成する。
