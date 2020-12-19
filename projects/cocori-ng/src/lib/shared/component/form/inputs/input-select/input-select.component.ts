import { Component, Input, OnInit } from '@angular/core';

import { InputComponentInputs } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-select-ng',
    templateUrl: 'input-select.component.html',
})

export class InputSelectComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: InputComponentInputs) {
        this.configInput(config)

        this.addControlForm()
    }

    constructor() {
        super();
    }

    ngOnInit() { }
}
