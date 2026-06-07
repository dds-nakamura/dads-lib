/**
 * Props / Emits for the DadsHeaderContainer layout component.
 *
 * Layout components do not take a `size` prop — sizing is determined by the
 * inner content and the surrounding application chrome.
 *
 * 公式 slug は `header-container`。
 */

/**
 * Header の幅・高さ・密度バリアント (公式 DADS 4 パターン)。
 * - `wide-full`: 全幅・通常高さのフラッグシップ用途 (ポータルトップ、ランディング)
 * - `wide-slim`: 全幅だがコンパクトな高さ。サブページ・アプリ画面で省スペース
 * - `medium`:    最大幅 1280px 程度の中央寄せ。一般的なコンテンツページ
 * - `compact`:   最小ヘッダ。モバイル相当の高さで、ユーティリティ表示を抑制
 */
export type DadsHeaderContainerVariant = 'wide-full' | 'wide-slim' | 'medium' | 'compact'

export interface DadsHeaderContainerProps {
  /** Stick to the top of the viewport on scroll. Defaults to true. */
  sticky?: boolean
  /**
   * Render the mobile hamburger menu button. The button is only visible on
   * narrow viewports via CSS; the prop also lets callers suppress it
   * entirely. Defaults to true.
   */
  showMenuToggle?: boolean
  /** aria-label for the hamburger button. Defaults to 'メニューを開く'. */
  menuToggleLabel?: string
  /**
   * Whether the menu the toggle controls is currently open. Drives the button's
   * `aria-expanded`. Drawer/menu state is owned by the parent, so pass it in.
   * Defaults to `false`.
   */
  menuExpanded?: boolean
  /**
   * `id` of the element the toggle controls (e.g. the mobile drawer / menu),
   * rendered as the button's `aria-controls`. Omit if not applicable.
   */
  menuControls?: string
  /**
   * `aria-label` for the main `<nav>` element. Defaults to 'メインナビゲーション'.
   * i18n を行いたい場合に上書きする。
   */
  navAriaLabel?: string
  /**
   * Header variant per official DADS spec. Defaults to `'wide-full'`.
   * Controls inner max-width and minimum height of the header bar.
   */
  variant?: DadsHeaderContainerVariant
  /**
   * Convenience props for a simple text + link logo. When `logoLabel` is
   * provided (and the `#logo` slot is not used), the component renders the
   * label as `<strong>` text, optionally wrapped in `<a href>` when
   * `logoHref` is also set.
   *
   * For richer logo content (image + text, multi-line, etc.), use the
   * `#logo` slot instead.
   */
  logoLabel?: string
  /** Optional href that wraps the logo label/slot in `<a>`. */
  logoHref?: string
}

export interface DadsHeaderContainerEmits {
  /**
   * Fired when the hamburger button is activated (click / Enter / Space).
   * Drawer open/close is the parent's responsibility.
   */
  (e: 'click:menu', event: MouseEvent): void
}
