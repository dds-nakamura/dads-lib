/**
 * Status of a single step.
 *
 * - `pending`: Not yet reached. Indicator shows the step number.
 * - `current`: Active step. Indicator shows the step number with emphasis.
 * - `done`: Successfully completed. Indicator shows a check mark.
 * - `error`: Completed with error. Indicator shows a cross mark.
 */
export type DadsStepNavigationStatus = 'pending' | 'current' | 'done' | 'error';
export interface DadsStepNavigationStep {
    title: string;
    /** Defaults to `'pending'` when omitted. */
    status?: DadsStepNavigationStatus;
}
export type DadsStepNavigationOrientation = 'horizontal' | 'vertical';
export interface DadsStepNavigationProps {
    steps: DadsStepNavigationStep[];
    /** Layout direction. Default `'horizontal'`. */
    orientation?: DadsStepNavigationOrientation;
    /**
     * When `true` (default), each step is rendered as a `<button>` and emits
     * `click:step`. When `false`, steps are rendered as inert `<div>` elements.
     */
    clickable?: boolean;
    /** Accessible label for the wrapping `<nav>`. Default `'ステップ'`. */
    ariaLabel?: string;
}
export interface DadsStepNavigationEmits {
    (e: 'click:step', step: DadsStepNavigationStep, index: number, event: MouseEvent): void;
}
//# sourceMappingURL=DadsStepNavigation.types.d.ts.map