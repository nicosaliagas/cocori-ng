import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExtendSectionTplComponent } from 'cocori-ng/src/feature-cms';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'center-zone',
  templateUrl: './center-zone.component.html',
  styleUrls: []
})
export class CenterZoneTplComponent extends ExtendSectionTplComponent implements OnInit {
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
    this.cmsService.catalogBlocksOpened$.pipe(
      takeUntil(this.destroy$),
      tap((isOpened: boolean) => {
        if (isOpened) return

        this.addWysiwygComponentToViewEvent([this.containerEditor1Ref])
      }),
    ).subscribe()
  }

}
