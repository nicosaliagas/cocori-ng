export interface AppbarModel {
    barTitle?: string;
    barActions?: HeaderMenuItem[];
  }
  
  export interface HeaderMenuItem {
    icon: string;
    label: string;
    callback: Function;
  }
  