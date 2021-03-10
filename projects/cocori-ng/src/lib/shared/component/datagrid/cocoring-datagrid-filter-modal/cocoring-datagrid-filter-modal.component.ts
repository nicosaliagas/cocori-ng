import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';

import { ColumnDatagridModel } from '../../../../core/model/component-datagrid.model';
import { DatagridService } from '../../../../core/service/datagrid/datagrid.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-filter-modal',
  templateUrl: './cocoring-datagrid-filter-modal.component.html',
  styleUrls: ['./cocoring-datagrid-filter-modal.component.scss']
})
export class CocoringDatagridFilterModalComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  formulaire: FormGroup;
  disabled = true
  isSidenavOpen: boolean = true;

  datagridService: DatagridService;
  currentColumn: ColumnDatagridModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { datagridService: DatagridService },
    private fb: FormBuilder,
    private mdDialogRef: MatDialogRef<CocoringDatagridFilterModalComponent>) {

    this.datagridService = data.datagridService

    this.formulaire = this.fb.group({
      acceptGoogleAnalytics: true,
      acceptCookie: true
    })
  }

  ngOnInit(): void { }

  public close(value: any) {
    this.mdDialogRef.close(value);
  }

  public validateFrom({ value, valid }: { value: any, valid: boolean }) {
    this.close({ acceptGoogleAnalytics: value.acceptGoogleAnalytics });
  }

  public actionsHeaderModal() {
    if (this.currentColumn) {
      // back to the list of columns
      this.currentColumn = null
      this.sidenav.toggle()
    } else {
      this.close(null)
    }
  }

  public columnSelected(column: ColumnDatagridModel) {
    this.currentColumn = column

    this.sidenav.toggle()
  }

  public trackBy(item: any, index: number) {
    return `${item.id}-${index}`
  }

  public dropColumn(event: CdkDragDrop<ColumnDatagridModel[]>) {
    moveItemInArray(this.datagridService.config.columns, event.previousIndex, event.currentIndex);
    
    this.datagridService.reOrderColumns$.next({ previousIndex: event.previousIndex, currentIndex: event.currentIndex })
  }
}
