import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'input-text-ng',
    templateUrl: 'input-text.component.html',
})

export class InputTextComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();
    }

    constructor() {
        super();
    }

    ngOnInit() { }
}
