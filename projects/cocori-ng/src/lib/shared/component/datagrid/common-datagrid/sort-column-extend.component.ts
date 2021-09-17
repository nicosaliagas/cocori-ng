import { ChangeDetectorRef, Component, HostListener, Injector, Input } from '@angular/core';
import { AutoUnsubscribeComponent } from '@cocori-ng/lib/src/lib/feature-core';
import { filter, tap } from 'rxjs/operators';

import { ColumnDatagridModel, SortType } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
    selector: '',
    template: ''
})

export abstract class SortColumnExtendComponent extends AutoUnsubscribeComponent {
    @Input() datagridService: DatagridService
    @Input() column: ColumnDatagridModel

    shiftKey: boolean = false;
    cdr: ChangeDetectorRef;

    constructor(injector: Injector) {
        super()

        this.cdr = injector.get(ChangeDetectorRef);
    }

    onResetColumn() {
        this.subscriptions.add(
            this.datagridService.resetColumnExcept$.pipe(
                filter((datafieldException: string) => datafieldException !== this.column.dataField),
                tap(_ => this.column.sort = 'NONE'),
                tap(_ => this.cdr.detectChanges()),
            ).subscribe()
        )

        this.subscriptions.add(
            this.datagridService.updateColumn$.pipe(
                filter((columnUpdated: ColumnDatagridModel) => columnUpdated.dataField === this.column.dataField),
                tap((columnUpdated: ColumnDatagridModel) => this.column = columnUpdated),
                tap(_ => this.cdr.detectChanges()),
            ).subscribe()
        )
    }

    @HostListener('window:keydown', ['$event']) onShiftPressed($event: KeyboardEvent) {
        if ($event.shiftKey) {
            this.shiftKey = true
        }
    }

    @HostListener('window:keyup', ['$event']) onShiftReleased($event: KeyboardEvent) {
        if ($event.code === "ShiftLeft") {
            this.shiftKey = false
        }
    }

    sort() {
        if (!this.shiftKey) this.datagridService.resetColumnExcept$.next(this.column.dataField)

        let newSortValue: SortType = 'NONE'

        if (!this.column.sort || this.column.sort === 'NONE') newSortValue = 'ASC'
        else if (this.column.sort === 'ASC') newSortValue = 'DESC'
        else newSortValue = 'NONE'

        this.column.sort = newSortValue

        this.datagridService.updateColumn$.next(this.column)

        this.datagridService.refreshNeeded$.next()
    }
}
