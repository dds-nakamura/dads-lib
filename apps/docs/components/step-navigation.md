# StepNavigation

複数ステップから成るフロー (申込み・登録・支払い等) の進行状況を可視化するナビゲーション。DADS 公式 (`design-system-example-components-html` / step-navigation) の正準マークアップ・クラス体系 (`__step` / `__header` / `__number` / `__description`) をそのまま移植している。

各ステップは `reached` / `completed` / `error` / `skipped` / `editing` の状態 (`status`) を取り、現在地は `current` (0 始まりインデックス) で指定する。`current` のステップには `aria-current="step"` が付与される。

## 基本

`steps` 配列に各ステップの `title`・`description`・`status` を渡し、`current` で現在のステップを指定する。`status` を省略したステップは「未到達 (upcoming)」として番号のみ表示される。

<script setup>
import { computed, ref } from 'vue'
import { DadsStepNavigation, DadsButton } from '@dads/vue'

const currentStep = ref(1)
const labels = ['入力', '確認', '完了']

const steps = computed(() =>
  labels.map((title, idx) => ({
    title,
    description: 'ステップの説明が入ります。',
    status: idx < currentStep.value ? 'completed' : undefined,
  })),
)

const prev = () => {
  if (currentStep.value > 0) currentStep.value -= 1
}
const next = () => {
  if (currentStep.value < labels.length - 1) currentStep.value += 1
}
const onStepClick = (_step, index) => {
  currentStep.value = index
}

const sizeSteps = [
  { title: 'アカウント作成', description: '説明文', status: 'completed' },
  { title: 'プロフィール設定', description: '説明文' },
  { title: '本人確認', description: '説明文' },
]

const allStatuses = [
  { title: '到達済み', description: '説明文', status: 'reached' },
  { title: '完了', description: '説明文', status: 'completed' },
  { title: '編集中', description: '説明文', status: 'editing' },
  { title: 'エラー', description: '説明文', status: 'error' },
  { title: 'スキップ', description: '説明文', status: 'skipped' },
  { title: '未到達', description: '説明文' },
]

const staticSteps = [
  { title: '受付', description: '説明文', status: 'completed' },
  { title: '審査', description: '説明文' },
  { title: '通知', description: '説明文' },
]
</script>

<div class="demo">
  <DadsStepNavigation :steps="steps" :current="currentStep" @click:step="onStepClick" />
  <div class="demo-row" style="margin-top:1rem">
    <DadsButton variant="outline" size="sm" @click="prev" :disabled="currentStep === 0">戻る</DadsButton>
    <DadsButton size="sm" @click="next" :disabled="currentStep === labels.length - 1">次へ</DadsButton>
  </div>
</div>

```vue
<script setup>
import { computed, ref } from 'vue'
import { DadsStepNavigation } from '@dads/vue'

const currentStep = ref(1)
const labels = ['入力', '確認', '完了']

const steps = computed(() =>
  labels.map((title, idx) => ({
    title,
    status: idx < currentStep.value ? 'completed' : undefined,
  })),
)

const onStepClick = (_step, index) => {
  currentStep.value = index
}
</script>

<template>
  <DadsStepNavigation :steps="steps" :current="currentStep" @click:step="onStepClick" />
</template>
```

## Size

`size` プロパティで公式の `data-size` を切り替える (`normal` / `small`)。`normal` は番号 44px・タイトル 18px、`small` は番号 32px・タイトル 16px。デフォルトは `normal`。

<div class="demo">
  <span class="demo-label">normal (default)</span>
  <DadsStepNavigation :steps="sizeSteps" :current="1" />
  <span class="demo-label" style="margin-top:1.5rem">small</span>
  <DadsStepNavigation size="small" :steps="sizeSteps" :current="1" />
</div>

```vue
<DadsStepNavigation size="small" :steps="steps" :current="1" />
```

## Orientation

2 つの向き (`horizontal` / `vertical`)。デフォルトは `horizontal`。縦並びは項目が多いフォームやサイドバー配置に向く。

<div class="demo">
  <span class="demo-label">Horizontal (default)</span>
  <DadsStepNavigation :steps="sizeSteps" :current="1" />
  <span class="demo-label" style="margin-top:1.5rem">Vertical</span>
  <div style="max-width:24rem">
    <DadsStepNavigation orientation="vertical" :steps="sizeSteps" :current="1" />
  </div>
</div>

## 状態

各ステップは `status` で公式の `data-state` を表現する。`completed` はチェックアイコン + 「完了」(視覚的に非表示)、`editing` は編集アイコン + 「編集中」ラベル、`error` は警告アイコン + 「エラー」ラベル、`skipped` は破線の番号 + 「スキップされました」(視覚的に非表示)、`reached` は番号を gray-800 で塗りつぶす。`status` 未指定は未到達。

<div class="demo">
  <DadsStepNavigation :steps="allStatuses" :current="0" :clickable="false" />
</div>

```ts
const steps = [
  { title: '到達済み', status: 'reached' },
  { title: '完了', status: 'completed' },
  { title: '編集中', status: 'editing' },
  { title: 'エラー', status: 'error' },
  { title: 'スキップ', status: 'skipped' },
  { title: '未到達' }, // status 省略 = 未到達
]
```

