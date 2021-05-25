import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  selector: 'text-image-full-tpl',
  templateUrl: '../../../section-templates/text-image-full-tpl.component.html',
  styleUrls: ['./text-image-full-tpl.component.scss' ,'../../../section-styles/text-image-full-tpl.component.scss'],
  providers: [FormHelperService]
})
export class TextImageFullTplComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;

  editorSubscription: Subscription = new Subscription();

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)

    this.addWysiwygToView()
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
}
