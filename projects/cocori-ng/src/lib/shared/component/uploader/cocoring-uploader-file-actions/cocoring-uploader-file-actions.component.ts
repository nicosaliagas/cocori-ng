import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FileModel } from '../../../../core/model/component-uploader.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-file-actions',
  templateUrl: './cocoring-uploader-file-actions.component.html',
  styleUrls: ['./cocoring-uploader-file-actions.component.scss']
})
export class CocoringUploaderFileActionsComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CocoringUploaderFileActionsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { file: FileModel }) {
    console.log("bottomsheet file", data.file)
  }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
