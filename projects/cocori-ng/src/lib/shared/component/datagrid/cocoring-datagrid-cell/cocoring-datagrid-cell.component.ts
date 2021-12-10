import { formatDate } from '@angular/common';
import { Component, Inject, Input, LOCALE_ID, OnInit } from '@angular/core';
import { CellValueDatagridModel, DatagridService } from '@cocori-ng/lib/src/lib/feature-core';

@Component({
  selector: 'cocoring-datagrid-cell',
  templateUrl: './cocoring-datagrid-cell.component.html',
  styleUrls: ['./cocoring-datagrid-cell.component.scss']
})
export class CocoringDatagridCellComponent implements OnInit {
  public _cell: CellValueDatagridModel;
  cellIsArchived: boolean = false;

  @Input()
  set cell(value: CellValueDatagridModel) {
    this._cell = value

    this.formatCellValue();

    this.checkIfCellIsArchived();
  }

  cellValue: string

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private datagridService: DatagridService) { }

  ngOnInit(): void { }

  private formatCellValue() {
    this.cellValue = this._cell.dataType === 'date' ? formatDate(this._cell.value, 'dd/MM/YYYY', this.locale) : this._cell.value;
  }

  private checkIfCellIsArchived() {
    this.cellIsArchived =  this._cell.dataField === this.datagridService.config.propIsArchived
  }
}
