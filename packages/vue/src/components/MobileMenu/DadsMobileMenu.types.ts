/**
 * Public Props / Emits for DadsMobileMenu.
 *
 * モバイルメニューは、ハンバーガーメニューボタン (Header 内) と組み合わせて使う
 * 折りたたみメニューコンポーネント。Drawer (横スライド) と異なり、Header 下に
 * スライドダウンする全幅オーバーレイとして配置される。
 *
 * Reference:
 *  - https://design.digital.go.jp/dads/components/mobile-menu/
 *  - DADS 仕様には「タッチスクリーンでのタップ操作を考慮したメニュー」と記載。
 *    本実装では `aria-modal` 付きの `role="dialog"` として全幅オーバーレイで描画し、
 *    Escape キーでのクローズ・フォーカストラップ・前フォーカス復元を備える。
 *
 * 階層:
 *  - 主ナビゲーション: `items` (再利用: `DadsMenuListItem`)
 *  - 補助リンク: `utilityItems` (再利用: `DadsUtilityLinkItem`)
 */

import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types'
import type { DadsUtilityLinkItem } from '../UtilityLink/DadsUtilityLink.types'

/** メイン項目は DadsMenuList の項目形と共有する。 */
export type DadsMobileMenuItem = DadsMenuListItem

export interface DadsMobileMenuProps {
  /** 開閉状態。`true` で開く。v-model 対応。 */
  modelValue?: boolean
  /** メイン項目 (必須)。DadsMenuList で描画される。 */
  items: DadsMobileMenuItem[]
  /**
   * 補助項目 (任意)。ログイン / お問い合わせ / プライバシーポリシーなどの
   * セカンダリリンク。指定時はメニュー下部に DadsUtilityLink (list mode) で描画。
   */
  utilityItems?: DadsUtilityLinkItem[]
  /** `aria-label`。デフォルト `'モバイルメニュー'`。 */
  ariaLabel?: string
  /** クローズボタンの `aria-label`。デフォルト `'閉じる'`。 */
  closeLabel?: string
  /**
   * クローズボタンの表示。デフォルト `true`。
   * `false` の場合、コンポーネント内にはクローズボタンを描画しない
   * (Header 側の DadsHamburgerMenuButton で開閉する想定)。
   */
  showCloseButton?: boolean
}

export interface DadsMobileMenuEmits {
  /** v-model 用。新しい開閉状態を伝搬する。 */
  (e: 'update:modelValue', value: boolean): void
  /** メイン項目クリック時。`DadsMenuList` からバブリングして伝搬される。 */
  (e: 'click:item', item: DadsMobileMenuItem, event: MouseEvent): void
  /** 補助項目クリック時。`DadsUtilityLink` からバブリングして伝搬される。 */
  (e: 'click:utility', item: DadsUtilityLinkItem, index: number, event: MouseEvent): void
}
