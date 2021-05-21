import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TemplatesClassesComponents } from '../../../core/model/adapter-cms.model';
import { SectionModel, WysiwygSectionCmsModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['../../section-styles/section-styles.component.scss', './cocoring-cms-section.component.scss'],
  providers: [MatBottomSheet]
})
export class CocoringCmsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  @Input() section: SectionModel
  @Input() wysiwyg: WysiwygSectionCmsModel

  subscription: Subscription = new Subscription();
  readOnly: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private cmsService: CmsService,
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void {
    this.addTemplateSectionComponent()

    this.catalogBlocksOpenedEvent()
  }

  ngOnDestroy() { this.subscription.unsubscribe() }

  private catalogBlocksOpenedEvent() {
    this.subscription.add(
      this.cmsService.catalogBlocksOpened$.pipe(
        tap((isOpened: boolean) => {
          this.readOnly = isOpened
        }),
        tap(_ => this.cdr.detectChanges())
      ).subscribe()
    )
  }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(TemplatesClassesComponents[this.section.block.component], this.containerRef,
      [{ section: this.section }, { wysiwyg: this.wysiwyg }], null)
  }
}
