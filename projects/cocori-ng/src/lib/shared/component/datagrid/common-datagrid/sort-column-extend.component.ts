import { ChangeDetectorRef, Component, HostListener, Injector, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
    selector: '',
    template: ''
})

export abstract class SortColumnExtendComponent {
    @Input() datagridService: DatagridService
    @Input() column: ColumnDatagridModel

    subscriptions: Subscription = new Subscription();
    shiftKey: boolean = false;
    cdr: ChangeDetectorRef;

    constructor(injector: Injector) {
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

        if (!this.column.sort || this.column.sort === 'NONE') this.column.sort = 'ASC'
        else if (this.column.sort === 'ASC') this.column.sort = 'DESC'
        else this.column.sort = 'NONE'

        this.datagridService.updateColumn$.next(this.column)

        this.datagridService.refreshNeeded$.next()
    }
}
