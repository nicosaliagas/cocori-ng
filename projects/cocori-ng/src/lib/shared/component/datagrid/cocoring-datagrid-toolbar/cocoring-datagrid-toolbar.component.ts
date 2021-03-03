import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';
import {
  CocoringDatagridFilterModalComponent,
} from '../cocoring-datagrid-filter-modal/cocoring-datagrid-filter-modal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-toolbar',
  templateUrl: './cocoring-datagrid-toolbar.component.html',
  styleUrls: ['./cocoring-datagrid-toolbar.component.scss']
})
export class CocoringDatagridToolbarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  totalRows: number

  // list: { id: number; name: string; }[];
  // checkboxesFormControlArray: FormArray;

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public datagridService: DatagridService) { }

  ngOnInit(): void {
    this.setCheckboxHeaderColumn();

    this.onLengthDataSourceChange();
  }

  private onLengthDataSourceChange() {
    this.datagridService.lengthDataSource$.pipe(
      tap((nombre: number) => {
        this.totalRows = nombre;
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  refreshList() {
    this.datagridService.refreshNeeded$.next();
  }

  filterModal() {
    const dialogRef = this.dialog.open(CocoringDatagridFilterModalComponent, {
      autoFocus: false,
      width: '550px'
    });

    dialogRef.afterClosed().subscribe((datas: any) => {
      console.log("modal fermée", datas)
    });
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

  nextPage() {
    this.datagridService.nextPage$.next()
  }

  previousPage() {
    this.datagridService.previousPage$.next()
  }


  // private buildCheckboxesArray() {
  //   this.list = [{ id: 1, name: "golf" }, { id: 2, name: "tennis" }, { id: 3, name: "foot" }];
  //   this.checkboxesFormControlArray = <FormArray>this.datagridService.checkboxesDatagridForm.get("rowsCheckbox")
  //   this.list.forEach((item: any, i) => {
  //     let fg = this.fb.group({});
  //     fg.addControl(this.list[i].name, this.fb.control(true));
  //     this.checkboxesFormControlArray.push(fg);
  //   });
  //   console.log("Test checkboxes", this.checkboxesFormControlArray, this.datagridService.checkboxesDatagridForm.get("rowsCheckbox"))
  // }
}
