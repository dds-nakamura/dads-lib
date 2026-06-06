# Gap Report: `DadsTableOfContents`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/TableOfContents/DadsTableOfContents.vue` |
| 真実の源 (一次) | `wai-aria` (公式 example なし / MD なし) |
| 参照パス | WAI-ARIA Authoring Practices (landmark `nav` + `aria-current`); design-tokens (`design-tokens/examples/tokens.css`) でトークン存在確認 |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 6 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | DADS foundations: `--font-family-sans`, `--font-size-14`, `--line-height-150` 等は実在 | font-family `var(--font-family-sans, ...)` ✅ (L74); size `var(--font-size-14)` ✅ (L75); line-height `var(--line-height-150, 1.5)` ✅ (L76); active `font-weight:700` | ⚠️ | 使用しているタイポトークン名は実在し妥当。active の太字化は妥当だが公式 example がないため WAI-ARIA 観点では問題なし |
| カラー (背景 / 文字 / ボーダー: トークン参照) | DADS 実在トークン: text `--color-neutral-solid-gray-800/900`, link 系は **`--color-brand-*` は未定義**。リンク色は他コンポーネント(link-text)で `--color-...` を使用 | text `var(--color-text-body, #333)` (L77,127); link `var(--color-brand-primary, #0017c1)` (L111); hover `var(--color-brand-primary-hover, #001a9c)` (L118); active `var(--color-brand-primary-active, #001480)` (L123); selected bg `var(--color-bg-selected, rgba(0,23,193,0.08))` (L129); border `var(--color-border-default, rgba(0,0,0,0.42))` (L90) | ❌ | **使用カラートークンが全て DADS に未定義**。`--color-text-body` / `--color-brand-primary(-hover/-active)` / `--color-bg-selected` / `--color-border-default` は design-tokens に存在せず、全て fallback 直値で描画。正準トークン (`--color-neutral-solid-gray-*` 等) に置換必須 |
| 角丸 (`--border-radius-*`) | `--border-radius-4` は実在 | link `var(--border-radius-4, 0.25rem)` (L114) | ✅ | リンクの hover/focus 背景の角丸として 4px は妥当。トークン名も実在 |
| スペーシング (padding / gap / margin: `--spacing-*`) | **DADS に `--spacing-*` トークンは存在しない** | gap `var(--spacing-4)` (L85,88); nested padding-left `var(--spacing-16)` (L89); link padding `var(--spacing-4) var(--spacing-8)` (L115) | ❌ | `--spacing-*` 軸は DADS 未定義 → 全て fallback 直値。公式 example がないため値の正解は WAI-ARIA では規定されないが、存在しないトークン軸への依存は修正対象 (rem 直値か実在トークンへ) |
| エレベーション / 影 (`--elevation-*`) | 該当なし | 影なし | ✅ | 該当なし |
| ボーダー (太さ / 色 / 有無) | nested list に縦罫が一般的 | nested `border-left: 1px solid var(--color-border-default, rgba(0,0,0,0.42))` (L90) | ⚠️ | 1px の縦罫自体は妥当だがトークン名が未定義 (上記カラー参照) |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | WAI-ARIA: 現在地は `aria-current="location"` (実装済 L40,58); focus-visible はキーボード可視 | `aria-current="location"` ✅; focus-ring mixin (outline 2px+shadow 4px) (L108); hover/active 色変更 (L117-124); active(=current) は太字+選択 bg (L126-130) | ✅ | aria-current 実装・focus-ring・hover/active 状態は妥当。disabled/expanded は ToC に非該当 |
| サイズバリアント (sm/md/lg 等) | 該当なし | なし | ✅ | 該当なし (ToC にサイズ軸なし) |
| forced-colors / ハイコントラスト | link→LinkText, current→CanvasText+Highlight, 罫→CanvasText | 実装済 (L134-147) | ✅ | LinkText / Highlight / CanvasText を適切に使用 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 example/共有部品なし。`nav>ul>li>a` の素直な構造が妥当 | `nav > ul.__list > li.__item > a.__link` + nested 同構造 (L28-66) | ✅ | 公式部品がないため独自実装は妥当。構造は素直でセマンティック (nav landmark + list + aria-current) |

## 検出した差異 (修正対象)

1. **[high]** カラー: リンク・テキスト・選択色のトークン名が DADS に全て未定義 (`--color-brand-primary` 系/`--color-text-body`/`--color-bg-selected`/`--color-border-default`)。fallback 直値で描画されている。link-text foundation に整合する実在トークンへ置換。
   - 該当行: `DadsTableOfContents.vue:77, 90, 111, 118, 123, 127, 129`
2. **[medium]** スペーシング: 存在しない `--spacing-*` 軸へ依存。実在トークンか rem 直値へ。
   - 該当行: `DadsTableOfContents.vue:85, 88, 89, 115`
3. **[low]** selected 背景 `rgba(0,23,193,0.08)` は brand 色由来の独自半透明値。foundation に該当トークンがあるか確認し、無ければ neutral 系へ寄せる。
   - 該当行: `DadsTableOfContents.vue:129`
4. **[low]** border-left fallback `rgba(0,0,0,0.42)` は薄め。`--color-neutral-solid-gray-*` 系の実在トークンへ。
   - 該当行: `DadsTableOfContents.vue:90`
5. **[low]** text fallback `#333` は `--color-neutral-solid-gray-800` (実在) 等へ正準化。
   - 該当行: `DadsTableOfContents.vue:77, 127`
6. **[low]** link fallback `#0017c1` 系は link-text foundation のトークンに合わせる。
   - 該当行: `DadsTableOfContents.vue:111, 118, 123`

## ハードコード / 誤トークンの洗い出し

- `var(--color-text-body, #333)` — L77, L127 (誤トークン名)
- `var(--color-brand-primary, #0017c1)` — L111 (誤トークン名)
- `var(--color-brand-primary-hover, #001a9c)` — L118 (誤トークン名)
- `var(--color-brand-primary-active, #001480)` — L123 (誤トークン名)
- `var(--color-bg-selected, rgba(0, 23, 193, 0.08))` — L129 (誤トークン名 + 独自半透明値)
- `var(--color-border-default, rgba(0, 0, 0, 0.42))` — L90 (誤トークン名)
- `--spacing-4 / --spacing-8 / --spacing-16` — L85, L88, L89, L115 (DADS に存在しないトークン軸)
- `text-underline-offset: 2px` — L113 (直書き px、軽微)

## 結論

- 修正要否: **要修正 (high)**。公式 example が無いため構造・状態は妥当だが、カラートークン名が全て未定義で fallback 描画されている点が実害。
- 優先度: 中〜高 (カラートークン名是正が最優先。spacing 軸是正は次点)。
- 想定 changeset レベル: **patch** (トークン参照名の是正のみ。見た目の意図は維持)。
- API/aria 不変: props/emits/`aria-current`/`nav` 構造は不変で実施可能。CSS トークン参照のみの修正で完結する。
