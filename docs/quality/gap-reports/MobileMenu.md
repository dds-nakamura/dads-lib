# Gap Report: `DadsMobileMenu`

> Issue #18 — DADS 公式とのビジュアル差異監査。1 コンポーネント 1 ファイル。

## メタ情報

| 項目 | 値 |
| ---- | ---- |
| Vue 実装 | `packages/vue/src/components/MobileMenu/DadsMobileMenu.vue` |
| 真実の源 (一次) | `md` (+ WAI-ARIA。公式 example HTML/CSS は提供予定で**存在しない**) |
| 参照パス | `dads-document-md/dads/components/mobile-menu/index.md` (HTML版/React版とも「提供予定」) |
| 総合判定 | ⚠️ 軽微差異 |
| 重大度 | medium |
| 検出差異数 | 4 |

## 観点別チェック

> 公式は MD のみで CSS 正準値が無い (HTML 実装「提供予定」)。よって角丸・spacing・色の **絶対正準値は照合不能**。判定は (a) MD の機能仕様充足、(b) 既存共有部品 (DadsMenuList / DadsUtilityLink / focus-ring / tokens) の流用一貫性、(c) ハードコード有無で行う。

| 観点 | 公式 (正準値) | `@dads/vue` 現状 | 判定 | 備考 / 修正方針 |
| ---- | ------------- | ----------------- | ---- | ---------------- |
| タイポグラフィ (font-family / size / weight / line-height) | MD に具体値の記載なし (準備中) | `font-family:var(--font-family-sans,…)` (DadsMobileMenu.vue:245)。panel-title `var(--font-size-16)` `700` `1.4` (:307-309)、back `var(--font-size-14)` (:292) | ✅ (該当正準値なし) | トークン参照で一貫。公式 CSS 不在のため照合不能だが妥当 |
| カラー (背景 / 文字 / ボーダー: トークン参照) | MD に具体値なし | 文字 `var(--color-neutral-solid-gray-800,…)` (:246)、panel 背景 `var(--color-background-base,#fff)` (:262)、各 border `var(--color-neutral-solid-gray-100/50)` (:278,353,389)。**overlay/panel の影は rgba 直書き** (:252,263) | ⚠️ | 文字/背景/border はトークン参照で良。overlay `rgba(0,0,0,0.5)` と panel `0 4px 16px rgba(0,0,0,0.2)` がハードコード |
| 角丸 (`--border-radius-*`) | MD に具体値なし | back/close ボタンに `var(--border-radius-4,0.25rem)` (:290,321)。panel 本体は角丸なし (全幅トップシート) | ✅ (該当正準値なし) | トークン参照。フルスクリーン型パネルに角丸不要は妥当 |
| スペーシング (padding / gap / margin: `--spacing-*`) | MD に具体値なし | header `var(--spacing-8) var(--spacing-16)` (:277)、nav `var(--spacing-8) 0` (:339)、slide-item `var(--spacing-12) var(--spacing-16)` (:365)、utility `var(--spacing-16)` (:388)、各 gap も `--spacing-*` 経由 (:276,287,362) | ✅ | `--spacing-*` トークンを一貫利用。良好 |
| エレベーション / 影 (`--elevation-*`) | MD に具体値なし | panel `box-shadow:0 4px 16px rgba(0,0,0,0.2)` を **直書き** (:263) — `--elevation-*` トークン未使用 | ⚠️ | `--elevation-*` トークンへ寄せるべき (例: drawer/dialog と統一)。直値はドリフト温床 |
| ボーダー (太さ / 色 / 有無) | MD「ディバイダーでセクション分割」 | header `border-bottom:1px solid gray-100` (:278)、slide-item-wrap `border-bottom:1px solid gray-50` (:353)、utility `border-top:1px solid gray-100` (:389) | ✅ | MD のセクション分割方針に合致。トークン参照 |
| 状態 (hover / focus-visible / active / current / disabled / expanded) | MD「2 段階以上にしない」「挙動別アイコン」。focus 具体値なし | back/close/slide-item に共有 `dads-focus-ring` mixin 適用 (:283-284,313-314,357-358)。hover gray-50 (:295,325,371)。slide 親項目に chevron-right、accordion は DadsMenuList の expanded 回転を流用 | ✅ | focus-ring を共有 mixin で統一。MD のアイコン区別 (chevron-right=遷移示唆) を実装 (:213-217)。current/disabled は DadsMenuList 側に委譲 |
| サイズバリアント (sm/md/lg 等) | MD: タイプは「スライド型」「アコーディオン型」の 2 種 (サイズ段階の規定なし) | `type: 'slide' | 'accordion'` を実装 (:29)。サイズ段階は持たない | ✅ | MD の 2 タイプを正確に実装。サイズ段階は公式にも無く該当なし |
| forced-colors / ハイコントラスト | MD に記載なし | `@include dads-forced-colors` で panel/close/back/slide-item に border 補強 (:393-406) | ✅ | 独自強化。良好 |
| 正準CSSの流用 vs 独自実装 (ドリフト温床) | 公式 CSS 不在。MD は「ハンバーガーメニューボタン+ドロワーと併用」、メニュー本体は menu-list 系を想定 | **accordion モードは `DadsMenuList`(type=box) を流用** (:179-184) — 良い流用。**slide モードは独自フラットリスト `dads-mobile-menu__slide-*` を実装** (:188-220, CSS :343-384)。utility は `DadsUtilityLink` 流用 (:223-227) | ⚠️ | accordion/utility は共有部品流用で良。slide-item は独自実装で、本来 menu-list の項目スタイル (min-h 44/padding/hover/focus) と数値がずれる温床 (slide-item min-h 3rem vs menu-list 44px 等) |

