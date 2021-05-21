import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';

import { ReadonlyTemplatesClassesComponents, SectionPageDatasModel } from '../../../core/model/adapter-cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cocoring-cms-readonly-section',
  templateUrl: './cocoring-cms-readonly-section.component.html',
  styleUrls: ['../../section-styles/section-styles.component.scss' , './cocoring-cms-readonly-section.component.scss']
})
export class CocoringCmsReadonlySectionComponent implements OnInit {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  @Input() config: SectionPageDatasModel

  constructor(
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void {
    this.addTemplateSectionComponent()
  }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(ReadonlyTemplatesClassesComponents[this.config.template], this.containerRef,
      [{section: this.config}], null)
  }
}
