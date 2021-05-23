import { Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  selector: 'center-zone-ro-tpl',
  templateUrl: '../../../section-templates/center-zone-tpl.component.html',
})
export class CenterZoneReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(1)
  }
}
