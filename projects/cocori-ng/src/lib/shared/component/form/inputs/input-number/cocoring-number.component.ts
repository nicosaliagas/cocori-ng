import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'cocoring-number',
    templateUrl: 'cocoring-number.component.html',
})

export class CocoringNumberComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() { }
}
