import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService, UploaderService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  @ViewChild('ContainerImageUpload', { static: false, read: ViewContainerRef }) containerImageUpload: ViewContainerRef;

  editorSubscription: Subscription = new Subscription();

  constructor(
    injector: Injector,) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1, 1)

    this.addComponentsToView()
  }

  private addComponentsToView() {
    this.editorSubscription.add(
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
