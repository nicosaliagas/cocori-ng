import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import {
  ColumnDatagridModel,
  ConfigDatagridModel,
  IndicatorPage,
  OrderColumnModel,
} from '../../model/component-datagrid.model';
import { DatasourceOdata, DataSourceType } from '../../model/data-source.model';
import { HttpService } from '../http.service';
import { QueryBuilder } from '../odata-query-builder/queryBuilder';

@Injectable({
  providedIn: 'root',
})
export class DatagridService {
  private _allRowsChecked$: Subject<boolean> = new Subject<boolean>();
  private _refreshNeeded$: Subject<void> = new Subject<void>();
  private _nextPage$: Subject<void> = new Subject<void>();
  private _previousPage$: Subject<void> = new Subject<void>();
  private _resetColumnExcept$: Subject<string> = new Subject<string>();
  private _updateColumn$: Subject<ColumnDatagridModel> = new Subject<ColumnDatagridModel>();
  private _reOrderColumns$: Subject<OrderColumnModel> = new Subject<OrderColumnModel>();
  private _lengthDataSource$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public checkboxesDatagridForm: FormGroup;
  public config: ConfigDatagridModel;

  public itemsPerPage: number = 10
  public currentPage: number = 1
  public totalRows: number = 0;
  public indicatorPage: IndicatorPage;
  public searchGlobal: string;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,) {
    this.onPaginatePage()
  }

  private onPaginatePage() {
    this.onNextPage()

    this.onPreviousPage()
  }

  private onNextPage() {
    this.nextPage$.pipe(
      tap(_ => this.currentPage = this.currentPage + 1),
      tap(_ => this.refreshNeeded$.next()),
    ).subscribe()
  }

  private onPreviousPage() {
    this.previousPage$.pipe(
      tap(_ => this.currentPage = this.currentPage - 1),
      tap(_ => this.refreshNeeded$.next()),
    ).subscribe()
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  get resetColumnExcept$() {
    return this._resetColumnExcept$;
  }

  get updateColumn$() {
    return this._updateColumn$;
  }

  get reOrderColumns$() {
    return this._reOrderColumns$;
  }

  get allRowsChecked$() {
    return this._allRowsChecked$;
  }

  get nextPage$() {
    return this._nextPage$;
  }

  get previousPage$() {
    return this._previousPage$;
  }

  get lengthDataSource$() {
    return this._lengthDataSource$;
  }

  initCheckboxesDatagridForm() {
    this.checkboxesDatagridForm = this.fb.group({});

    this.checkboxesDatagridForm.addControl("selectAllRowsCheckbox", new FormControl(false))
    this.checkboxesDatagridForm.addControl("rowsCheckbox", new FormArray([]))
  }

  checkUncheckAllRows(value: boolean) {
    this.allRowsChecked$.next(value)
  }

  getAllDatas(): Observable<DatasourceOdata> {
    if (!this.config.dataSource) return <Observable<DatasourceOdata>>of(null);

    this.buildQueryOData();

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

  private buildQueryOData(): string {

    const orderByQuery: string = this.generateSortQuery()

    this.indicatorPage = { from: (this.currentPage - 1) * this.itemsPerPage, to: this.currentPage * this.itemsPerPage }

    let queryBuider = new QueryBuilder()
      .top(this.itemsPerPage)
      .skip(this.indicatorPage.from)

    if (orderByQuery) queryBuider = queryBuider.orderBy(orderByQuery)

    queryBuider = this.generateFilterQuery(queryBuider)

    const query = queryBuider.toQuery()

    console.log("query : ", query);

    return query;
  }

  private getDataSource(api: string): Observable<DatasourceOdata> {
    // return this.httpService.get(api, {$filter: filter, $top: 20})
    return this.httpService.get(api)
  }

  lengthDataSource(rowsLength: number) {
    this.lengthDataSource$.next(rowsLength)
  }

  private generateSortQuery() {
    const sortQuery: string = this.config.columns
      .filter((column: ColumnDatagridModel) => column.sort === 'ASC' || column.sort === 'DESC')
      .map(function (elem: ColumnDatagridModel) {
        return `${elem.dataField.toLowerCase()} ${elem.sort.toLowerCase()}`;
      }).join(",");

    return sortQuery
  }

  private generateFilterQuery(qb: QueryBuilder) {
    /** OR */
    // qb
    //   .filter(
    //     f => {
    //       // for (let index = 0; index < 3; index++) {
    //         f.filterPhrase(`contains('ferrari1') or contains('ferrari2')`)
    //       // }
    //       return f
    //     }
    //   )

    /** AND */
    // qb
    //   .filter(
    //     f => {
    //       for (let index = 0; index < 3; index++) {
    //         f.filterPhrase(`contains('ferrari1')`)
    //       }
    //       return f
    //     }
    //   )


    let filterQuery: string = '';

    if (this.searchGlobal) {
      filterQuery = this.config.columns
        .filter((column: ColumnDatagridModel) => column.dataType === 'string')
        .map((elem: ColumnDatagridModel) => {
          return `contains(${elem.dataField}, '${this.searchGlobal}')`;
        }).join(" or ");
    }

    if (filterQuery) {
      qb
        .filter(
          f => f.filterPhrase(filterQuery)
        )
    }

    return qb
  }
}
