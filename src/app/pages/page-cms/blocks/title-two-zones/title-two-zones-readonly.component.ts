import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ExtendSectionReadonlyTplComponent } from 'cocori-ng/src/feature-cms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'title-two-zones',
  templateUrl: './title-two-zones.component.html',
  styleUrls: ['./title-two-zones.component.scss']
})
export class TitleTwoZonesReadonlyComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(3)
  }
}
