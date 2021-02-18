import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatagridService {
  public allRowsChecked: Subject<boolean> = new Subject<boolean>();
  public checkboxesDatagridForm: FormGroup;

  constructor(private fb: FormBuilder,) { }

  initCheckboxesDatagridForm() {
    this.checkboxesDatagridForm = this.fb.group({});

    this.checkboxesDatagridForm.addControl("selectAllRowsCheckbox", new FormControl(false))
    this.checkboxesDatagridForm.addControl("rowsCheckbox", new FormArray([]))
  }

  checkUncheckAllRows(value: boolean) {
    this.allRowsChecked.next(value)
  }
}
