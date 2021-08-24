import { ChangeDetectionStrategy, Component, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'two-zones-h-tpl',
  templateUrl: '../../../section-templates/two-zones-h-tpl.component.html',
  styleUrls: [
    '../../../section-styles/two-zones-h-tpl.component.scss',
    '../../../section-styles/editor-section-styles.component.scss'
  ],
  providers: [FormHelperService]
})
export class TwoZonesHTplComponent extends ExtendSectionTplComponent implements OnInit, OnDestroy {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  @ViewChild('ContainerEditor2Ref', { static: false, read: ViewContainerRef }) containerEditor2Ref: ViewContainerRef;

  editorSubscription: Subscription = new Subscription();

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(2)

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

          this.addWysiwygComponentToViewEvent([this.containerEditor1Ref, this.containerEditor2Ref])
        }),
      ).subscribe()
    )
  }
}
