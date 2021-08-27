import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'two-zones-h-tpl',
  templateUrl: '../../../section-templates/two-zones-h-tpl.component.html',
  styleUrls: ['../../../section-styles/two-zones-h-tpl.component.scss']
})
export class TwoZonesHReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(2)
  }
}
