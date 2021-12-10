import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribeComponent, DatagridService } from '@cocori-ng/lib/src/lib/feature-core';
import { tap } from 'rxjs/operators';

import {
  CocoringDatagridFilterModalComponent,
} from '../cocoring-datagrid-filter-modal/cocoring-datagrid-filter-modal.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-toolbar',
  templateUrl: './cocoring-datagrid-toolbar.component.html',
  styleUrls: ['./cocoring-datagrid-toolbar.component.scss']
})
export class CocoringDatagridToolbarComponent extends AutoUnsubscribeComponent implements OnInit {
  totalRows: number
  nbRowsChecked: number = 0;
  rowRemoved: boolean = false;

  // list: { id: number; name: string; }[];
  // checkboxesFormControlArray: FormArray;

  constructor(
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    public datagridService: DatagridService) {
    super()
  }

  ngOnInit(): void {
    this.setCheckboxHeaderColumn()

    this.onLengthDataSourceChange()

    this.onRowsChecked()
  }

  private onLengthDataSourceChange() {
    this.subscriptions.add(
      this.datagridService.lengthDataSource$.pipe(
        tap((nombre: number) => {
          this.totalRows = nombre;
          this.cdr.detectChanges();
        })
      ).subscribe()
    )
  }

  refreshList() {
    this.datagridService.refreshNeeded$.next();
  }

  deleteSelectedRows() {
    this.datagridService.rowsDeletedEvent$.next(undefined);
  }

  restoreSelectedRows() {
    this.datagridService.rowsRestoredEvent$.next(undefined);
  }

  onRowsChecked() {
    this.subscriptions.add(
      this.datagridService.rowCheckedEvent$.subscribe((rowValues: any) => {
        this.rowRemoved = <boolean>rowValues[this.datagridService.config.propIsArchived]
        this.nbRowsChecked = this.datagridService.rowsSelectedDatagrid.length
        this.cdr.detectChanges()
      })
    )
  }

  filterModal() {
    const dialogRef = this.dialog.open(CocoringDatagridFilterModalComponent, {
      data: { datagridService: this.datagridService },
      autoFocus: false,
      width: '400px'
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((datas: any) => {
        // console.log("modal fermée", datas)
      })
    )
  }

  private setCheckboxHeaderColumn() {
    this.datagridService.initCheckboxesDatagridForm()

    this.subscriptions.add(
      this.datagridService.checkboxesDatagridForm.get("selectAllRowsCheckbox").valueChanges.subscribe((value: boolean) => {
        this.datagridService.checkUncheckAllRows(value)
      })
    )
  }

  nextPage() {
    this.datagridService.nextPage$.next()
  }

  previousPage() {
    this.datagridService.previousPage$.next()
  }

  searchValue(searchValue: string) {
    this.datagridService.searchGlobal = searchValue

    this.datagridService.refreshNeeded$.next()
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
