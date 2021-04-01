import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { last, map, tap } from 'rxjs/operators';

import { configdefault } from '../../../config/config.components';
import { ConfigAPIsFile } from '../../model/component-uploader.model';
import { HttpService } from '../http.service';

interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Injectable({
  providedIn: "root"
})
export class UploaderService {
  public progressSource = new BehaviorSubject<number>(0);
  public fileBase64$: Subject<any> = new Subject<any>();
  public apisFile: ConfigAPIsFile;
  chunkSize: number;

  constructor(
    private httpService: HttpService,) {
    this.chunkSize = configdefault.upload.chunkSize;
  }

  upload(file: File, filebase64: any) {

    const numberParts = this.getNumberPart(file);

    if (numberParts === 1) {
      console.log("on envoit tout")
    } else {
      console.log(`${numberParts} parties`)
    }

    return this.UploadFileAPI(filebase64).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
  }

  // fileSelected(file) {
  //   for (let offset = 0; offset < file.size; offset += this.chunkSize) {
  //     const chunk = file.slice(offset, offset + this.chunkSize);
  //     const apiResponse = await this.apiService.sendChunk(chunk, offset);
  //   }
  // }

  private getNumberPart(file: File) {
    return this.chunkSize <= 0
      ? 1
      : Math.ceil(file.size / this.chunkSize);
  }

  convertToBase64(file: File) {
    const that = this;
    const filereader: FileReader = new FileReader();

    filereader.onload = function (readerEvt: FileReaderEvent) {
      let binaryString;

      if (!readerEvt) {
        binaryString = filereader['content'];
      } else {
        binaryString = readerEvt.target.result;
      }

      that.fileBase64$.next(btoa(binaryString))

    }.bind(this);

    filereader.readAsBinaryString(file);
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:

        ////// prendre le numérode la part...

        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return event.body;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  /** API */

  UploadFileAPI(filebase64: any): Observable<any> {
    const apiFile: string = this.apisFile.apiFile()

    return this.httpService.upload(`${apiFile}`, { filebase64: filebase64 })
  }
}
