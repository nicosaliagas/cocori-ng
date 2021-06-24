import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  checkboxRowFormGroup: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.eventAllCheckboxesChecked()

    this.onUpdateColumn()

    this.onReOrderColumns()
  }

  /** ajouté le contrôle checkbox de la ligne dans le formulaire */
  private addCheckboxRow() {
    const checkboxesFormControlArray: FormArray = <FormArray>this.datagridService.checkboxesDatagridForm.get("rowsCheckbox");

    this.checkboxRowFormGroup = this.fb.group({});

    this.checkboxRowFormGroup.addControl(this._datas.id, this.fb.control(false));

    checkboxesFormControlArray.push(this.checkboxRowFormGroup);

    this.subscriptions.add(
      this.checkboxRowFormGroup.get(this._datas.id).valueChanges.subscribe((value: boolean) => {
        this.datagridService.storeIdsRowsSelected(this._datas.id, value)
      })
    )
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
    this.subscriptions.add(
      this.datagridService.updateColumn$.pipe(
        tap((columnUpdated: ColumnDatagridModel) => {
          this.cellValues
            .find((cell: CellValueDatagridModel) => cell.dataField === columnUpdated.dataField)
            .visible = columnUpdated.visible
        }),
        tap(_ => this.cdr.detectChanges()),
      ).subscribe()
    )
  }

  private onReOrderColumns() {
    this.subscriptions.add(
      this.datagridService.reOrderColumns$.pipe(
        tap((columnUpdated: OrderColumnModel) => {
          this.cellValues.splice(columnUpdated.currentIndex, 0, this.cellValues.splice(columnUpdated.previousIndex, 1)[0]);
        }),
        tap(_ => this.cdr.detectChanges()),
      ).subscribe()
    )
  }

  private eventAllCheckboxesChecked() {
    this.subscriptions.add(
      this.datagridService.allRowsChecked$.subscribe((value: boolean) => {
        this.checkboxRowFormGroup.get(this._datas.id).setValue(value);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
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
