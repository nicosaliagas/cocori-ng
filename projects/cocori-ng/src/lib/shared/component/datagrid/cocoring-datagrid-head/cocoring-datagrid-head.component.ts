import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { ColumnDatagridModel, DatagridService } from '@cocori-ng/lib/src/lib/feature-core';

import { SortColumnExtendComponent } from '../common-datagrid/sort-column-extend.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-head',
  templateUrl: './cocoring-datagrid-head.component.html',
  styleUrls: ['./cocoring-datagrid-head.component.scss']
})
export class CocoringDatagridHeadComponent extends SortColumnExtendComponent implements OnInit {
  @Input() column: ColumnDatagridModel
  @Input() datagridService: DatagridService

  constructor(injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
    this.onInitColumn()
  }
}
