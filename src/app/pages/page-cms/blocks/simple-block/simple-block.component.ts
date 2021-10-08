import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExtendSectionTplComponent } from '@cocori-ng/lib/src/lib/feature-cms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'simple-block',
  templateUrl: './simple-block.component.html',
  styleUrls: ['./simple-block.component.scss']
})
export class SimpleBlockComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  
  constructor(
    public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)

    this.addWysiwygToView()
  }

  private addWysiwygToView() {
    this.subscriptions.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          if (isOpened) return

          this.addWysiwygComponentToViewEvent([this.containerEditor1Ref])
        }),
      ).subscribe()
    )
  }

}
