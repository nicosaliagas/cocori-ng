// export type DataSourceValue = string | SelectOption[] | DatasourceOdata

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

export interface OdataModel {
    d: {
        __count: number;
        results: Object[];
    }
}

export class Odata {
    private datasource: OdataModel

    setDatasource(datasource: OdataModel) {
        this.datasource = datasource
    }

    getCount(): number {
        return this.datasource.d.__count
    }

    getResults(): Object[] {
        return this.datasource.d.results
    }
}
