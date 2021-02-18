import { DataSourceInput } from './data-source.model';

export interface ConfigDatagridModel {
    title: string,
    columns: ColumnDatagrid[],
    dataSource?: DataSourceInput,
}

export interface ColumnDatagrid {
    caption: string
    dataField: string
    dataType?: string // types venant du back : 'string' | 'number' | 'date' | 'boolean' | 'object'
    alignment?: string // left, right, center
    visible?: boolean
    width?: number
    minWidth?: number
}

export interface CellValueDatagrid {
    dataField: string
    value: string
}
