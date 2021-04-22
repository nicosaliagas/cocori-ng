import {
  ChangeDetectionStrategy,
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

import { SectionModel, WysiwygSectionCmsModel } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cocoring-cms-section',
  templateUrl: './cocoring-cms-section.component.html',
  styleUrls: ['./cocoring-cms-section.component.scss'],
  providers: [MatBottomSheet]
})
export class CocoringCmsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  @Input() section: SectionModel
  @Input() wysiwyg: WysiwygSectionCmsModel

  constructor(
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void {
    this.addTemplateSectionComponent()
  }

  ngOnDestroy() { }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(this.section.block.component, this.containerRef,
      [{ section: this.section }, { wysiwyg: this.wysiwyg }], null)
  }
}
