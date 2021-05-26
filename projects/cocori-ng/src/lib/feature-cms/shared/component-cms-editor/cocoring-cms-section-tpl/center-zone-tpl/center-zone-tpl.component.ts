import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'center-zone-tpl',
  templateUrl: '../../../section-templates/center-zone-tpl.component.html',
  styleUrls: ['./center-zone-tpl.component.scss'],
  providers: [FormHelperService]
})
export class CenterZoneTplComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;

  editorSubscription: Subscription = new Subscription();

  constructor(
    public injector: Injector) {
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
