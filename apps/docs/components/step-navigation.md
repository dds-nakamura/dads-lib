# StepNavigation

複数ステップから成るフロー (申込み・登録・支払い等) の進行状況を可視化するナビゲーション。各ステップは `pending` / `current` / `done` / `error` のいずれかの状態を持つ。

## 基本

`steps` 配列に各ステップの `title` と `status` を渡す。`status` を省略すると `pending` 扱いになる。

<script setup>
import { computed, ref } from 'vue'
import { DadsStepNavigation, DadsButton } from '@dads/vue'

const currentStep = ref(1)
const labels = ['入力', '確認', '完了']

const steps = computed(() =>
  labels.map((title, idx) => ({
    title,
    status:
      idx < currentStep.value
        ? 'done'
        : idx === currentStep.value
          ? 'current'
          : 'pending',
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

const verticalSteps = [
  { title: 'アカウント作成', status: 'done' },
  { title: 'プロフィール設定', status: 'current' },
  { title: '本人確認', status: 'pending' },
  { title: '完了', status: 'pending' },
]

const allStatuses = [
  { title: '入力', status: 'done' },
  { title: '確認', status: 'current' },
  { title: '支払い', status: 'pending' },
  { title: '失敗', status: 'error' },
]

const staticSteps = [
  { title: '受付', status: 'done' },
  { title: '審査', status: 'current' },
  { title: '通知', status: 'pending' },
]
</script>

<div class="demo">
  <DadsStepNavigation :steps="steps" @click:step="onStepClick" />
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
    status: idx < currentStep.value ? 'done' : idx === currentStep.value ? 'current' : 'pending',
  })),
)

const onStepClick = (_step, index) => {
  currentStep.value = index
}
</script>

<template>
  <DadsStepNavigation :steps="steps" @click:step="onStepClick" />
</template>
```

## Orientation

2 つの向き (`horizontal` / `vertical`)。デフォルトは `horizontal`。縦並びは項目が多いフォームやサイドバー配置に向く。

<div class="demo">
  <span class="demo-label">Horizontal (default)</span>
  <DadsStepNavigation :steps="verticalSteps" />
  <span class="demo-label" style="margin-top:1.5rem">Vertical</span>
  <div style="max-width:20rem">
    <DadsStepNavigation orientation="vertical" :steps="verticalSteps" />
  </div>
</div>

## 状態

各ステップは `status` プロパティで 4 つの状態を取る。`done` はチェックマーク、`error` はバツマーク、`current` は強調表示、`pending` はステップ番号を表示する。

<div class="demo">
  <DadsStepNavigation :steps="allStatuses" :clickable="false" />
</div>

```ts
const steps = [
  { title: '入力', status: 'done' },
  { title: '確認', status: 'current' },
  { title: '支払い', status: 'pending' },
  { title: '失敗', status: 'error' },
]
```

## クリック不可 (静的表示)

`clickable` を `false` にするとステップは `<div>` でレンダリングされ、`click:step` イベントは発火しない。進行状況の表示のみが目的の場合に使用する。

<div class="demo">
  <DadsStepNavigation :steps="staticSteps" :clickable="false" />
</div>

```vue
<DadsStepNavigation :steps="staticSteps" :clickable="false" />
```

## カスタム aria-label

`ariaLabel` で `<nav>` 要素の説明を上書きできる。複数のステップナビゲーションを同じページに置く場合は識別のため必ず指定する。

```vue
<DadsStepNavigation :steps="steps" aria-label="申込みステップ" />
```

## Props

| Prop          | 型                           | デフォルト     | 説明                                                                      |
| ------------- | ---------------------------- | -------------- | ------------------------------------------------------------------------- |
| `steps`       | `DadsStepNavigationStep[]`   | -              | ステップ定義の配列 (必須)                                                 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | レイアウト方向                                                            |
| `clickable`   | `boolean`                    | `true`         | `true` で `<button>` レンダリング & `click:step` 発火、`false` で `<div>` |
| `ariaLabel`   | `string`                     | `'ステップ'`   | 包含する `<nav>` 要素のアクセシブル名                                     |

### `DadsStepNavigationStep`

| フィールド | 型                                            | デフォルト  | 説明                               |
| ---------- | --------------------------------------------- | ----------- | ---------------------------------- |
| `title`    | `string`                                      | -           | ステップのラベル (必須)            |
| `status`   | `'pending' \| 'current' \| 'done' \| 'error'` | `'pending'` | ステップの状態。省略時は `pending` |

## Events

| Event        | Payload                                                            | 説明                                                                        |
| ------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| `click:step` | `(step: DadsStepNavigationStep, index: number, event: MouseEvent)` | クリック可能なステップが押されたとき発火 (`clickable=false` 時は発火しない) |

## アクセシビリティ

- ルートは `<nav>` 要素でレンダリングされ、`ariaLabel` (デフォルト `'ステップ'`) でラベル付けされる
- 現在のステップ (`status: 'current'`) には `aria-current="step"` が自動付与される
- ステップ番号やチェック/バツアイコン (indicator) は装飾扱いとして `aria-hidden="true"` が付き、スクリーンリーダは `title` のみ読み上げる
- `clickable=true` の既定では各ステップが `<button type="button">` になり、Tab キーで順次フォーカス移動できる
- ステップ間のコネクタ線も `aria-hidden="true"` で支援技術には公開されない
