import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { last, map, tap } from 'rxjs/operators';

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

  private uploadUrl = "http://localhost:8080"

  constructor(
    private httpService: HttpService,) { }

  upload(file: File, filebase64: any) {
    return this.UploadFileAPI(filebase64).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
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

      console.log("emit filebase64 next")

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
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return event.body;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

  /** APIs */

  UploadFileAPI(filebase64: any): Observable<any> {
    return this.httpService.upload(`${this.uploadUrl}/api/file`, { filebase64: filebase64 })
  }

  GetFileAPI(id: any): Observable<any> {
    return this.httpService.file(`${this.uploadUrl}/api/file/${id}`)
  }
}
