export interface Selection {
  parent: String;
  child?: String;
}

export interface Item {
  id: string;
  label: string;
  items?: Item[];
}

export interface Props {
  style?: any;
  ref?: any;
  label?: string;
  open?: boolean;
  event?: string;
  children?: any;
  searchable?: boolean;
  searchPlaceholder?: string;
  items?: Item[];
  onSelect?: (selection: Selection) => void;
}