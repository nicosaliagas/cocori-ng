import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { ConfigInputComponent } from '@cocori-ng/lib/src/lib/feature-core';

import {
  ExtendInputsComponent,
} from '../../../../../feature-core/shared/component/form/inputs/extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-select',
    templateUrl: 'cocoring-select.component.html',
    styleUrls: ['./cocoring-select.component.scss']
})

export class CocoringSelectComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm()
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() { }
}
