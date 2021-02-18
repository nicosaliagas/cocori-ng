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
  @Input() datas: any
  @Input() datagridService: DatagridService

  cellValues: CellValueDatagrid[] = []
  checkboxRowFormGroup: FormGroup;
  subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {

    this.addCheckboxRow();

    this.initCellsValues();

    this.eventAllCheckboxesChecked();
  }

  /** ajouté le contrôle checkbox de la ligne dans le formulaire */
  private addCheckboxRow() {
    const checkboxesFormControlArray: FormArray = <FormArray>this.datagridService.checkboxesDatagridForm.get("rowsCheckbox");

    this.checkboxRowFormGroup = this.fb.group({});

    this.checkboxRowFormGroup.addControl(this.datas.id, this.fb.control(false));

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
        console.log("check this row : ", value, this.datas);
        this.checkboxRowFormGroup.get(this.datas.id).setValue(value);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private getDatasourceValue(column: string) {
    return this.datas.hasOwnProperty(column) ? this.datas[column] : null
  }

  trackBy(index: number) {
    return index;
  }
}
