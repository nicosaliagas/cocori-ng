import { Component, Input, OnInit } from '@angular/core';

import { ConfigInputComponent } from '../../../../../core/model/component-inputs.model';
import { ExtendInputsComponent } from '../extend-inputs/extend-inputs.component';

@Component({
    selector: 'input-password-ng',
    templateUrl: 'input-password.component.html',
})

export class InputPasswordComponent extends ExtendInputsComponent implements OnInit {

    type: string = "password"

    @Input()
    set config(config: ConfigInputComponent) {
        this.configInput(config)

        this.addControlForm();
    }

    constructor() {
        super();
    }

    ngOnInit() { }

    revealPassword(answer: boolean) {
        this.type = answer ? 'text' : 'password'
    }
}
