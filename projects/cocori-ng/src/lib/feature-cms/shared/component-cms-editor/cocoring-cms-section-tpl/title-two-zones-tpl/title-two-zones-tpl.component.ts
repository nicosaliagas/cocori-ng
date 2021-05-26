import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  selector: 'title-two-zones-tpl',
  templateUrl: '../../../section-templates/title-two-zones-tpl.component.html',
  styleUrls: ['./title-two-zones-tpl.component.scss' ,'../../../section-styles/title-two-zones-tpl.component.scss'],
  providers: [FormHelperService]
})
export class TitleTwoZonesTplComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  @ViewChild('ContainerEditor2Ref', { static: false, read: ViewContainerRef }) containerEditor2Ref: ViewContainerRef;
  @ViewChild('ContainerEditor3Ref', { static: false, read: ViewContainerRef }) containerEditor3Ref: ViewContainerRef;

  editorSubscription: Subscription = new Subscription();

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(3)

    this.addWysiwygToView()
  }

  private addWysiwygToView() {
    this.editorSubscription.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          if (isOpened) return

          this.addWysiwygComponentToViewEvent([this.containerEditor1Ref, this.containerEditor2Ref, this.containerEditor3Ref])
        }),
      ).subscribe()
    )
  }
}
