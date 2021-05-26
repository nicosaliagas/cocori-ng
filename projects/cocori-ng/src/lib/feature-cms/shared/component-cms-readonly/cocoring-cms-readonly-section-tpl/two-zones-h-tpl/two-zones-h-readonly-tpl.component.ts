import { Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  selector: 'two-zones-h-tpl',
  templateUrl: '../../../section-templates/two-zones-h-tpl.component.html',
  styleUrls: ['../../../section-styles/two-zones-h-tpl.component.scss']
})
export class TwoZonesHReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(2)
  }
}