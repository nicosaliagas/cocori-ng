import { Component, HostListener, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { UploaderService } from '../../../core/service/uploader/uploader.service';

export interface Section {
  name: string;
  updated: Date;
}

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

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(public uploaderService: UploaderService) { }

  ngOnInit(): void {

    this.uploaderService._fileBase64$.pipe(
      switchMap((filebase64: any) => this.uploaderService.upload(this.file, filebase64)),
      tap((message) => {
        console.log("upload done : ", message)

        this.isUploading = false;
        this.infoMessage = message;
      })
    ).subscribe()

    this.uploaderService.progressSource.subscribe(progress => {
      this.progress = progress;
    });
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (!file) return;

    this.fileName = file.name;
    this.file = file;

    this.uploaderService.convertToBase64(file)
  }
}
