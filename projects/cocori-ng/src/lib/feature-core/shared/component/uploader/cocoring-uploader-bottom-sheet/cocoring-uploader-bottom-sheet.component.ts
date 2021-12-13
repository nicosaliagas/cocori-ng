import { Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { FileActions, FileDetailsComponent } from '../../../../core/model/component-uploader.model';
import { InjectComponentService } from '../../../../core/service/inject-component.service';

@Component({
  selector: 'cocoring-uploader-bottom-sheet',
  templateUrl: './cocoring-uploader-bottom-sheet.component.html',
  styleUrls: ['./cocoring-uploader-bottom-sheet.component.scss']
})
export class CocoringUploaderBottomSheetComponent implements OnInit {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  constructor(
    private injectComponentService: InjectComponentService,
    private _bottomSheetRef: MatBottomSheetRef<CocoringUploaderBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: FileDetailsComponent) { }

  ngOnInit(): void {
    this.addContent()
  }

  addContent() {
    if (!this.data.component) return;

    this.injectComponentService.loadAndAddComponentToContainer(this.data.component, this.containerRef,
      [{ file: this.data.file }, { apisFile: this.data.apisFile }],
      { callback: (action: FileActions) => this.callback(action) }
    );
  }

  callback(action: FileActions): void {
    this._bottomSheetRef.dismiss(action);
  }

  close() {
    this._bottomSheetRef.dismiss();
  }
}
