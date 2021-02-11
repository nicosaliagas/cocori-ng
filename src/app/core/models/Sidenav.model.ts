export interface SidenavItem {
    label: string;
    menuGroup?: boolean;
    linkTo?: string;
    newTab?: boolean;
    children?: SidenavItem[]
  }
  