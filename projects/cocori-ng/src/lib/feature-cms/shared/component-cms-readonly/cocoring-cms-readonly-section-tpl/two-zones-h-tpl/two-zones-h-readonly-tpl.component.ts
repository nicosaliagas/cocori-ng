import { Component, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  selector: 'two-zones-h-tpl',
  templateUrl: '../../../templates/two-zones-h-tpl.component.html',
  styleUrls: ['./two-zones-h-readonly-tpl.component.scss']
})
export class TwoZonesHReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.init(2)
  }
}
