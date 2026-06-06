# NotificationBanner

ページ内に通知・状態変化・エラーを表示する帯状のメッセージ。色によって `role` と `aria-live` が自動で切り替わる。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsNotificationBanner, DadsButton } from '@dads/vue'

const visible = ref(true)
const reopen = () => { visible.value = true }
</script>

<div class="demo">
  <DadsNotificationBanner message="新しいお知らせがあります。" />
</div>

```vue
<script setup>
import { DadsNotificationBanner } from '@dads/vue'
</script>

<template>
  <DadsNotificationBanner message="新しいお知らせがあります。" />
</template>
```

## Color

5 つの semantic color (`info` / `success` / `warning` / `error` / `neutral`)。デフォルトは `info`。
`error` / `warning` は `role="alert"`、それ以外は `role="status"` が自動付与される。

<div class="demo">
  <span class="demo-label">Info (default)</span>
  <DadsNotificationBanner color="info" message="新しい機能が公開されました。" :closable="false" />
  <span class="demo-label" style="margin-top:1rem">Success</span>
  <DadsNotificationBanner color="success" message="保存が完了しました。" :closable="false" />
  <span class="demo-label" style="margin-top:1rem">Warning</span>
  <DadsNotificationBanner color="warning" message="入力内容に注意が必要です。" :closable="false" />
  <span class="demo-label" style="margin-top:1rem">Error</span>
  <DadsNotificationBanner color="error" message="エラーが発生しました。" :closable="false" />
  <span class="demo-label" style="margin-top:1rem">Neutral</span>
  <DadsNotificationBanner color="neutral" message="メンテナンスのお知らせです。" :closable="false" />
</div>

## タイトル付き

`title` を指定するとメッセージの上に太字のタイトルが表示される。

<div class="demo">
  <DadsNotificationBanner
    color="success"
    title="保存しました"
    message="変更内容はすべて保存されました。"
    :closable="false"
  />
</div>

```vue
<DadsNotificationBanner
  color="success"
  title="保存しました"
  message="変更内容はすべて保存されました。"
/>
```

## 閉じる

`closable`（デフォルト `true`）で閉じるボタンを表示する。クリックすると `update:modelValue` と `close` が発火し、`v-model` で表示状態を制御できる。

<div class="demo">
  <DadsNotificationBanner
    v-model="visible"
    color="info"
    title="お知らせ"
    message="このバナーは閉じることができます。"
  />
  <div class="demo-row" style="margin-top:1rem">
    <DadsButton variant="outline" size="sm" @click="reopen" :disabled="visible">
      再表示
    </DadsButton>
  </div>
</div>

```vue
<script setup>
import { ref } from 'vue'
import { DadsNotificationBanner } from '@dads/vue'

const visible = ref(true)
</script>

<template>
  <DadsNotificationBanner
    v-model="visible"
    title="お知らせ"
    message="このバナーは閉じることができます。"
  />
</template>
```

## デザインスタイル (style) [NEW]

公式 DADS は 2 つのスタイルを定義する。`style` プロップで切替 (デフォルト `'standard'`)。

- `'standard'`: 角丸ボーダー + 塗りつぶし背景 (色チップなし)。視覚的に強く目立つ。
- `'color-chip'`: 白背景 + 左端にカラーアクセントバー。静的なお知らせ・情報パネルに向く控えめなスタイル。

<div class="demo">
  <span class="demo-label">style="standard" (default)</span>
  <DadsNotificationBanner color="info" message="標準スタイル" :closable="false" />
  <span class="demo-label" style="margin-top:1rem">style="color-chip"</span>
  <DadsNotificationBanner color="info" style="color-chip" message="カラーチップスタイル" :closable="false" />
  <DadsNotificationBanner color="success" style="color-chip" message="完了通知 (color-chip)" :closable="false" />
  <DadsNotificationBanner color="warning" style="color-chip" message="警告 (color-chip)" :closable="false" />
</div>

```vue
<DadsNotificationBanner color="success" style="color-chip" message="保存しました" />
```

## タイムスタンプ (timestamp) [NEW]

`timestamp` プロップに ISO 文字列または Date を渡すと、本文の下に `<time datetime>` でレンダリングされる。

<div class="demo">
  <DadsNotificationBanner
    color="info"
    title="メンテナンスのお知らせ"
    message="2026 年 5 月 17 日 22:00〜23:00 にサーバメンテナンスを実施します。"
    timestamp="2026-05-17T10:30:00+09:00"
    :closable="false"
  />
