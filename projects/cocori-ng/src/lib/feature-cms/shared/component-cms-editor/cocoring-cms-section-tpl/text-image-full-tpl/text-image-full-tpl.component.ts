import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Injector,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { FileModel, FormHelperService, UploaderService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'text-image-full-tpl',
  templateUrl: '../../../section-templates/text-image-full-tpl.component.html',
  styleUrls: ['./text-image-full-tpl.component.scss', '../../../section-styles/text-image-full-tpl.component.scss'],
  providers: [FormHelperService, UploaderService]
})
export class TextImageFullTplComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  @ViewChild('uploader') uploaderInputRef: ElementRef;

  editorSubscription: Subscription = new Subscription();
  fileUploaded: File;
  fileModel: FileModel
  isUploading: boolean = false;
  apiFile: string;
  onError: boolean = false;
  progress: number;

  constructor(
    injector: Injector,
    public uploaderService: UploaderService,) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)

    this.uploaderService.apisFile = this.wysiwyg

    this.addWysiwygToView()

    this.eventsFileUpload()
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);

    if (!file) return;

    this.isUploading = true
    // this.onError = false

    this.fileModel = {description: 'fuck'}

    this.fileUploaded = file;

    this.fileModel.fileName = this.fileUploaded.name
    this.fileModel.size = this.fileUploaded.size
    this.fileModel.mimeType = this.fileUploaded.type

    // this.fileType = HelperUploaderService.checkTypeImage(this.fileUploaded.type) ? 'image' : 'doc'

    // this.cdr.detectChanges()

    this.uploaderService.uploadFile(this.fileUploaded)
  }

  private addWysiwygToView() {
    this.editorSubscription.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          if (isOpened) return

          this.addWysiwygComponentToViewEvent([this.containerEditor1Ref])
        }),
      ).subscribe()
    )
  }

  browseFile() {
    let el: HTMLElement = this.uploaderInputRef.nativeElement;
    el.click();
  }

  private eventsFileUpload() {
    this.subscriptions.add(
      this.uploaderService.fileUploaded$.pipe(
        tap((id: string) => this.storeFileValue(id)),
        // tap(_ => this.cdr.detectChanges()),
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

          console.log("Progress", progress)

          // const circumference = this.progressCircleRef.nativeElement.getTotalLength()

          // this.progressCircleRef.nativeElement.style.strokeDashoffset = circumference - (progress / 100) * circumference;

          // this.cdr.detectChanges()
        })
      ).subscribe()
    )
  }

  /** store the file id */
  private storeFileValue(id: string) {
    this.fileModel.id = id
    this.fileModel.dateUpload = new Date()
  }

  private setFileApi() {
    this.apiFile = this.wysiwyg.apiFile(this.fileModel.id);

    console.log("Api File", this.apiFile)
  }

  private errorFile() {
    this.isUploading = false

    this.removeFile()

    this.onError = true

    // this.cdr.detectChanges()
  }

  removeFile() {
    this.fileUploaded = null
    this.fileModel.id = null
    this.fileModel.fileName = null

    this.uploaderInputRef.nativeElement.value = ''
  }
}
