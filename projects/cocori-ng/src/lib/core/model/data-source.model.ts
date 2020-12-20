export type DataSourceValue = string | ChoiceData[]

export interface DataSourceInput {
    type: DataSourceType,
    value: DataSourceValue,
}

export interface ChoiceData {
    value: string | number,
    viewValue: string,
}

export enum DataSourceType {
    API = 'api',
    BRUTE = 'brute',
}
