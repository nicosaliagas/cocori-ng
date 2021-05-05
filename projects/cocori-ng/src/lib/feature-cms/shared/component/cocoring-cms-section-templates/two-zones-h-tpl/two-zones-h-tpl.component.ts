import { Component, Injector, OnInit } from '@angular/core';
import { FormHelperService } from '@cocori-ng/lib/src/lib/feature-core';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  selector: 'two-zones-h-tpl',
  templateUrl: './two-zones-h-tpl.component.html',
  styleUrls: ['./two-zones-h-tpl.component.scss'],
  providers: [FormHelperService]
})
export class TwoZonesHTplComponent extends ExtendSectionTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(2)
  }
}