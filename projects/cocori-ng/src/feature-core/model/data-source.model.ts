export interface DataSourceInput {
    type: DataSourceType,
    value: any,
    dataSourceNameProperty?: string, /** property of the datasource used in the view, default : 'name' */
}

export enum DataSourceType {
    API = 'api',
    BRUTE = 'brute',
}

export interface SelectOption {
    id: string | number,
    name: string,
}
