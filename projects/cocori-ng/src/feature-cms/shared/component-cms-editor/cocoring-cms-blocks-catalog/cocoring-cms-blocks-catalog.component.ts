import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HelperService } from 'cocori-ng/src/feature-core';

import { SectionModel } from '../../../core/model/cms.model';
import { Block } from '../../../core/service/block';
import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-blocks-catalog',
  templateUrl: './cocoring-cms-blocks-catalog.component.html',
  styleUrls: ['./cocoring-cms-blocks-catalog.component.scss'],
})
export class CocoringCmsBlocksCatalogComponent implements OnInit {

  @Input() catalog: Block[] = []

  constructor(
    public cmsService: CmsService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void { }

  selectBlock(block: Block) {
    const newSection: SectionModel = {
      id: this.helperService.generateGuid(),
      key: block.key,
      component: block.data.component,
      componentReadonly: null,
      backgroundColor: block.data.backgroundColor,
      values: block.data.content
    }

    this.cmsService.addSection(newSection)
  }

  trackBy(index: number) {
    return index;
  }
}
