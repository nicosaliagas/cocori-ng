import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';

import { CellValueDatagridModel } from '../../../../core/model/component-datagrid.model';

@Component({
  selector: 'cocoring-datagrid-cell',
  templateUrl: './cocoring-datagrid-cell.component.html',
  styleUrls: ['./cocoring-datagrid-cell.component.scss']
})
export class CocoringDatagridCellComponent implements OnInit {
  public _cell: CellValueDatagridModel;

  @Input()
  set cell(value: CellValueDatagridModel) {
    this._cell = value

    this.majValue();
  }

  cellValue: string

  constructor(
    @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit(): void { }

  private majValue() {
    this.cellValue = this._cell.dataType === 'date' ? formatDate(this._cell.value, 'dd/MM/YYYY', this.locale) : this._cell.value;
  }
}
