export interface SidenavItem {
    label: string;
    menuGroup?: boolean;
    route?: string;
    url?: string;
    newTab?: boolean;
    children?: SidenavItem[]
  }
  