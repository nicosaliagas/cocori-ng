import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ConfigDatagridModel } from '../../../core/model/component-datagrid.model';
import { DatasourceOdata } from '../../../core/model/data-source.model';
import { DatagridService } from '../../../core/service/datagrid/datagrid.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'cocoring-datagrid',
    templateUrl: 'cocoring-datagrid.component.html',
    styleUrls: ['./cocoring-datagrid.component.scss'],
    // providers: [DatagridService]
})
export class CocoringDatagridComponent implements OnInit, OnDestroy {
    checkboxesGroup: FormGroup;
    subscriptions: Subscription = new Subscription();
    groupeCasesACocher: FormGroup;
    checkboxesFormControlArray: FormArray;
    list: { id: number; name: string; }[];

    @HostBinding('class.table-full-width') forceFullWidth: boolean = true;

    datagridDataSource: DatasourceOdata;
    numberRowsSaved: number = 5;
    
    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        public datagridService: DatagridService
    ) { }

    @Input()
    set config(config: ConfigDatagridModel) {
        if (!config) {
            throw new Error(`La config du datgrid n'est pas correcte... config: ${config}`);
        }

        this.datagridService.config = config;

        this.setCheckboxHeaderColumn();

        console.log("configuration datagrid", config)

        this.loadDataSource();
    }

    private loadDataSource() {
        const emptySearch$ = this.datagridService.refreshNeeded$.pipe(
            tap(_ => console.log("pipe listen to refreshNeeded$")),
            tap(_ => this.datagridDataSource = null),
            tap(_ => this.cdr.detectChanges()),
            switchMap(() => this.datagridService.getAllDatas())
        )

        this.subscriptions.add(
            merge(this.datagridService.getAllDatas(), emptySearch$).pipe(
                map((results: DatasourceOdata) => {
                    this.datagridDataSource = results
                    this.cdr.detectChanges();
                }),
                tap(_ => this.numberRowsSaved = this.datagridDataSource.results.length)
            ).subscribe()
        )
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
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

    trackBy(item: any, index: number) {
        return `${item.id}-${index}`
    }
}
