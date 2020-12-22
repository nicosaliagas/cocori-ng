import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'input-select-ng',
    templateUrl: 'input-select.component.html',
})

export class InputSelectComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm()
    }

    constructor() {
        super();
    }

    ngOnInit() { }
}
