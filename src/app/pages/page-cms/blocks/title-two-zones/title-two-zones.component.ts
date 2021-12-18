import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ExtendSectionTplComponent } from 'cocori-ng/src/feature-cms';
import { FormHelperService } from 'cocori-ng/src/feature-core';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'title-two-zones-tpl',
  templateUrl: './title-two-zones.component.html',
  styleUrls: [
    './title-two-zones.component.scss',
    '../../assets/editor-section-styles.component.scss'],
  providers: [FormHelperService]
})
export class TitleTwoZonesComponent extends ExtendSectionTplComponent implements OnInit {
  @ViewChild('ContainerEditor1Ref', { static: false, read: ViewContainerRef }) containerEditor1Ref: ViewContainerRef;
  @ViewChild('ContainerEditor2Ref', { static: false, read: ViewContainerRef }) containerEditor2Ref: ViewContainerRef;
  @ViewChild('ContainerEditor3Ref', { static: false, read: ViewContainerRef }) containerEditor3Ref: ViewContainerRef;

  constructor(
    injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(3)

    this.addWysiwygToView()
  }

  private addWysiwygToView() {
    this.cmsService.catalogBlocksOpened$.pipe(
      takeUntil(this.destroy$),
      tap((isOpened: boolean) => {
        if (isOpened) return

        this.addWysiwygComponentToViewEvent([this.containerEditor1Ref, this.containerEditor2Ref, this.containerEditor3Ref])
      }),
    ).subscribe()
  }
}
