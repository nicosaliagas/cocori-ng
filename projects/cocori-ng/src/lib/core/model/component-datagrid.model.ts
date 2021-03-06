import { DataSourceInput } from './data-source.model';

export interface PaginationDatagridModel {
    itemsPerPage: number,
    currentPage: number,
    from: number,
    to: number,
    totalRows: number,
}

export type IndicatorPage = Pick<PaginationDatagridModel, 'from' | 'to'>;

export interface ConfigDatagridModel {
    title: string,
    columns: ColumnDatagridModel[],
    dataSource?: DataSourceInput,
}

export interface ColumnDatagridModel {
    caption: string
    dataField: string
    dataType?: string // types venant du back : 'string' | 'number' | 'date' | 'boolean' | 'object'
    alignment?: string // left, right, center
    visible?: boolean
    width?: number
    minWidth?: number
    sort?: SortType
}

export type SortType = "ASC" | "DESC" | "NONE"

export interface CellValueDatagridModel {
    dataField: string
    value: string
}

export interface CellValueDatagridModel {
    dataField: string
    value: string
}
