import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { HelperUploaderService } from '../../../../core/helper/helper-uploader.service';
import { FileModel } from '../../../../core/model/component-uploader.model';
import { UploaderService } from '../../../../core/service/uploader/uploader.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-list-file',
  templateUrl: './cocoring-uploader-list-file.component.html',
  styleUrls: ['./cocoring-uploader-list-file.component.scss']
})
export class CocoringUploaderListFileComponent implements OnInit, OnDestroy {

  @Input() file: FileModel
  @Input() uploaderService: UploaderService

  newFile: File;

  subscriptions: Subscription = new Subscription();
  isUploading: boolean = false;
  infoMessage: any;
  progress: number;

  constructor(private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.uploaderService.fileBase64$.pipe(
        filter(_ => !!this.newFile),
        switchMap((filebase64: any) => this.uploaderService.upload(this.newFile, filebase64)),
        tap((id: string) => {

          console.log("upload completed ! : ", id)

          this.file.id = id

          this.isUploading = false;
          this.infoMessage = id;
        }),
        tap(_ => this.cdr.detectChanges())
      ).subscribe()
    )

    this.subscriptions.add(
      this.uploaderService.progressSource.subscribe(progress => {
        this.progress = progress;
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (!file) return;

    this.newFile = file;

    this.file.fileName = this.newFile.name
    this.file.size = this.newFile.size
    this.file.fileType = HelperUploaderService.checkTypeImage(this.newFile) ? 'image' : 'doc'

    this.cdr.detectChanges()

    this.uploaderService.convertToBase64(this.newFile)
  }
}
