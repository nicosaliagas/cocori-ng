import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-head',
  templateUrl: './cocoring-datagrid-head.component.html',
  styleUrls: ['./cocoring-datagrid-head.component.scss']
})
export class CocoringDatagridHeadComponent implements OnInit, OnDestroy {
  @Input() column: ColumnDatagridModel
  @Input() datagridService: DatagridService

  subscriptions: Subscription = new Subscription();
  shiftKey: boolean = false;

  constructor(private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.onResetColumn()
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private onResetColumn() {
    this.subscriptions.add(
      this.datagridService.resetColumnExcept$.pipe(
        filter((datafieldException: string) => datafieldException !== this.column.dataField),
        tap(_ => this.column.sort = 'NONE'),
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

    this.datagridService.refreshNeeded$.next()
  }
}
