import Fuse from "fuse.js";
import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import css from "./css";
import debounce from "./debounce";
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

let options = {
  includeScore: false,
  shouldSort: false,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["label", "items.label"],
};

export class ListPopper extends LitElement {
  @property({ type: Object }) onSelect = (selection: Selection) => {};

  @property({ type: String })
  label = "";

  @property({ type: Boolean })
  searchable = false;

  @property({ type: String })
  searchPlaceholder = "Search...";

  @property({ type: Boolean })
  open = false;

  @property({ type: String })
  event = "click";

  @property({ type: Array })
  items = [];

  static styles = css;

  @property({ type: Array })
  searchedItems = null;

  firstUpdated() {
    this.addEventListener(this.event, this.handleSlotClick);
  }

  onSearchkeyup = (e: KeyboardEvent) => {
    const searchInput = e.target as HTMLInputElement;
    debounce(() => {
      if (!searchInput?.value) {
        this.searchedItems = [...(this.items ?? [])];
        return;
      }
      const fuse = new Fuse(this.items, options);
      this.searchedItems = fuse
        .search(searchInput?.value)
        ?.map((item) => item.item);
    }, 300);
  };

  handleSlotClick(e: Event) {
    this.open = true;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleOutsideClick);
    super.disconnectedCallback();
  }

  handleOutsideClick = (e: Event) => {
    if (this.shadowRoot.contains(e.target as Node)) return;
    if ((e.target as Node).nodeName === "LIST-POPPER") return;
    if (this.contains(e.target as Node)) return;
    this.open = false;
    this.searchedItems = null;
  };

  onLiHover(e: any) {
    const node = e.target;
    const rect = e.target.getBoundingClientRect();
    const position = rect.right + rect.width;
    let left = `${rect.right}px`;
    if (position >= window.innerWidth) {
      left = `${rect.left - rect.width - 5}px`;
    }
    node.querySelector("div")?.style.setProperty("top", `${rect.top}px`);
    node.querySelector("div")?.style.setProperty("left", left);
    node.querySelector("div")?.style.setProperty("width", `${rect.width}px`);
  }

  renderSubItems(item: any) {
    return html`
      <div id="list-inner">
        <ul>
          ${item?.items?.map(
            (_item) =>
              html`<li
                @click="${(e) => {
                  this.onSelect({ parent: item.id, child: _item.id });
                  e.stopPropagation();
                  this.open = false;
                  this.searchedItems = null;
                }}"
              >
                ${_item.label}
              </li>`
          )}
        </ul>
      </div>
    `;
  }

  render() {
    return html`
      <div id="root">
        <slot></slot>
        ${this.open
          ? html`
              <ul id="list-root">
                ${this.label ? html`<li id="label">${this.label}</li>` : null}
                <li id="search">
                  <input
                    type="search"
                    id="search-input"
                    placeholder="${this.searchPlaceholder}"
                    @input="${this.onSearchkeyup}"
                  />
                </li>
                ${(this.searchedItems !== null
                  ? this.searchedItems
                  : this.items
                ).map(
                  (item) => html`<li
                    @mouseover="${this.onLiHover}"
                    @click="${() => {
                      this.onSelect({ parent: item.id });
                      this.open = false;
                      this.searchedItems = null;
                    }}"
                  >
                    ${item?.label}
                    ${item?.items?.length
                      ? html`
                          <svg viewBox="0 0 5 9" width="5" height="9">
                            <g
                              fill-rule="evenodd"
                              stroke="none"
                              stroke-width="1"
                            >
                              <path
                                fill-rule="nonzero"
                                d="M0.244077682,1.5363961 C-0.0813592274,1.18492424 -0.0813592274,0.61507576 0.244077682,0.263603897 C0.569514592,-0.0878679656 1.09715207,-0.0878679656 1.42258898,0.263603897 L4.75592232,3.8636039 C5.08135923,4.21507576 5.08135923,4.78492424 4.75592232,5.1363961 L1.42258898,8.7363961 C1.09715207,9.08786797 0.569514592,9.08786797 0.244077682,8.7363961 C-0.0813592274,8.38492424 -0.0813592274,7.81507576 0.244077682,7.4636039 L2.98815536,4.5 L0.244077682,1.5363961 Z"
                              ></path>
                            </g>
                          </svg>
                        `
                      : null}
                    ${item?.items?.length ? this.renderSubItems(item) : null}
                  </li>`
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }
}

customElements.define("list-popper", ListPopper);
