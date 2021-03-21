import { Component, HostListener, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { FileModel } from '../../../core/model/component-uploader.model';
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

  files: FileModel[] = [
    {
      id: 'E1C57AD5-6921-44CE-8F0E-7230CE576205',
      fileName: 'Rapport.pdf',
      size: 182,
      fileType: 'doc'
    },
    {
      id: '3CE8B88D-E32F-4BAF-AABB-E70866687340',
      fileName: 'CarteIdentite.png',
      size: 82,
      fileType: 'image'
    },
    {
      fileName: 'Votre passeport',
    },
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
