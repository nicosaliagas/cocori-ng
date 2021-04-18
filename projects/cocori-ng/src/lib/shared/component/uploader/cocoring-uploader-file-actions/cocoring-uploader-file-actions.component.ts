import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfigAPIsFile, FileActions, FileModel } from '@cocori-ng/lib/src/lib/feature-core';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-file-actions',
  templateUrl: './cocoring-uploader-file-actions.component.html',
  styleUrls: ['./cocoring-uploader-file-actions.component.scss']
})
export class CocoringUploaderFileActionsComponent implements OnInit {

  @Input() file: FileModel
  @Input() apisFile: ConfigAPIsFile
  @Output() callback: EventEmitter<FileActions> = new EventEmitter<FileActions>();

  apiFile: string;
  apiFileDownload: string;

  constructor() { }

  ngOnInit(): void {
    this.setFileApi()
    this.setFileDownloadApi()
  }

  private setFileApi() {
    this.apiFile = this.apisFile.apiFile(this.file.id);
  }

  private setFileDownloadApi() {
    this.apiFileDownload = this.apisFile.apiFileDownload(this.file.id);
  }

  actionFile(event: MouseEvent, action: FileActions) {
    this.close(action)

    event.preventDefault();
  }

  close(action?: FileActions) {
    this.callback.emit(action)
  }
}
