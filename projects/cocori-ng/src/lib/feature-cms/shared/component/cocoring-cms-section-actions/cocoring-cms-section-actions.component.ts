import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BottomSheetSectionActions } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-section-actions',
  templateUrl: './cocoring-cms-section-actions.component.html',
  styleUrls: ['./cocoring-cms-section-actions.component.scss']
})
export class CocoringCmsSectionActionsComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CocoringCmsSectionActionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    console.log("Bottomsheet - Section id", data)
  }

  ngOnInit(): void {
  }

  close(event) {
    this._bottomSheetRef.dismiss();

    event.preventDefault();
  }

  removeSection(event) {
    this._bottomSheetRef.dismiss(<BottomSheetSectionActions>'remove');

    event.preventDefault();
  }
}
