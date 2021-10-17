import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { ExtendSectionReadonlyTplComponent } from '@cocori-ng/lib/src/lib/feature-cms';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-block-readonly-tpl',
  templateUrl: './simple-block.component.html',
})
export class SimpleBlockReadonlyTplComponent extends ExtendSectionReadonlyTplComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.init(1)
  }
}
