import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'title-two-zones-tpl',
  templateUrl: '../../../section-templates/title-two-zones-tpl.component.html',
  styleUrls: [
    '../../../section-styles/title-two-zones-tpl.component.scss',
    '../../../section-styles/editor-section-styles.component.scss'],
  providers: [FormHelperService]
})
export class TitleTwoZonesTplComponent extends ExtendSectionTplComponent implements OnInit, OnDestroy {
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

  private addWysiwygToView() {
    this.subscriptions.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          if (isOpened) return

          this.addWysiwygComponentToViewEvent([this.containerEditor1Ref, this.containerEditor2Ref, this.containerEditor3Ref])
        }),
      ).subscribe()
    )
  }
}
