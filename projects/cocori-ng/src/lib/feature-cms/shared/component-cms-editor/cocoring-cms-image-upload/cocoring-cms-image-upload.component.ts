import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { FileModel, UploaderService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ApisConfigCmsModel, SectionModel } from '../../../core/model/cms.model';

@Component({
  selector: 'cocoring-cms-image-upload',
  templateUrl: './cocoring-cms-image-upload.component.html',
  styleUrls: ['./cocoring-cms-image-upload.component.scss'],
  providers: [UploaderService]
})
export class CocoringCmsImageUploadComponent implements OnInit {
  @ViewChild('uploader') uploaderInputRef: ElementRef;
  @ViewChild('progressCircle') progressCircleRef: ElementRef;

  @Input() section: SectionModel
  @Input() nameBackgroundImage: string
  @Input() apisConfig: ApisConfigCmsModel

  @Output() apiFileUploaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeBackgroundImage: EventEmitter<void> = new EventEmitter<void>();

  subscriptions: Subscription = new Subscription();
  isUploading: boolean = false;
  uploadProgress: number;
  backgroundImageUpload: FileModel
  fileUploaded: File;

  onError: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public uploaderService: UploaderService,
  ) { }

  ngOnInit(): void {
    this.uploaderService.apisFile = this.apisConfig

    this.eventsFileUpload()
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (!file) return;

    this.isUploading = true
    this.onError = false

    this.backgroundImageUpload = { description: null }

    this.fileUploaded = file;

    this.backgroundImageUpload.size = this.fileUploaded.size

    this.uploaderService.uploadFile(this.fileUploaded)
  }

  browseFile() {
    let el: HTMLElement = this.uploaderInputRef.nativeElement;
    el.click();
  }

  private eventsFileUpload() {
    this.subscriptions.add(
      this.uploaderService.fileUploaded$.pipe(
        tap((id: string) => this.getFileId(id)),
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
          this.uploadProgress = progress

          const circumference = this.progressCircleRef.nativeElement.getTotalLength()

          this.progressCircleRef.nativeElement.style.strokeDashoffset = circumference - (progress / 100) * circumference;

          this.cdr.detectChanges()
        })
      ).subscribe()
    )
  }

  private getFileId(id: string) {
    this.backgroundImageUpload.id = id
  }

  /** on récupère l'api du fichier pour la transmettre au composant parent */
  private setFileApi() {
    const apiFile = this.apisConfig.apiFile(this.backgroundImageUpload.id);

    this.apiFileUploaded.emit(apiFile)
  }
  
  onBackgroundImageRemoved(event) {
    event.stopPropagation()
    
    this.removeBackgroundImage.emit()
  }

  private errorFile() {
    this.isUploading = false

    this.deleteFile()

    this.onError = true
  }

  private deleteFile() {
    this.fileUploaded = null
    this.backgroundImageUpload.id = null

    this.uploaderInputRef.nativeElement.value = ''
  }
}
