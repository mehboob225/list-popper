import { LitElement } from "lit";
import { Props, Selection } from "./types";
declare global {
    interface HTMLElementTagNameMap {
        "list-popper": Props;
    }
    namespace JSX {
        interface IntrinsicElements {
            "list-popper": Props;
        }
    }
}
export declare class ListPopper extends LitElement {
    onSelect: (selection: Selection) => void;
    label: string;
    searchable: boolean;
    searchPlaceholder: string;
    open: boolean;
    event: string;
    items: any[];
    static styles: import("lit").CSSResult;
    searchedItems: any;
    firstUpdated(): void;
    onSearchkeyup: (e: KeyboardEvent) => void;
    handleSlotClick(e: Event): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleOutsideClick: (e: Event) => void;
    onLiHover(e: any): void;
    renderSubItems(item: any): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