## 検出した差異 (修正対象)

1. **[medium]** エレベーション直書き: panel の `box-shadow:0 4px 16px rgba(0,0,0,0.2)` をトークン化。Drawer/Dialog と整合する `--elevation-*` を採用。
   - 該当行: `DadsMobileMenu.vue:263`
2. **[low]** overlay 色直書き: `background-color:rgba(0,0,0,0.5)`。オーバーレイ用トークン (例: `--color-overlay`/`--elevation-*` の慣例) があれば寄せる。Dialog/Drawer のオーバーレイ実装と統一すること。
   - 該当行: `DadsMobileMenu.vue:252`
3. **[low]** slide-item の独自スタイル: min-height `3rem`(48px)・padding `var(--spacing-12) var(--spacing-16)` は menu-list の item (min-h 44px / pad 10px) と数値が不一致。slide も menu-list 系の項目寸法へ寄せると一貫性が増す (公式 CSS 不在のため必須ではない)。
   - 該当行: `DadsMobileMenu.vue:364-365`
4. **[low]** close ボタン min/touch: width/height `2.5rem`(40px) 直書き。タッチターゲット 44px 推奨 (DADS の他コンポーネント min-height 44px 慣例) との整合を検討。
   - 該当行: `DadsMobileMenu.vue:319-320`

## ハードコード / 誤トークンの洗い出し

- `background-color: rgba(0, 0, 0, 0.5);` (`DadsMobileMenu.vue:252`) — overlay 直書き。トークン/共通オーバーレイへ。
- `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);` (`DadsMobileMenu.vue:263`) — `--elevation-*` 未使用の直書き。
- `transform: translateY(-1rem);` (`DadsMobileMenu.vue:424`) — トランジション量の直値 (許容範囲)。
- `width/height: 2.5rem;` (close, `:319-320`)、`min-height: 2.5rem;` (back, `:288`)、`min-height: 3rem;` (slide-item, `:364`) — 寸法直値 (公式 CSS 不在のため誤りとは断定不可、44px 慣例との整合を推奨)。
- 色・spacing の大半は `var(--color-*)` / `var(--spacing-*)` 参照済みで良好。

## 結論

- **修正要否: 任意 (公式 CSS 不在のため必須差異なし)**。ただし影/オーバーレイのトークン化は実施推奨。優先度 **medium (品質一貫性)**。
- 想定 changeset レベル: **patch** (影/オーバーレイのトークン化、寸法の慣例整合は内部スタイルのみ)。
- API・aria 不変: 保てる。`role="dialog"` `aria-modal` `aria-label`、focus trap、`type` props はすべて維持。トークン化は CSS のみで完結。
- 公式 HTML/React 実装が「提供予定」のため、リリース後に正準 CSS が出たら再監査が必要 (本レポートの正準照合は MD ベースの限定的なもの)。
