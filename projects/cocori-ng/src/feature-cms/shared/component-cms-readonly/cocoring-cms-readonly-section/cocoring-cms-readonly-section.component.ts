import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { InjectComponentService } from 'cocori-ng/src/feature-core';

import { SectionModel } from '../../../core/model/cms.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'cocoring-cms-readonly-section',
  templateUrl: './cocoring-cms-readonly-section.component.html',
  styleUrls: ['../../section-styles/section-styles.component.scss', './cocoring-cms-readonly-section.component.scss']
})
export class CocoringCmsReadonlySectionComponent implements OnInit {
  @ViewChild('ContainerRef', { static: true, read: ViewContainerRef }) containerRef: ViewContainerRef;
  private section: SectionModel;

  @Input()
  set config(datas: SectionModel) {

    this.section = datas

    this.containerRef.clear()

    this.addTemplateSectionComponent()
  }

  constructor(
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void { }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(this.section.componentReadonly, this.containerRef,
      { section: this.section }, null)
  }
}
