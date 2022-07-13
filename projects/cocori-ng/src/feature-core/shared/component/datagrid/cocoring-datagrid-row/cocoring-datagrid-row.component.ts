import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import {
  CellValueDatagridModel,
  ColumnDatagridModel,
  OrderColumnModel,
} from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-row',
  templateUrl: './cocoring-datagrid-row.component.html',
  styleUrls: ['./cocoring-datagrid-row.component.scss']
})
export class CocoringDatagridRowComponent implements OnInit, OnDestroy {
  @Input() columns: ColumnDatagridModel[] = []
  @Input()
  set datas(datas: any) {
    this._datas = datas;

    this.addCheckboxRow();

    this.initCellsValues();
  }
  @Input() datagridService: DatagridService

  _datas: any;
  cellValues: CellValueDatagridModel[] = []
  checkboxRowFormGroup: UntypedFormGroup;

  private readonly destroy$ = new Subject();

  constructor(
    private fb: UntypedFormBuilder,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.eventAllCheckboxesChecked()

    this.onUpdateColumn()

    this.onReOrderColumns()
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }

  /** ajouter le contrôle checkbox de la ligne dans le formulaire */
  private addCheckboxRow() {
    const checkboxesFormControlArray: UntypedFormArray = <UntypedFormArray>this.datagridService.checkboxesDatagridForm.get("rowsCheckbox");

    this.checkboxRowFormGroup = this.fb.group({});

    this.checkboxRowFormGroup.addControl(this._datas.id, this.fb.control(false));

    checkboxesFormControlArray.push(this.checkboxRowFormGroup);

    this.checkboxRowFormGroup.get(this._datas.id).valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((checkValue: boolean) => {
      this.datagridService.storeIdsRowsSelected(this._datas, checkValue)
    })
  }

  private initCellsValues() {
    this.columns.forEach((column: ColumnDatagridModel) => {
      this.cellValues.push({
        dataField: column.dataField,
        caption: column.caption,
        visible: column.visible,
        dataType: column.dataType,
        value: this.getDatasourceValue(column.dataField)
      });
    });
  }

  private onUpdateColumn() {
    this.datagridService.updateColumn$.pipe(
      takeUntil(this.destroy$),
      tap((columnUpdated: ColumnDatagridModel) => {
        this.cellValues
          .find((cell: CellValueDatagridModel) => cell.dataField === columnUpdated.dataField)
          .visible = columnUpdated.visible
      }),
      tap(_ => this.cdr.detectChanges()),
    ).subscribe()
  }

  private onReOrderColumns() {
    this.datagridService.reOrderColumns$.pipe(
      takeUntil(this.destroy$),
      tap((columnUpdated: OrderColumnModel) => {
        this.cellValues.splice(columnUpdated.currentIndex, 0, this.cellValues.splice(columnUpdated.previousIndex, 1)[0]);
      }),
      tap(_ => this.cdr.detectChanges()),
    ).subscribe()
  }

  private eventAllCheckboxesChecked() {
    this.datagridService.allRowsChecked$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((value: boolean) => {
      this.checkboxRowFormGroup.get(this._datas.id).setValue(value);
    })
  }

  private getDatasourceValue(column: string) {
    return this._datas.hasOwnProperty(column) ? this._datas[column] : null
  }

  selectRow() {
    this.datagridService.rowSelectedByClickEvent$.next(this._datas)
  }

  trackBy(index: number) {
    return index;
  }
}
