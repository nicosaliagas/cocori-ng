import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
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

  // public contenuBase64: any

  myfile: Observable<any> = new Observable<any>();

  _fileBase64$: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private httpService: HttpService,) { }

  upload(file: File, filebase64: any) {
    return this.UploadFile(filebase64).pipe(
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

      // that.contenuBase64 = btoa(binaryString);
      that._fileBase64$.next(btoa(binaryString))

    }.bind(this);

    filereader.readAsBinaryString(file);
  }

  private readFile(file: File, subscriber: Subscriber<any>) {
    const filereader: FileReader = new FileReader();

    filereader.readAsBinaryString(file);

    filereader.onload = (readerEvt) => {
      let binaryString;

      if (!readerEvt) {
        binaryString = filereader['content'];
      } else {
        binaryString = readerEvt.target.result;
      }

      console.log("its ok...")

      subscriber.next(btoa(binaryString));

      subscriber.complete();
    };

    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  UploadFile(filebase64: any): Observable<any> {
    // return this.httpService.upload(`${this.uploadUrl}/api/upload-file`, { filebase64: this.contenuBase64 })
    return this.httpService.upload(`${this.uploadUrl}/api/upload-file`, { filebase64: filebase64 })
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
