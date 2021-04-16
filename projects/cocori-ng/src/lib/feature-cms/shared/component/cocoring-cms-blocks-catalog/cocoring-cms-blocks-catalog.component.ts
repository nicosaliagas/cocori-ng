import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { configBlocksDesign } from '../../../config/config-cms-design-blocks';
import { BlockModel } from '../../../core/model/cms.model';
import { CmsService } from '../../../core/service/cms.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-blocks-catalog',
  templateUrl: './cocoring-cms-blocks-catalog.component.html',
  styleUrls: ['./cocoring-cms-blocks-catalog.component.scss']
})
export class CocoringCmsBlocksCatalogComponent implements OnInit {
  constructor(
    public cmsService: CmsService,
    ) {
    this.cmsService.catalog = <BlockModel[]>configBlocksDesign
  }

  ngOnInit(): void { }

  selectBlock(block: BlockModel) {
    this.cmsService.addSection(block)
  }

  trackBy(index: number) {
    return index;
  }
}
