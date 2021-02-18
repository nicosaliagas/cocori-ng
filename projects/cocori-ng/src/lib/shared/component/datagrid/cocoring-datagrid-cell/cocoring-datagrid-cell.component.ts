import { Component, Input, OnInit } from '@angular/core';

import { CellValueDatagrid } from '../../../../core/model/component-datagrid.model';

@Component({
  selector: 'cocoring-datagrid-cell',
  templateUrl: './cocoring-datagrid-cell.component.html',
  styleUrls: ['./cocoring-datagrid-cell.component.scss']
})
export class CocoringDatagridCellComponent implements OnInit {
  @Input() cell: CellValueDatagrid

  constructor() { }

  ngOnInit(): void {
  }

}
