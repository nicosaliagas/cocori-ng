import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BottomSheetSectionReturnAction, SectionModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-section-actions',
  templateUrl: './cocoring-cms-section-actions.component.html',
  styleUrls: ['./cocoring-cms-section-actions.component.scss']
})
export class CocoringCmsSectionActionsComponent implements OnInit {
  color: string;
  section: SectionModel;

  constructor(
    private cmsService: CmsService,
    private _bottomSheetRef: MatBottomSheetRef<CocoringCmsSectionActionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { section: SectionModel }) {
    this.section = data.section

    this.color = this.section.backgroundColor

    console.log("datas section in bottom", this.section)
  }

  ngOnInit(): void {
  }

  close(event) {
    this._bottomSheetRef.dismiss();

    event.preventDefault();
  }

  removeSection(event) {
    this._bottomSheetRef.dismiss(<BottomSheetSectionReturnAction>{ action: 'remove' });

    event.preventDefault();
  }

  duplicateSection(event) {
    this._bottomSheetRef.dismiss(<BottomSheetSectionReturnAction>{ action: 'duplicate' });

    event.preventDefault();
  }

  selectColor(event) {
    this._bottomSheetRef.dismiss(<BottomSheetSectionReturnAction>{ action: 'backgroundColor', value: this.color });
  }

  onColorChange(color: any) {
    this.color = color.hexa

    this.cmsService.changeBackgroundColorSection(this.section.idSection, color.hexa)
  }
}
