import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';

import { CellValueDatagridModel } from '../../../../core/model/component-datagrid.model';

@Component({
  selector: 'cocoring-datagrid-cell',
  templateUrl: './cocoring-datagrid-cell.component.html',
  styleUrls: ['./cocoring-datagrid-cell.component.scss']
})
export class CocoringDatagridCellComponent implements OnInit {
  @Input() cell: CellValueDatagridModel

  cellValue: string

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void {
    this.cellValue = this.cell.dataType === 'date' ? formatDate(this.cell.value, 'dd/MM/YYYY', this.locale) : this.cell.value
  }
}
