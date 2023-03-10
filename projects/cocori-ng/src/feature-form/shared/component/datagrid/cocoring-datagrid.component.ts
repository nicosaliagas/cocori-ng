import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfigDatagridModel, Odata, OdataClass } from 'cocori-ng/src/feature-core';
import { merge, Subject } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { DatagridService } from '../../../core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    selector: 'cocoring-datagrid',
    templateUrl: 'cocoring-datagrid.component.html',
    styleUrls: ['./cocoring-datagrid.component.scss'],
    providers: [OdataClass]
})
export class CocoringDatagridComponent implements OnDestroy {
    checkboxesGroup: UntypedFormGroup;

    @HostBinding('class.table-full-width') forceFullWidth: boolean = true;

    datagridDataSource: OdataClass;
    totalRowsSaved: number = 5;

    private readonly destroy$ = new Subject();

    constructor(
        private fb: UntypedFormBuilder,
        private cdr: ChangeDetectorRef,
        private odata: OdataClass,
        public datagridService: DatagridService
    ) { }

    ngOnDestroy(): void {
        this.destroy$.next(undefined);
        this.destroy$.complete();
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

        this.onRowsDeletedRestored()
    }

    @Output() eventClickRow: EventEmitter<void> = new EventEmitter<void>();
    @Output() eventRowsDeleted: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() eventRowsRestored: EventEmitter<string[]> = new EventEmitter<string[]>();

    refreshDatagrid() {
        this.datagridService.refreshNeeded$.next()
    }

    private loadDataSource() {
        const emptySearch$ = this.datagridService.refreshNeeded$.pipe(
            debounceTime(400),
            tap(_ => this.datagridDataSource = null),
            tap(_ => {
                /** on d??sactive la case ?? cocher qui permet de s??lectionner / d??s??lectionner toutes les lignes du tableau */
                this.datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").setValue(false, { emitEvent: false })
            }),
            tap(_ => this.datagridService.checkUncheckAllRows(false)),
            tap(_ => this.cdr.detectChanges()),
            switchMap(() => this.datagridService.getAllDatas())
        )

        merge(this.datagridService.getAllDatas(), emptySearch$).pipe(
            takeUntil(this.destroy$),
            map((results: Odata<any>) => {
                this.odata.setDatasource(results)

                this.datagridDataSource = this.odata

                this.cdr.detectChanges();
            }),
            // tap(_ => this.totalRowsSaved = this.datagridDataSource.getResults().length),
            tap(_ => this.totalRowsSaved = this.datagridDataSource.getCount()),
            tap(_ => this.datagridService.lengthDataSource(this.totalRowsSaved))
        ).subscribe()
    }

    /** re order cellValues array */
    private onReOrderColumns() {
        this.datagridService.reOrderColumns$.pipe(
            takeUntil(this.destroy$),
            tap(_ => this.cdr.detectChanges()),
        ).subscribe()
    }

    private onRowSelected() {
        this.datagridService.rowSelectedByClickEvent$.pipe(
            takeUntil(this.destroy$),
            tap((rowDatas: any) => this.eventClickRow.emit(rowDatas)),
        ).subscribe()
    }

    private onRowsDeletedRestored() {
        this.datagridService.rowsDeletedEvent$.pipe(
            takeUntil(this.destroy$),
            tap(_ => this.eventRowsDeleted.emit(this.datagridService.rowsSelectedDatagrid)),
        ).subscribe()

        this.datagridService.rowsRestoredEvent$.pipe(
            takeUntil(this.destroy$),
            tap(_ => this.eventRowsRestored.emit(this.datagridService.rowsSelectedDatagrid)),
        ).subscribe()
    }

    trackBy(item: any, index: number) {
        return `${item.id}-${index}`
    }
}
