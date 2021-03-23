// export type DataSourceValue = string | SelectOption[] | DatasourceOdata

export interface DataSourceInput {
    type: DataSourceType,
    value: any,
}

export enum DataSourceType {
    API = 'api',
    BRUTE = 'brute',
}

export interface SelectOption {
    id: string | number,
    name: string,
}

export interface DatasourceOdata {
    __count: number;
    results: Object[];
}
