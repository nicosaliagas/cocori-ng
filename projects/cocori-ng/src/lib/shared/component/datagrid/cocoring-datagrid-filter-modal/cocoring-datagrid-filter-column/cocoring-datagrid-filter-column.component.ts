import { ChangeDetectionStrategy, Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';

import { ColumnDatagridModel } from '../../../../../core/model/component-datagrid.model';
import { SortColumnExtendComponent } from '../../common-datagrid/sort-column-extend.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-filter-column',
  templateUrl: './cocoring-datagrid-filter-column.component.html',
  styleUrls: ['./cocoring-datagrid-filter-column.component.scss']
})
export class CocoringDatagridFilterColumnComponent extends SortColumnExtendComponent implements OnInit, OnDestroy {
  @Output() columnSelected = new EventEmitter<ColumnDatagridModel>();

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
    this.onResetColumn()
  }

  selectColumn() {
    this.columnSelected.emit(this.column)
  }

  visible() {
    this.column.visible = !this.column.visible

    this.datagridService.updateColumn$.next(this.column)
  }
}
