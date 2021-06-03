import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService, UploaderService } from '@cocori-ng/lib/src/lib/feature-core';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-full-text-tpl',
  templateUrl: '../../../section-templates/image-full-text-tpl.component.html',
  styleUrls: ['./text-image-full-tpl.component.scss', '../../../section-styles/text-image-full-tpl.component.scss'],
  providers: [FormHelperService, UploaderService]
})
export class ImageFullTextTplComponent extends ExtendSectionTplComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private addComponentsToView() {
    this.subscriptions.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          if (isOpened) return

          this.addWysiwygComponentToViewEvent([this.containerEditor1Ref])

          this.addImageUploadComponentToViewEvent([this.containerImageUpload])
        }),
      ).subscribe()
    )
  }
}
