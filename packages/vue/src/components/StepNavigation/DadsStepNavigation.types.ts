/**
 * Status of a single step, aligned to the official DADS canonical model
 * (`data-state` on `.dads-step-navigation__step`).
 *
 * - `reached`: Reached (visited) but not the active step. Number is filled
 *   gray-800 with white text.
 * - `completed`: Completed successfully. Shows a check `state-icon` plus a
 *   visually-hidden "完了" label.
 * - `error`: Reached with an error. Shows a warning `state-icon` and an "エラー"
 *   `state-label`; number text turns error red.
 * - `skipped`: Intentionally skipped. Number border becomes dashed and a
 *   visually-hidden "スキップされました" label is announced.
 * - `editing`: Currently being edited. Shows an edit `state-icon` and a "編集中"
 *   `state-label`.
 *
 * When a step has no `status`, it is an upcoming (not-yet-reached) step: the
 * plain number is shown with no `data-state`.
 *
 * @remarks Migration from the previous (案X 以前) enum:
 * - `pending` → omit `status` (upcoming step)
 * - `current` → omit `status` and set the step as the current one (see
 *   {@link DadsStepNavigationProps.current}); `aria-current="step"` is applied.
 * - `done` → `completed`
 * - `error` → `error` (unchanged)
 */
export type DadsStepNavigationStatus =
  | 'reached'
  | 'completed'
  | 'error'
  | 'skipped'
  | 'editing'

/** Size variant, mapped to the official `data-size` attribute. */
export type DadsStepNavigationSize = 'normal' | 'small'

export type DadsStepNavigationOrientation = 'horizontal' | 'vertical'

export interface DadsStepNavigationStep {
  /** Step heading text (rendered in `.dads-step-navigation__title`). */
  title: string
  /** Optional supporting text (rendered in `.dads-step-navigation__description`). */
  description?: string
  /**
   * Visual / semantic state. Omit for an upcoming (not-yet-reached) step.
   * The active step is selected via {@link DadsStepNavigationProps.current},
   * not via this field.
   */
  status?: DadsStepNavigationStatus
  /**
   * When provided, the step header renders as an `<a href>` link. Mutually
   * exclusive with the default `<button>` / `<span>` rendering.
   */
  href?: string
  /** Disables the `<button>` header (ignored when `href` is set). */
  disabled?: boolean
}

export interface DadsStepNavigationProps {
  steps: DadsStepNavigationStep[]
  /**
   * Zero-based index of the active step. The matching step receives
   * `aria-current="step"` and the focus/ring treatment. Omit for none.
   */
  current?: number
  /** Size variant → `data-size`. Default `'normal'`. */
  size?: DadsStepNavigationSize
  /** Layout direction → `data-orientation`. Default `'horizontal'`. */
  orientation?: DadsStepNavigationOrientation
  /**
   * When `true` (default), steps with neither `href` nor `disabled` render as
   * `<button type="button">` and emit `click:step`. When `false`, every step
   * header renders as an inert `<span>` (display-only).
   */
  clickable?: boolean
  /**
   * Accessible label for the wrapping `<nav>`. Default `'ステップ'`.
   */
  ariaLabel?: string
  /**
   * Total number of steps reached, used for the visually-hidden progress
   * summary ("全 N ステップ中、M ステップ目まで到達済み"). Defaults to the
   * count of steps whose `status` is `reached`/`completed`/`editing`/`error`.
   */
  reached?: number
}

export interface DadsStepNavigationEmits {
  (e: 'click:step', step: DadsStepNavigationStep, index: number, event: MouseEvent): void
}
