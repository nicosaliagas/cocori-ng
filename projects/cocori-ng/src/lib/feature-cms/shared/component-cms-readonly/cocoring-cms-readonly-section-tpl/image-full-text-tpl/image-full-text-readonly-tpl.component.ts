import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'image-full-text-tpl',
  templateUrl: '../../../section-templates/image-full-text-tpl.component.html',
  styleUrls: ['../../../section-styles/text-image-full-tpl.component.scss']
})
export class ImageFullTextReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {
  apiFile: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(1)
  }
  browseFile(name) { }
}
