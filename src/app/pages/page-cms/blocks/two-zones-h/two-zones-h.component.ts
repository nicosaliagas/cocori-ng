import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExtendSectionTplComponent } from 'cocori-ng/src/feature-cms';
import { FormHelperService } from 'cocori-ng/src/feature-core';
import { takeUntil, tap } from 'rxjs/operators';

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

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(2)

    this.addWysiwygToView()
  }

  private addWysiwygToView() {
    this.cmsService.catalogBlocksOpened$.pipe(
      takeUntil(this.destroy$),
      tap((isOpened: boolean) => {
        if (isOpened) return

        this.addWysiwygComponentToViewEvent([this.containerEditor1Ref, this.containerEditor2Ref])
      }),
    ).subscribe()
  }
}
