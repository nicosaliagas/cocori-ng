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
import { FormBuilder, FormGroup } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { ConfigDatagridModel } from '../../../core/model/component-datagrid.model';
import { DatasourceOdata } from '../../../core/model/data-source.model';
import { DatagridService } from '../../../core/service/datagrid/datagrid.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'cocoring-datagrid',
    templateUrl: 'cocoring-datagrid.component.html',
    styleUrls: ['./cocoring-datagrid.component.scss'],
})
export class CocoringDatagridComponent implements OnInit, OnDestroy {
    checkboxesGroup: FormGroup;
    subscriptions: Subscription = new Subscription();
    groupeCasesACocher: FormGroup;

    @HostBinding('class.table-full-width') forceFullWidth: boolean = true;

    datagridDataSource: DatasourceOdata;
    totalRowsSaved: number = 5;

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

        console.log("configuration datagrid", config)

        this.loadDataSource();
    }

    private loadDataSource() {
        const emptySearch$ = this.datagridService.refreshNeeded$.pipe(
            debounceTime(500),
            tap(_ => this.datagridDataSource = null),
            tap(_ => {
                /** on désactive la case à cocher qui permet de sélecitonner / désélectionner toutes les lignes du tableau */
                this.datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").setValue(false, { emitEvent: false })
            }),
            tap(_ => this.cdr.detectChanges()),
            switchMap(() => this.datagridService.getAllDatas())
        )

        this.subscriptions.add(
            merge(this.datagridService.getAllDatas(), emptySearch$).pipe(
                map((results: DatasourceOdata) => {
                    this.datagridDataSource = results
                    this.cdr.detectChanges();
                }),
                tap(_ => this.totalRowsSaved = this.datagridDataSource.results.length),
                tap(_ => this.datagridService.lengthDataSource(this.totalRowsSaved))
            ).subscribe()
        )
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscriptions.unsubscribe()
    }

    trackBy(item: any, index: number) {
        return `${item.id}-${index}`
    }
}
