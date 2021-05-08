import { Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  selector: 'center-zone-ro-tpl',
  templateUrl: '../../../templates/center-zone-tpl/center-zone-tpl.component.html',
  styleUrls: ['./center-zone-readonly-tpl.component.scss']
})
export class CenterZoneReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(1)
  }
}
