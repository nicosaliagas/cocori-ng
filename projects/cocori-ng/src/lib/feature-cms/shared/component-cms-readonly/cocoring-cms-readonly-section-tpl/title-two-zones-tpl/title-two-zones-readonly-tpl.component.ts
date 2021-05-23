import { Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  selector: 'title-two-zones-tpl',
  templateUrl: '../../../section-templates/title-two-zones-tpl.component.html',
  styleUrls: ['../../../section-styles/title-two-zones-tpl.component.scss']
})
export class TitleTwoZonesReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(3)
  }
}
