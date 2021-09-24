export interface SidenavItem {
  label: string;
  menuGroup?: boolean;
  icon?: string;
  route?: string;
  url?: string;
  newTab?: boolean;
  children?: SidenavItem[]
}
