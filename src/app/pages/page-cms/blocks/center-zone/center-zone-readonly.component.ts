import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ExtendSectionReadonlyTplComponent } from 'cocori-ng/src/feature-cms';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'center-zone-readonly',
  templateUrl: './center-zone.component.html',
})
export class CenterZoneReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)
  }
}
