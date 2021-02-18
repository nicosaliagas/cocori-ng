import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';

import { ConfigDatagridModel } from '../../../core/model/component-datagrid.model';
import { DataSourceInput, DatasourceOdata, DataSourceType } from '../../../core/model/data-source.model';
import { DatagridService } from '../../../core/service/datagrid/datagrid.service';
import { HttpService } from '../../../core/service/http.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'cocoring-datagrid',
    templateUrl: 'cocoring-datagrid.component.html',
    styleUrls: ['./cocoring-datagrid.component.scss']
})
export class CocoringDatagridComponent implements OnInit, OnDestroy {
    _config: ConfigDatagridModel;
    checkboxesGroup: FormGroup;
    datagridDataSource$: Observable<DatasourceOdata>;
    subscriptions: Subscription = new Subscription();
    groupeCasesACocher: FormGroup;
    checkboxesFormControlArray: FormArray;
    list: { id: number; name: string; }[];

    constructor(
        private fb: FormBuilder,
        public datagridService: DatagridService,
        private httpService: HttpService,
    ) { }

    @Input()
    set config(config: ConfigDatagridModel) {
        if (!config) {
            throw new Error(`La config du datgrid n'est pas correcte... config: ${config}`);
        }

        this._config = config;

        this.setCheckboxHeaderColumn();

        console.log("configuration datagrid", config)

        this.datagridDataSource$ = this.loadDataSource(this._config.dataSource)

    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    loadDataSource(configDataSource: DataSourceInput): Observable<DatasourceOdata> {
        if (!configDataSource) return <Observable<DatasourceOdata>>of(null);

        switch (configDataSource.type) {
            case DataSourceType.BRUTE:
                return <Observable<DatasourceOdata>>of(configDataSource.value)
                break;

            case DataSourceType.API:
                return this.getDataSource(<string>configDataSource.value)
                break;

            default:
                return <Observable<DatasourceOdata>>of(null)
                break;
        }
    }

    private getDataSource(api: string): Observable<DatasourceOdata> {
        return this.httpService.get(api)
    }

    private setCheckboxHeaderColumn() {

        this.datagridService.initCheckboxesDatagridForm()

        this.subscriptions.add(
            this.datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").valueChanges.subscribe((value: boolean) => {
                this.datagridService.checkUncheckAllRows(value)
            })
        )

        // this.buildCheckboxesArray()
    }

    private buildCheckboxesArray() {

        this.list = [{ id: 1, name: "golf" }, { id: 2, name: "tennis" }, { id: 3, name: "foot" }];

        this.checkboxesFormControlArray = <FormArray>this.datagridService.checkboxesDatagridForm.get("rowsCheckbox")

        this.list.forEach((item: any, i) => {
            let fg = this.fb.group({});

            fg.addControl(this.list[i].name, this.fb.control(true));

            this.checkboxesFormControlArray.push(fg);
        });

        console.log("Test checkboxes", this.checkboxesFormControlArray, this.datagridService.checkboxesDatagridForm.get("rowsCheckbox"))
    }

    trackBy(index: number) {
        return index;
    }
}
