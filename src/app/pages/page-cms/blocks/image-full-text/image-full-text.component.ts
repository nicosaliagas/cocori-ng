import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExtendSectionTplComponent } from 'cocori-ng/src/feature-cms';
import { FormHelperService } from 'cocori-ng/src/feature-core';
import { UploaderService } from 'cocori-ng/src/feature-form';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-full-text-tpl',
  templateUrl: './image-full-text.component.html',
  styleUrls: ['./text-image-full.component.scss'],
  providers: [FormHelperService, UploaderService]
})
export class ImageFullTextComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  @ViewChild('ContainerImageUpload', { static: false, read: ViewContainerRef }) containerImageUpload: ViewContainerRef;

  constructor(
    injector: Injector,) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1, 1)

    this.addComponentsToView()
  }

  private addComponentsToView() {
    this.cmsService.catalogBlocksOpened$.pipe(
      takeUntil(this.destroy$),
      tap((isOpened: boolean) => {
        if (isOpened) return

        this.addWysiwygComponentToViewEvent([this.containerEditor1Ref])

        this.addImageUploadComponentToViewEvent([this.containerImageUpload])
      }),
    ).subscribe()
  }
}
