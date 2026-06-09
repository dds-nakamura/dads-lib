export interface DadsIconDef {
    /** SVG viewBox of the source icon (Material Symbols use a 960 grid). */
    viewBox: string;
    /** Inner SVG markup (path/etc.); inherits `fill: currentColor` from <svg>. */
    body: string;
}
export declare const iconRegistry: Record<string, DadsIconDef>;
/** Material Symbols names bundled in the registry. */
export type DadsIconName = keyof typeof iconRegistry;
//# sourceMappingURL=icon-registry.d.ts.map