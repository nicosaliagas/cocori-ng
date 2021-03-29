import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, switchMap, tap } from 'rxjs/operators';

import { HelperUploaderService } from '../../../../core/helper/helper-uploader.service';
import { FileActions, FileModel } from '../../../../core/model/component-uploader.model';
import { FileService } from '../../../../core/service/file/file.service';
import { UploaderService } from '../../../../core/service/uploader/uploader.service';
import {
  CocoringUploaderBottomSheetComponent,
} from '../cocoring-uploader-bottom-sheet/cocoring-uploader-bottom-sheet.component';
import {
  CocoringUploaderFileActionsComponent,
} from '../cocoring-uploader-file-actions/cocoring-uploader-file-actions.component';
import {
  CocoringUploaderFileOptionsComponent,
} from '../cocoring-uploader-file-options/cocoring-uploader-file-options.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-list-file',
  templateUrl: './cocoring-uploader-list-file.component.html',
  styleUrls: ['./cocoring-uploader-list-file.component.scss'],
  providers: [UploaderService]
})
export class CocoringUploaderListFileComponent implements OnInit, OnDestroy {
  @ViewChild('uploader') uploaderInputRef: ElementRef<HTMLElement>;

  @Input() fileModel: FileModel

  private fileUploaded: File;

  subscriptions: Subscription = new Subscription();
  isUploading: boolean = false;
  progress: number;
  onError: boolean = false;

  constructor(
    public dialog: MatDialog,
    private fileService: FileService,
    private _bottomSheet: MatBottomSheet,
    private uploaderService: UploaderService,
    private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.uploaderService.fileBase64$.pipe(
        filter(_ => !!this.fileUploaded),
        switchMap((filebase64: any) => this.uploadBase64(filebase64)),
        tap((id: string) => this.fileModel.id = id),
        tap(_ => this.cdr.detectChanges()),
        debounceTime(500),
        tap(_ => this.isUploading = false),
        tap(_ => this.cdr.detectChanges())
      ).subscribe()
    )

    this.subscriptions.add(
      this.uploaderService.progressSource.pipe(
        filter(_ => !!this.fileUploaded),
        tap((progress: number) => this.progress = progress)
      ).subscribe()
    )
  }

  private uploadBase64(filebase64: any): Observable<any> {
    return this.uploaderService.upload(this.fileUploaded, filebase64).pipe(
      catchError(error => {
        this.errorFile()

        return of(null)
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (!file) return;

    this.isUploading = true
    this.onError = false

    this.fileUploaded = file;

    this.fileModel.fileName = this.fileUploaded.name
    this.fileModel.size = this.fileUploaded.size
    this.fileModel.fileType = HelperUploaderService.checkTypeImage(this.fileUploaded) ? 'image' : 'doc'

    this.cdr.detectChanges()

    this.uploaderService.convertToBase64(this.fileUploaded)
  }

  private errorFile() {
    this.isUploading = false

    this.fileModel.fileType = null

    this.onError = true

    this.cdr.detectChanges()
  }

  openMenuOrBrowse() {
    if (this.fileModel.id) {
      // this.matMenuRef.openMenu()
      // this.openModalOptions()
      this.openBottomSheet()
    } else {
      this.browseFile()
    }
  }

  openModalOptions() {
    const dialogRef = this.dialog.open(CocoringUploaderFileOptionsComponent, {
      data: { file: this.fileModel },
      autoFocus: false,
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((datas: any) => {
      console.log("modal fermée", datas)
    });
  }

  openBottomSheet() {
    const bottomSheet = this._bottomSheet.open(CocoringUploaderBottomSheetComponent, {
      panelClass: 'bottom-sheet-container',
      data: { file: this.fileModel, component: CocoringUploaderFileActionsComponent }
    });

    bottomSheet.afterDismissed().subscribe((action: FileActions) => {
      console.log("bottomsheet fermée", action)

      switch (action) {
        case 'download':
          this.downloadFile()
          break;

        case 'browse':
          this.browseFile()
          break;

        case 'remove':
          this.removeFile()
          break;

        case 'view':
          this.openFile()
          break;

        default:
          break;
      }

    });
  }

  downloadFile() {
    this.uploaderService.GetFileAPI(this.fileModel.id).pipe(
      map(res => this.fileService.downloadFile(res, this.fileModel.fileName))
    ).subscribe()
  }

  openFile() {
    console.log("openFile")
  }

  browseFile() {
    // this.matMenuRef.closeMenu()

    let el: HTMLElement = this.uploaderInputRef.nativeElement;
    el.click();
  }

  removeFile() {
    this.fileUploaded = null
    this.fileModel.id = null
    this.fileModel.fileType = null
    this.fileModel.fileName = null
    this.uploaderService.fileBase64$.next(null)
  }
}
