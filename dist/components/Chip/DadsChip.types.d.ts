import type { DadsSemanticColor, DadsSize } from '../../types/common';
/**
 * Public Props for DadsChip.
 *
 * Renders a compact tag-style element used for filters, labels, and selection
 * summaries. The root element is a `<span>` by default; passing `clickable`
 * promotes it to a real `<button>` so keyboard interaction works without
 * extra plumbing. `closable` adds an inner `<button>` with an `×` icon that
 * emits `close` independently of the chip's own click event.
 */
export type DadsChipSize = Exclude<DadsSize, 'xs'>;
export type DadsChipColor = DadsSemanticColor;
export interface DadsChipProps {
    /** Size token. Default: `md`. */
    size?: DadsChipSize;
    /** Semantic color. Default: `primary`. */
    color?: DadsChipColor;
    /** Show an `×` button that emits `close`. Default: `false`. */
    closable?: boolean;
    /**
     * Promote the root element from `<span>` to `<button>` so the chip itself is
     * keyboard-activatable and emits `click`. Default: `false`.
     */
    clickable?: boolean;
    /** Disable interaction (applies to both clickable and closable affordances). */
    disabled?: boolean;
    /** Accessible name for the close button. Default: `'削除'`. */
    closeLabel?: string;
    /** Accessible name for the chip itself (clickable variants). */
    ariaLabel?: string;
}
export interface DadsChipEmits {
    (e: 'click', event: MouseEvent | KeyboardEvent): void;
    (e: 'close', event: MouseEvent): void;
}
//# sourceMappingURL=DadsChip.types.d.ts.map