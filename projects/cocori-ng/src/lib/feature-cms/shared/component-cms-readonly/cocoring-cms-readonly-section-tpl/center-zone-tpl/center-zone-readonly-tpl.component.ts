import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';

import { ExtendSectionReadonlyTplComponent } from '../extend-section-readonly-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'center-zone-ro-tpl',
  templateUrl: '../../../section-templates/center-zone-tpl.component.html',
})
export class CenterZoneReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)
  }
}
