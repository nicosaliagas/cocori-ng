import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ConfigDatagridModel } from '../../model/component-datagrid.model';
import { DatasourceOdata, DataSourceType } from '../../model/data-source.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class DatagridService {
  public allRowsChecked: Subject<boolean> = new Subject<boolean>();
  private _refreshNeeded$ = new Subject<void>();
  public checkboxesDatagridForm: FormGroup;
  public config: ConfigDatagridModel;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,) {
      console.log("DatagridService instance")
    }

  get refreshNeeded$() {
    console.log("get refreshNeeded$")
    return this._refreshNeeded$;
  }

  initCheckboxesDatagridForm() {
    this.checkboxesDatagridForm = this.fb.group({});

    this.checkboxesDatagridForm.addControl("selectAllRowsCheckbox", new FormControl(false))
    this.checkboxesDatagridForm.addControl("rowsCheckbox", new FormArray([]))
  }

  checkUncheckAllRows(value: boolean) {
    this.allRowsChecked.next(value)
  }

  getAllDatas(): Observable<DatasourceOdata> {
    if (!this.config.dataSource) return <Observable<DatasourceOdata>>of(null);

    switch (this.config.dataSource.type) {
      case DataSourceType.BRUTE:
        return <Observable<DatasourceOdata>>of(<DatasourceOdata>this.config.dataSource.value).pipe(delay(1000))
        break;

      case DataSourceType.API:
        return this.getDataSource(<string>this.config.dataSource.value)
        break;

      default:
        return <Observable<DatasourceOdata>>of(null)
        break;
    }
  }

  private getDataSource(api: string): Observable<DatasourceOdata> {
    return this.httpService.get(api)
  }
}