</div>

```vue
<DadsNotificationBanner
  color="info"
  title="メンテナンス"
  message="..."
  timestamp="2026-05-17T10:30:00+09:00"
/>

<!-- Date オブジェクトを渡すと自動で locale 整形 + ISO datetime 出力 -->
<DadsNotificationBanner :timestamp="new Date()" message="..." />
```

## 閉じた状態を保持 (persistKey) [NEW]

`persistKey` を指定すると、閉じる操作で `localStorage` にキー (`'closed'`) が書き込まれ、次回マウント時に自動で非表示状態を復元する (ユーザーが手動で `localStorage.removeItem(persistKey)` するか、別のキーに変更するまで)。

```vue
<DadsNotificationBanner
  color="info"
  title="新機能のご案内"
  message="2026 年 5 月リリースの新機能をご紹介します"
  persist-key="notice-2026-05-new-feature"
/>
```

SSR ページや プライベートブラウジング (`localStorage` 例外) にも安全にフォールバックする。

## 閉じるボタン非表示

`closable` を `false` にすると閉じるボタンを描画しない。常時表示するシステム告知などに使う。

<div class="demo">
  <DadsNotificationBanner
    color="warning"
    title="注意"
    message="この操作は取り消せません。"
    :closable="false"
  />
</div>

## closeLabel のカスタマイズ

閉じるボタンの `aria-label` は `closeLabel` で上書きできる（デフォルト `"閉じる"`）。

```vue
<DadsNotificationBanner message="..." close-label="Dismiss" />
```

## Slot

| Slot      | 説明                                                             |
| --------- | ---------------------------------------------------------------- |
| `default` | 本文。指定時は `message` プロップより優先される                  |
| `icon`    | アイコン領域。未指定時は color に応じた Material Symbols アイコンが描画される |
| `action`  | 本文と閉じるボタンの間に置くアクションエリア（再試行ボタンなど） |

```vue
<DadsNotificationBanner color="error" title="送信に失敗しました">
  ネットワーク接続を確認してください。
  <template #action>
    <DadsButton size="sm" variant="outline" color="error">再試行</DadsButton>
  </template>
</DadsNotificationBanner>
```

## Props

| Prop         | 型                                                         | デフォルト   | 説明                                                             |
| ------------ | ---------------------------------------------------------- | ------------ | ---------------------------------------------------------------- |
| `modelValue` | `boolean`                                                  | `true`       | 表示状態。`v-model` のターゲット                                 |
| `color`      | `'success' \| 'error' \| 'warning' \| 'info' \| 'neutral'` | `'info'`     | セマンティックカラー。背景色・テキスト色・既定アイコンを決定     |
| `style`      | `'standard' \| 'color-chip'`                               | `'standard'` | デザインスタイル                                                 |
| `title`      | `string`                                                   | -            | メッセージ上部に表示する太字タイトル                             |
| `message`    | `string`                                                   | -            | 本文テキスト。`default` slot 指定時はそちらが優先される          |
| `closable`   | `boolean`                                                  | `true`       | 閉じるボタンの表示有無                                           |
| `closeLabel` | `string`                                                   | `'閉じる'`   | 閉じるボタンの `aria-label`                                      |
| `timestamp`  | `string \| Date`                                           | -            | 本文下に `<time datetime>` で表示。Date は自動で ISO+locale 整形 |
| `persistKey` | `string`                                                   | -            | 指定時、閉じた状態を `localStorage` に保持し次回マウント時に復元 |

## Events

| Event               | Payload   | 説明                                        |
| ------------------- | --------- | ------------------------------------------- |
| `update:modelValue` | `boolean` | 閉じるボタン押下時に `false` が emit される |
| `close`             | -         | 閉じるボタン押下時に発火                    |

## アクセシビリティ

- `color="error"` は `role="alert"` + `aria-live="assertive"`（即時読み上げ）
- `color="warning"` は `role="alert"` + `aria-live="polite"`（割り込みなしで告知）
- `color="success"` / `info"` / `neutral"` は `role="status"` + `aria-live="polite"`
- 閉じるボタンには `aria-label`（デフォルト `"閉じる"`）が常に付与される
- アイコンは `aria-hidden="true"`。情報はテキスト側で完結させること
