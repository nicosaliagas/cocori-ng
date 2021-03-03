import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-datagrid-filter-modal',
  templateUrl: './cocoring-datagrid-filter-modal.component.html',
  styleUrls: ['./cocoring-datagrid-filter-modal.component.scss']
})
export class CocoringDatagridFilterModalComponent implements OnInit {
  formulaire: FormGroup;
  disabled = true
  isSidenavOpen: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private mdDialogRef: MatDialogRef<CocoringDatagridFilterModalComponent>) {

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
}

