import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import SparkMD5 from 'spark-md5';

import { configdefault } from '../../../config/config.components';
import {
  AssembleFilePartsCommand,
  ConfigAPIsFile,
  FilePartCommand,
  NewFileCommand,
} from '../../model/component-uploader.model';
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
  public fileUploaded$: Subject<any> = new Subject<any>();
  public fileOnError$: Subject<any> = new Subject<any>();
  public apisFile: ConfigAPIsFile;
  chunkSize: number;
  file: File;

  constructor(
    private httpService: HttpService,) {
    this.chunkSize = configdefault.upload.chunkSize;
  }

  uploadFile(file: File) {
    this.file = file

    const numberParts = this.getNumberPart(file);

    this.convertFileToArrayBuffer(file).subscribe(
      (fileArrayBuffer: ArrayBuffer) => {
        if (numberParts === 1) {
          this.handleFullFile(fileArrayBuffer, numberParts)
        } else {
          this.handlePartsFile(fileArrayBuffer, numberParts)
        }
      }
    )
  }

  private handleFullFile(fileArrayBuffer: ArrayBuffer, numberParts: number) {
    this.sendFull(fileArrayBuffer, numberParts).pipe(
      tap((fileId: string) => {
        this.fileUploaded$.next(fileId)
      }),
    ).subscribe()
  }

  private handlePartsFile(fileArrayBuffer: ArrayBuffer, numberParts: number) {
    /** send first part then the others */
    this.sendFull(this.getPart(fileArrayBuffer, 0), numberParts).pipe(
      tap((fileId: string) => {
        return fileId
      }),
    ).subscribe((fileId: string) => {
      this.loopParts(numberParts, fileId, fileArrayBuffer).then(() => {
        this.endCommand(fileId, fileArrayBuffer).subscribe((fileId: string) => {
          this.fileUploaded$.next(fileId)
        })
      })
    })
  }

  private async loopParts(numberParts: number, fileId: string, fileArrayBuffer: any) {
    for (var iPart = 1; iPart < numberParts; iPart++) {
      await this.sendPart(fileId, iPart, this.getPart(fileArrayBuffer, iPart), numberParts)
    }
  }


  private sendFull(buffer: ArrayBuffer, numberParts: number): Observable<any> {
    const command: NewFileCommand = {
      fileName: this.file.name,
      mimeType: this.file.type,
      numberParts: numberParts,
      base64Content: this.convertToBase64(buffer)
    }

    return this.sendFile(command, 1, numberParts)
  }

  private sendPart(fileId: string, partIndex: number, buffer: ArrayBuffer, numberParts: number): Promise<any> {
    const command: FilePartCommand = {
      fileId: fileId,
      partIndex: partIndex,
      base64Content: this.convertToBase64(buffer)
    }
    return this.sendFile(command, partIndex + 1, numberParts).toPromise()
  }

  private sendFile(command: NewFileCommand | FilePartCommand, partIndex: number, numberParts: number) {
    return this.UploadFileAPI(command).pipe(
      map(event => this.getEventMessage(event, partIndex, numberParts)),
      last(),
      catchError(error => {
        this.fileOnError$.next()
        return of(null)
      })
    );
  }

  private endCommand(fileId: string, buffer: ArrayBuffer) {
    const command: AssembleFilePartsCommand = {
      fileId: fileId,
      checksum: this.getChecksum(buffer)
    }
    return this.EndUploadPartsFileAPI(command).pipe(
      catchError(error => {
        this.fileOnError$.next()
        return of(null)
      })
    );
  }

  private getNumberPart(file: File) {
    return this.chunkSize <= 0
      ? 1
      : Math.ceil(file.size / this.chunkSize);
  }

  convertFileToArrayBuffer(file: File): Observable<ArrayBuffer> {
    return new Observable((observer) => {
      const reader = new FileReader();

      reader.readAsArrayBuffer(file);
      reader.onload = function () {
        const arraybuffer = <ArrayBuffer>reader.result;

        observer.next(arraybuffer)
        observer.complete();
      }
    })
  }

  convertToBase64(buffer: ArrayBuffer) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  getPart(data: ArrayBuffer, partIndex: number): ArrayBuffer {
    const start = partIndex * this.chunkSize;
    const end = start + this.chunkSize;

    return data.slice(start, Math.min(end, data.byteLength));
  }

  getChecksum(data: ArrayBuffer) {
    const spark = new SparkMD5.ArrayBuffer();
    spark.append(data);
    return btoa(spark.end(true));
  }

  private getEventMessage(event: HttpEvent<any>, partIndex: number, numberParts: number) {
    switch (event.type) {
      case HttpEventType.Sent:
        return this.progressSource.next(Math.round((partIndex / numberParts) * 100));

      case HttpEventType.UploadProgress:
        return `progress...`;

      case HttpEventType.Response:
        return event.body;

      default:
        return `default...`;
    }
  }

  /** API */

  UploadFileAPI(datas: NewFileCommand | FilePartCommand): Observable<any> {
    const apiFile: string = this.apisFile.apiFile()

    return this.httpService.upload(`${apiFile}`, datas)
  }

  EndUploadPartsFileAPI(datas: AssembleFilePartsCommand): Observable<any> {
    const apiFile: string = this.apisFile.apiFile()

    return this.httpService.patch(`${apiFile}`, datas)
  }
}
