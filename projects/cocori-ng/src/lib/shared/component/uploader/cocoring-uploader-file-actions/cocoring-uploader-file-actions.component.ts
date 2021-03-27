import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { FileActions, FileModel } from '../../../../core/model/component-uploader.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-file-actions',
  templateUrl: './cocoring-uploader-file-actions.component.html',
  styleUrls: ['./cocoring-uploader-file-actions.component.scss']
})
export class CocoringUploaderFileActionsComponent implements OnInit {

  @Input() file: FileModel

  @Output() callback: EventEmitter<FileActions> = new EventEmitter<FileActions>();

  constructor() { }

  ngOnInit(): void {
  }

  actionFile(event: MouseEvent, action: FileActions) {
    this.callback.emit(action)

    event.preventDefault();
  }
}
