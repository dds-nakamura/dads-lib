import type { DadsMenuListItem } from '../MenuList/DadsMenuList.types';
import type { DadsUtilityLinkItem } from '../UtilityLink/DadsUtilityLink.types';
import type { DadsMobileMenuProps } from './DadsMobileMenu.types';
declare const __VLS_export: import("vue").DefineComponent<DadsMobileMenuProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {} & {
    "update:modelValue": (value: boolean) => any;
    "click:item": (item: DadsMenuListItem, event: MouseEvent) => any;
    "click:utility": (item: DadsUtilityLinkItem, index: number, event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<DadsMobileMenuProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onClick:item"?: ((item: DadsMenuListItem, event: MouseEvent) => any) | undefined;
    "onClick:utility"?: ((item: DadsUtilityLinkItem, index: number, event: MouseEvent) => any) | undefined;
}>, {
    type: import("./DadsMobileMenu.types").DadsMobileMenuType;
    ariaLabel: string;
    modelValue: boolean;
    closeLabel: string;
    navAriaLabel: string;
    utilityItems: DadsUtilityLinkItem[];
    subLinksAriaLabel: string;
    backLabel: string;
    showCloseButton: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
//# sourceMappingURL=DadsMobileMenu.vue.d.ts.map