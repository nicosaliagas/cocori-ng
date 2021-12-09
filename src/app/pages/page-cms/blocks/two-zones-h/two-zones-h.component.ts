import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExtendSectionTplComponent } from '@cocori-ng/lib/src/lib/feature-cms';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'two-zones-h',
  templateUrl: './two-zones-h.component.html',
  styleUrls: [
    './two-zones-h.component.scss',
    '../../assets/editor-section-styles.component.scss'
  ],
  providers: [FormHelperService]
})
export class TwoZonesHComponent extends ExtendSectionTplComponent implements OnInit {
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
