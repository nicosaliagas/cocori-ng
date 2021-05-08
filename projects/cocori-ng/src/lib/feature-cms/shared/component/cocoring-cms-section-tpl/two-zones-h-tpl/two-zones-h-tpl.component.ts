import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CocoringWysiwygComponent, FormHelperService, InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  selector: 'two-zones-h-tpl',
  templateUrl: '../../../templates/center-zone-tpl/two-zones-h-tpl.component.html',
  styleUrls: ['./two-zones-h-tpl.component.scss'],
  providers: [FormHelperService]
})
export class TwoZonesHTplComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  @ViewChild('ContainerEditor2Ref', { static: false, read: ViewContainerRef }) containerEditor2Ref: ViewContainerRef;
  
  editorSubscription: Subscription = new Subscription();
  
  constructor(
    private injectComponentService: InjectComponentService,
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(2)

    this.addWysiwygToView()
  }

  private addWysiwygToView() {
    this.editorSubscription.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          if (isOpened) return

          this.injectComponentService.loadAndAddComponentToContainer(CocoringWysiwygComponent, this.containerEditor1Ref,
            [{ config: this.configsWysiwyg['editor1'] }], null)

          this.injectComponentService.loadAndAddComponentToContainer(CocoringWysiwygComponent, this.containerEditor2Ref,
            [{ config: this.configsWysiwyg['editor2'] }], null)
        }),
      ).subscribe()
    )
  }
}
