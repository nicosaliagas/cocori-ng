import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HelperService } from '@cocori-ng/lib/src/lib/feature-core';

import { SectionModel } from '../../../core/model/cms.model';
import { Block } from '../../../core/service/block';
import { CatalogService } from '../../../core/service/catalog.service';
import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-blocks-catalog',
  templateUrl: './cocoring-cms-blocks-catalog.component.html',
  styleUrls: ['./cocoring-cms-blocks-catalog.component.scss'],
  providers: [CatalogService]
})
export class CocoringCmsBlocksCatalogComponent implements OnInit {
  constructor(
    public cmsService: CmsService,
    private helperService: HelperService,
    private catalogService: CatalogService
  ) {
    this.cmsService.blocks = this.catalogService.getBlocks()
  }

  ngOnInit(): void { }

  selectBlock(block: Block) {
    const newSection: SectionModel = {
      idSection: this.helperService.generateGuid(),
      block: block,
      backgroundColor: block.data.backgroundColor,
      values: null
    }
    
    this.cmsService.addSection(newSection)
  }

  trackBy(index: number) {
    return index;
  }
}
