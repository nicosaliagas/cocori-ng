export type DataSourceValue = string | SelectOption[]

export interface DataSourceInput {
    type: DataSourceType,
    value: DataSourceValue,
}

export interface SelectOption {
    id: string | number,
    name: string,
}

export enum DataSourceType {
    API = 'api',
    BRUTE = 'brute',
}
