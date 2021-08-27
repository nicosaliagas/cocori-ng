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
  private _config: SectionPageDatasModel;

  // @Input() config: SectionPageDatasModel
  @Input()
  set config(datas: SectionPageDatasModel) {

    this._config = datas

    this.containerRef.clear()

    this.addTemplateSectionComponent()
  }

  constructor(
    private injectComponentService: InjectComponentService,
  ) { }

  ngOnInit(): void { }

  private addTemplateSectionComponent() {
    this.injectComponentService.loadAndAddComponentToContainer(ReadonlyTemplatesClassesComponents[this._config.template], this.containerRef,
      [{section: this._config}], null)
  }
}
