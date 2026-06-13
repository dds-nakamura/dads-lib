# EmergencyBanner

ユーザーの生命や財産に関わる **緊急事態のみ** に使用する、ファーストビューを占有する最高優先度の通知バナー。DADS 公式仕様に従い、原則ユーザーによる非表示は行わない。

> アクセシビリティ最優先: `role="alert"` + `aria-live="assertive"` でスクリーンリーダーに即時読み上げを強制する。長期掲載が必要な情報は [NotificationBanner](./notification-banner.md) を使用すること。

## 基本

<script setup>
import { ref } from 'vue'
import { DadsEmergencyBanner, DadsButton } from '@dads/vue'

const visible = ref(true)
const reopen = () => { visible.value = true }
</script>

<div class="demo">
  <DadsEmergencyBanner
    message="○○地区に避難準備情報が発令されました。お年寄りの方等避難に時間がかかる方は、直ちに指定避難所へ避難してください。"
    style="position: static;"
  />
</div>

```vue
<script setup>
import { DadsEmergencyBanner } from '@dads/vue'
</script>

<template>
  <DadsEmergencyBanner
    message="○○地区に避難準備情報が発令されました。直ちに指定避難所へ避難してください。"
  />
</template>
```

> 実運用では `position: fixed; top: 0;` でビューポート最上部に固定される。デモでは `position: static` で上書きしている。

## タイトル付き

`title` を指定すると、メッセージの上に太字の見出しが表示される。タイトルは「【緊急】」で始め、全角30文字以内 / モバイル2行以内が DADS 推奨。

<div class="demo">
  <DadsEmergencyBanner
    title="【緊急】〇〇地区に避難準備情報が発令されました"
    message="1時23分に○○地区に対して避難準備情報が発令されました。指定避難所へ避難してください。"
    style="position: static;"
  />
</div>

```vue
<DadsEmergencyBanner
  title="【緊急】〇〇地区に避難準備情報が発令されました"
  message="1時23分に○○地区に対して避難準備情報が発令されました。"
/>
```

## アクションリンク

`linkLabel` と `linkHref` の両方を指定すると、本文の下に CTA リンクボタンが描画される。リンク先は **1つまで**。

<div class="demo">
  <DadsEmergencyBanner
    title="【緊急】避難情報"
    message="指定避難所の場所を確認してください。"
    link-label="指定避難所を確認する"
    link-href="#shelter"
    style="position: static;"
  />
</div>

```vue
<DadsEmergencyBanner
  title="【緊急】避難情報"
  message="指定避難所の場所を確認してください。"
  link-label="指定避難所を確認する"
  link-href="/shelter"
/>
```

## アイコン

`iconName` で Material Symbols のアイコンを差し替えられる（デフォルト `warning`）。空文字を渡すとアイコンを描画しない。

<div class="demo">
  <DadsEmergencyBanner
    title="火災発生"
    message="ただちに最寄りの非常口から避難してください。"
    icon-name="local_fire_department"
    style="position: static;"
  />
</div>

```vue
<DadsEmergencyBanner
  title="火災発生"
  message="ただちに最寄りの非常口から避難してください。"
  icon-name="local_fire_department"
/>
```

## 閉じる（プレビュー用途のみ）

DADS 仕様では緊急時バナーをユーザーが閉じることは想定されないが、編集プレビューや訓練モードで一時的に閉じたい場合は `closable` を `true` にする。

<div class="demo">
  <DadsEmergencyBanner
    v-model="visible"
    closable
    title="【緊急】プレビュー"
    message="このバナーは閉じることができます（プレビュー用途のみ）。"
    style="position: static;"
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
import { DadsEmergencyBanner } from '@dads/vue'

const visible = ref(true)
</script>

<template>
  <DadsEmergencyBanner
    v-model="visible"
    closable
    title="【緊急】プレビュー"
    message="このバナーは閉じることができます。"
  />
</template>
```

## Props

| Prop             | 型               | デフォルト             | 説明                                                                                                   |
| ---------------- | ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `modelValue`     | `boolean`        | `true`                 | 表示状態。`v-model` のターゲット                                                                       |
| `title`          | `string`         | -                      | 見出し（「【緊急】」で始まり全角30文字以内推奨）                                                       |
| `message`        | `string`         | **required**           | 本文。全角100文字程度以内が推奨                                                                        |
| `linkLabel`      | `string`         | -                      | CTA リンクのラベル。`linkHref` とセットで指定                                                          |
| `linkHref`       | `string`         | -                      | CTA リンクの遷移先。`linkLabel` とセットで指定                                                         |
| `closable`       | `boolean`        | `false`                | 閉じるボタンを表示するか。DADS 仕様では本番では推奨されない                                            |
| `closeLabel`     | `string`         | `'閉じる'`             | 閉じるボタンの `aria-label`                                                                            |
| `iconName`       | `string`         | `'warning'`            | 見出し横の Material Symbols アイコン。空文字でアイコン非表示                                           |
| `ariaLabel`      | `string`         | `'緊急情報'`           | バナールートの `aria-label`                                                                            |
| `linkExternal`   | `boolean`        | `false`                | `true` で CTA リンクを新規タブ (`target=_blank` + 安全な `rel`) で開く。可視ラベルに外部アイコンも付与 |
| `newTabHintText` | `string`         | `'（新規タブで開く）'` | `linkExternal=true` のとき CTA ラベル後に追加するスクリーンリーダ専用ヒント。i18n 用に上書き可能       |
| `timestamp`      | `string \| Date` | -                      | 見出し上部に表示するタイムスタンプ (ISO 文字列はそのまま使用、`Date` は自動整形)                       |

## Events

| Event               | Payload   | 説明                                        |
| ------------------- | --------- | ------------------------------------------- |
| `update:modelValue` | `boolean` | 閉じるボタン押下時に `false` が emit される |
| `close`             | -         | 閉じるボタン押下時に発火                    |

## Slots

| Slot      | 説明                                            |
| --------- | ----------------------------------------------- |
| `default` | 本文。指定時は `message` プロップより優先される |
| `title`   | 見出し。指定時は `title` プロップより優先される |

## アクセシビリティ

- ルート要素は常に `role="alert"` + `aria-live="assertive"` を持ち、スクリーンリーダーに即時割り込みで読み上げさせる
- バナールートに `aria-label="緊急情報"`（`ariaLabel` で上書き可）を付与し、ランドマークとして認識させる
- アイコンは `aria-hidden="true"`。情報はテキスト側で完結させる
- リンクボタンは DADS フォーカスリング（黒 outline + 黄 shadow）が `:focus-visible` で表示される
- `forced-colors` 環境では `CanvasText` で再描画され、トークン色に依存しない
- ページ最上部の `position: fixed` 配置で `z-index: 9999`。ヘッダーやドロワーよりは前面、モーダルよりは背面
