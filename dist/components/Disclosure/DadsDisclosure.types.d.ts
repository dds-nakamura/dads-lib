/**
 * Type definitions for DadsDisclosure.
 *
 * A single collapsible region used to show supplementary information.
 * Unlike Accordion (multi-item), Disclosure manages a single open/closed
 * boolean state and renders a single `<details>` / `<summary>` pair to match
 * the official DADS HTML reference.
 */
export interface DadsDisclosureProps {
    /**
     * Controlled open state. When provided, the component is controlled —
     * the consumer is expected to react to `update:modelValue` and pass the
     * new value back via `v-model`.
     */
    modelValue?: boolean;
    /** Visible label rendered inside the `<summary>` element. */
    title: string;
    /** Disable interaction; click and keyboard activation are ignored. */
    disabled?: boolean;
    /**
     * Initial open state for uncontrolled usage (when `modelValue` is not
     * provided). Defaults to `false`.
     */
    defaultOpen?: boolean;
}
export interface DadsDisclosureEmits {
    (e: 'update:modelValue', value: boolean): void;
    /** Fired whenever the open state changes (controlled or uncontrolled). */
    (e: 'toggle', value: boolean): void;
}
//# sourceMappingURL=DadsDisclosure.types.d.ts.map