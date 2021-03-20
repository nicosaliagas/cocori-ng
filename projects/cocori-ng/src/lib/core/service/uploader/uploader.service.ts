import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private uploadUrl = "http://localhost:8080"

  public contenuBase64: any

  constructor(
    private http: HttpClient,
    private httpService: HttpService,) { }

  upload(file: File) {

    const req = new HttpRequest(
      "POST",
      `${this.uploadUrl}/api/upload-file`,
      { filebase64: this.contenuBase64 },
      {
        reportProgress: true
      }
    );

    return this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    );
    // return this.UploadFile(file).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap((envelope: any) => this.processProgress(envelope)),
    //   last()
    // );
  }

  encodeBase64(file: File) {
    const that = this;
    const reader: FileReader = new FileReader();

    reader.onload = function (readerEvt: FileReaderEvent) {
      let binaryString;

      if (!readerEvt) {
        binaryString = reader['content'];
      } else {
        binaryString = readerEvt.target.result;
      }

      that.contenuBase64 = btoa(binaryString);

    }.bind(this);

    reader.readAsBinaryString(file);
  }

  UploadFile(file: File): Observable<any> {
    return this.httpService.post(`${this.uploadUrl}/api/upload-file`, { filebase64: this.contenuBase64 })
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
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}
