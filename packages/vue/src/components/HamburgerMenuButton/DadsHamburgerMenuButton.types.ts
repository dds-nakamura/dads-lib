/**
 * Type definitions for DadsHamburgerMenuButton.
 *
 * 画面スペースに制限のあるモバイル領域でメニューを開閉するトリガー。
 * 状態 (`modelValue`) によりアイコンとテキストが切り替わる:
 *   - false（閉）→ 3 本線アイコン + 「メニュー」
 *   - true（開）→ × アイコン + 「閉じる」
 *
 * v-model でメニューの開閉状態 (boolean) を双方向バインドする。
 * 制御先メニューの `id` を `ariaControls` で必ず指定すること。
 */
import type { DadsSize } from '../../types/common'

export type DadsHamburgerMenuButtonSize = Extract<DadsSize, 'lg' | 'md' | 'sm'>

/**
 * 形状バリアント (公式 DADS 定義)。
 * - `default`: アイコン横にラベルを並べる標準形 (デフォルト)
 * - `icon-only`: 正方形・アイコンのみ。ラベルは `aria-label` で SR に伝える
 * - `mobile-conditional`: モバイル時はアイコン下にテキストを縦並びにする
 *   コンパクト形 (タップターゲットを確保)
 */
export type DadsHamburgerMenuButtonVariant = 'default' | 'icon-only' | 'mobile-conditional'

export interface DadsHamburgerMenuButtonProps {
  /** メニューの開閉状態。`true` = 開いている。v-model 経由で双方向バインドする。 */
  modelValue?: boolean
  /** 操作不可化。`true` の場合クリックを受け付けない。 */
  disabled?: boolean
  /**
   * 制御対象メニュー要素の `id`。
   * `aria-controls` 属性として出力されるため、対応する `<nav id="...">` 等の id と一致させる。
   */
  ariaControls: string
  /** メニュー閉状態で表示するテキスト。デフォルト: `'メニュー'`。 */
  openLabel?: string
  /** メニュー開状態で表示するテキスト。デフォルト: `'閉じる'`。 */
  closeLabel?: string
  /** サイズ。デフォルト: `'md'`。 */
  size?: DadsHamburgerMenuButtonSize
  /** 形状バリアント。デフォルト `'default'`。 */
  variant?: DadsHamburgerMenuButtonVariant
}

export interface DadsHamburgerMenuButtonEmits {
  /** v-model 用。トグルされた新しい開閉状態を伝搬する。 */
  (e: 'update:modelValue', value: boolean): void
  /** ボタンがクリックされた際の元の MouseEvent。 */
  (e: 'click', event: MouseEvent): void
}
