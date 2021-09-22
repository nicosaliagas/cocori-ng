import { DataSourceInput } from '@cocori-ng/lib/src/lib/feature-core';

export interface PaginationDatagridModel {
    itemsPerPage: number,
    currentPage: number,
    from: number,
    to: number,
    totalRows: number,
}

export type IndicatorPage = Pick<PaginationDatagridModel, 'from' | 'to'>;

export interface ConfigDatagridModel {
    columns: ColumnDatagridModel[],
    dataSource?: DataSourceInput,
    withBatchProcessing: boolean,
    propIsArchived: string,
}

export interface ColumnDatagridModel {
    caption: string
    dataField: string
    visible: boolean
    dataType: DataType
    filters?: BooleanFilters
    alignment?: AlignmentType
    width?: number
    minWidth?: number
    sort?: SortType
}

export type SortType = 'ASC' | 'DESC' | 'NONE'

export type DataType = 'string' | 'number' | 'date' | 'boolean' | 'object'

export type AlignmentType = 'left' | 'right' | 'center'

export type CellColumn = Pick<ColumnDatagridModel, 'dataType' | 'dataField' | 'caption' | 'visible'>;

export interface CellValueDatagridModel extends CellColumn {
    value: any
}

export interface OrderColumnModel {
    previousIndex: number
    currentIndex: number
}

/** cool */
export interface BooleanFilters {
    selectAll?: boolean
    nestedValues: {allSelected: boolean, noSelected: boolean}
}
