/**
 * Shared form-control label primitive matching the official DADS
 * `dads-form-control-label` (label / ※必須 requirement / support-text /
 * error-text / status pill). Wraps a single control (`as="div"`) or a group
 * (`as="fieldset"` with a `<legend>` label).
 *
 * Reference: design-system-example-components-html/src/components/form-control-label/
 */
export type DadsFormControlLabelSize = 'sm' | 'md' | 'lg';
export type DadsFormControlLabelTag = 'div' | 'fieldset';
export interface DadsFormControlLabelProps {
    /** Root element. `div` for a single control, `fieldset` for a group. Default: `div`. */
    as?: DadsFormControlLabelTag;
    /** Size token driving label font-size / gap. Default: `md`. */
    size?: DadsFormControlLabelSize;
    /** Label text. Rendered as `<label>` (single) or `<legend>` (group). */
    label?: string;
    /** `for` attribute of the label. Applied only when `as="div"`. */
    labelFor?: string;
    /** Show the required marker. Default: `false`. */
    required?: boolean;
    /** Required-marker text. Official: `※必須`. */
    requiredLabel?: string;
    /** Optional-marker text shown when not required. Official shows nothing. */
    optionalLabel?: string;
    /** Support text rendered before the control (gray-600). */
    supportText?: string;
    /** Stable id for the support text (for `aria-describedby`). */
    supportTextId?: string;
    /** Error text rendered after the control (semantic-error-1). */
    errorText?: string;
    /** Stable id for the error text (for `aria-describedby`). */
    errorTextId?: string;
    /** Optional status pill content (gray-536 background). */
    status?: string;
    /** Visually dim the label to match disabled controls. */
    disabled?: boolean;
}
//# sourceMappingURL=DadsFormControlLabel.types.d.ts.map