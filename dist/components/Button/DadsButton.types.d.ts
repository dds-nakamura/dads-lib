import type { ButtonHTMLAttributes } from 'vue';
import type { DadsSemanticColor, DadsSize } from '../../types/common';
export type DadsButtonVariant = 'solid-fill' | 'outline' | 'text';
export type DadsButtonSize = DadsSize;
export type DadsButtonColor = DadsSemanticColor;
export interface DadsButtonProps {
    /** Visual style. Default: `solid-fill`. */
    variant?: DadsButtonVariant;
    /** Size token. Default: `md`. */
    size?: DadsButtonSize;
    /** Semantic color. Default: `primary`. */
    color?: DadsButtonColor;
    /** Disable interaction. */
    disabled?: boolean;
    /** Show spinner and suppress clicks while async work is pending. */
    loading?: boolean;
    /** Material Design Icon class name to render before the label. e.g. `mdi-download`. */
    prependIcon?: string;
    /** Material Design Icon class name to render after the label. e.g. `mdi-arrow-right`. */
    appendIcon?: string;
    /** Stretch to the full container width. */
    block?: boolean;
    /** Native button type. Ignored when `href` is set. Default: `button`. */
    type?: ButtonHTMLAttributes['type'];
    /** When provided, renders an `<a>` element instead of `<button>`. */
    href?: string;
    /** Accessible name. Required when the button shows only an icon. */
    ariaLabel?: string;
}
export interface DadsButtonEmits {
    (e: 'click', event: MouseEvent): void;
}
//# sourceMappingURL=DadsButton.types.d.ts.map