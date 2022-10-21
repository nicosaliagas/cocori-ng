
export interface Odata<T = any> {
    d: {
        __count: number;
        results: T[];
    }
}

export class OdataClass {
    private datasource: Odata<any>

    setDatasource(datasource: Odata<any>) {
        this.datasource = datasource
    }

    getCount(): number {
        return this.datasource.d.__count
    }

    getResults(): Object[] {
        return this.datasource.d.results
    }
}