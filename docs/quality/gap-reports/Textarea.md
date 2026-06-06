# Gap Report: `DadsTextarea`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/Textarea/DadsTextarea.vue` |
| 真実の源 (一次) | `example` |
| 参照パス | `design-system-example-components-html/src/components/textarea/textarea.css` (+ `with-form-control-label.html`, `with-counter.html`) / `dads-document-md/dads/components/textarea/index.md` (存在せず) |
| 総合判定 | ❌ 要修正 |
| 重大度 | high |
| 検出差異数 | 9 |

## 観点別チェック

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | font-family `var(--font-family-sans)`; size `16/16*1rem`(=16px); weight `normal`; **line-height `1.7`** (`--line-height-170`); `letter-spacing: 0.02em` | font-family `var(--font-family-sans, ...)` ✅; size md `var(--font-size-16)` ✅; weight 既定 ✅; **line-height `var(--line-height-150, 1.5)`** (L213); `letter-spacing` 指定なし | ❌ | line-height を `--line-height-170` (1.7) に修正。`letter-spacing: 0.02em` を追加。公式は size 単一(16px)で sm/md/lg バリアントなし |
| カラー (背景 / 文字 / ボーダー: トークン参照) | text `--color-neutral-solid-gray-900`; bg `--color-neutral-white`; border `--color-neutral-solid-gray-600`; error `--color-semantic-error-1`; placeholder/disabled `--color-neutral-solid-gray-420` | text `var(--color-text-primary, #1a1a1a)` (L170); bg `var(--color-bg-surface, #fff)` (L198); border `var(--color-border-default, rgba(0,0,0,0.1))` (L199); error `var(--color-error, #ec0000)` (L188,238,288); placeholder `var(--color-text-disabled, #999)` | ❌ | **使用トークンが全て DADS に存在しない名前**。`--color-text-primary` / `--color-bg-surface` / `--color-border-default` / `--color-error` / `--color-text-disabled` は design-tokens に未定義 → 全て fallback の直値で描画される。正準名 (`--color-neutral-solid-gray-900` 等) に置換必須。特に border 既定が公式 gray-600 (濃いグレー) に対し fallback `rgba(0,0,0,0.1)` (極薄) で見た目が大きく異なる |
| 角丸 (`--border-radius-*`) | **`border-radius: calc(8/16*1rem)` = 8px** → `--border-radius-8` | `var(--border-radius-4, 0.25rem)` = 4px (L188 required, L200 control) | ❌ | control の角丸を `--border-radius-8` (8px) に修正。4px/8px 取り違え |
| スペーシング (padding / gap / margin: `--spacing-*`) | textarea padding `16px` 全辺均一; error-text `margin-top 8px`; counter `margin-top 8px` | padding は size 別: lg `12px 16px` / md `12px` / sm `8px 12px` (L249-262); gap `var(--spacing-4)` | ❌ | **DADS に `--spacing-*` トークンは存在しない**。Vue の `var(--spacing-N)` は全て fallback 直値 (独自 4/8/12/16 スケール)。公式 textarea は padding 一律 16px。md でも 12px になっており公式(16px)と不一致。`--spacing-*` 参照を撤廃し公式値 (16px=1rem 等) に揃える |
| エレベーション / 影 (`--elevation-*`) | 影なし | 影なし | ✅ | 該当なし (focus 時 box-shadow は focus-ring として別観点) |
| ボーダー (太さ / 色 / 有無) | `1px solid var(--color-neutral-solid-gray-600)`; readonly `dashed`; error `--color-semantic-error-1`; disabled `--color-neutral-solid-gray-300` | `1px solid var(--color-border-default, rgba(0,0,0,0.1))` (L199); readonly `dashed` ✅ (L272); error border ✅構造 (L288); disabled は opacity:0.5 のみで border 色変更なし | ⚠️ | 太さ 1px ✅・readonly dashed ✅。ただし既定 border 色トークンが誤り(上記)。disabled が公式は border `gray-300`+bg `gray-50`+text `gray-420` なのに Vue は `opacity:0.5` で一括処理 → 公式と表現が異なる |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | hover: `:not(:read-only)` で border→`--color-neutral-black`; focus-visible: `outline 4px solid black` + `outline-offset 2px` + `box-shadow 0 0 0 2px yellow-300`; error+hover→`--color-primitive-red-1000`; disabled→border/bg/text を gray 系に + `resize:none` | hover→`--color-text-primary` fallback `#1a1a1a` (L267); focus は wrapper の `:focus-within` で **outline 2px + shadow 4px yellow** (focus-ring mixin); error+hover の濃色化なし; disabled は opacity | ❌ | **focus-visible が公式と逆**: 公式は outline **4px** + shadow **2px**、Vue (focus-ring mixin) は outline **2px** + shadow **4px**。さらに公式は textarea 自身が focus を持つが Vue は wrapper `:focus-within` (構造差)。error hover 時の `red-1000` 濃色化が欠落。disabled の見た目差 |
| サイズバリアント (sm/md/lg 等) | **公式 textarea にサイズバリアントは無い** (単一 16px/padding16px) | sm/md/lg の 3 段 (L249-262) | ⚠️ | 公式に存在しない独自バリアント。API 互換のため即削除は不可だが、`md` の値が公式単一サイズ(16px font/16px padding)に一致するよう既定を是正すべき |
| forced-colors / ハイコントラスト | disabled 時 `border-color/color: GrayText` (L58-64) | control に `border: 1px solid CanvasText` (L292-296) | ⚠️ | 公式は disabled 時の GrayText 指定が主眼。Vue は通常時 border を CanvasText 化。disabled の GrayText 対応が欠落 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 構造: `.dads-form-control-label`(label/support-text/requirement) + `<span.dads-textarea>` > `textarea.dads-textarea__textarea` + `.dads-textarea__error-text` / `<dads-textarea-counter>`。border/focus は **textarea 要素自身**が持つ | 独自構造: `.dads-textarea`(root) > `__label`/`__required` + `__control`(wrapper, border/focus 担当) > `__input` + `__footer`(hint/error/counter)。クラス名 `__textarea`→`__input`, `__error-text`→`__error`, label を内蔵化 | ❌ | **公式 form-control-label を再利用せず label/required を独自内蔵**。focus/border を wrapper に移したことで focus-ring の値ズレ(上記)が発生。公式クラス名 (`__textarea`, `__error-text`) と不一致でドリフト温床 |

