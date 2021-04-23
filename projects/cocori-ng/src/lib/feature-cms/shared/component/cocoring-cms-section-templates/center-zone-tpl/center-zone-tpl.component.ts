import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';

import { ExtendSectionTplComponent } from '../extend-section-tpl.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'center-zone-tpl',
  templateUrl: './center-zone-tpl.component.html',
  styleUrls: ['./center-zone-tpl.component.scss']
})
export class CenterZoneTplComponent extends ExtendSectionTplComponent implements OnInit {

  constructor(
    public injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)
  }
}
