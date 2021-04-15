import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { configBlocksDesign } from '../../../config/config-cms-design-blocks';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cocoring-cms-blocks-catalog',
  templateUrl: './cocoring-cms-blocks-catalog.component.html',
  styleUrls: ['./cocoring-cms-blocks-catalog.component.scss']
})
export class CocoringCmsBlocksCatalogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("blocks", configBlocksDesign)
  }
}
