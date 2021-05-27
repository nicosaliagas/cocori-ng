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
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfigAPIsFile,
  FileActions,
  FileDetailsComponent,
  FileModel,
  UploaderService,
} from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { debounceTime, filter, tap } from 'rxjs/operators';

import { HelperUploaderService } from '../../../../core/service/helper/helper-uploader.service';
import {
  CocoringUploaderBottomSheetComponent,
} from '../cocoring-uploader-bottom-sheet/cocoring-uploader-bottom-sheet.component';
import {
  CocoringUploaderFileActionsComponent,
} from '../cocoring-uploader-file-actions/cocoring-uploader-file-actions.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-uploader-list-file',
  templateUrl: './cocoring-uploader-list-file.component.html',
  styleUrls: ['./cocoring-uploader-list-file.component.scss'],
  providers: [UploaderService]
})
export class CocoringUploaderListFileComponent implements OnInit, OnDestroy {
  @ViewChild('uploader') uploaderInputRef: ElementRef;
  @ViewChild('progressCircle') progressCircleRef: ElementRef;

  @Input() formGroup: FormGroup
  @Input() nameControl: string
  @Input() fileModel: FileModel
  @Input() apisFile: ConfigAPIsFile

  private fileUploaded: File;

  fileFormControl: FormControl;
  subscriptions: Subscription = new Subscription();
  isUploading: boolean = false;
  progress: number;
  onError: boolean = false;
  apiFile: string;
  upoaderFormArray: FormArray;
  fileType: string;

  constructor(
    public dialog: MatDialog,
    public uploaderService: UploaderService,
    private _bottomSheet: MatBottomSheet,
    private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.addFileControl()

    this.subscriptions.add(
      this.uploaderService.fileUploaded$.pipe(
        tap((id: string) => this.validateFileValue(id)),
        tap(_ => this.cdr.detectChanges()),
        debounceTime(500),
        tap(_ => this.isUploading = false),
        tap(_ => this.setFileApi()),
        tap(_ => this.cdr.detectChanges())
      ).subscribe()
    )

    this.subscriptions.add(
      this.uploaderService.fileOnError$.pipe(
        tap(_ => this.errorFile()),
      ).subscribe()
    )

    this.subscriptions.add(
      this.uploaderService.progressSource.pipe(
        filter(_ => !!this.fileUploaded),
        tap((progress: number) => {
          this.progress = progress

          const circumference = this.progressCircleRef.nativeElement.getTotalLength()

          this.progressCircleRef.nativeElement.style.strokeDashoffset = circumference - (progress / 100) * circumference;

          this.cdr.detectChanges()
        })
      ).subscribe()
    )
  }

  private setFileApi() {
    this.apiFile = this.apisFile.apiFile(this.fileModel.id);
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
    this.fileModel.mimeType = this.fileUploaded.type

    this.fileType = HelperUploaderService.checkTypeImage(this.fileUploaded.type) ? 'image' : 'doc'

    this.cdr.detectChanges()

    this.uploaderService.uploadFile(this.fileUploaded)
  }

  private errorFile() {
    this.isUploading = false

    this.removeFile()

    this.onError = true

    this.cdr.detectChanges()
  }

  openMenuOrBrowse() {
    if (this.fileModel.id) {
      this.openBottomSheet()
    } else {
      this.browseFile()
    }
  }

  openBottomSheet() {
    const bottomSheet = this._bottomSheet.open(CocoringUploaderBottomSheetComponent, {
      panelClass: 'bottom-sheet-container',
      data: <FileDetailsComponent>{
        file: this.fileModel,
        apisFile: this.apisFile,
        component: CocoringUploaderFileActionsComponent
      }
    });

    bottomSheet.afterDismissed().subscribe((action: FileActions) => {
      switch (action) {
        case 'browse':
          this.browseFile()
          break;

        case 'remove':
          this.removeFile()
          break;

        default:
          break;
      }
    });
  }

  // downloadFile() {
  //   this.uploaderService.GetFileAPI(this.fileModel.id).pipe(
  //     map(res => this.fileService.downloadFile(res, this.fileModel.fileName))
  //   ).subscribe()
  // }

  browseFile() {
    let el: HTMLElement = this.uploaderInputRef.nativeElement;
    el.click();
  }

  removeFile() {

    this.removeFromFormArray()

    this.fileUploaded = null
    this.fileModel.id = null
    this.fileModel.fileName = null

    this.fileType = null
    this.uploaderInputRef.nativeElement.value = ''
  }

  private removeFromFormArray() {
    /** supprime le formControl et donc sa valeur du tableau de fichier du formulaure */
    if (this.fileModel.id) {
      this.upoaderFormArray.removeAt(this.upoaderFormArray.value.findIndex(fileId => fileId === this.fileModel.id))
    }
  }

  /** create control and add it to the formGroup. Will store id of the file */
  private addFileControl() {
    this.uploaderService.apisFile = this.apisFile

    this.upoaderFormArray = <FormArray>this.formGroup.get(this.nameControl);

    this.fileFormControl = new FormControl(null);

    if (this.fileModel.id) {
      this.fileType = HelperUploaderService.checkTypeImage(this.fileModel.mimeType) ? 'image' : 'doc'

      this.fileFormControl.setValue(this.fileModel.id)

      this.upoaderFormArray.push(this.fileFormControl);

      this.setFileApi()
    }
  }

  /** store the file id */
  private validateFileValue(id: string) {

    this.removeFromFormArray()

    this.fileModel.id = id
    this.fileModel.dateUpload = new Date()

    this.fileFormControl.setValue(id)

    this.upoaderFormArray.push(this.fileFormControl);
  }
}
