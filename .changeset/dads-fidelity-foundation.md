---
'@dads/vue': patch
---

DADS 公式とのビジュアル差異監査 (Issue #18) の横断課題 (基盤) を修正。

- **S-2 focus-ring**: 共有 `_focus-ring.scss` の値を公式準拠に修正（`outline: 4px / outline-offset: 2px / box-shadow: 2px yellow-300`）。従来は逆値（2px / 0 / 4px）で全コンポーネントにドリフトが伝播していた。黄背景塗りの opt-in バリアント `dads-focus-ring-fill` も追加（公式のテキストボタン/リンク/メニュー項目の focus 表現用）。
- **S-1a トークン置換**: design-tokens に存在しないセマンティック風トークン（`--color-text-primary` / `--color-bg-surface` / `--color-error` / `--spacing-*` 等）を、実在する公式トークン（`--color-neutral-solid-gray-*` / `--color-primitive-*` / `--color-semantic-*` / `calc(N/16*1rem)`）へ一括置換（48 ファイル・689 箇所）。従来は常にフォールバック直値で描画され、design-tokens の更新が反映されない実質ハードコード状態だった。

挙動・API・アクセシビリティ属性に変更はなく、トークン解決とフォーカスリングの見た目を公式へ是正する調整。文脈依存トークン (S-1b) と各コンポーネント固有のビジュアル是正は後続で対応。
