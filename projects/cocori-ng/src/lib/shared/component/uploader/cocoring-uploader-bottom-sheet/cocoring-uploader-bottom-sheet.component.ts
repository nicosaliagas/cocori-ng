import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { InjectComponentService } from '../../../../core/service/inject-component.service';
import { FileActions, FileModel } from '../../../../core/model/component-uploader.model';
import { CocoringUploaderFileActionsComponent } from '../cocoring-uploader-file-actions/cocoring-uploader-file-actions.component';

@Component({
  selector: 'cocoring-uploader-bottom-sheet',
  templateUrl: './cocoring-uploader-bottom-sheet.component.html',
  styleUrls: ['./cocoring-uploader-bottom-sheet.component.scss']
})
export class CocoringUploaderBottomSheetComponent implements OnInit {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  constructor(
    private injectComponentService: InjectComponentService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private _bottomSheetRef: MatBottomSheetRef<CocoringUploaderBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {
      file: FileModel,
      component: any
    }) {
    console.log("bottomsheet template file", data.file)
  }

  ngOnInit(): void {
    this.addContent()
  }

  addContent() {
    if (!this.data.component) return;

    this.injectComponentService.loadAndAddComponentToContainer(this.data.component, this.containerRef,
      [{ file: this.data.file }],
      { callback: (action: FileActions) => this.callback(action) }
    );
  }

  callback(action: FileActions): void {
    console.log("returned from bottom sheet", action)

    this._bottomSheetRef.dismiss(action);
  }

}
