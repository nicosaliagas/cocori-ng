import { Component, Input, OnInit } from '@angular/core';

import { InputComponentInputs } from '../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-password-ng',
    templateUrl: 'input-password.component.html',
})

export class InputPasswordComponent extends ExtendInputsComponent implements OnInit {
    @Input()
    set config(config: InputComponentInputs) {
        this.configInput(config)

        this.addDefaultForm();
    }

    constructor() {
        super();
    }

    ngOnInit() { }
}
