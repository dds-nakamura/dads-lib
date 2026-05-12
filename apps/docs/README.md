# @dads/docs

`@dads/vue` の VitePress カタログ。26 コンポーネントの API リファレンスとライブデモ。

> Status: Button のみフルデモ。残り 25 コンポーネントは TODO スタブ。

## 起動

```bash
# dev server
pnpm --filter @dads/docs dev

# static build (出力: apps/docs/.vitepress/dist/)
pnpm --filter @dads/docs build

# build 後の preview
pnpm --filter @dads/docs preview
```

## 構成

```
apps/docs/
├── .vitepress/
│   ├── config.ts                 sidebar / nav 定義 (4 カテゴリ)
│   └── theme/
│       ├── index.ts              @dads/tokens/css + @dads/vue/styles を global load
│       └── custom.css            デモ用ユーティリティ (.demo / .demo-row / .demo-label)
├── components/
│   ├── button.md                 ★ フルデモ (variant × size × color × state)
│   └── (他 25 ファイル)          TODO スタブ
├── index.md                      ホーム (hero + features)
└── package.json
```

## コンポーネントページの書き方

VitePress の SFC サポートを使う。`<script setup>` で `@dads/vue` から import して MD 内で直接使う:

```md
# Button

<script setup>
import { ref } from 'vue'
import { DadsButton } from '@dads/vue'

const count = ref(0)
</script>

<div class="demo">
  <DadsButton @click="count++">Click ({{ count }})</DadsButton>
</div>
```

## ビルド検証

`pnpm --filter @dads/docs build` で `dist/components/button.html` に SSR された Button が出力される。CI でもこのビルドが走る。
