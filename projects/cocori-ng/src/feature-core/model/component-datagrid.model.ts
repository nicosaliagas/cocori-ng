import { DataSourceInput } from './data-source.model';

export interface PageIndicators {
    from: number,
    to: number,
}

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
