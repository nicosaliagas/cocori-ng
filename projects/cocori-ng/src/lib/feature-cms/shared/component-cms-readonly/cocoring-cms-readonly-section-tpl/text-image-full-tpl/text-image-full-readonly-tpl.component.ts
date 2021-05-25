import { Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  selector: 'text-image-full-tpl',
  templateUrl: '../../../section-templates/text-image-full-tpl.component.html',
  styleUrls: ['../../../section-styles/text-image-full-tpl.component.scss']
})
export class TextImageFullReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(1)
  }
}
