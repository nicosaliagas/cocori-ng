import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { InjectComponentService } from '@cocori-ng/lib/src/lib/feature-core';

import { ReadonlyTemplatesClassesComponents, SectionPageDatasModel } from '../../../core/model/adapter-cms.model';

@Component({
  selector: 'cocoring-cms-readonly-section',
  templateUrl: './cocoring-cms-readonly-section.component.html',
  styleUrls: ['./cocoring-cms-readonly-section.component.scss']
})
export class CocoringCmsReadonlySectionComponent implements OnInit {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;

  @Input() config: SectionPageDatasModel

  constructor(
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void {
    console.log("config section >>> ", this.config)

    this.addTemplateSectionComponent()
  }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(ReadonlyTemplatesClassesComponents[this.config.template], this.containerRef,
      [], null)
  }
}
