import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutoUnsubscribeComponent, DatasourceOdata } from '@cocori-ng/lib/src/lib/feature-core';
import { merge } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { ConfigDatagridModel } from '../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../core/service/datagrid/datagrid.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'cocoring-datagrid',
    templateUrl: 'cocoring-datagrid.component.html',
    styleUrls: ['./cocoring-datagrid.component.scss'],
})
export class CocoringDatagridComponent extends AutoUnsubscribeComponent {
    checkboxesGroup: FormGroup;

    @HostBinding('class.table-full-width') forceFullWidth: boolean = true;

    datagridDataSource: DatasourceOdata;
    totalRowsSaved: number = 5;

    constructor(
        private fb: FormBuilder,
        private cdr: ChangeDetectorRef,
        public datagridService: DatagridService
    ) {
        super()
    }

    @Input()
    set config(config: ConfigDatagridModel) {
        if (!config) {
            throw new Error(`La config du datgrid n'est pas correcte... config: ${config}`);
        }

        this.datagridService.config = config;

        this.loadDataSource();

        this.onReOrderColumns()

        this.onRowSelected()

        this.onRowsDeleted()
    }

    @Output() eventClickRow: EventEmitter<void> = new EventEmitter<void>();
    @Output() eventRowsDeleted: EventEmitter<string[]> = new EventEmitter<string[]>();

    refreshDatagrid() {
        this.datagridService.refreshNeeded$.next()
    }

    private loadDataSource() {
        const emptySearch$ = this.datagridService.refreshNeeded$.pipe(
            debounceTime(400),
            tap(_ => this.datagridDataSource = null),
            tap(_ => {
                /** on désactive la case à cocher qui permet de sélectionner / désélectionner toutes les lignes du tableau */
                this.datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").setValue(false, { emitEvent: false })
            }),
            tap(_ => this.datagridService.checkUncheckAllRows(false)),
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

    /** re order cellValues array */
    private onReOrderColumns() {
        this.subscriptions.add(
            this.datagridService.reOrderColumns$.pipe(
                tap(_ => this.cdr.detectChanges()),
            ).subscribe()
        )
    }

    private onRowSelected() {
        this.subscriptions.add(
            this.datagridService.rowSelectedByClickEvent$.pipe(
                tap((rowDatas: any) => this.eventClickRow.emit(rowDatas)),
            ).subscribe()
        )
    }

    private onRowsDeleted() {
        this.subscriptions.add(
            this.datagridService.rowsDeletedEvent$.pipe(
                tap(_ => this.eventRowsDeleted.emit(this.datagridService.rowsSelectedDatagrid)),
            ).subscribe()
        )
    }

    trackBy(item: any, index: number) {
        return `${item.id}-${index}`
    }
}
