import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
    private catalogService: CatalogService
  ) {
    this.cmsService.blocks = this.catalogService.getBlocks()
  }

  ngOnInit(): void { }

  selectBlock(block: Block) {
    this.cmsService.addSection(block)
  }

  trackBy(index: number) {
    return index;
  }
}
