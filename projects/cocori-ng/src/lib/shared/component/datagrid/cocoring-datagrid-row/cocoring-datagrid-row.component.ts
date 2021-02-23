import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CellValueDatagrid, ColumnDatagrid } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-row',
  templateUrl: './cocoring-datagrid-row.component.html',
  styleUrls: ['./cocoring-datagrid-row.component.scss']
})
export class CocoringDatagridRowComponent implements OnInit, OnDestroy {
  @Input() columns: ColumnDatagrid[] = []
  // @Input() datas: any
  @Input()
  set datas(datas: any) {
    this._datas = datas;

    this.addCheckboxRow();

    this.initCellsValues();
  }
  @Input() datagridService: DatagridService

  _datas: any;
  cellValues: CellValueDatagrid[] = []
  checkboxRowFormGroup: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.eventAllCheckboxesChecked();
  }

  /** ajouté le contrôle checkbox de la ligne dans le formulaire */
  private addCheckboxRow() {
    const checkboxesFormControlArray: FormArray = <FormArray>this.datagridService.checkboxesDatagridForm.get("rowsCheckbox");

    this.checkboxRowFormGroup = this.fb.group({});

    this.checkboxRowFormGroup.addControl(this._datas.id, this.fb.control(false));

    checkboxesFormControlArray.push(this.checkboxRowFormGroup);
  }

  private initCellsValues() {
    this.columns.forEach((column: ColumnDatagrid) => {
      this.cellValues.push({ dataField: column.dataField, value: this.getDatasourceValue(column.dataField) });
    });
  }

  private eventAllCheckboxesChecked() {
    this.subscriptions.add(
      this.datagridService.allRowsChecked.subscribe((value: boolean) => {
        console.log("check this row : ", value, this._datas);
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

  trackBy(index: number) {
    return index;
  }
}