## 検出した差異 (修正対象)

1. **[high]** カラー: 使用カラートークン名が DADS に全て未定義。`--color-text-primary`/`--color-bg-surface`/`--color-border-default`/`--color-error`/`--color-text-disabled` は design-tokens に存在せず fallback 直値で描画。正準名 (`--color-neutral-solid-gray-900` / `--color-neutral-white` / `--color-neutral-solid-gray-600` / `--color-semantic-error-1` / `--color-neutral-solid-gray-420`) に置換。
   - 該当行: `DadsTextarea.vue:170, 198, 199, 188, 234, 238, 243, 267, 273, 282, 288`
2. **[high]** 角丸: 公式 8px → 現状 4px。`--border-radius-4` を `--border-radius-8` に。
   - 該当行: `DadsTextarea.vue:200`
3. **[high]** 状態(focus): 公式 outline **4px**+shadow **2px** に対し Vue は outline 2px+shadow 4px (focus-ring mixin)。textarea 自身に focus を持たせる公式構造へ寄せるか mixin 値を是正。
   - 該当行: `DadsTextarea.vue:205` (`@include ring.dads-focus-ring-within`) → `_focus-ring.scss:9-13`
4. **[medium]** line-height: 公式 1.7 (`--line-height-170`) → 現状 1.5。
   - 該当行: `DadsTextarea.vue:213`
5. **[medium]** スペーシング: 公式 padding 一律 16px に対し md でも 12px。存在しない `--spacing-*` 依存も撤廃。
   - 該当行: `DadsTextarea.vue:251, 256, 261`
6. **[medium]** disabled 表現: 公式は border `gray-300`/bg `gray-50`/text `gray-420`/`resize:none`。Vue は `opacity:0.5`。
   - 該当行: `DadsTextarea.vue:277-284`
7. **[medium]** 状態(error hover): 公式は error+hover で border→`--color-primitive-red-1000`。Vue に未実装。
   - 該当行: `DadsTextarea.vue:287-289` 付近 (追加要)
8. **[low]** letter-spacing: 公式 `0.02em` 欠落。
   - 該当行: `DadsTextarea.vue:165-170` (root に追加)
9. **[low]** forced-colors: 公式 disabled 時 GrayText 指定が欠落。
   - 該当行: `DadsTextarea.vue:292-296`

## ハードコード / 誤トークンの洗い出し

- `var(--color-text-primary, #1a1a1a)` — L170, L267 (誤トークン名 + fallback 直値)
- `var(--color-error, #ec0000)` — L183, L188, L238, L288 (誤トークン名)
- `var(--color-text-on-primary, #fff)` — L184 (誤トークン名)
- `var(--color-bg-surface, #fff)` — L198 (誤トークン名)
- `var(--color-border-default, rgba(0, 0, 0, 0.1))` — L199 (誤トークン名 + 薄すぎる fallback)
- `var(--color-text-secondary, #4d4d4d)` — L234, L243 (誤トークン名)
- `var(--color-bg-subtle, rgba(0, 0, 0, 0.05))` — L273, L282 (誤トークン名)
- `--spacing-4 / --spacing-8 / --spacing-12 / --spacing-16` — L168, L176, L228, L251, L256, L261 (DADS に存在しないトークン軸)
- `padding: 2px 8px` — L187 (required バッジ: 直書き px)
- `line-height: 1.2` — L190 (直書き)
- 注: `var()` の **fallback 値** 自体は許容方針だが、ここでは「primary トークン名が未定義のため fallback が常用される」点が問題

## 結論

- 修正要否: **要修正 (high)**。カラートークン名が全滅で fallback 描画 + 角丸 4/8 取り違え + focus-ring 値反転と、ビジュアル差異が広範。
- 優先度: 高 (カラートークン名是正・角丸・focus が最優先)。
- 想定 changeset レベル: **patch** (見た目の是正のみ。クラス名変更を伴う構造リファクタまで行う場合は **minor**)。
- API/aria 不変: props/emits は不変で実施可能。ただし sm/md/lg バリアントは公式に無いため、API を保ちつつ `md` 既定値を公式単一サイズに合わせるのが現実的。form-control-label への構造寄せはクラス名(`__input`/`__error`)変更を伴い破壊的になり得るため別 minor で検討。