## クリック不可 (静的表示)

`clickable` を `false` にすると各ステップ header は `<span>` でレンダリングされ、`click:step` イベントは発火しない。進行状況の表示のみが目的の場合に使用する。

<div class="demo">
  <DadsStepNavigation :steps="staticSteps" :current="1" :clickable="false" />
</div>

```vue
<DadsStepNavigation :steps="staticSteps" :current="1" :clickable="false" />
```

## リンクとして表示

各ステップに `href` を指定すると、その header は `<a href>` としてレンダリングされる (`current` / `disabled` のステップは除く)。

```ts
const steps = [
  { title: '入力', href: '/apply/input', status: 'completed' },
  { title: '確認', href: '/apply/confirm' },
]
```

## カスタム aria-label

`ariaLabel` で `<nav>` 要素の説明を上書きできる。複数のステップナビゲーションを同じページに置く場合は識別のため必ず指定する。

```vue
<DadsStepNavigation :steps="steps" :current="1" aria-label="申込みステップ" />
```

## マイグレーション (案X / 破壊的変更)

このコンポーネントは公式正準構造への移行のため **MAJOR 破壊的変更** を含む。旧 API からの移行:

| 旧 (〜v?)                                                    | 新 (案X)                                                                          |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `status: 'pending'`                                          | `status` を省略 (未到達)                                                          |
| `status: 'current'`                                          | `status` を省略し `current` prop で指定 (`aria-current="step"` 自動付与)          |
| `status: 'done'`                                             | `status: 'completed'`                                                             |
| `status: 'error'`                                            | `status: 'error'` (変更なし)                                                      |
| クラス `__item` / `__button` / `__indicator` / `__connector` | `__step` / `__header` / `__number` (connector は `::before` / `::after` 疑似要素) |
| `--horizontal` / `--vertical` 修飾クラス                     | `data-orientation` 属性                                                           |
| (なし)                                                       | `size` prop → `data-size="normal\|small"`                                         |

## Props

| Prop          | 型                           | デフォルト     | 説明                                                                                 |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| `steps`       | `DadsStepNavigationStep[]`   | -              | ステップ定義の配列 (必須)                                                            |
| `current`     | `number`                     | -              | 現在のステップの 0 始まりインデックス。`aria-current="step"` が付与される            |
| `size`        | `'normal' \| 'small'`        | `'normal'`     | サイズバリアント → `data-size`                                                       |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | レイアウト方向 → `data-orientation`                                                  |
| `clickable`   | `boolean`                    | `true`         | `true` で操作可能なステップを `<button>` 化 & `click:step` 発火、`false` で `<span>` |
| `ariaLabel`   | `string`                     | `'ステップ'`   | 包含する `<nav>` 要素のアクセシブル名                                                |
| `reached`     | `number`                     | (自動算出)     | 視覚的に非表示の進捗サマリ用の到達ステップ数。省略時は状態から算出                   |

### `DadsStepNavigationStep`

| フィールド    | 型                                                              | デフォルト | 説明                                             |
| ------------- | --------------------------------------------------------------- | ---------- | ------------------------------------------------ |
| `title`       | `string`                                                        | -          | ステップのラベル (必須)                          |
| `description` | `string`                                                        | -          | 補足説明 (`__description` に表示)                |
| `status`      | `'reached' \| 'completed' \| 'error' \| 'skipped' \| 'editing'` | -          | 状態 → `data-state`。省略時は未到達              |
| `href`        | `string`                                                        | -          | 指定すると header が `<a href>` になる           |
| `disabled`    | `boolean`                                                       | `false`    | `<button>` header を無効化 (`href` 指定時は無視) |

## Events

| Event        | Payload                                                            | 説明                                                  |
| ------------ | ------------------------------------------------------------------ | ----------------------------------------------------- |
| `click:step` | `(step: DadsStepNavigationStep, index: number, event: MouseEvent)` | 操作可能なステップ (button / link) が押されたとき発火 |

## アクセシビリティ

- ルートは `<nav>` 要素でレンダリングされ、`ariaLabel` (デフォルト `'ステップ'`) でラベル付けされる
- 先頭に「全 N ステップ中、M ステップ目まで到達済み」の進捗サマリが視覚的に非表示 (`.dads-u-visually-hidden`) で挿入される
- 現在のステップ (`current`) には `aria-current="step"` が自動付与され、header は操作不可の `<span>` になる
- 各 `__number` には「ステップ」ラベルが視覚的に非表示で前置され、`completed` / `skipped` では状態名 (「完了」「スキップされました」) も視覚的に非表示で読み上げられる
- `editing` / `error` は視覚ラベル (`__state-label`) として表示され、`state-icon` (SVG) は `aria-hidden="true"`
- `clickable=true` の既定では操作可能なステップが `<button type="button">` になり、Tab キーで順次フォーカス移動できる
- フォーカスリングは公式同様 `__number` に描画される (4px black outline + 2px yellow-300 shadow)
