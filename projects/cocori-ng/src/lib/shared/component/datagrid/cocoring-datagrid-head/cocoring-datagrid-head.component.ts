import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-head',
  templateUrl: './cocoring-datagrid-head.component.html',
  styleUrls: ['./cocoring-datagrid-head.component.scss']
})
export class CocoringDatagridHeadComponent implements OnInit {
  @Input() column: ColumnDatagridModel
  @Input() datagridService: DatagridService

  constructor() { }

  ngOnInit(): void { }

  sort() {
    if (!this.column.sort || this.column.sort === 'NONE') this.column.sort = 'ASC'
    else if (this.column.sort === 'ASC') this.column.sort = 'DESC'
    else this.column.sort = 'NONE'

    this.datagridService.refreshNeeded$.next()
  }
}
