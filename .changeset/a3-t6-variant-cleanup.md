---
'@dads/vue': major
---

**柱A-3 / T6: 非公式バリアントを公式準拠に整理（破壊的変更）** — Issue #18

公式に無い prop 値/バリアントを撤廃し、公式の軸へ統一した（案X）。8コンポーネント対象。構造寄りの大きな項目は `docs/quality/a3-deferred.md` に残置（後続テーマ）。

- **ChipLabel**: `color` を 5 semantic（primary/success/error/warning/secondary）→ **公式 11 primitive 色相**（gray/blue/light-blue/cyan/green/lime/yellow/orange/red/magenta/purple）に再設計。`appearance` を 2（filled/outlined）→ **公式 4 種**（text/outline/filled-outline/fill）に。**`size` 軸を撤廃**（型 `DadsChipLabelSize` 削除）。既定 `color=gray` / `appearance=text`。
- **Heading**: `size` を旧 8 段階 → **公式 10 段階**（64/57/45/36/32/28/24/20/18/16）に。`'14'` を削除。per-size の line-height / letter-spacing を公式値で付与。
- **Divider**: `color` を 2 段階（default/strong）→ **公式 3 段階**（`gray-420`/`gray-536`/`black`）に。CSS modifier クラス名も改名。既定 `gray-420`。
- **Button**: `color` の **success/error/warning/secondary を撤廃**（公式の blue 単色 = `primary` のみ）。**`loading`/spinner は存続**。
- **FileUpload**: **`size` 軸を撤廃**（型 `DadsFileUploadSize` 削除）。disabled を要素別の公式トークン配色へ。
- **List**: `type='ordered'` を `<ol>` → **`<ul>` + コピー可能なテキスト採番**（公式 a11y）に。
- **NotificationBanner**: 見出しを `<p>` → **`<h2>`**。`color` の `info/neutral` を **`info-1`/`info-2`** にリネーム。
- **DescriptionList**: 既定 layout を**縦積み**へ、非公式 `horizontal` を撤廃。**`bordered` は存続**。

利用側は各 prop の値集合・既定の変更に追随が必要（詳細は各コンポーネントの型・docs カタログ参照）。挙動/aria は原則維持。
