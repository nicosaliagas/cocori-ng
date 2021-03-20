import { Component, HostListener, OnInit } from '@angular/core';

import { UploaderService } from '../../../core/service/uploader/uploader.service';

@Component({
  selector: 'cocoring-uploader',
  templateUrl: './cocoring-uploader.component.html',
  styleUrls: ['./cocoring-uploader.component.scss']
})
export class CocoringUploaderComponent implements OnInit {
  progress: number;
  fileName: string;
  file: File;
  imageUrl: string | ArrayBuffer;
  infoMessage: any;
  isUploading: boolean = false;

  constructor(public uploaderService: UploaderService) { }

  ngOnInit(): void {
    this.uploaderService.progressSource.subscribe(progress => {
      this.progress = progress;
    });
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (!file) return;

    this.fileName = file.name;
    this.file = file;

    this.uploaderService.encodeBase64(file)
  }

  onUpload() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;

    this.uploaderService.upload(this.file).subscribe(message => {

      console.log("upload done...", message)

      this.isUploading = false;
      this.infoMessage = message;
    });
  }
}
