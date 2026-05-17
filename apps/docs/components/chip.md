# Chip (deprecated)

::: warning Deprecated
旧 `DadsChip` は **deprecated** (2026-05-17)。次のメジャーで削除予定。
公式 DADS slug が `chip-label` と `chip-tag` に分かれているため、用途別に分離した:

- 読み取り専用ラベル → [ChipLabel](./chip-label) (`DadsChipLabel`)
- 対話可能 (closable / clickable) なタグ → [ChipTag](./chip-tag) (`DadsChipTag`)

旧 API は引き続き動作するが、新規実装では分離後の 2 コンポーネントを利用すること。
:::

## マイグレーション

```ts
// 旧 (deprecated)
import { DadsChip } from '@dads/vue'
// 新
import { DadsChipLabel, DadsChipTag } from '@dads/vue'
```

| 旧 (DadsChip)                             | 新                                              |
| ----------------------------------------- | ----------------------------------------------- |
| `<DadsChip>公開中</DadsChip>` (読み取り)  | `<DadsChipLabel>公開中</DadsChipLabel>`         |
| `<DadsChip closable>...</DadsChip>`       | `<DadsChipTag closable>...</DadsChipTag>`       |
| `<DadsChip clickable>フィルタ</DadsChip>` | `<DadsChipTag clickable>フィルタ</DadsChipTag>` |

CSS クラス名も `dads-chip*` から `dads-chip-label*` / `dads-chip-tag*` に分かれているため、独自スタイル上書きしている場合は併せて修正すること。

## 旧 API リファレンス

以下は互換性のために残されている。新規コードでは使用しないこと。

<script setup>
import { ref } from 'vue'
import { DadsChip } from '@dads/vue'

const tags = ref(['東京都', '神奈川県', '千葉県'])
const onClose = (tag) => {
  tags.value = tags.value.filter((t) => t !== tag)
}
</script>

<div class="demo">
  <span class="demo-label">旧 DadsChip (deprecated)</span>
  <div class="demo-row">
    <DadsChip
      v-for="tag in tags"
      :key="tag"
      closable
      color="secondary"
      @close="onClose(tag)"
    >
      {{ tag }}
    </DadsChip>
  </div>
</div>

| Prop         | 型                                                              | デフォルト  |
| ------------ | --------------------------------------------------------------- | ----------- |
| `size`       | `'lg' \| 'md' \| 'sm'`                                          | `'md'`      |
| `color`      | `'primary' \| 'success' \| 'error' \| 'warning' \| 'secondary'` | `'primary'` |
| `closable`   | `boolean`                                                       | `false`     |
| `clickable`  | `boolean`                                                       | `false`     |
| `disabled`   | `boolean`                                                       | `false`     |
| `closeLabel` | `string`                                                        | `'削除'`    |
| `ariaLabel`  | `string`                                                        | -           |
