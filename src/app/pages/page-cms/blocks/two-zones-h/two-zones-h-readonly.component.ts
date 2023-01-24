import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ExtendSectionReadonlyTplComponent } from 'cocori-ng/src/feature-cms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'two-zones-h',
  templateUrl: './two-zones-h.component.html',
  styleUrls: ['./two-zones-h.component.scss',]
})
export class TwoZonesHReadonlyComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(2)
  }
}
